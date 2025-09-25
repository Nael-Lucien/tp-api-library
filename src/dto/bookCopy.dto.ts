import { BookDTO } from "./book.dto";

export interface BookCopyDTO {
    id?: number;
    book?: BookDTO;
    available: number;
    state: number;
}