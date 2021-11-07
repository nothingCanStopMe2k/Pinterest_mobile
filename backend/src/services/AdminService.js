import User, { UserSchema } from "../models/User";

export default {
  getAllUser: async () => {
    return User.find().then(
      async (user) => {
        if (user.length === 0)
          return Promise.reject(new ServiceError(400, "user not existed!"));
        return Promise.resolve(user);
      },
      async (error) => {
        return Promise.reject(new ServiceError(500, error.message, error));
      }
    );
  },
};
