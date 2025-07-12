import PaymentModel from "../../models/fees_payments/fee_payment.models.js";

const PaymentController = {
  add: async (req, res) => {
    const data = req.body;
    const result = await PaymentModel.create(data);
    if (result.error) {
      // console.error("Error creating fee:", result);
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Payment Recored successfully", payment: result });
  },
  view: async (req, res) => {
    const student_fee_id = req.query.id;

    const result = await PaymentModel.view(student_fee_id, req.organization_id);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    if (result.length === 0) {
      return res.status(404).json({ mess: "No Payment found" });
    }
    if (student_fee_id) return res.status(200).json({ ...result[0] });
    return res.status(200).json({ payments: result });
  },
  update: async (req, res) => {
    const data = req.body;
    if (!data.payment_id) {
      return res.status(400).json({ error: "Payement ID is required for update" });
    }
    const result = await PaymentModel.update(data);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Fee Payment found" });
    }
    return res
      .status(200)
      .json({ message: "Payment updated successfully ( VOiD)", book: result });
  },
  delete: async (req, res) => {
    const fee_id = req.query.id;
    // console.log("Book ID to delete:", fee_id);
    const result = await PaymentModel.delete(fee_id);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }
    return res
      .status(200)
      .json({ message: "Payement deleted successfully", fee_id });
  },
};

export default PaymentController;
