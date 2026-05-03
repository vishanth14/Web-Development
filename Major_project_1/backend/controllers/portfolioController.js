import Portfolio from "../models/Portfolio.js";

export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: portfolio
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio"
    });
  }
};

export const createPortfolio = async (req, res) => {
  try {
    const { title, description, imageUrl, kpi, category } = req.body;

    const portfolio = await Portfolio.create({
      title,
      description,
      imageUrl,
      kpi,
      category
    });

    res.status(201).json({
      success: true,
      data: portfolio
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to create portfolio item"
    });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, kpi, category } = req.body;

    const portfolio = await Portfolio.findByIdAndUpdate(
      id,
      { title, description, imageUrl, kpi, category },
      { new: true }
    );

    res.json({
      success: true,
      data: portfolio
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update portfolio item"
    });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    await Portfolio.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Portfolio item deleted successfully"
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete portfolio item"
    });
  }
};