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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AvailableOrders = ({ userId }) => {
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

  const fetchAvailableOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/couriers/deliveries/available"
      );
      setOrders(response.data);
    } catch (error) {
      setError("Error loading orders");
    } finally {
      setLoading(false);
    }
  }, []);

  // const fetchSortedOrders = async (sortBy, order) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/api/couriers/deliveries/sortBy${sortBy}`,
  //       {
  //         params: { order },
  //       }
  //     );
  //     setOrders(response.data);
  //     setSortConfig({ sortBy, order });
  //   } catch (error) {
  //     setError(`Error loading sorted orders by ${sortBy.toLowerCase()}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchSortedOrders = async (sortBy, order) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/couriers/deliveries/sortBy${sortBy}`,
        {
          params: { order },
        }
      );
      setOrders(response.data);
      setSortConfig({ sortBy, order });
    } catch (error) {
      setError(`Error loading sorted orders by ${sortBy.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableOrders();
  }, [fetchAvailableOrders]);

  const handleToggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // const handleTakeOrder = async (orderId) => {
  //   const id = userId.userId || userId;
  //   try {
  //     await axios.put(
  //       `http://localhost:5000/api/couriers/${id}/takeOrder/${orderId}`
  //     );
  //     setSnackbarMessage("Delivery has been added to current deliveries.");
  //     setSnackbarSeverity("success");
  //     setOpenSnackbar(true);
  //     fetchAvailableOrders(); // Обновляем список заказов
  //   } catch (error) {
  //     setSnackbarMessage("Oops, something went wrong!");
  //     setSnackbarSeverity("error");
  //     setOpenSnackbar(true);
  //   }
  // };
  const handleTakeOrder = async (orderId) => {
    const id = userId.userId || userId;
    try {
      await axios.put(
        `http://localhost:5000/api/couriers/${id}/takeOrder/${orderId}`
      );
      setSnackbarMessage("Delivery has been added to current deliveries.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      await fetchAvailableOrders(); // Обновляем список заказов из базы данных
    } catch (error) {
      setSnackbarMessage("Oops, something went wrong!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
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
    fetchSortedOrders("Date", newOrder);
  };

  const handleSortByPrice = () => {
    fetchAvailableOrders();
    const newOrder =
      sortConfig.sortBy === "Price" && sortConfig.order === "ASC"
        ? "DESC"
        : "ASC";
    fetchSortedOrders("Price", newOrder);
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
        No available orders
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
    </div>
  );
};

export default AvailableOrders;
