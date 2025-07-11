import StaffModel from "../../models/users/staffs.models.js"

const StaffController = {
  add: async (req, res) => {
    const data = req.body;
    const result = await StaffModel.create(data);
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    return res
      .status(201)
      .json({ message: "Staff added successfully", staff: result });
  },
  view: async (req, res) => {
    const staff_id = req.query.id;
   
    const result = await StaffModel.view(staff_id);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    if(result.length === 0) {
      return res.status(404).json({ message: "No Staff found" });
    }
    if(staff_id) return res.status(200).json({...result[0] });
    return res.status(200).json({ staffs: result});
  },
  update: async (req, res) => {
    const staffData = req.body;
    if (!staffData.user_id) {
      return res.status(400).json({ error: "Staff ID is required for update" });
    }
    const result = await StaffModel.update(staffData);
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    if(result.affectedRows === 0){
        return res.status(404).json({ error: "Staff not found" });
    }
    return res
      .status(200)
      .json({ message: "Staff updated successfully", book: result });
  },
  delete: async (req,res)=>{
     const user_id = req.query.id;
    //  console.log("Book ID to delete:", user_id);
     const result = await StaffModel.delete(user_id);
     if(result.error) {
       return res.status(500).json({ error: result.error });
     }
     if(result.affectedRows === 0) {
       return res.status(404).json({ error: "Staff not found" });
     }
     return res.status(200).json({ message: "Staff deleted successfully", user_id });
  }
};

export default StaffController;
