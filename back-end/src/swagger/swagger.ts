import swaggerJsdoc from "swagger-jsdoc";

const options =
{
        definition:
        {
                openapi:"3.0.0",
                info:
                {
                    title:"Swagger Express API",
                    version:"1.0.0",
                    description:"A simple API"
                },
        },
        apis:['./routes/*.ts']
};

export const specs = swaggerJsdoc(options);
