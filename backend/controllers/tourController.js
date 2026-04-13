import mongoose from "mongoose";
import Tour from "../models/Tour.js";

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    console.error("Get Tours Error:", err);
    res.status(500).json({ error: "Failed to fetch tours" });
  }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
export const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    let tour = null;
    
    // Try finding by custom id string first
    tour = await Tour.findOne({ id: id });
    
    // If not found and id is a valid MongoDB ObjectId, try finding by _id
    if (!tour && mongoose.Types.ObjectId.isValid(id)) {
      tour = await Tour.findById(id);
    }
    
    if (!tour) return res.status(404).json({ error: "Tour not found" });
    res.json(tour);
  } catch (err) {
    console.error("Get Tour By ID Error:", err);
    res.status(500).json({ error: "Failed to fetch tour" });
  }
};

// @desc    Create a tour
// @route   POST /api/tours
// @access  Private/Admin
export const createTour = async (req, res) => {
  try {
    const tour = new Tour(req.body);
    const createdTour = await tour.save();
    res.status(201).json(createdTour);
  } catch (err) {
    res.status(400).json({ error: "Invalid tour data" });
  }
};
