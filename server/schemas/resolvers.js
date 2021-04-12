const { AuthenticationError } = require('apollo-server-express');
const { User, Books } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    }
},

Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log('login user');
      console.log(user);

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      console.log('token');
      console.log(token);
      return { token, user };
    },
    //check arguments
    saveBook: async (parent, args, context) => {

      if (context.user) {
        const updatedUser = 

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: args.bookInput} },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
//add functionality
    removeBook: async (parent, args) => {
        if (context.user) {
            const updatedUser = 
    
            await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $pull: { books: books._id } },
              { new: true }
            );
    
            return updatedUser;
          }
    }
}
}
  
  module.exports = resolvers;