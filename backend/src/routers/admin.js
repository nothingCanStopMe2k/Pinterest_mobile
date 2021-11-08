import express from "express";
import controller from "../controllers/AdminController";

const router = express.Router();

router.get("/getAllUser", controller.getAllUser);

export default router;
