import Testimonial from "../models/Testimonial.js";

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: testimonials
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials"
    });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, company, message, rating } = req.body;

    const testimonial = await Testimonial.create({
      name,
      company,
      message,
      rating
    });

    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to create testimonial"
    });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company, message, rating } = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, company, message, rating },
      { new: true }
    );

    res.json({
      success: true,
      data: testimonial
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update testimonial"
    });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    await Testimonial.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Testimonial deleted successfully"
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial"
    });
  }
};