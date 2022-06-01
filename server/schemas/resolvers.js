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
        console.log(userData);
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    reviews: async (parent, { bookId }) => {
      const params = bookId ? { bookId } : {};
      return Review.find(params).sort({ createdAt: -1 });
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
          { $addToSet: { readingList: input } },
          { new: true, runValidators: true }
        ).populate("readingList");

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
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
    addComment: async (parent, { reviewId, commentText }, context) => {
      if (context.user) {
        const updatedReview = await Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $push: {
              comments: { commentText, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedReview;
      }

      throw new AuthenticationError(
        "You need to be logged in to add a comment."
      );
    },
  },
};

module.exports = resolvers;
