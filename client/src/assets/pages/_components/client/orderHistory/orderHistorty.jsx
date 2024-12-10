import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  Snackbar,
} from "@mui/material";
import {
  fetchAllOrders,
  downloadOrdersExcel,
} from "../../../../api/orderApi/orderApi";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5;
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("ASC");
  const clientid = localStorage.getItem("id");

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchAllOrders(
        clientid,
        currentPage,
        limit,
        sortOrder
      );
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    };

    getOrders();
  }, [currentPage, limit, sortOrder, clientid]);

  const handleShow = (order) => {
    setSelectedOrder(order);
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setSelectedOrder(null);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarOpen(true);
    });
  };

  const handleDownloadExcel = async () => {
    const data = await downloadOrdersExcel(clientid);
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `orders_history_${clientid}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      {/* Кнопка сортировки */}
      {orders.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleDownloadExcel}
            variant="contained"
            sx={{
              mb: 2,
              border: "2px solid rgba(128, 96, 68, 1)",
              backgroundColor: "white",
              color: "rgba(128, 96, 68, 1)",
              display: "flex",
              marginLeft: "10px",
              marginTop: "40px",
              "@media (max-width:600px)": {
                fontSize: "12px",
              },
              "@media (max-width:400px)": {
                fontSize: "9px",
              },
            }}
          >
            Download Orders
          </Button>
          <Button
            onClick={toggleSortOrder}
            variant="contained"
            sx={{
              mb: 2,
              border: "2px solid rgba(128, 96, 68, 1) ",
              backgroundColor: "white",
              color: "rgba(128, 96, 68, 1)",
              display: "flex",
              marginRight: "10px",
              marginTop: "40px",
              "@media (max-width:600px)": {
                fontSize: "12px",
              },
              "@media (max-width:400px)": {
                fontSize: "9px",
              },
            }}
          >
            Sort order date by: {sortOrder === "ASC" ? "⬆" : "⬇"}
          </Button>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "rgba(128, 96, 68, 1)",
                  textAlign: "center",
                  marginLeft: "10px",
                  "@media (max-width:600px)": {
                    padding: "16px 2px",
                    fontSize: "12px",
                  },
                }}
              >
                Order date
              </TableCell>
              <TableCell
                sx={{
                  color: "rgba(128, 96, 68, 1)",
                  textAlign: "center",
                  "@media (max-width:600px)": {
                    padding: "16px 2px",
                    fontSize: "12px",
                  },
                }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  color: "rgba(128, 96, 68, 1)",
                  textAlign: "center",
                  "@media (max-width:600px)": {
                    padding: "16px 2px",
                    fontSize: "12px",
                  },
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: "rgba(128, 96, 68, 1)",
                  textAlign: "center",
                  "@media (max-width:600px)": {
                    padding: "16px 2px",
                    fontSize: "12px",
                  },
                }}
              >
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell
                    sx={{
                      color: "rgba(128, 96, 68, 1)",
                      textAlign: "center",
                      "@media (max-width:600px)": {
                        padding: "16px 2px",
                        fontSize: "12px",
                      },
                    }}
                  >
                    {new Date(order.orderdate).toLocaleString()}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "rgba(128, 96, 68, 1)",
                      textAlign: "center",
                      "@media (max-width:600px)": {
                        padding: "16px 2px",
                        fontSize: "12px",
                      },
                    }}
                  >
                    {order.totalamount}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "rgba(128, 96, 68, 1)",
                      textAlign: "center",
                      "@media (max-width:600px)": {
                        padding: "16px 2px",
                        fontSize: "12px",
                      },
                    }}
                  >
                    {order.delivery.status === "none"
                      ? "none"
                      : order.delivery.status}
                  </TableCell>
                  <TableCell
                    sx={{ color: "rgba(128, 96, 68, 1)", textAlign: "center" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleShow(order)}
                      sx={{
                        border: "none",
                        color: "rgba(128, 96, 68, 1)",
                        textAlign: "center",
                        backgroundColor: "inherit",
                        "@media (max-width:600px)": {
                          fontSize: "12px",
                        },
                      }}
                    >
                      More
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      color: "rgba(128, 96, 68, 1)",
                      textAlign: "center",
                      fontSize: "30px",
                    }}
                  >
                    There are no orders
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Пагинация */}
      {orders.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1} // Блокировка кнопки влево
            variant="outlined"
            sx={{
              color: "rgba(128, 96, 68, 1)",
              borderColor: "rgba(128, 96, 68, 1)",
            }}
          >
            ◀
          </Button>
          <Button
            onClick={handleNextPage}
            // disabled={currentPage * limit >= total} // Блокировка кнопки вправо
            disabled={currentPage >= totalPages}
            variant="outlined"
            sx={{
              marginLeft: "8px",
              color: "rgba(128, 96, 68, 1)",
              borderColor: "rgba(128, 96, 68, 1)",
            }}
          >
            ▶
          </Button>
        </div>
      )}

      <a
        href="/client"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "70px",
          marginBottom: "70px",
          textDecoration: "none",
          fontSize: "24px",
          color: "rgba(128, 96, 68, 1)",
        }}
      >
        Return back
      </a>

      {/* Модальное окно для деталей заказа */}
      <Modal open={modalShow} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            "@media (max-width:550px)": {
              width: 280,
            },
            "@media (max-width:360px)": {
              width: 250,
            },
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: "rgba(128, 96, 68, 1)", textDecoration: "underline" }}
          >
            Order detailes
          </Typography>
          {selectedOrder && (
            <>
              <Typography
                variant="subtitle1"
                sx={{ color: "rgba(128, 96, 68, 1)" }}
              >
                Dishes:
              </Typography>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {selectedOrder.orderedDishes.map((dish, index) => (
                  <li
                    key={index}
                    style={{
                      color: "rgba(128, 96, 68, 1)",
                    }}
                  >
                    {dish.name} - {dish.price} (Count: {dish.quantity}, Price:{" "}
                    {dish.totalprice})
                  </li>
                ))}
              </ul>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "rgba(128, 96, 68, 1)",
                  textDecoration: "underline",
                }}
              >
                Courier:
              </Typography>
              {selectedOrder.delivery.courier ===
              "Courier has not picked up the order" ? (
                <Typography
                  sx={{
                    color: "rgba(128, 96, 68, 1)",
                  }}
                >
                  {selectedOrder.delivery.courier}
                </Typography>
              ) : (
                <Typography
                  onClick={() =>
                    copyToClipboard(selectedOrder.delivery.courier.phone)
                  }
                  sx={{
                    marginTop: "10px",
                    color: "rgba(128, 96, 68, 1)",
                  }}
                >
                  {selectedOrder.delivery.courier.name}{" "}
                  {selectedOrder.delivery.courier.lastname} -{" "}
                  {selectedOrder.delivery.courier.phone}
                </Typography>
              )}
            </>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            sx={{
              mt: 2,
              borderColor: "rgba(128, 96, 68, 1)",
              color: "rgba(128, 96, 68, 1)",
              backgroundColor: "inherit",
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Phone number copied to clipboard!"
        autoHideDuration={3000}
      />
    </div>
  );
};

export default OrdersTable;
