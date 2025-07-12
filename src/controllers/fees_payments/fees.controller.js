import FeeModel from "../../models/fees_payments/fees.models.js";

const FeesController = {
  add: async (req, res) => {
    const data = req.body;
    const result = await FeeModel.create(data);
    if (result.error) {
      // console.error("Error creating fee:", result);
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Fee added successfully", fees: result });
  },
  view: async (req, res) => {
    const bookId = req.query.id;

    const result = await FeeModel.view(bookId, req.organization_id);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    if (result.length === 0) {
      return res.status(404).json({ mess: "No fee found" });
    }
    if (bookId) return res.status(200).json({ ...result[0] });
    return res.status(200).json({ fees: result });
  },
  update: async (req, res) => {
    const data = req.body;
    if (!data.fee_id) {
      return res.status(400).json({ error: "Fee ID is required for update" });
    }
    const result = await FeeModel.update(data);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Fee not found" });
    }
    return res
      .status(200)
      .json({ message: "Fee updated successfully", book: result });
  },
  delete: async (req, res) => {
    const fee_id = req.query.id;
    // console.log("Book ID to delete:", fee_id);
    const result = await FeeModel.delete(fee_id);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Fee not found" });
    }
    return res
      .status(200)
      .json({ message: "Fee deleted successfully", fee_id });
  },
};

export default FeesController;
