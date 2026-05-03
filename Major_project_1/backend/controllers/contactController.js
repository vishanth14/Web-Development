import Contact from "../models/Contact.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: contacts
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts"
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await Contact.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Contact deleted successfully"
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete contact"
    });
  }
};

export const submitContact = async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      company,
      message
    });

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form"
    });
  }
};