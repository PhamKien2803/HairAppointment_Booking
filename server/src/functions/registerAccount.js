const { app } = require('@azure/functions');
const Account = require("../shared/model/Account");
const Customer = require("../shared/model/Customer");
const connectDB = require('../shared/mongoose');

app.http('RegisterAccount', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'auth/register',
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request: RegisterAccount.');
        try {
            await connectDB();
            context.log('Request body:', request.body);
            const body = await request.json(); 
            const { email, username, password, fullName, phone, gender, dob } = body;

            if (!email || !username || !password || !fullName || !phone) {
                return {
                    status: 400,
                    jsonBody: { message: "Please enter complete information!" }
                };
            }
            const existingUser = await Account.findOne({ $or: [{ email }, { username }] });
            const existingPhone = await Customer.findOne({ phone });
            if (existingUser) {
                return {
                    status: 400,
                    jsonBody: {
                        message: existingUser.email === email
                            ? "Email already exists"
                            : "Username already exists",
                    }
                };
            }
            if (existingPhone) {
                return { status: 400, jsonBody: { message: "Phone number already exists" } };
            }
            const newCustomer = new Customer({ fullName, phone, email, gender, dob });
            await newCustomer.save();
            try {
                const newAccount = new Account({
                    email,
                    username,
                    password,
                    profileId: newCustomer._id,
                });
                await newAccount.save();

                return {
                    status: 201,
                    jsonBody: {
                        message: "Register successfully!",
                        account: {
                            _id: newAccount._id,
                            email: newAccount.email,
                            username: newAccount.username,
                            role: newAccount.role,
                            profileId: newAccount.profileId,
                        },
                    },
                };
            } catch (error) {
                await Customer.findByIdAndDelete(newCustomer._id);

                if (error.name === "ValidationError") {
                    const validationErrors = Object.values(error.errors).map(
                        (err) => err.message
                    );
                    return {
                        status: 400,
                        jsonBody: { message: "Validation error", errors: validationErrors }
                    };
                }

                context.error(`Error creating account: ${error.message}`);
                return {
                    status: 500,
                    jsonBody: {
                        message: "Account creation failed",
                        error: error.message,
                    },
                };
            }
        } catch (error) {
            context.error(`Error during registration process: ${error.message}`);
            return {
                status: 500,
                jsonBody: {
                    message: "Error while registering",
                    error: error.message,
                },
            };
        }
    }
});