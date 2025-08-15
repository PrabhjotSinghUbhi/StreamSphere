class ApiResponse {
    constructor(data, statusCode, message = "Success") {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message || "Something went wrong.";
        this.success = statusCode < 400;
    }
}

export { ApiResponse };
