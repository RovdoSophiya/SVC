import React, { useEffect, useState, useCallback } from "react";
import {
  fetchAvailableOrders,
  fetchSortedOrders,
  takeOrder,
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
  DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AvailableOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openRows, setOpenRows] = useState({});
  const [sortConfig, setSortConfig] = useState({
    sortBy: "Price",
    order: "ASC",
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const userId = localStorage.getItem("id");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchAvailableOrders();
    if (result.error) {
      setError(result.error);
    } else {
      setOrders(result.data);
    }
    setLoading(false);
  }, []);

  const fetchOrdersSorted = async (sortBy, order) => {
    setLoading(true);
    setError(null);
    const result = await fetchSortedOrders(sortBy, order);
    if (result.error) {
      setError(result.error);
    } else {
      setOrders(result.data);
      setSortConfig({ sortBy, order });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleToggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTakeOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };

  const handleConfirmOrder = async () => {
    const id = userId.userId || userId;
    const result = await takeOrder(id, selectedOrderId);
    if (result.error) {
      setSnackbarMessage(result.error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage("Delivery has been added to current deliveries.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      await fetchOrders(); // Обновляем список заказов
    }
    setOpenModal(false);
    setSelectedOrderId(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrderId(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSortByDate = () => {
    fetchAvailableOrders();
    const newOrder =
      sortConfig.sortBy === "Date" && sortConfig.order === "ASC"
        ? "DESC"
        : "ASC";
    fetchOrdersSorted("Date", newOrder);
  };

  const handleSortByPrice = () => {
    fetchAvailableOrders();
    const newOrder =
      sortConfig.sortBy === "Price" && sortConfig.order === "ASC"
        ? "DESC"
        : "ASC";
    fetchOrdersSorted("Price", newOrder);
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
      <div style={{ display: "flex", justifyContent: "column" }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            margin: "70px auto",
            color: "rgba(128, 96, 68, 1)",
            fontSize: "35px",
          }}
        >
          No available orders
        </Typography>
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
      </div>
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
            "@media(max-width:400px)": {
              fontSize: "10px",
            },
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
            "@media(max-width:400px)": {
              fontSize: "10px",
            },
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
                        onClick={() => handleTakeOrder(order.id)}
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          backgroundColor: "rgba(128, 96, 68, 1)",
                          "@media(max-width:540px)": {
                            fontSize: "10px",
                            width: "13px",
                          },
                        }}
                      >
                        Accept
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
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Order Acceptance</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to accept this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmOrder} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AvailableOrders;
