import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, createBranch, updateBranch, deleteBranch } from '../../redux/actions/branchActions';
import { Box, Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import HandleApiErrorDialog from '../../utils/HandleApiErrorDialog';

const BranchManagement = () => {
  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.branch);
  const [open, setOpen] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentBranch, setCurrentBranch] = useState({ name: '', address: '', phone: '', managerId: '' });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [branchToDelete, setBranchToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleOpen = (branch = { name: '', address: '', phone: '', managerId: '' }) => {
    setCurrentBranch(branch);
    setIsEdit(!!branch._id);
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentBranch({ name: '', address: '', phone: '', managerId: '' });
    setErrors({});
  };

  const handleConfirmationClose = () => {
    setOpenConfirmationDialog(false);
  };

  const handleSubmit = async () => {
    setOpenConfirmationDialog(false);
    
    try {
      if (isEdit) {
        await dispatch(updateBranch(currentBranch._id, currentBranch));
        setSnackbarMessage('Branch updated successfully');
        setSnackbarSeverity('success');
      } else {
        await dispatch(createBranch(currentBranch));
        setSnackbarMessage('Branch created successfully');
        setSnackbarSeverity('success');
      }
      handleClose();
    } catch (error) {
      if (error.response?.data?.message === 'Validation error') {
        const errorObj = error.response.data.errors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {});
        setErrors(errorObj);
      }
      setSnackbarMessage('Error occurred, please try again');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleDelete = (id) => {
    setBranchToDelete(id);
    setOpenDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBranch(branchToDelete))
      .then(() => {
        setSnackbarMessage('Branch deleted successfully');
        setSnackbarSeverity('success');
      })
      .catch((error) => {
        setSnackbarMessage(`Error occurred while deleting: ${error.message}`);
        setSnackbarSeverity('error');
      })
      .finally(() => {
        setOpenSnackbar(true);
        setOpenDeleteConfirmation(false);
        setBranchToDelete(null);
      });
  };

  return (
    <Box>
      <HandleApiErrorDialog />
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Branch Management</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
              Add Branch
            </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Manager ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branches.length > 0 ? (
                branches.map((branch) => (
                  <TableRow key={branch._id}>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>{branch.address}</TableCell>
                    <TableCell>{branch.phone}</TableCell>
                    <TableCell>{branch.managerId}</TableCell>
                    <TableCell>
                      <Button startIcon={<EditIcon />} onClick={() => handleOpen(branch)}>Edit</Button>
                      <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(branch._id)} color="error">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No branches available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Confirmation Dialog for Create/Update */}
      <Dialog open={openConfirmationDialog} onClose={handleConfirmationClose}>
        <DialogTitle>{isEdit ? 'Confirm Update' : 'Confirm Create'}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to {isEdit ? 'update' : 'create'} this branch?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding/editing branch */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit Branch' : 'Add Branch'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={currentBranch.name}
            onChange={(e) => setCurrentBranch({ ...currentBranch, name: e.target.value })}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Address"
            value={currentBranch.address}
            onChange={(e) => setCurrentBranch({ ...currentBranch, address: e.target.value })}
            fullWidth
            margin="normal"
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            label="Phone"
            value={currentBranch.phone}
            onChange={(e) => setCurrentBranch({ ...currentBranch, phone: e.target.value })}
            fullWidth
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="Manager ID"
            value={currentBranch.managerId}
            onChange={(e) => setCurrentBranch({ ...currentBranch, managerId: e.target.value })}
            fullWidth
            margin="normal"
            error={!!errors.managerId}
            helperText={errors.managerId}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => setOpenConfirmationDialog(true)} variant="contained">
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for delete confirmation */}
      <Dialog open={openDeleteConfirmation} onClose={() => setOpenDeleteConfirmation(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this branch? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirmation(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BranchManagement;