import { Author } from "../models/author.model";
import { Book } from "../models/book.model";
import {AuthorDTO} from "../dto/author.dto";

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
}

export const bookService = new BookService();
