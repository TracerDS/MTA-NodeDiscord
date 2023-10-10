class SockError extends Error {
    constructor(errorMessage: string, code: number|string, extra?: any) {
        super(errorMessage)
        this.name = code.toString()
        this.cause = extra
    }

    override toString(withCause: boolean = true): string {
        return `[${this.name}] ${this.message}` + (withCause ? this.cause ? `: ${this.cause}` : '' : '')
    }
}

class InvalidPayloadError extends SockError {
    constructor(payload: object) {
        super('Not a valid payload', 102, payload)
    }
}
class AuthError extends SockError {
    constructor(errorMessage: string, specificCode: string = 'A-01', extra?: any) {
        super(errorMessage, specificCode, extra)
    }
}
class NotAuthError extends AuthError {
    constructor(extra?: any) { super('Not authenticated', 'A-02', extra) }
}
class InvalidAuthKeyError extends AuthError {
    constructor(host: string, extra?: any) {
        super(`Invalid auth token for ${host}`, 'A-03', extra)
    }
}
class AlreadyAuthError extends AuthError {
    constructor(extra?: any) {
        super(`Host already authenticated`, 'A-04', extra)
    }
}

export {
    SockError,
    InvalidPayloadError,
    AuthError,
    NotAuthError,
    InvalidAuthKeyError,
    AlreadyAuthError,
}