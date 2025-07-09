import PermissionModel from "../../models/roles_persmissions/permissions.models.js";

const PermissionController = {
  add: async (req, res) => {
    const data = req.body;
    const result = await PermissionModel.create(data);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Permission added successfully", permissions: result });
  },
  view: async (req, res) => {
    const bookId = req.query.id;
   
    const result = await PermissionModel.view(bookId);
    if (result.error) {
      return res.status(404).json({ error: result.message });
    }
    if(result.length === 0) {
      return res.status(404).json({ mess: "No Permission found" });
    }
    if(bookId) return res.status(200).json({...result[0] });
    return res.status(200).json({ permissions: result});
  },
  update: async (req, res) => {
    const data = req.body;
    if (!data.id) {
      return res.status(400).json({ error: "Permission ID is required for update" });
    }
    const result = await PermissionModel.update(data);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if(result.affectedRows === 0){
        return res.status(404).json({ error: "Permission not found" });
    }
    return res
      .status(200)
      .json({ message: "Permission updated successfully", book: result });
  },
  delete: async (req,res)=>{
     const id = req.query.id;
    //  console.log("Book ID to delete:", id);
     const result = await PermissionModel.delete(id);
     if(result.error) {
       return res.status(500).json({ error: result.message });
     }
     if(result.affectedRows === 0) {
       return res.status(404).json({ error: "Permission not found" });
     }
     return res.status(200).json({ message: "Permission deleted successfully", id });
  }
};

export default PermissionController;
