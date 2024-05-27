import path from "path";
console.log("Current directory:", __dirname); // Verifica la ruta actual

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Tu Matteoli",
      description: "Documentation of API"
    },
  },
  apis: [path.resolve(__dirname, "../../docs/*.yaml")] 
};

console.log("Swagger options:", swaggerOptions); // Verifica las opciones de Swagger

export default swaggerOptions;
