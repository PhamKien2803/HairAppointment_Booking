const { app } = require('@azure/functions');
const bcrypt = require('bcryptjs');
const Account = require("../shared/model/Account");
const connectDB = require('../shared/mongoose');

app.http('VerifyOTP', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'auth/verify-otp',
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request: VerifyOTP.');

        try {
            await connectDB();
            const body = await request.json();
            const { otp } = body;
            if (!otp) {
                return { status: 400, jsonBody: { message: "Please enter OTP" } };
            }
            const users = await Account.find({ otp: { $ne: null } });
            if (!users || users.length === 0) {
                return { status: 400, jsonBody: { message: "OTP is incorrect or expired" } };
            }
            let matchedUser = null;
            for (const user of users) {
                if (user.otpExpiration && new Date() < user.otpExpiration) {
                    const isMatch = await bcrypt.compare(otp.toString(), user.otp);
                    if (isMatch) {
                        matchedUser = user;
                        break;
                    }
                }
            }
            if (!matchedUser) {
                return { status: 400, jsonBody: { message: "OTP is incorrect or expired" } };
            }

            await Account.updateOne(
                { _id: matchedUser._id },
                { otp: null, otpExpiration: null }
            );
            return { status: 200, jsonBody: { message: "Valid OTP, please enter new password" } };
        } catch (error) {
            context.error(`Error while verifying OTP: ${error.message}`);
            return {
                status: 500,
                jsonBody: { message: "Error while verifying OTP", error: error.message }
            };
        }
    }
});