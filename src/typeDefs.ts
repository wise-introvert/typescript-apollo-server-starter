export const typeDefs = `#graphql
  type Post {
    userId: String!
    id: String!
    title: String!
    body: String!
  }

  type Query {
    posts: [Post]
  }
`;
