
import AdminModel from "../models/admin.models.js";

const AdminControllers = {
    // Example method for handling admin registration
    register: async (req, res) => {
        const responce = await AdminModel.create(req.body);
        // console.log("Admin Registration Accessed", responce);
        // AdminModel.create(req.body).then(d=>console.log(d)).catch(e=> console.error("Error in Admin Registration:", e));
        res.status(200).json({ ...responce});
    },
    // Login
    login : (req, res) => {
        console.log("Admin Login Accessed", req.body);
        res.status(200).json({ message: "Welcome to the Admin Login!" });
    },
    view : async (req, res) => {
        const userId = req.query.id;
        const admins = await AdminModel.getAll(userId);
        if(!admins){
            return res.status(404).json({message:`No Admins with User ID ${userId}`});
        }
        res.status(200).json({...admins});
    },
    update: async(req,res)=>{
        const responce =  await AdminModel.update(req.body);
        res.status(200).json({message:"update successfully"});
    },
    delete : async (req,res)=>{
        // console.log(req.query)
        const responce =  await AdminModel.delete(req.query.id);
        res.status(200).json({message : responce.affectedRows? "deleted Successfully" : "No user Found"});
    }
}

export default AdminControllers;