import express from "express";
import { getTours, getTourById, createTour } from "../controllers/tourController.js";

const router = express.Router();

router.get("/", getTours);
router.get("/:id", getTourById);
router.post("/", createTour);

export default router;
