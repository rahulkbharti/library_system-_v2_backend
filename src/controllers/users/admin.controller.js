import AdminModel from "../../models/users/admin.models.js"

const AdminController = {
  add: async (req, res) => {
    const data = req.body;
    const result = await AdminModel.create(data);
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    return res
      .status(201)
      .json({ message: "Admin added successfully", admin: result });
  },
  view: async (req, res) => {
    const bookId = req.query.id;
   
    const result = await AdminModel.view(bookId);
    if (result.error) {
      return res.status(404).json({ error: result.message });
    }
    if(result.length === 0) {
      return res.status(404).json({ message: "No Admin found" });
    }
    if(bookId) return res.status(200).json({...result[0] });
    return res.status(200).json({ admins: result});
  },
  update: async (req, res) => {
    const adminData = req.body;
    if (!adminData.user_id) {
      return res.status(400).json({ error: "Admin ID is required for update" });
    }
    const result = await AdminModel.update(adminData);
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    if(result.affectedRows === 0){
        return res.status(404).json({ error: "Admin not found" });
    }
    return res
      .status(200)
      .json({ message: "Admin updated successfully", book: result });
  },
  delete: async (req,res)=>{
     const user_id = req.query.id;
    //  console.log("Book ID to delete:", user_id);
     const result = await AdminModel.delete(user_id);
     if(result.error) {
       return res.status(500).json({ error: result.error });
     }
     if(result.affectedRows === 0) {
       return res.status(404).json({ error: "Admin not found" });
     }
     return res.status(200).json({ message: "Admin deleted successfully", user_id });
  }
};

export default AdminController;
