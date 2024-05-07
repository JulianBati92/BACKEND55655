import { TicketService } from "../services/ticketService.js";
import { CustomError } from "../utils/errors/errors.js";

const ticketService = new TicketService();

class TicketController {
  async createTicket(req, res) {
    try {
      const { userId, amount } = req.body;

      // Verificar que se proporcionen los datos necesarios
      if (!userId || !amount) {
        throw new CustomError('Missing parameters', 400);
      }

      // Lógica para crear un ticket
      const ticket = await ticketService.createTicket(userId, amount);
      res.status(201).json(ticket);
    } catch (error) {
      // Manejo de errores
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async calculateTotal(req, res) {
    try {
      const userId = req.user._id;

      // Lógica para calcular el total a pagar
      const total = await ticketService.calculateTotal(userId);
      res.status(200).json({ total });
    } catch (error) {
      // Manejo de errores
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

export { TicketController };