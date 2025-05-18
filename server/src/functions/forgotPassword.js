const { app } = require('@azure/functions');
const Account = require("../shared/model/Account");
const { sendOTPEmail } = require("../utils/emailsOTP");
const connectDB = require('../shared/mongoose');
const bcrypt = require("bcryptjs");
app.http('ForgotPassword', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'auth/forgot-password',
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request: ForgotPassword.');

        try {
            await connectDB();
            const body = await request.json();
            const { email } = body;
            if (!email) {
                return { status: 400, jsonBody: { message: "Please enter email !!" } };
            }
            const user = await Account.findOne({ email });
            if (!user) {
                return { status: 404, jsonBody: { message: "Email does not exist" } };
            }
            const otp = Math.floor(100000 + Math.random() * 900000);
            const hashedOtp = await bcrypt.hash(otp.toString(), 10);
            const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); 
            await Account.updateOne(
                { _id: user._id },
                { otp: hashedOtp, otpExpiration }
            );
            await sendOTPEmail(email, otp);
            return { status: 200, jsonBody: { message: "OTP has been sent to your email" } };
        } catch (error) {
            context.error(`Error while sending OTP: ${error.message}`);
            return {
                status: 500,
                jsonBody: { message: "Error while sending OTP", error: error.message }
            };
        }
    }
});
