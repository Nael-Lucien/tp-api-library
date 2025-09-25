import { Author } from "../models/author.model";
import { Book } from "../models/book.model";
import {AuthorDTO} from "../dto/author.dto";
import {bookCopyService} from "./bookCollection.service";
import {BookCopy} from "../models/bookCopy.model";

export class BookService {
  public async getAllBooks(): Promise<Book[]> {
    return Book.findAll({
        include: [{
            model: Author,
            as: 'author'
        }]
    });
  }

    // Récupère un livre par ID
    public async getBookById(id: number): Promise<Book | null> {
        return Book.findByPk(id, {
            include: [{
                model: Author,
                as: 'author'
            }]
        });
    }

    // Créer un nouveau livre
    public async createBook(title: string, publishYear: number, authorId: number, isbn: string): Promise<Book>{
        return Book.create({title: title, publishYear: publishYear, authorId: authorId, isbn: isbn})
    }

    //Met à jour un livre par ID
    public async updateBook(id: number, title: string, publishYear: number, authorId: number, isbn: string): Promise<Book | null>{
      const book = await Book.findByPk(id)
        if(book){
            if(title) book.title = title;
            if(publishYear) book.publishYear = publishYear;
            if(authorId) book.authorId = authorId;
            if(isbn) book.isbn = isbn;
            await book.save();
            return book;
        }
      return null;
    }

    //Supprime un livre par ID
    public async deleteBook(id: number): Promise<void>{
        const book = await Book.findByPk(id);
        const bookCopies = await bookCopyService.getAllBooksCopy();

        if(book){
            bookCopies.forEach(function (bookCopy){
                if(bookCopy.bookId == id){
                    let error: Error = new Error("Book present in the collection");
                    (error as any).status = 404;
                    throw error;
                }
            })
            await book.destroy();
        }
    }

    //Récupère une liste de livre par ID d'auteur
    public async getAuthorsBooks(id: number): Promise<Book[] | null>{
        const books = await Book.findAll();
        let authorBooks : Book[] | null = [];

        if(books){
            books.forEach(function (book){
                if(book.authorId === id){
                    authorBooks.push(book);
                }
            })
        }

        return authorBooks;
    }

    //Récupère une liste d'exemplaire d'un livre
    /*public async getBooksBookCopies(id: number): Promise<BookCopy[] | null>{
      const book = await Book.findByPk(id);
    }*/
}

export const bookService = new BookService();
