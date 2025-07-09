import BooksModel from "../../models/library_management/book.models.js";

const BookControllers = {
  add: async (req, res) => {
    const bookData = req.body;
    const result = await BooksModel.create(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    return res.status(201).json({ message: "Book added successfully", book: result });
  },
};

export default BookControllers;
