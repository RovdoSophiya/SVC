import React, { useEffect, useState, useCallback } from "react";
import {
  fetchOrderHistory,
  downloadCourierHistory,
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
  Snackbar,
  Alert,
  Pagination,
} from "@mui/material";

const CourierOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const courierid = localStorage.getItem("id");
  const ordersPerPage = 5;

  const fetchOrders = useCallback(async () => {
    if (!courierid || courierid === 0) {
      setError("Invalid User ID");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const result = await fetchOrderHistory(
      courierid,
      currentPage,
      ordersPerPage
    );
    if (result.error) {
      setError(result.error);
    } else {
      setOrders(result.data.deliveries);
      setTotalPages(result.data.totalPages);
    }
    setLoading(false);
  }, [courierid, currentPage]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, currentPage]);

  const handleDownload = async () => {
    const result = await downloadCourierHistory(courierid);
    if (result.error) {
      setSnackbarMessage(result.error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `courier_history_${courierid}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) {
    return (
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Loading...
      </Typography>
    );
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
      {orders.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            margin: "70px auto",
            color: "rgba(128, 96, 68, 1)",
            fontSize: "35px",
          }}
        >
          No orders found.
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              margin: "20px",
              alignSelf: "center",
            }}
          >
            <Button
              onClick={handleDownload}
              variant="contained"
              sx={{
                marginLeft: "8px",
                backgroundColor: "rgba(128, 96, 68, 1)",
                "@media(max-width:730px)": { fontSize: "12px", height: "40px" },
                "@media(max-width:500px)": {
                  fontSize: "10px",
                  width: "160px",
                  height: "25px",
                },
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
                        padding: "1px",
                        fontSize: "10px",
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
                        padding: "1px",
                        fontSize: "10px",
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
                        padding: "1px",
                        fontSize: "10px",
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
                        padding: "1px",
                        fontSize: "10px",
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
                        padding: "1px",
                        fontSize: "10px",
                      },
                    }}
                  >
                    Client
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell
                      sx={{
                        "@media(max-width:470px)": {
                          textAlign: "center",
                          padding: "4px",
                          fontSize: "12px",
                        },
                        "@media(max-width:350px)": {
                          padding: "0px",
                          fontSize: "8px",
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
                        "@media(max-width:350px)": {
                          padding: "0px",
                          fontSize: "8px",
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
                        "@media(max-width:350px)": {
                          padding: "0px",
                          fontSize: "8px",
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
                        "@media(max-width:350px)": {
                          padding: "0px",
                          fontSize: "8px",
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
                        "@media(max-width:350px)": {
                          padding: "0px",
                          fontSize: "8px",
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

          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "20px" }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => {
                setCurrentPage(value);
              }}
              variant="outlined"
              shape="rounded"
              color="primary"
              siblingCount={0}
              boundaryCount={1}
            />
          </Box>
        </>
      )}
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
