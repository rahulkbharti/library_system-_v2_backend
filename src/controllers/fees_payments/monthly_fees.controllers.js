import MonthlyFeesModel from "../../models/fees_payments/monthly_fees.models.js";

const BookControllers = {
  add: async (req, res) => {
    const bookData = req.body;
    const result = await MonthlyFeesModel.create(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Book added successfully", book: result });
  },
  view: async (req, res) => {
    const bookId = req.query.id;

    const result = await MonthlyFeesModel.view(bookId, req.organization_id);
    if (result.error) {
      return res.status(404).json({ error: result.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ mess: "No books found" });
    }
    if (bookId) return res.status(200).json({ ...result[0] });
    return res.status(200).json({ books: result });
  },
  update: async (req, res) => {
    const bookData = req.body;
    if (!bookData.fee_id) {
      return res.status(400).json({ error: "Book ID is required for update" });
    }
    const result = await MonthlyFeesModel.update(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res
      .status(200)
      .json({ message: "Book updated successfully", book: result });
  },
  delete: async (req, res) => {
    const fee_id = req.query.id;
    console.log("Book ID to delete:", fee_id);
    const result = await MonthlyFeesModel.delete(fee_id);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res
      .status(200)
      .json({ message: "Book deleted successfully", fee_id });
  },
};

export default BookControllers;
