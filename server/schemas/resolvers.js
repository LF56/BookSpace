const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
          
        );

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)
    saveBook: async (parent, { bookData }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { savedBooks: bookData } },
          
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: bookId } }},
          
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
  },
};

module.exports = resolvers;