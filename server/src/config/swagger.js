const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BarBerShop API",
            version: "1.0.0",
            description: "API được phát triển bởi nhóm 5:\n- Bùi Trung Hiếu - HE173123 (Founder BaberShop)\n- Phạm Duy Kien - HE170155\n- Đậu Đình Hiếu - HE176719\n- Nguyễn Quốc Trung - HE172578\n- Nguyễn Trung Nghĩa - HE170569",
        },
        servers: [
            {
                url: "http://localhost:9999",
            },
        ],
    },
    // apis: ["../routes/accountRoute"],
    // apis: ["./routes/*.js"],
    apis: ["./src/routes/*.js"],


};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
