const errors = {
    error: { message: "Error", statusCode: 400 },
    auth: { message: "Bad auth", statusCode: 401 },
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "Not found", statusCode: 404 },
    fatal: { message: "Fatal", statusCode: 500 },
    validationError: { message: "Validation error", statusCode: 422 },
    internalServerError: { message: "Internal server error", statusCode: 500 },
   };
   
   export default errors;