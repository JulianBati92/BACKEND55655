import { Router } from "express";
import { TicketController } from "../controllers/ticketController.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const ticketRouter = Router();
const ticketController = new TicketController();

// Endpoint para crear un ticket
ticketRouter.post("/", ensureAuthenticated, ticketController.createTicket);

// Endpoint para obtener el total a pagar
ticketRouter.get("/", ensureAuthenticated, ticketController.calculateTotal);

export default ticketRouter;
