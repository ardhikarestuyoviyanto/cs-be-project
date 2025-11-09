import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ERP BE API',
            version: '1.0.0',
            description: 'Auto-generated API documentation',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
            },
        ],
    },
    // files containing annotations as above
    apis: ['./src/routes/*.ts', './src/controllers/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
