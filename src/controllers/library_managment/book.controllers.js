import BooksModel from "../../models/library_management/book.models.js";

const BookControllers = {
  add: async (req, res) => {
    const bookData = req.body;
    const result = await BooksModel.create(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Book added successfully", book: result });
  },
  view: async (req, res) => {
    const bookId = req.query.id;
    if (!req.organization_ids || req.organization_ids.length === 0) {
      return res.status(400).json({ error: "No Organization Found" });
    }
    const result = await BooksModel.view(bookId, req.organization_ids);
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
    if (!bookData.book_id) {
      return res.status(400).json({ error: "Book ID is required for update" });
    }
    const result = await BooksModel.update(bookData);
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
    const book_id = req.query.id;
    console.log("Book ID to delete:", book_id);
    const result = await BooksModel.delete(book_id);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully", book_id });
  }
};

export default BookControllers;
