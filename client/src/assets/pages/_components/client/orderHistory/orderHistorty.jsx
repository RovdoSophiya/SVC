import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  IconButton,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DetailsIcon from "@mui/icons-material/Info";
import axios from "axios";
import * as XLSX from "xlsx";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [sortBy, setSortBy] = useState("orderdate");
  const [order, setOrder] = useState("ASC");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const clientid = localStorage.getItem("id");

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage, sortBy, order]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders", {
        params: {
          clientid,
          page: page + 1,
          limit: rowsPerPage,
          sortBy,
          order,
        },
      });
      setOrders(response.data.orders);
      setTotalOrders(response.data.total);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (newSortBy) => {
    const newOrder = sortBy === newSortBy && order === "ASC" ? "DESC" : "ASC";
    setSortBy(newSortBy);
    setOrder(newOrder);
    fetchOrders(); // Fetch orders after sorting
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const downloadExcel = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders", {
        params: { clientid },
      });
      const ordersData = response.data.orders.map((order) => ({
        Date: new Date(order.orderdate).toLocaleDateString(),
        "Total Amount": `${order.totalamount.toFixed(2)} $`,
        "Delivery Status": order.Delivery?.status || "Pending",
        "Courier Info": order.Delivery?.Courier
          ? `${order.Delivery.Courier.name} ${order.Delivery.Courier.lastname} (${order.Delivery.Courier.phone})`
          : "Not Assigned",
      }));
      const worksheet = XLSX.utils.json_to_sheet(ordersData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Order History");
      XLSX.writeFile(workbook, "OrderHistory.xlsx");
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        onClick={downloadExcel}
      >
        Download Excel
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("orderdate")}>
                Date
              </TableCell>
              <TableCell onClick={() => handleSort("totalamount")}>
                Total Amount
              </TableCell>
              <TableCell>Delivery Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {new Date(order.orderdate).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.totalamount} $</TableCell>
                <TableCell>{order.Delivery?.status || "Pending"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openModal(order)}>
                    <DetailsIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[7, 14, 21]}
        component="div"
        count={totalOrders}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={modalOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
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
            }}
          >
            {selectedOrder && (
              <>
                <Typography variant="h6" gutterBottom>
                  Order Details
                </Typography>
                <Typography>
                  <strong>Courier:</strong>{" "}
                  {selectedOrder.Delivery?.Courier
                    ? `${selectedOrder.Delivery.Courier.name} ${selectedOrder.Delivery.Courier.lastname} (${selectedOrder.Delivery.Courier.phone})`
                    : "Not Assigned"}
                </Typography>
                <Typography>
                  <strong>Dishes:</strong>
                </Typography>
                <ul>
                  {selectedOrder.OrderedDishes.map((dish) => (
                    <li key={dish.id}>
                      {dish.name} - {dish.quantity} pcs
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default OrderHistory;
