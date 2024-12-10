import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Modal,
  Fade,
  TextField,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteEvent,
  fetchEvents as fetchEventsApi,
  updateEvent,
} from "../../../api/eventApi/eventApi";
import "./clientEvent.css";

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const clientid = localStorage.getItem("id");

  const fetchEvents = useCallback(async () => {
    try {
      const eventsData = await fetchEventsApi(clientid);
      const currentDate = new Date();
      const upcomingEvents = eventsData.filter(
        (event) => new Date(event.date) >= currentDate
      );
      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, [clientid]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  const openConfirmDelete = (event) => {
    setSelectedEvent(event);
    setConfirmDeleteOpen(true);
  };

  const closeConfirmDelete = () => {
    setSelectedEvent(null);
    setConfirmDeleteOpen(false);
  };

  const handleEdit = async () => {
    const currentDate = new Date();
    const eventDate = new Date(selectedEvent.date);
    const daysDifference = (eventDate - currentDate) / (1000 * 60 * 60 * 24);

    if (daysDifference < 3) {
      setSnackbarMessage(
        "Event cannot be edited within 3 days of its start date"
      );
      setSnackbarOpen(true);
      return;
    }

    await handleUpdateEvent(); // Вызов функции обновления
  };

  const handleUpdateEvent = async () => {
    try {
      await updateEvent(selectedEvent.id, selectedEvent);
      setSnackbarMessage("Event updated successfully");
      fetchEvents();
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.message || "Error updating event"
      );
    } finally {
      closeModal();
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    try {
      await deleteEvent(selectedEvent.id);
      setSnackbarMessage("Event deleted successfully");
      fetchEvents(); // Обновляем список событий
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.message || "Error deleting event"
      );
    } finally {
      closeConfirmDelete(); // Закрываем модальное окно подтверждения
      setSnackbarOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ color: "rgba(128, 96, 68, 1)", marginBottom: "40px" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "rgba(128, 96, 68, 1)",
                  textAlign: "center",
                  "@media (max-width: 500px)": {
                    fontSize: "12px",
                    padding: "1px",
                  },
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  color: "rgba(128, 96, 68, 1)",
                  textAlign: "center",
                  "@media (max-width: 500px)": {
                    fontSize: "12px",
                    padding: "1px",
                  },
                }}
              >
                Address
              </TableCell>
              <TableCell
                sx={{
                  color: "rgba(128, 96, 68, 1)",
                  textAlign: "center",
                  "@media (max-width: 500px)": {
                    fontSize: "12px",
                    padding: "1px",
                  },
                }}
              >
                Message
              </TableCell>
              <TableCell
                sx={{
                  color: "rgba(128, 96, 68, 1)",
                  textAlign: "center",
                  "@media (max-width: 500px)": {
                    fontSize: "12px",
                    padding: "1px",
                  },
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell
                  sx={{
                    color: "rgba(128, 96, 68, 1)",
                    textAlign: "center",
                    "@media (max-width: 500px)": {
                      fontSize: "12px",
                      padding: "1px",
                    },
                  }}
                >
                  {new Date(event.date).toLocaleDateString()}
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgba(128, 96, 68, 1)",
                    textAlign: "center",
                    "@media (max-width: 500px)": {
                      fontSize: "12px",
                      padding: "1px",
                    },
                  }}
                >
                  {event.address}
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgba(128, 96, 68, 1)",
                    textAlign: "center",
                    "@media (max-width: 500px)": {
                      fontSize: "12px",
                      padding: "1px",
                    },
                  }}
                >
                  {event.message}
                </TableCell>
                <TableCell align="center">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        className="eventClientButton"
                        onClick={() => openModal(event)}
                        style={{
                          alignSelf: "center",
                          marginRight: 4,
                        }}
                      >
                        Edit
                      </p>
                      <IconButton
                        onClick={() => openModal(event)}
                        sx={{
                          color: "rgba(128, 96, 68, 1)",
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        className="eventClientButton"
                        onClick={() => openConfirmDelete(event)}
                        style={{ alignSelf: "center", marginRight: 4 }}
                      >
                        Delete
                      </p>
                      <IconButton
                        onClick={() => openConfirmDelete(event)}
                        sx={{ color: "rgba(128, 96, 68, 1)" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

      {/* Edit Event Modal */}
      <Modal open={modalOpen} onClose={closeModal} closeAfterTransition>
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
            {selectedEvent && (
              <>
                <Typography variant="h6" gutterBottom>
                  Edit Event
                </Typography>
                <TextField
                  label="Date"
                  type="date"
                  name="date"
                  value={selectedEvent.date.split("T")[0]}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{ min: new Date().toISOString().split("T")[0] }}
                />
                <TextField
                  label="Address"
                  name="address"
                  value={selectedEvent.address}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={selectedEvent.message}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  sx={{ mt: 2, backgroundColor: "rgba(128, 96, 68, 1)" }}
                >
                  Save
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        open={confirmDeleteOpen}
        onClose={closeConfirmDelete}
        closeAfterTransition
      >
        <Fade in={confirmDeleteOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 280,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
              Are you sure you want to delete this event?
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="outlined"
                onClick={closeConfirmDelete}
                sx={{
                  color: "rgba(128, 96, 68, 1)",
                  borderColor: "rgba(128, 96, 68, 1)",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ backgroundColor: "rgba(128, 96, 68, 1)" }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        autoHideDuration={6000}
      />
    </Box>
  );
};

export default EventManager;
