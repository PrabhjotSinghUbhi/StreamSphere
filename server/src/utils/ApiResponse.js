class ApiResponse {
    constructor(data, statusCode, message = "Success") {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };
