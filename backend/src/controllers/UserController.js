import User from "../models/User";
import UserService from "../services/UserService";
import Log from "../core/logging";
import { googleAPI } from "../services/GoogleDrive";
import createTag from "../services/ImaggaService";
import contentBasedRecommender from "../services/contentBasedRecommender";
import FileService from "../services/FileService";

export default {
  register: async (req, res, next) => {
    let { email, password, confirmPassword } = req.body;
    UserService.register(email, password, confirmPassword)
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((error) => {
        Log.error("UserService", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  login: async (req, res, next) => {
    let { email, password } = req.body;
    UserService.login(email, password)
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((error) => {
        Log.error("UserService", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  updateRegisterInfo: async (req, res, err) => {
    let { user } = req,
      photoUrl;

    googleAPI(req, res, err).then((path) => {
      photoUrl = path;
      UserService.updateRegisterInfo(user._id, req.body, photoUrl)
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((error) => {
          Log.error("UserService", error.message, error);
          return res.status(error.code).json(error);
        });
    });
  },
  forgotPassword: async (req, res) => {
    console.log(req.body.email);
    UserService.forgotPassword(req.body.email)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(error.code).json(error);
      });
  },
  getProfile: async (req, res) => {
    const user = req.user;
    UserService.getProfile(req.query.userID)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(error.code).json(error);
      });
  },
  post: async (req, res, err) => {
    const originalName = req.file.originalname;

    let link;
    let { userID, status, linkFile, photoOfUser } = req.body;

    googleAPI(req, res, err).then((path) => {
      link = path;
      let tag;
      createTag(link).then((tags) => {
        tag = tags;
        UserService.post(userID, status, link, originalName, photoOfUser, tag)
          .then((result) => {
            return res.status(200).json(result);
          })
          .catch((error) => {
            Log.error("Post", error.message, error);
            return res.status(error.code).json(error);
          });
      });
    });
  },
  postWithTicket: async (req, res, err) => {
    UserService.postWithTicket(
      req.user._id,
      req.body.linkFile,
      req.body.originalName,
      req.body.photoOfUser
    )
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("Post", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  getPhotos: async (req, res, err) => {
    const user = req.user;
    UserService.getPhotos(req.query.userID)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("Photos", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  postComment: async (req, res, err) => {
    const { userID, postID, ownerName, linkAvatar, content } = req.body;

    UserService.postComment(userID, postID, ownerName, linkAvatar, content)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("PostComment", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  registerWithGoogle: async (req, res, err) => {
    const { email, firstName, lastName, profilePhoto, type } = req.body;
    UserService.registerWithGoogle(
      email,
      firstName,
      lastName,
      profilePhoto,
      type
    )
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("RegisterWithGoogle", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  getRecommend: async (req, res, err) => {
    const query = req.query;
    let userFavTags = {
      id: query.id,
      content: query.favTags.join(" "),
    };

    let dataRecommend = [];

    await FileService.getAllFile().then((res) => {
      for (var i of res) {
        if (i.tag.length > 0) {
          let dataImages = {
            id: i._id,
            content: i.tag.join(" "),
          };
          dataRecommend.push(dataImages);
        }
      }
    });

    // Push userFavTags
    dataRecommend.push(userFavTags);

    contentBasedRecommender(dataRecommend)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("RegisterWithGoogle", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  updateFavouriteTag: async (req, res, err) => {
    const { itemTag, userID, flag } = req.body;

    UserService.updateFavouriteTag(itemTag, userID, flag)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("updateFavTags", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  interactImage: async (req, res, err) => {
    const { ownerNameAction, ownerIDAction, linkAvatar, typeAction, userID } =
      req.body;

    UserService.interactImage(
      ownerNameAction,
      ownerIDAction,
      linkAvatar,
      typeAction,
      userID
    )
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("PostNotify", error.message, error);
        return res.status(error.code).json(error);
      });
  },
  getAllNotifyById: async (req, res, err) => {
    const { userID } = req.query;
    UserService.getAllNotifyById(userID)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(err.code).json(err);
      });
  },
};
