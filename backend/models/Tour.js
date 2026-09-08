import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  groupSize: { type: String, required: true },
  heroImage: { type: String, required: true },
  rating: { type: Number, default: 4.9 },
  isCustom: { type: Boolean, default: false },
  description: { type: String, required: true },
  menuDescription: { type: String },
  menuImage1: { type: String },
  menuImage2: { type: String },
  foodItems: [{ type: String }],
  included: [{ type: String }],
  notIncluded: [{ type: String }],
  policy: [{ type: String }],
  notes: [{ type: String }],
  itinerary: [{
    time: { type: String, required: true },
    activity: { type: String, required: true },
    image: { type: String },
    desc: { type: String }
  }],
  stops: [{
    name: { type: String, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true }
  }]
}, { timestamps: true });

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
