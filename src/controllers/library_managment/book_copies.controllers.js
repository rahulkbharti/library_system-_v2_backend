import BookCopyModel from "../../models/library_management/book_copy.models.js";

const BookCopyController = {
  add: async (req, res) => {
    const bookData = req.body;
    const result = await BookCopyModel.create(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Book Copy added successfully", book: result });
  },
  view: async (req, res) => {
    const bookId = req.query.id;
    if (!req.organization_ids || req.organization_ids.length === 0) {
      return res.status(400).json({ error: "No Organization Found" });
    }
    const result = await BookCopyModel.view(bookId, req.organization_ids);
    if (result.error) {
      return res.status(404).json({ error: result.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ mess: "No book copy found" });
    }
    if (bookId) return res.status(200).json({ ...result[0] });
    return res.status(200).json({ books: result });
  },
  update: async (req, res) => {
    const bookData = req.body;
    if (!bookData.copy_id) {
      return res.status(400).json({ error: "Book Copy ID is required for update" });
    }
    const result = await BookCopyModel.update(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book Copy ID not found" });
    }
    return res
      .status(200)
      .json({ message: "Book Copy updated successfully", book: result });
  },
  delete: async (req, res) => {
    const copy_id = req.query.id;
    //  console.log("Book ID to delete:", copy_id);
    const result = await BookCopyModel.delete(copy_id);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book Copy not found" });
    }
    return res.status(200).json({ message: "Book Copy deleted successfully", copy_id });
  }
};

export default BookCopyController;
