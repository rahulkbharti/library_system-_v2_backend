import GroupModel from "../../models/roles_persmissions/groups.models.js";

const GroupController = {
  add: async (req, res) => {
    const data = req.body;
    const result = await GroupModel.create(data);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Group added successfully", group: result });
  },
  view: async (req, res) => {
    const bookId = req.query.id;
   
    const result = await GroupModel.view(bookId,req.organization_ids);
    if (result.error) {
      return res.status(404).json({ error: result.message });
    }
    if(result.length === 0) {
      return res.status(404).json({ mess: "No Group found" });
    }
    if(bookId) return res.status(200).json({...result[0] });
    return res.status(200).json({ groups: result});
  },
  update: async (req, res) => {
    const data = req.body;
    if (!data.id) {
      return res.status(400).json({ error: "Group ID is required for update" });
    }
    const result = await GroupModel.update(data);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if(result.affectedRows === 0){
        return res.status(404).json({ error: "Group not found" });
    }
    return res
      .status(200)
      .json({ message: "Group updated successfully", book: result });
  },
  delete: async (req,res)=>{
     const id = req.query.id;
    //  console.log("Book ID to delete:", id);
     const result = await GroupModel.delete(id);
     if(result.error) {
       return res.status(500).json({ error: result.message });
     }
     if(result.affectedRows === 0) {
       return res.status(404).json({ error: "Group not found" });
     }
     return res.status(200).json({ message: "Group deleted successfully", id });
  }
};

export default GroupController;
