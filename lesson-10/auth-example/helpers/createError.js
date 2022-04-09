const errorMessages = {
    404: "Not found",
    400: "Bad request",
    409: "Already exist"
};

const createError = (status, message = errorMessages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = createError;