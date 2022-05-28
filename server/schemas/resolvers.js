const { AuthenticationError } = require("apollo-server-express");
const { User, Review } = require("../models");
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
      throw new AuthenticationError("You need to be logged in!");
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
    addToList: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              readingList: {
                authors: input.authors,
                bookId: input.bookId,
                title: input.title,
                description: input.description,
                image: input.image,
              },
            },
          },
          { new: true }
        );
        console.log("--------");
        console.log(updatedUser);
        console.log("--------");
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    createReview: async (parent, { input }, context) => {
      if (context.user) {
        const review = await Review.create({
          stars: input.stars,
          reviewText: input.reviewText,
          bookId: input.bookId,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { reviews: review._id } },
          { new: true }
        );

        return review;
      }

      throw new AuthenticationError("You must be logged in to leave a review.");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $pull: { readingList: { bookId } },
          },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    markAsRead: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $pull: { readingList: { bookId } },
            $push: { completedList: { bookId } },
          },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError("You must be logged in to do that!");
    },
  },
};

module.exports = resolvers;
