import { config } from "dotenv";
config();

import { ApolloServer } from "@apollo/server";
import { pick } from "lodash";
import { startStandaloneServer } from "@apollo/server/standalone";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { PostsAPI, Post } from "./posts-api";

export interface ContextValue {
  dataSources: {
    postsAPI: PostsAPI;
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const main = async (): Promise<string> => {
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      const postsAPI: PostsAPI = new PostsAPI({ cache });
      const posts: Post[] = await postsAPI.getPosts();
      return {
        dataSources: {
          postsAPI,
        },
      };
    },
  });

  return url;
};

main().then((url: string): void => {
  console.log(`🚀 Server listening at: ${url}`);
});
