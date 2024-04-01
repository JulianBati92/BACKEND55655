const orderService = require('../services/orderService');

class OrderController {
  async createOrder(req, res) {
    try {
      // Lógica para crear una nueva orden
      const order = await orderService.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      // Lógica para actualizar una orden existente
      const updatedOrder = await orderService.update(req.params.id, req.body);
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      // Lógica para eliminar una orden existente
      await orderService.delete(req.params.id);
      res.json({ message: 'Orden eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrder(req, res) {
    try {
      // Lógica para obtener una orden por su ID
      const order = await orderService.getById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      // Lógica para obtener todas las órdenes
      const orders = await orderService.getAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();
