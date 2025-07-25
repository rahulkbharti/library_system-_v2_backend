import StudentModel from "../../models/users/student.models.js";

const StudentController = {
  add: async (req, res) => {
    const data = req.body;
    const result = await StudentModel.create(data);
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    return res
      .status(201)
      .json({ message: "Student added successfully", student: result });
  },
  view: async (req, res) => {
    const student_id = req.query.id;
    if (!req.organization_ids || req.organization_ids.length === 0) {
      return res.status(400).json({ error: "No Organization Found" });
    }
    const result = await StudentModel.view(student_id, req.organization_ids);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "No Student found" });
    }
    if (student_id) return res.status(200).json({ ...result[0] });
    return res.status(200).json({ students: result });
  },
  update: async (req, res) => {
    const staffData = req.body;
    if (!staffData.user_id) {
      return res.status(400).json({ error: "Student ID is required for update" });
    }
    const result = await StudentModel.update(staffData);
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    return res
      .status(200)
      .json({ message: "Student updated successfully", student: result });
  },
  delete: async (req, res) => {
    const user_id = req.query.id;
    //  console.log("Book ID to delete:", user_id);
    const result = await StudentModel.delete(user_id);
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    return res.status(200).json({ message: "Student deleted successfully", user_id });
  }
};

export default StudentController;
