import FAQ from "../models/FAQ.js";

export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: faqs
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch FAQs"
    });
  }
};

export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const faq = await FAQ.create({
      question,
      answer
    });

    res.status(201).json({
      success: true,
      data: faq
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to create FAQ"
    });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const faq = await FAQ.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );

    res.json({
      success: true,
      data: faq
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update FAQ"
    });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    await FAQ.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "FAQ deleted successfully"
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete FAQ"
    });
  }
};