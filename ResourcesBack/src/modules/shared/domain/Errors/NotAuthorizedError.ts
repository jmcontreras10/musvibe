export class NotAuthorizedError extends Error {
    constructor(){
        super('Not authorized!');
    }
}
