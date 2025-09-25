import {Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch} from "tsoa";
import {authorService} from "../services/author.service";
import {AuthorDTO} from "../dto/author.dto";
import {Author} from "../models/author.model";
import {BookCopy} from "../models/bookCopy.model";
import {Book} from "../models/book.model";

@Route("authors")
@Tags("Authors")
export class AuthorController extends Controller {
    // Récupère tous les auteurs
    @Get("/")
    public async getAllAuthors(): Promise<AuthorDTO[]> {
        return authorService.getAllAuthors();
    }

    // Récupère un auteur par ID
    @Get("{id}")
    public async getAuthorById(@Path() id: number): Promise<AuthorDTO | null> {
        let author: Author | null = await authorService.getAuthorById(id);
        if (author === null) {
            let error: Error = new Error("Author not found");
            (error as any).status = 404;
            throw error;
        } else {
            return author;
        }
    }

    // Crée un nouvel auteur
    @Post("/")
    public async createAuthor(
        @Body() requestBody: AuthorDTO
    ): Promise<AuthorDTO> {
        const {firstName, lastName} = requestBody;
        return authorService.createAuthor(firstName, lastName);
    }

    // Supprime un auteur par ID
    @Delete("{id}")
    public async deleteAuthor(@Path() id: number): Promise<void> {
        let author = await authorService.deleteAuthor(id);
        if (author == null) {
            let error: Error = new Error("Author not found");
            (error as any).status = 404;
            throw error;
        } else {
            return author;
        }
    }

    // Met à jour un auteur par ID
    @Patch("{id}")
    public async updateAuthor(
        @Path() id: number,
        @Body() requestBody: AuthorDTO
    ): Promise<AuthorDTO | null> {
        const {firstName, lastName} = requestBody;
        return authorService.updateAuthor(id, firstName, lastName);
    }
}
