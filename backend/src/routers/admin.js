import express from "express";
import controller from "../controllers/AdminController";

const router = express.Router();

router.get("/getAllUser", controller.getAllUser);
router.get("/getAllTags", controller.getAllTags);

export default router;
