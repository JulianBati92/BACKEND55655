const pathNotFoundHandler = (req, res) => {
    res.status(404).json({ statusCode: 404, response: 'Not Found' });
  };
  
  module.exports = pathNotFoundHandler;