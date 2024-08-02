export default class UserResponse{
    status;
    message;

    constructor(status: boolean, message: string) {
        this.status = status;
        this.message = message
    }

    get getMessage(): string {
        return this.message;
    }
}