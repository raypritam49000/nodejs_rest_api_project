const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce Rest Api',
            version: '1.0.0',
            description: 'Ecommerce Rest Api',
            contact: {
                name: 'Pritam Ray',
                email: 'raypritam49000@gmail.com',
                url: 'https://ultivic.com/'
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        servers: [
            {
                url: 'http://localhost:9999',
                description: 'Development Server'
            }
        ]
    },
    apis: ['./routes/*.js']
}

module.exports = options;