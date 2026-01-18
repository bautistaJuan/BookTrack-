// lib/errors.ts
/**
 * Custom error classes for type-safe error handling
 */

/**
 * Base application error class
 */
export class AppError extends Error {
    public readonly code: string;
    public readonly isOperational: boolean;

    constructor(message: string, code: string = "APP_ERROR", isOperational: boolean = true) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.isOperational = isOperational;
        
        // Maintains proper stack trace for where error was thrown
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Authentication related errors
 */
export class AuthenticationError extends AppError {
    constructor(message: string = "Usuario no autenticado") {
        super(message, "AUTH_ERROR");
        this.name = "AuthenticationError";
    }
}

/**
 * Resource not found errors
 */
export class NotFoundError extends AppError {
    constructor(resource: string = "Recurso") {
        super(`${resource} no encontrado`, "NOT_FOUND");
        this.name = "NotFoundError";
    }
}

/**
 * Validation errors for invalid input data
 */
export class ValidationError extends AppError {
    public readonly field?: string;
    public readonly value?: unknown;

    constructor(message: string, field?: string, value?: unknown) {
        super(message, "VALIDATION_ERROR");
        this.name = "ValidationError";
        this.field = field;
        this.value = value;
    }
}

/**
 * Permission denied errors
 */
export class PermissionError extends AppError {
    constructor(message: string = "No tienes permiso para realizar esta acción") {
        super(message, "PERMISSION_DENIED");
        this.name = "PermissionError";
    }
}

/**
 * Database operation errors
 */
export class DatabaseError extends AppError {
    constructor(message: string = "Error en la operación de base de datos") {
        super(message, "DATABASE_ERROR");
        this.name = "DatabaseError";
    }
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
}

/**
 * Extract user-friendly message from any error
 */
export function getErrorMessage(error: unknown): string {
    if (isAppError(error)) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "Ha ocurrido un error inesperado";
}
