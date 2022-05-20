const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🖥️ Server running on port ${PORT}!`);
      console.log(
        `📈 Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Start 'em up!
startApolloServer(typeDefs, resolvers);
