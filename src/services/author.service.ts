import {Author} from "../models/author.model";
import {bookService} from "./book.service";

export class AuthorService {
    // Récupère tous les auteurs
    public async getAllAuthors(): Promise<Author[]> {
        return Author.findAll();
    }

    // Récupère un auteur par ID
    public async getAuthorById(id: number): Promise<Author | null> {
        return Author.findByPk(id);
    }

    // Crée un nouvel auteur
    public async createAuthor(
        firstName: string,
        lastName: string
    ): Promise<Author> {
        return Author.create({firstName: firstName, lastName: lastName});
    }

    // Supprime un auteur par ID
    public async deleteAuthor(id: number): Promise<void> {
        const author = await Author.findByPk(id);
        const books = await bookService.getAllBooks();

        if (author) {
            books.forEach(function (book) {
                if (book.author?.id === id) {
                    let error: Error = new Error("Author present in the collection");
                    (error as any).status = 404;
                    throw error;
                }
            })
            await author.destroy();
        }
    }

    // Met à jour un auteur
    public async updateAuthor(
        id: number,
        firstName?: string,
        lastName?: string
    ): Promise<Author | null> {
        const author = await Author.findByPk(id);
        if (author) {
            if (firstName) author.firstName = firstName;
            if (lastName) author.lastName = lastName;
            await author.save();
            return author;
        }
        return null;
    }
}

export const authorService = new AuthorService();
