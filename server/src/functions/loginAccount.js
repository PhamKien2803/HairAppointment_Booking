const { app } = require('@azure/functions');
const bcrypt = require("bcryptjs");
const { createAccessToken, createRefreshToken } = require("../utils/jwt");
const Account = require("../shared/model/Account");
const UserToken = require("../shared/model/UserToken");
const connectDB = require('../shared/mongoose');


app.http('LoginAccount', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'auth/login',
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request: LoginAccount.');
        try {
            await connectDB();
            const body = await request.json();
            const { username, password } = body;

            if (!username || !password) {
                return {
                    status: 400,
                    jsonBody: { message: "Please enter complete information!" }
                };
            }

            const user = await Account.findOne({ username });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return {
                    status: 401,
                    jsonBody: { message: "Username or password is incorrect!!" }
                };
            }

            const accessToken = createAccessToken({ id: user._id, role: user.role });
            const refreshToken = createRefreshToken();

            await UserToken.findOneAndUpdate(
                { user: user._id },
                { re_token: refreshToken },
                { upsert: true, new: true }
            );

            return {
                status: 200,
                jsonBody: {
                    message: "Login successfully",
                    accessToken: accessToken,
                    re_token: refreshToken,
                },
            };
        } catch (error) {
            context.error(`Error during login process: ${error.message}`);
            return {
                status: 500,
                jsonBody: { message: "Error while logging in", error: error.message }
            };
        }
    }
});