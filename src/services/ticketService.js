import TicketModel from '../models/ticket.model.js';

export const createTicket = async (ticketData) => {
  try {
    return await TicketModel.create(ticketData);
  } catch (error) {
    throw new Error('Error creating ticket');
  }
};

export const calculateTotal = async (userId) => {
  try {
    const tickets = await TicketModel.find({ userId });
    let total = 0;
    tickets.forEach(ticket => {
      total += ticket.amount;
    });
    return total;
  } catch (error) {
    throw new Error('Error calculating total');
  }
};

export const getTicketById = async (ticketId) => {
  try {
    return await TicketModel.findById(ticketId);
  } catch (error) {
    throw new Error('Error fetching ticket');
  }
};

export const updateTicket = async (ticketId, updateData) => {
  try {
    return await TicketModel.findByIdAndUpdate(ticketId, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating ticket');
  }
};

export const deleteTicket = async (ticketId) => {
  try {
    return await TicketModel.findByIdAndDelete(ticketId);
  } catch (error) {
    throw new Error('Error deleting ticket');
  }
};

export const getAllTickets = async () => {
  try {
    return await TicketModel.find({});
  } catch (error) {
    throw new Error('Error fetching all tickets');
  }
};
