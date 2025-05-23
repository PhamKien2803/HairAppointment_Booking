const { app } = require('@azure/functions');
const Account = require("../shared/model/Account");
const authenticate = require("../shared/authentication");
const connectDB = require('../shared/mongoose');


app.http('GetUserProfile', {
    methods: ['GET'],
    authLevel: 'user',
    route: 'auth/user-profile',
    handler: async (request, context) => {
        const authResult = authenticate(request, context);
        if (authResult) {
            return authResult;
        }
        try {
            await connectDB();
            const userId = request.account.id;
            const user = await Account.findById(userId)
                .select("-password")
                .populate({
                    path: "profileId",
                    model: request.account.role === "customer" ? "Customer" : "Employee",
                });
            if (!user) {
                return { status: 404, jsonBody: { message: "User does not exist" } };
            }
            return {
                status: 200,
                jsonBody: {
                    message: "Get information successfully !!",
                    profile: user.profileId,
                },
            };
        } catch (error) {
            context.error(`Error retrieving user profile: ${error.message}`);
            return {
                status: 500,
                jsonBody: { message: "Error retrieving information", error: error.message }
            };
        }
    }
});