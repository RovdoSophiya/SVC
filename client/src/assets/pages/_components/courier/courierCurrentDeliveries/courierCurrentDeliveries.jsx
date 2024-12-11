import React, { useEffect, useState, useCallback } from "react";
import {
  fetchCurrentDeliveries,
  fetchSortedDeliveries,
  updateOrderStatus,
} from "../../../../api/deliveryApi/deliveryApi";
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

const CurrentDeliveries = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openRows, setOpenRows] = useState({});
  const [sortConfig, setSortConfig] = useState({
    sortBy: "Price",
    order: "ASC",
  });
  const userId = localStorage.getItem("id");

  //Управление снакбаром
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  //Управление модальным окном и статусом
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const fetchDeliveries = useCallback(async () => {
    setLoading(true);
    setError(null);
    const id = Number(userId);
    const result = await fetchCurrentDeliveries(id);
    if (result.error) {
      setError(result.error);
    } else {
      setOrders(result.data);
    }
    setLoading(false);
  }, [userId]);

  const fetchSorted = async (sortBy, order) => {
    setLoading(true);
    setError(null);
    const result = await fetchSortedDeliveries(userId, sortBy, order);
    if (result.error) {
      setError(result.error);
    } else {
      setOrders(result.data);
      setSortConfig({ sortBy, order });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

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
    const result = await updateOrderStatus(selectedOrderId, selectedStatus);
    if (result.error) {
      setSnackbarMessage(result.error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage("Order status has been updated.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      await fetchDeliveries();
      handleDialogClose();
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
    fetchSorted("Date", newOrder);
  };

  const handleSortByPrice = () => {
    const newOrder =
      sortConfig.sortBy === "Price" && sortConfig.order === "ASC"
        ? "DESC"
        : "ASC";
    fetchSorted("Price", newOrder);
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

  return (
    <div>
      {orders.length > 0 ? (
        <>
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
                  sortConfig.sortBy === "Date"
                    ? "white"
                    : "rgba(128, 96, 68, 1)",
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
                  sortConfig.sortBy === "Price"
                    ? "white"
                    : "rgba(128, 96, 68, 1)",
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
              sx={{
                width: "100%",
                margin: "auto",
                marginTop: "20px",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        "@media(max-width:540px)": {
                          paddingRight: "3px",
                        },
                        "@media(max-width:328px)": {
                          paddingRight: "1px",
                        },
                      }}
                    >
                      Address
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        "@media(max-width:540px)": {
                          paddingRight: "3px",
                        },
                        "@media(max-width:328px)": {
                          paddingRight: "1px",
                        },
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        "@media(max-width:540px)": {
                          paddingRight: "3px",
                        },
                        "@media(max-width:328px)": {
                          paddingRight: "1px",
                        },
                      }}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        "@media(max-width:540px)": {
                          paddingRight: "3px",
                        },
                        "@media(max-width:328px)": {
                          paddingRight: "1px",
                        },
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <TableRow>
                        <TableCell
                          sx={{
                            "@media(max-width:540px)": {
                              padding: "0px",
                              textAlign: "center",
                            },
                          }}
                        >
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
                        <TableCell
                          sx={{
                            "@media(max-width:540px)": {
                              paddingRight: "3px",
                            },
                            "@media(max-width:328px)": {
                              paddingRight: "1px",
                            },
                          }}
                        >
                          {order.status}
                        </TableCell>
                        <TableCell
                          sx={{
                            "@media(max-width:540px)": {
                              paddingRight: "3px",
                            },
                            "@media(max-width:328px)": {
                              paddingRight: "1px",
                            },
                          }}
                        >
                          {order.totalAmount}
                        </TableCell>
                        <TableCell
                          sx={{
                            "@media(max-width:540px)": {
                              paddingRight: "3px",
                            },
                            "@media(max-width:328px)": {
                              paddingRight: "1px",
                            },
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => handleDialogOpen(order.id)}
                            sx={{
                              textTransform: "none",
                              fontWeight: "bold",
                              backgroundColor: "rgba(128, 96, 68, 1)",
                              "@media(max-width:540px)": {
                                fontSize: "10px",
                              },
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
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                              >
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
        </>
      ) : (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            margin: "70px auto",
            color: "rgba(128, 96, 68, 1)",
            fontSize: "35px",
          }}
        >
          No current deliveries
        </Typography>
      )}
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
            <MenuItem value="On the Way">On the Way</MenuItem>
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
