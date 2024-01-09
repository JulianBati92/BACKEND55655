const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ statusCode: 500, response: 'Internal Server Error' });
  };
  
  module.exports = errorHandler;
  