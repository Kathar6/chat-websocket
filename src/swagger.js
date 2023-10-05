import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Chat Websockets",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:8000",
    },
  ],
  components: {
    securitySchemes: {
      apiAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "chat_auth",
      },
    },
    schemas: {
      login: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      register: {
        type: "object",
        required: ["email", "password", "confirm-password"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
          "confirm-password": {
            type: "string",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const openApiSpecification = swaggerJSDoc(options);

const swaggerSetup = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification));

  console.log("docs available");
};

export default swaggerSetup;
