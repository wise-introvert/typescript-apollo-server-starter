import { books, type Book } from "./data";

export const resolvers = {
  Query: {
    books: async (): Promise<Book[]> =>
      new Promise((resolve): void => resolve(books)),
  },
};
