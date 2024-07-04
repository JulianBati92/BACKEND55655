import Ticket from '../models/ticket.model.js';

export const calculateTotal = async (req, res) => {
  try {
    const userId = req.user._id;
    const tickets = await Ticket.find({ userId });
    const total = tickets.reduce((acc, ticket) => acc + ticket.price, 0);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
