import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const CreateVoucher = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!code || !discount || !minOrderValue || !expiryDate) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:9999/vouchers", {
        code,
        discount: Number(discount),
        minOrderValue: Number(minOrderValue),
        expiryDate,
      });

      alert("Tạo voucher thành công");
      setCode("");
      setDiscount("");
      setMinOrderValue("");
      setExpiryDate("");
    } catch (error) {
      console.error("Lỗi khi tạo voucher:", error);
      setError("Lỗi khi tạo voucher. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Tạo Voucher Mới
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Mã Voucher"
                fullWidth
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Giảm Giá (%)"
                type="number"
                fullWidth
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Giá Trị Đơn Hàng Tối Thiểu"
                type="number"
                fullWidth
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ngày Hết Hạn"
                type="date"
                fullWidth
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Tạo Voucher"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateVoucher;
