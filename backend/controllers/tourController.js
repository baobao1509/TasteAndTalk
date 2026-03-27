import mongoose from "mongoose";
import Tour from "../models/Tour.js";

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
export const getTours = async (req, res) => {
  try {
    // Check if MongoDB is connected or if URI exists
    if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 1) {
      return res.json([
        {
          id: "ultimate-street-food",
          title: "The Ultimate Street Food Adventure (Demo Mode)",
          price: "$39",
          duration: "4 Hours",
          groupSize: "Max 6",
          heroImage: "https://picsum.photos/seed/food-hero/1200/600",
          rating: 4.9,
          description: "Our most popular tour! Dive deep into the heart of Saigon's culinary scene. We'll take you to the places that don't have menus in English, where the recipes have been passed down for generations. You'll learn about the history of the dishes and the people who make them.",
          foodItems: ["Bánh Mì Huỳnh Hoa", "Bún Chả Hà Nội", "Cơm Tấm Ba Ghiền", "Bánh Xèo", "Chè Thái"],
          included: [
            "All food and drinks mentioned in the itinerary",
            "English-speaking local guide",
            "Hotel pick-up and drop-off (District 1)",
            "Accident insurance",
            "Raincoat (if needed)"
          ],
          notIncluded: [
            "Personal expenses",
            "Tips for the guide (optional but appreciated)",
            "Pick-up outside District 1 (extra charge applies)"
          ],
          policy: [
            "Free cancellation up to 24 hours before the tour starts.",
            "Cancellations within 24 hours are non-refundable.",
            "In case of heavy rain, we can reschedule or offer a full refund."
          ],
          notes: [
            "Please inform us of any food allergies or dietary restrictions when booking.",
            "Wear comfortable shoes and light clothing.",
            "Bring your camera to capture the vibrant street life!"
          ],
          itinerary: [
            { time: "17:30", activity: "Pick up from your hotel in District 1" },
            { time: "18:00", activity: "First stop: Famous Bánh Mì stall with 30 years of history" },
            { time: "18:45", activity: "District 4: Exploring the seafood paradise" },
            { time: "19:30", activity: "District 10: Hidden flower market and local snacks" },
            { time: "20:30", activity: "Dessert time: Traditional Vietnamese sweet soup" },
            { time: "21:30", activity: "Drop off back at your hotel" }
          ],
          stops: [
            { name: "Local Market", image: "https://picsum.photos/seed/stop1/600/400", desc: "Vibrant colors and fresh ingredients." },
            { name: "Hidden Alley", image: "https://picsum.photos/seed/stop2/600/400", desc: "Where the real magic happens." },
            { name: "District 4 Seafood", image: "https://picsum.photos/seed/stop3/600/400", desc: "The best snails and shellfish in town." }
          ]
        }
      ]);
    }

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
    const tour = await Tour.findOne({ id: req.params.id });
    if (!tour) return res.status(404).json({ error: "Tour not found" });
    res.json(tour);
  } catch (err) {
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
