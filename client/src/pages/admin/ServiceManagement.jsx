import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, createService, updateService, deleteService } from "../../redux/actions/serviceActions";
import { Box, Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import HandleApiErrorDialog from "../../utils/HandleApiErrorDialog";

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);

  // State quản lý dialog và dữ liệu dịch vụ
  const [open, setOpen] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentService, setCurrentService] = useState({ name: "", price: "", duration: "", description: "" });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Fetch danh sách dịch vụ khi component mount
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Hàm mở dialog thêm hoặc sửa dịch vụ
  const handleOpen = (service = { name: "", price: "", duration: "", description: ""}) => {
    setCurrentService(service);
    setIsEdit(!!service._id);
    setErrors({});
    setOpen(true);
  };

  // Hàm đóng dialog thêm/sửa
  const handleClose = () => {
    setOpen(false);
    setCurrentService({ name: "", price: "", duration: "", description: "", branchId: "" });
    setErrors({});
  };

  // Hàm đóng dialog xác nhận
  const handleConfirmationClose = () => {
    setOpenConfirmationDialog(false);
  };

  // Hàm xử lý submit (thêm hoặc sửa dịch vụ)
  const handleSubmit = async () => {
    setOpenConfirmationDialog(false);

    try {
      if (isEdit) {
        await dispatch(updateService(currentService._id, currentService));
        setSnackbarMessage("Service updated successfully");
        setSnackbarSeverity("success");
      } else {
        await dispatch(createService(currentService));
        setSnackbarMessage("Service created successfully");
        setSnackbarSeverity("success");
      }
      handleClose();
    } catch (error) {
      if (error.response?.data?.message === "Validation error") {
        const errorObj = error.response.data.errors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {});
        setErrors(errorObj);
      }
      setSnackbarMessage("Error occurred, please try again");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  // Hàm xử lý xóa dịch vụ
  const handleDelete = (id) => {
    setServiceToDelete(id);
    setOpenDeleteConfirmation(true);
  };

  // Hàm xác nhận xóa dịch vụ
  const handleConfirmDelete = () => {
    dispatch(deleteService(serviceToDelete))
      .then(() => {
        setSnackbarMessage("Service deleted successfully");
        setSnackbarSeverity("success");
      })
      .catch((error) => {
        setSnackbarMessage(`Error occurred while deleting: ${error.message}`);
        setSnackbarSeverity("error");
      })
      .finally(() => {
        setOpenSnackbar(true);
        setOpenDeleteConfirmation(false);
        setServiceToDelete(null);
      });
  };

  return (
    <Box>
      {/* Component xử lý lỗi API */}
      <HandleApiErrorDialog />
      <Card>
        <CardContent>
          {/* Tiêu đề và nút thêm dịch vụ */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Service Management</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
              Add Service
            </Button>
          </Box>

          {/* Bảng hiển thị danh sách dịch vụ */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.length > 0 ? (
                services.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.duration}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>
                      <Button startIcon={<EditIcon />} onClick={() => handleOpen(service)}>
                        Edit
                      </Button>
                      <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(service._id)} color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>No services available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog xác nhận thêm/sửa */}
      <Dialog open={openConfirmationDialog} onClose={handleConfirmationClose}>
        <DialogTitle>{isEdit ? "Confirm Update" : "Confirm Create"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to {isEdit ? "update" : "create"} this service?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog thêm/sửa dịch vụ */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit Service" : "Add Service"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={currentService.name}
            onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Price"
            type="number"
            value={currentService.price}
            onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
            fullWidth
            margin="normal"
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            label="Duration (minutes)"
            type="number"
            value={currentService.duration}
            onChange={(e) => setCurrentService({ ...currentService, duration: e.target.value })}
            fullWidth
            margin="normal"
            error={!!errors.duration}
            helperText={errors.duration}
          />
          <TextField
            label="Description"
            value={currentService.description}
            onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => setOpenConfirmationDialog(true)} variant="contained">
            {isEdit ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteConfirmation} onClose={() => setOpenDeleteConfirmation(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this service? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirmation(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ServiceManagement;