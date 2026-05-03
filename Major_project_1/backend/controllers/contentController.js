import Portfolio from "../models/Portfolio.js";
import Testimonial from "../models/Testimonial.js";
import FAQ from "../models/FAQ.js";

export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    res.json({ success: true, data: portfolio });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch portfolio" });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
  }
};

export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.json({ success: true, data: faqs });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch FAQs" });
  }
};