import SeatsReservations from "../../models/library_management/seats_reservations.models.js";

const SeatReservationController = {
  add: async (req, res) => {
    const bookData = req.body;
    const result = await SeatsReservations.create(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({
        message: "Seat Reservation added successfully",
        reservation: result,
      });
  },
  view: async (req, res) => {
    const bookId = req.query.id;
    if (!req.organization_ids || req.organization_ids.length === 0) {
      return res.status(400).json({ error: "No Organization Found" });
    }
    const result = await SeatsReservations.view(bookId, req.organization_ids);
    if (result.error) {
      return res.status(404).json({ error: result.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ mess: "No Seat Reservation found" });
    }
    if (bookId) return res.status(200).json({ ...result[0] });
    return res.status(200).json({ reservations: result });
  },
  update: async (req, res) => {
    const bookData = req.body;
    if (!bookData.reservation_id) {
      return res
        .status(400)
        .json({ error: "Seat Reservation ID is required for update" });
    }
    const result = await SeatsReservations.update(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Seat Reservation not found" });
    }
    return res
      .status(200)
      .json({
        message: "Seat Reservation updated successfully",
        reservation: result,
      });
  },
  delete: async (req, res) => {
    const reservation_id = req.query.id;
    //  console.log("Book ID to delete:", reservation_id);
    const result = await SeatsReservations.delete(reservation_id);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Seat Reservation not found" });
    }
    return res
      .status(200)
      .json({
        message: "Seat Reservation deleted successfully",
        reservation_id,
      });
  },
};

export default SeatReservationController;
