import GroupPermissionsModel from "../../models/roles_persmissions/groups_permissions.models.js";

const PermissionGroupController = {
  add: async (req, res) => {
    const data = req.body;
    const result = await GroupPermissionsModel.create(data);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Group Permission added successfully", groups_persmisions: result });
  },
  view: async (req, res) => {
    const bookId = req.query.id;
   
    const result = await GroupPermissionsModel.view(bookId,req.organization_id);
    if (result.error) {
      return res.status(404).json({ error: result.message });
    }
    if(result.length === 0) {
      return res.status(404).json({ message: "No Group Permission found" });
    }
    // if(bookId) return res.status(200).json({...result[0] });
    return res.status(200).json({ groups: result});
  },
  update: async (req, res) => {
    const data = req.body;
    if (!data.group_id) {
      return res.status(400).json({ error: "Group Permission ID is required for update" });
    }
    const result = await GroupPermissionsModel.update(data);

    if (result.error) {
      // console.error("Error updating group permissions:", result.error);
      return res.status(403).json({ error: result.error });
    }
    if(result.affectedRows === 0){
        return res.status(404).json({ error: "Group Permission not found" });
    }
    return res
      .status(200)
      .json({ message: "GrouGroup Permission updated successfully", book: result });
  },
  delete: async (req,res)=>{
     const group_id = req.query.id;
    //  console.log("Book ID to delete:", id);
     const result = await GroupPermissionsModel.delete(group_id);
     if(result.error) {
       return res.status(500).json({ error: result.message });
     }
     if(result.affectedRows === 0) {
       return res.status(404).json({ error: "Group Permission not found" });
     }
     return res.status(200).json({ message: "Group Permission deleted successfully", group_id });
  }
};

export default PermissionGroupController;
