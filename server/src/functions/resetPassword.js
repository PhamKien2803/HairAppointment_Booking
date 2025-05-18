const { app } = require('@azure/functions');
const bcrypt = require('bcryptjs');
const Account = require("../shared/model/Account");
const connectDB = require('../shared/mongoose');

app.http('ResetPassword', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'auth/reset-password',
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request: ResetPassword.');

        try {
            await connectDB();
            const body = await request.json();
            const { email, newPassword, confirmPassword } = body;
            if (!email) {
                return { status: 400, jsonBody: { message: "Email is required!" } };
            }
            if (!newPassword || !confirmPassword) {
                return {
                    status: 400,
                    jsonBody: { message: "Please enter complete information" }
                };
            }
            if (newPassword !== confirmPassword) {
                return {
                    status: 400,
                    jsonBody: { message: "Confirmed password does not match" }
                };
            }
            const user = await Account.findOne({ email });
            if (!user) {
                return { status: 404, jsonBody: { message: "Account not found" } };
            }
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();
            return { status: 200, jsonBody: { message: "Password changed successfully!" } };
        } catch (error) {
            context.error(`Error changing password: ${error.message}`);
            return {
                status: 500,
                jsonBody: { message: "Error changing password", error: error.message }
            };
        }
    }
});