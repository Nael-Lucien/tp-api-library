import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import {BookDTO} from "../dto/book.dto";
import {bookService} from "../services/book.service";
import {AuthorDTO} from "../dto/author.dto";
import {Author} from "../models/author.model";
import {authorService} from "../services/author.service";
import {Book} from "../models/book.model";

@Route("books")
@Tags("Books")
export class BookController extends Controller {
    @Get("/")
    public async getAllBooks(): Promise<BookDTO[]> {
        return bookService.getAllBooks();
    }

    // Récupère un livre par ID
    @Get("{id}")
    public async getBookById(id: number): Promise<BookDTO> {
        let book = await bookService.getBookById(id);

        if (book === null) {
            let error: Error = new Error(`Book ${id} not found`);
            (error as any).status = 404;
            throw error;
        } else {
            return book;
        }
    }

    // Créer un nouveau livre
    @Post("/")
    public async createBook(@Body() requestBody: BookDTO): Promise<BookDTO> {
        const {title, publishYear, author, isbn} = requestBody;

        if (author?.id === undefined) {
            let error: Error = new Error("Author ID is required to create a new book");
            (error as any).status = 404;
            throw error;
        }

        return bookService.createBook(title, publishYear, author?.id, isbn);
    }

    //Met à jour un livre par ID
    @Patch("{id}")
    public async updateBook(@Path() id: number, @Body() requestBody: BookDTO): Promise<BookDTO | null> {
        const {title, publishYear, author, isbn} = requestBody;

        if (author?.id === undefined) {
            let error: Error = new Error("Author ID is required to edit a book");
            (error as any).status = 404;
            throw error;
        }

        return bookService.updateBook(id, title, publishYear, author?.id, isbn);
    }

    //Supprime un livre par ID
    @Delete("{id}")
    public async deleteBook(@Path() id: number): Promise<void> {
        let book = await bookService.deleteBook(id);
        if (book == null) {
            let error: Error = new Error("Book not found");
            (error as any).status = 404;
            throw error;
        } else {
            return book;
        }
    }
}

