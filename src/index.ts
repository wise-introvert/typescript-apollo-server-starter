import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const main = async (): Promise<string> => {
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

  return url;
}

main().then((url: string): void => {
  console.log(`🚀 Server listening at: ${url}`);
})
