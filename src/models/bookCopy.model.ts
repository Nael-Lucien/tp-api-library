import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import {Author} from "./author.model";
import {Book} from "./book.model"; // Connexion à la base de données

export interface BookCopyAttributes {
    id?: number;
    bookId: number;
    available: number;
    state: number;
}

export class BookCopy extends Model<BookCopyAttributes> implements BookCopyAttributes {
    public id!: number;
    public bookId!: number;
    public available!: number;
    public state!: number;
}

BookCopy.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "book_id",
        },

        available: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },

        state: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        tableName: "BookCopy",
    });

BookCopy.belongsTo(Book, { foreignKey: "bookId", as: "book" });
