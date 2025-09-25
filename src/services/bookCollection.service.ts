import { Book } from "../models/book.model";
import { BookCopy } from "../models/bookCopy.model";
import {BookService} from "./book.service";
import {Author} from "../models/author.model";
import {BookDTO} from "../dto/book.dto";

export class BookCollectionService{
    // Récupere tout les BookCopy
    public async getAllBooksCopy(): Promise<BookCopy[]>{
        return BookCopy.findAll({
            include: [{
                model: Book,
                as: 'book'
            }]
        })
    }

    // Récupere un BookCopy par Id
    public async getBookCopyById(id: number): Promise<BookCopy | null>{
        return BookCopy.findByPk(id, {
            include: [{
                model: Book,
                as: 'book'
            }]
        });
    }

    // Créer un nouveau BookCopy
    public async createBookCopy(bookId: number, available: number, state: number): Promise<BookCopy>{
        return BookCopy.create({bookId: bookId, available: available, state: state})
    }

    // Met à jour un BookCopy
    public async updateBookCopy(id: number, bookId: number, available: number, state: number): Promise<BookCopy | null>{
        const bookCopy = await BookCopy.findByPk(id);

        if(bookCopy){
            if(bookId) bookCopy.bookId = bookId;
            if(available) bookCopy.available = available;
            if(state) bookCopy.state = state;
            await bookCopy.save()
            return bookCopy;
        }
        return null;
    }

    //Supprime un BookCopy par ID
    public async deleteBookCopy(id: number): Promise<void>{
        const bookCopy = await BookCopy.findByPk(id);
        if (bookCopy) await bookCopy.destroy();
    }
}

export const bookCopyService = new BookCollectionService();
