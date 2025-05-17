// Validate customer email
export const isValidCustomerEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

// Validate customer phone number (10-15 digits)
export const isValidCustomerPhoneNumber = (phone) => /^[0-9]{10,15}$/.test(phone);

// Check if the appointment date is in the future
export const isAppointmentInFuture = (date) => new Date(date) >= new Date();

// Validate service name (non-empty and no special characters)
export const isValidServiceName = (serviceName) => serviceName.trim() !== '' && /^[a-zA-Z0-9 ]+$/.test(serviceName);

// Validate service price (positive number)
export const isValidServicePrice = (price) => !isNaN(parseFloat(price)) && parseFloat(price) > 0;

// Validate customer birthdate (must be at least 18 years old)
export const isValidCustomerBirthDate = (birthDate) => {
    const currentDate = new Date();
    const dateOfBirth = new Date(birthDate);
    return dateOfBirth <= currentDate && (currentDate.getFullYear() - dateOfBirth.getFullYear()) >= 18;
};

// Check if customer already exists (duplicate name or email)
export const isDuplicateCustomer = (name, email, customersList) =>
    customersList.some(customer => customer.name.toLowerCase() === name.toLowerCase() || customer.email.toLowerCase() === email.toLowerCase());

// Validate if the appointment date is within business hours (Weekdays only)
export const isValidAppointmentDay = (date) => {
    const day = new Date(date).getDay(); // 0: Sunday, 1: Monday, ... 6: Saturday
    return day >= 1 && day <= 5; // Only weekdays (Mon-Fri)
};

// Check if a service is available in the list of available services
export const isServiceAvailable = (service, availableServices) => availableServices.includes(service);
