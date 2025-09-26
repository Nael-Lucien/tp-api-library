import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Security, Tags} from "tsoa";
import {BookCopyDTO} from "../dto/bookCopy.dto";
import {bookCopyService} from "../services/bookCollection.service";


@Route("bookCopies")
@Tags("BookCopies")
export class BookCopyController extends Controller {

    @Get("/")
    public async getAllBooksCopy(): Promise<BookCopyDTO[]> {
        return bookCopyService.getAllBooksCopy();
    }

    @Get("{id}")
    public async getBookCopyById(id: number): Promise<BookCopyDTO> {
        let bookCopy = await bookCopyService.getBookCopyById(id);

        if (bookCopy === null) {
            let error: Error = new Error(`BookCopy ${id} not found`);
            (error as any).status = 404;
            throw error;
        } else {
            return bookCopy;
        }
    }

    @Post("/")
    public async createBookCopy(@Body() requestBody: BookCopyDTO): Promise<BookCopyDTO> {
        const {book, available, state} = requestBody;

        if (book?.id === undefined) {
            let error: Error = new Error("Book ID is required to create a new BookCopy");
            (error as any).status = 404;
            throw error;
        }
        return bookCopyService.createBookCopy(book?.id, available, state);
    }

    @Patch("{id}")
    public async updateBookCopy(@Path() id: number, @Body() requestBody: BookCopyDTO): Promise<BookCopyDTO | null> {
        const {book, available, state} = requestBody;

        if (book?.id === undefined) {
            let error: Error = new Error("Book ID is required to create a new BookCopy");
            (error as any).status = 404;
            throw error;
        }
        return bookCopyService.updateBookCopy(id, book?.id, available, state);
    }

    //Supprime un BookCopy par ID
    @Delete("{id}")
    public async deleteBookCopy(@Path() id: number): Promise<void> {
        let bookCopy = await bookCopyService.deleteBookCopy(id);
        if (bookCopy === null) {
            let error: Error = new Error("BookCopy not found");
            (error as any).status = 404;
            throw error;
        } else {
            return bookCopy;
        }
    }
}
