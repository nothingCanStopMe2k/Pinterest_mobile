import User, { UserSchema } from "../models/User";
import File from "../models/Post";

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
  getAllTags: async () => {
    let tagArray = [];
    await File.find().then(async (file) => {
      for (var i of file) {
        tagArray = tagArray.concat(i.tag);
      }
    });
    // Remove tag repeat in tagArray
    tagArray = tagArray.filter((item, index) => {
      return tagArray.indexOf(item) == index;
    });

    return tagArray;
  },
};
