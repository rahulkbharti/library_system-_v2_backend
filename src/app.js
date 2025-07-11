import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js"
import libraryMangement from "./routes/library_mangment.routes.js";
import organizationsRouter from "./routes/organizations.routes.js";
import rolesPermissionsRouter from "./routes/roles_permissions.routes.js";
import feesPaymentRouter from "./routes/fees_payments.routes.js";
import UserRouter from "./routes/uers.routes.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Welcome API
app.get("/", (req, res) => {
    res.status(200).json({message:"Welcome to the Library System API_V2!"});
});
// Actual Api Start here 
app.use('/auth',authRouter);
app.use('/library-management', libraryMangement);
app.use('/organizations', organizationsRouter);
app.use('/roles', rolesPermissionsRouter);
app.use("/fees", feesPaymentRouter);
app.use("/users",UserRouter);

export default app;