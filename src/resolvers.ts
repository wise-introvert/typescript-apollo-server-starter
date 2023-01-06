import { Post } from "./posts-api";
import { ContextValue } from ".";

export const resolvers = {
  Query: {
    posts: async (_, __, context: ContextValue): Promise<Post[]> => {
      return context.dataSources.postsAPI.getPosts();
    },
  },
};
