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
}

export const bookService = new BookService();
