import SeatsModel from "../../models/library_management/seats.models.js";

const SeatController = {
  add: async (req, res) => {
    const bookData = req.body;
    const result = await SeatsModel.create(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Seat added successfully", seat: result });
  },
  view: async (req, res) => {
    const seat_id = req.query.id;

    const result = await SeatsModel.view(seat_id, req.organization_ids);
    if (result.error) {
      return res.status(404).json({ error: result.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ mess: "No Seat found" });
    }
    if (seat_id) return res.status(200).json({ ...result[0] });
    return res.status(200).json({ seats: result });
  },
  update: async (req, res) => {
    const bookData = req.body;
    if (!bookData.seat_id) {
      return res.status(400).json({ error: "Seat ID is required for update" });
    }
    const result = await SeatsModel.update(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Seat not found" });
    }
    return res
      .status(200)
      .json({ message: "Seat updated successfully", book: result });
  },
  delete: async (req, res) => {
    const seat_id = req.query.id;
    //  console.log("Seat ID to delete:", seat_id);
    const result = await SeatsModel.delete(seat_id);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Seat not found" });
    }
    return res
      .status(200)
      .json({ message: "Seat deleted successfully", seat_id });
  },
};

export default SeatController;
