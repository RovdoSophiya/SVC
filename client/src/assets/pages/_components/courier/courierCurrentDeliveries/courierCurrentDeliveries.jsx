import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Collapse,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CurrentDeliveries = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openRows, setOpenRows] = useState({});
  const [sortConfig, setSortConfig] = useState({
    sortBy: "Price",
    order: "ASC",
  });

  //Управление снакбаром
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  //Управление модальным окном и статусом
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const fetchCurrentDeliveries = useCallback(async () => {
    setLoading(true);
    setError(null);
    const id = Number(userId);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/deliveries/search/courierid:${id}`
      );
      setOrders(response.data);
    } catch (error) {
      setError("Error loading current deliveries");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchSortedDeliveries = async (sortBy, order) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/deliveries/sort/sortBy${sortBy}/${userId}`,
        {
          params: { order },
        }
      );
      setOrders(response.data);
      setSortConfig({ sortBy, order });
    } catch (error) {
      setError(`Error loading sorted deliveries by ${sortBy.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentDeliveries();
  }, [fetchCurrentDeliveries]);

  const handleToggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDialogOpen = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedOrderId(null);
    setSelectedStatus("Pending");
  };

  const handleStatusChange = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/deliveries/${selectedOrderId}/status`,
        { status: selectedStatus }
      );
      setSnackbarMessage("Order status has been updated.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      await fetchCurrentDeliveries(); // Обновляем список заказов
      handleDialogClose(); // Закрываем диалог
    } catch (error) {
      setSnackbarMessage("Error updating order status.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSortByDate = () => {
    const newOrder =
      sortConfig.sortBy === "Date" && sortConfig.order === "ASC"
        ? "DESC"
        : "ASC";
    fetchSortedDeliveries("Date", newOrder);
  };

  const handleSortByPrice = () => {
    const newOrder =
      sortConfig.sortBy === "Price" && sortConfig.order === "ASC"
        ? "DESC"
        : "ASC";
    fetchSortedDeliveries("Price", newOrder);
  };

  if (loading) {
    return (
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {error}
      </Typography>
    );
  }

  if (orders.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        No current deliveries
      </Typography>
    );
  }

  return (
    <div>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <Button
          onClick={handleSortByDate}
          variant={sortConfig.sortBy === "Date" ? "contained" : "outlined"}
          sx={{
            borderColor: "rgba(128, 96, 68, 1)",
            backgroundColor:
              sortConfig.sortBy === "Date"
                ? "rgba(128, 96, 68, 1)"
                : "transparent",
            color:
              sortConfig.sortBy === "Date" ? "white" : "rgba(128, 96, 68, 1)",
            "@media(max-width:400px)": { fontSize: "10px" },
          }}
        >
          Sort by Date{" "}
          {sortConfig.sortBy === "Date"
            ? sortConfig.order === "ASC"
              ? "↑"
              : "↓"
            : ""}
        </Button>
        <Button
          onClick={handleSortByPrice}
          variant={sortConfig.sortBy === "Price" ? "contained" : "outlined"}
          sx={{
            borderColor: "rgba(128, 96, 68, 1)",
            backgroundColor:
              sortConfig.sortBy === "Price"
                ? "rgba(128, 96, 68, 1)"
                : "transparent",
            color:
              sortConfig.sortBy === "Price" ? "white" : "rgba(128, 96, 68, 1)",
            "@media(max-width:400px)": { fontSize: "10px" },
          }}
        >
          Sort by Amount{" "}
          {sortConfig.sortBy === "Price"
            ? sortConfig.order === "ASC"
              ? "↑"
              : "↓"
            : ""}
        </Button>
      </div>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          margin: "auto",
          marginTop: "20px",
          padding: "0",
        }}
      >
        <TableContainer
          sx={{ width: "100%", margin: "auto", marginTop: "20px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Address
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton onClick={() => handleToggleRow(order.id)}>
                        <ExpandMoreIcon
                          className={openRows[order.id] ? "rotated" : ""}
                          sx={{
                            transition: "transform 0.3s",
                            transform: openRows[order.id]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </IconButton>
                      {order.deliveryAddress}
                    </TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleDialogOpen(order.id)}
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          backgroundColor: "rgba(128, 96, 68, 1)",
                        }}
                      >
                        Change Status
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                    >
                      <Collapse
                        in={openRows[order.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div
                          style={{
                            padding: "16px",
                            backgroundColor: "rgba(128, 96, 68, 0.4)",
                            borderRadius: "8px",
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Additional Information
                          </Typography>
                          <Typography>
                            Delivery Date:{" "}
                            {new Date(order.deliveryDate).toLocaleString()}
                          </Typography>
                          <Typography>
                            Client Name: {order.clientFullName}
                          </Typography>
                          <Typography>Ordered Dishes:</Typography>
                          <ul>
                            {order.orderedDishes.map((dish, index) => (
                              <li key={index}>
                                {dish.dishName} - Quantity: {dish.quantity},
                                Price: {dish.totalPrice}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <a
        href="/courier"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "40px",
          textDecoration: "none",
          fontSize: "24px",
          color: "rgba(128, 96, 68, 1)",
        }}
      >
        Return back
      </a>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        sx={{
          backgroundColor: "rgba(128, 96, 68, 1)",
          color: "white",
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Change Order Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status to{" "}
            <strong>{selectedStatus}</strong>?
          </DialogContentText>
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Delayed">Delayed</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="rgba(128, 96, 68, 1)">
            Cancel
          </Button>
          <Button onClick={handleStatusChange} color="rgba(128, 96, 68, 1)">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CurrentDeliveries;
