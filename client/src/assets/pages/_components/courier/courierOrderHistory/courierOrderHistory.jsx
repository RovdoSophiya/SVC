import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const CourierOrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]); // Все заказы
  const [filteredOrders, setFilteredOrders] = useState([]); // Отфильтрованные заказы
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const id = Number(userId);

  const fetchOrderHistory = useCallback(async () => {
    if (!id || id === 0) {
      setError("Invalid User ID");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/deliveries/courier/history/${id}`
      );
      setOrders(response.data);
      setFilteredOrders(response.data); // Сохраняем изначальные заказы
    } catch (error) {
      setError("Error loading order history");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrderHistory();
  }, [fetchOrderHistory]);

  // Функция фильтрации заказов по адресу
  useEffect(() => {
    const filterOrders = () => {
      if (searchTerm === "") {
        setFilteredOrders(orders); // Если ничего не введено, показываем все заказы
      } else {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const filtered = orders.filter((order) =>
          order.deliveryAddress.toLowerCase().includes(lowerSearchTerm)
        );
        setFilteredOrders(filtered);
      }
    };

    filterOrders();
  }, [searchTerm, orders]);

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/deliveries/courier/history/download/${id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `courier_history_${userId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setSnackbarMessage("Error downloading file.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px",
          alignSelf: "center",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search by address..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            marginRight: "8px",
            width: "70%",
            "@media(max-width:730px)": { width: "60%" },
          }}
        />
        <Button
          onClick={handleDownload}
          variant="contained"
          sx={{
            marginLeft: "8px",
            backgroundColor: "rgba(128, 96, 68, 1)",
            "@media(max-width:730px)": { fontSize: "12px", height: "40px" },
          }}
        >
          Download History
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  "@media(max-width:470px)": {
                    textAlign: "center",
                    padding: "4px",
                  },
                  "@media(max-width:330px)": {
                    padding: "3px",
                  },
                }}
              >
                Address
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  "@media(max-width:470px)": {
                    textAlign: "center",
                    padding: "4px",
                  },
                  "@media(max-width:330px)": {
                    padding: "3px",
                  },
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  "@media(max-width:470px)": {
                    textAlign: "center",
                    padding: "4px",
                  },
                  "@media(max-width:330px)": {
                    padding: "3px",
                  },
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  "@media(max-width:470px)": {
                    textAlign: "center",
                    padding: "4px",
                  },
                  "@media(max-width:330px)": {
                    padding: "3px",
                  },
                }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  "@media(max-width:470px)": {
                    textAlign: "center",
                    padding: "4px",
                  },
                  "@media(max-width:330px)": {
                    padding: "3px",
                  },
                }}
              >
                Client
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell
                  sx={{
                    "@media(max-width:470px)": {
                      textAlign: "center",
                      padding: "4px",
                      fontSize: "12px",
                    },
                  }}
                >
                  {order.deliveryAddress}
                </TableCell>
                <TableCell
                  sx={{
                    "@media(max-width:470px)": {
                      textAlign: "center",
                      padding: "4px",
                      fontSize: "11px",
                    },
                  }}
                >
                  {new Date(order.deliveryDate).toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    "@media(max-width:470px)": {
                      textAlign: "center",
                      padding: "4px",
                      fontSize: "12px",
                    },
                  }}
                >
                  {order.status}
                </TableCell>
                <TableCell
                  sx={{
                    "@media(max-width:470px)": {
                      textAlign: "center",
                      padding: "4px",
                      fontSize: "12px",
                    },
                  }}
                >
                  {order.totalAmount}
                </TableCell>
                <TableCell
                  sx={{
                    "@media(max-width:470px)": {
                      textAlign: "center",
                      padding: "4px",
                      fontSize: "12px",
                    },
                  }}
                >
                  {order.clientFullName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
};

export default CourierOrderHistory;
