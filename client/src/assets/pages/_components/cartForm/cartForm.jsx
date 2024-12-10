import React, { useEffect, useState, useCallback } from "react";
import {
  fetchCartItems,
  increaseCartCount,
  decreaseCartCount,
  deleteFromCart,
  orderCart,
} from "../../../api/cartApi/cartApi";
import { getDishPhotoUrl } from "../../../api/dishApi/dishApi";
import "./cartForm.css";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const clientid = localStorage.getItem("id");

  const loadCartItems = useCallback(async () => {
    const items = await fetchCartItems(clientid);
    setCartItems(items);
    calculateTotal(items);
  }, [clientid]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(total);
  };

  const increaseCount = async (dishid) => {
    await increaseCartCount(clientid, dishid);
    loadCartItems();
  };

  const decreaseCount = async (dishid) => {
    const item = cartItems.find((item) => item.dishid === dishid);
    if (item.count > 1) {
      await decreaseCartCount(clientid, dishid);
      loadCartItems();
    }
  };

  const handleRemoveItemClick = (dishid) => {
    setItemToRemove(dishid);
    console.log(dishid);
    setOpenDialog(true);
  };

  const removeItem = async () => {
    await deleteFromCart(clientid, itemToRemove);
    loadCartItems();
    setOpenDialog(false);
    setItemToRemove(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToRemove(null);
  };

  useEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  const handleCheckout = () => {
    setOpenCheckoutDialog(true);
  };

  const confirmOrder = async () => {
    try {
      await orderCart(clientid);
      setOrderMessage("The order was placed successfully!");
      loadCartItems();
    } catch (error) {
      setOrderMessage("Error when placing an order. Try again.");
    } finally {
      setOpenCheckoutDialog(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOrderMessage("");
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p className="emptyCart">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cartFormContainer">
            <IconButton
              onClick={() => handleRemoveItemClick(item.dishid)}
              sx={{ color: "rgba(128, 96, 68, 1)" }}
            >
              <DeleteIcon sx={{ width: "36px", height: "36px" }} />
            </IconButton>
            <div className="cartContainer">
              <img
                src={getDishPhotoUrl(item.dish.photo)}
                alt={item.dish.name}
              />
              <h3>{item.dish.name}</h3>
              <div className="countCartContainer">
                <button onClick={() => increaseCount(item.dishid)}>+</button>
                <p>{item.count}</p>
                <button
                  onClick={() => decreaseCount(item.dishid)}
                  disabled={item.count <= 1}
                >
                  -
                </button>
              </div>
              <p>{item.price} $</p>
            </div>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <div className="orderCont">
          <h3>All: {total} $</h3>
          <button onClick={handleCheckout}>Place an order</button>
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

      {/* Модальное окно подтверждения заказа */}
      <Dialog
        open={openCheckoutDialog}
        onClose={() => setOpenCheckoutDialog(false)}
      >
        <DialogTitle
          sx={{ color: "rgba(128, 96, 68, 1)", textAlign: "center" }}
        >
          Confirm Order
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: "rgba(128, 96, 68, 1)", textAlign: "center" }}
          >
            Are you sure you want to place the order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenCheckoutDialog(false)}
            color="primary"
            sx={{ color: "rgba(128, 96, 68, 1)" }}
          >
            No
          </Button>
          <Button
            onClick={confirmOrder}
            color="primary"
            sx={{ color: "rgba(128, 96, 68, 1)" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Модальное окно подтверждения удаления */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{ color: "rgba(128, 96, 68, 1)", textAlign: "center" }}
        >
          Deletion confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: "rgba(128, 96, 68, 1)", textAlign: "center" }}
          >
            Are you sure you want to remove this item from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            sx={{ color: "rgba(128, 96, 68, 1)" }}
          >
            No
          </Button>
          <Button
            onClick={removeItem}
            color="primary"
            sx={{ color: "rgba(128, 96, 68, 1)" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar для уведомления о заказе */}
      <Snackbar
        open={!!orderMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={orderMessage}
      />
    </div>
  );
};

export default Cart;
