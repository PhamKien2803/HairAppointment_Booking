import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideErrorDialog } from '../redux/actions/errorActions';

const HandleApiErrorDialog = () => {
  const dispatch = useDispatch();
  const { error, showDialog } = useSelector((state) => state.error);

  const handleClose = () => {
    dispatch(hideErrorDialog()); // Đóng dialog lỗi
  };

  const renderErrorMessage = () => {
    if (error?.response) {
      const { status, data } = error.response;

      // Xử lý lỗi validation (status 400 và message chứa "Validation error")
      if (status === 400 && data.message.includes('Validation error')) {
        return data.errors.map((err, index) => (
          <Typography key={index} variant="body2" color="error">
            {err.field}: {err.message}
          </Typography>
        ));
      } else if (status === 500) {
        // Format lỗi 500 theo kiểu tương tự như lỗi 400
        return (
          <Typography variant="body2" color="error">
            {data.errors ? data.errors.map((err, index) => (
              <div key={index}>
                {err.field}: {err.message}
              </div>
            )) : 'Lỗi server: ' + (data.message || 'Đã xảy ra lỗi server nội bộ.')}
          </Typography>
        );
      } else {
        return <Typography variant="body2" color="error">{data.message || 'Đã xảy ra lỗi không xác định.'}</Typography>;
      }
    } else {
      return <Typography variant="body2" color="error">Đã xảy ra lỗi khi xử lý yêu cầu.</Typography>;
    }
  };

  return (
    <Dialog open={showDialog} onClose={handleClose}>
      <DialogTitle>Lỗi</DialogTitle>
      <DialogContent>{renderErrorMessage()}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HandleApiErrorDialog;
