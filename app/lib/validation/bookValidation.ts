// lib/validation/bookValidation.ts
import { ValidationError } from "../errors";
import { BookStatus, CreateBookInput } from "@app/types/types";

/**
 * Validation constraints for book fields
 */
export const BOOK_CONSTRAINTS = {
    TITLE_MAX_LENGTH: 200,
    AUTHOR_MAX_LENGTH: 100,
    MAX_PAGES: 10000,
    VALID_STATUSES: ["to read", "reading", "finished"] as const,
} as const;

/**
 * Validates book title
 * @throws ValidationError if invalid
 */
export function validateTitle(title: string): string {
    const trimmed = title.trim();
    
    if (!trimmed) {
        throw new ValidationError("El título es obligatorio", "title", title);
    }
    
    if (trimmed.length > BOOK_CONSTRAINTS.TITLE_MAX_LENGTH) {
        throw new ValidationError(
            `El título no puede exceder ${BOOK_CONSTRAINTS.TITLE_MAX_LENGTH} caracteres`,
            "title",
            title
        );
    }
    
    return trimmed;
}

/**
 * Validates book author
 * @throws ValidationError if invalid
 */
export function validateAuthor(author: string): string {
    const trimmed = author.trim();
    
    if (!trimmed) {
        throw new ValidationError("El autor es obligatorio", "author", author);
    }
    
    if (trimmed.length > BOOK_CONSTRAINTS.AUTHOR_MAX_LENGTH) {
        throw new ValidationError(
            `El autor no puede exceder ${BOOK_CONSTRAINTS.AUTHOR_MAX_LENGTH} caracteres`,
            "author",
            author
        );
    }
    
    return trimmed;
}

/**
 * Validates page count
 * @throws ValidationError if invalid
 */
export function validatePages(pages: number): number {
    if (!Number.isInteger(pages) || pages <= 0) {
        throw new ValidationError("El número de páginas debe ser un entero positivo", "pages", pages);
    }
    
    if (pages > BOOK_CONSTRAINTS.MAX_PAGES) {
        throw new ValidationError(
            `El número de páginas no puede exceder ${BOOK_CONSTRAINTS.MAX_PAGES}`,
            "pages",
            pages
        );
    }
    
    return pages;
}

/**
 * Validates pages read
 * @throws ValidationError if invalid
 */
export function validatePagesRead(pagesRead: number, totalPages: number): number {
    if (!Number.isInteger(pagesRead) || pagesRead < 0) {
        throw new ValidationError("Las páginas leídas deben ser un entero no negativo", "pagesRead", pagesRead);
    }
    
    if (pagesRead > totalPages) {
        throw new ValidationError(
            "Las páginas leídas no pueden ser mayores que el total de páginas",
            "pagesRead",
            pagesRead
        );
    }
    
    return pagesRead;
}

/**
 * Validates book status
 * @throws ValidationError if invalid
 */
export function validateStatus(status: string): BookStatus {
    if (!BOOK_CONSTRAINTS.VALID_STATUSES.includes(status as BookStatus)) {
        throw new ValidationError(
            `Estado inválido. Debe ser uno de: ${BOOK_CONSTRAINTS.VALID_STATUSES.join(", ")}`,
            "status",
            status
        );
    }
    
    return status as BookStatus;
}

/**
 * Validates complete book input for creation
 * @returns Sanitized and validated book input
 * @throws ValidationError if any field is invalid
 */
export function validateCreateBookInput(input: CreateBookInput): CreateBookInput {
    const title = validateTitle(input.title);
    const author = validateAuthor(input.author);
    const pages = validatePages(input.pages);
    const status = validateStatus(input.status);
    const pagesRead = validatePagesRead(input.pagesRead, pages);
    
    return {
        title,
        author,
        pages,
        pagesRead,
        status,
    };
}

/**
 * Validates partial book update
 * @returns Sanitized update object
 * @throws ValidationError if any field is invalid
 */
export function validateBookUpdate(
    update: Partial<CreateBookInput>,
    currentPages?: number
): Partial<CreateBookInput> {
    const validated: Partial<CreateBookInput> = {};
    
    if (update.title !== undefined) {
        validated.title = validateTitle(update.title);
    }
    
    if (update.author !== undefined) {
        validated.author = validateAuthor(update.author);
    }
    
    if (update.pages !== undefined) {
        validated.pages = validatePages(update.pages);
    }
    
    if (update.status !== undefined) {
        validated.status = validateStatus(update.status);
    }
    
    if (update.pagesRead !== undefined) {
        const maxPages = update.pages ?? currentPages ?? 8000;
        validated.pagesRead = validatePagesRead(update.pagesRead, maxPages);
    }
    
    return validated;
}
