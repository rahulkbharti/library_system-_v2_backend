import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js"
import libraryMangement from "./routes/library_mangment.routes.js";

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
app.use('/auth',authRouter);
app.use('/library-management', libraryMangement);

export default app;