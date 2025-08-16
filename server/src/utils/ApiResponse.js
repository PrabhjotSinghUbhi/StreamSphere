class ApiResponse {
    constructor(payload, statusCode, message = "Success") {
        this.payload = payload;
        this.statusCode = statusCode;
        this.message = message || "Something went wrong.";
        this.success = statusCode < 400;
    }   
}

export { ApiResponse };
