const resolvers = {
  Query: {
    helloWorld: () => {
      console.log("hello world!");
    },
  },
};

module.exports = resolvers;
