import MemberFeeModel from "../../models/fees_payments/member_fees.js";

const MemberFreeController = {
  add: async (req, res) => {
    const data = req.body;
    const result = await MemberFeeModel.create(data);
    if (result.error) {
      // console.error("Error creating fee:", result);
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Member fee added successfully", fees: result });
  },
  view: async (req, res) => {
    const student_fee_id = req.query.id;

    const result = await MemberFeeModel.view(student_fee_id, req.organization_ids);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    if (result.length === 0) {
      return res.status(404).json({ mess: "No fee found" });
    }
    if (student_fee_id) return res.status(200).json({ ...result[0] });
    return res.status(200).json({ member_fees: result });
  },
  update: async (req, res) => {
    const data = req.body;
    if (!data.student_fee_id) {
      return res.status(400).json({ error: "member fee ID is required for update" });
    }
    const result = await MemberFeeModel.update(data);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "member fee not found" });
    }
    return res
      .status(200)
      .json({ message: "member fee updated successfully", book: result });
  },
  delete: async (req, res) => {
    const fee_id = req.query.id;
    // console.log("Book ID to delete:", fee_id);
    const result = await MemberFeeModel.delete(fee_id);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "member fee not found" });
    }
    return res
      .status(200)
      .json({ message: "member fee deleted successfully", fee_id });
  },
};

export default MemberFreeController;
