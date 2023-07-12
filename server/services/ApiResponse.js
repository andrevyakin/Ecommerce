class ApiResponse extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
    static ok(message) {
        return new ApiResponse(200, message);
    }
    static created(message) {
        return new ApiResponse(201, message);
    }
    static unauthorized(message) {
        return new ApiResponse(401, message);
    }
    static forbidden(message) {
        return new ApiResponse(403, message);
    }
    static notFound(message) {
        return new ApiResponse(404, message);
    }
    static methodNotAllowed(message) {
        return new ApiResponse(405, message);
    }
    static conflict(message) {
        return new ApiResponse(409, message);
    }
    static unsupported(message) {
        return new ApiResponse(415, message);
    }
    static unprocessable(message) {
        return new ApiResponse(422, message);
    }
    static internal(message) {
        return new ApiResponse(500, message);
    }
}

export default ApiResponse;
