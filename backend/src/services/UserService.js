import User, { UserSchema } from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";
import md5 from "md5";
import { ServiceError } from "../utils/ServiceError";
import { Token } from "../models/Token";
import crypto from "crypto";
import revmd5 from "reverse-md5";
import nodemailer from "nodemailer";

export default {
  register: async (email, password, confirmPassword) => {
    let user = await User.findOne({ email });
    //Kiểm tra đã nhập confirmPassword đúng chưa?
    if (password !== confirmPassword)
      return Promise.reject(
        new ServiceError(405, "These passwords don't match")
      );
    //Kiếm tra user đã tồn tại trong database chưa?
    if (!user) {
      let register = new User({
        email,
        password: md5(password),
        status: "true",
      });
      return register
        .save()
        .then(async (result) => {
          let user = JSON.parse(JSON.stringify(result));
        })
        .catch((error) => {
          return Promise.reject(new ServiceError(500, error.message, error));
        });
    } else return Promise.reject(new ServiceError(400, "User existed!"));
  },
  login: async (email, password) => {
    let user = await User.findOne({ email, password: md5(password) });
    if (user) {
      let token = await Token.createToken(user);
      return Promise.resolve({
        email,
        token,
      });
    }

    return Promise.reject(
      new ServiceError(400, "Username or password is not correct!")
    );
  },
  updateRegisterInfo: async (userId, body, photoUrl) => {
    return User.findOne({ _id: userId }).then(
      async (user) => {
        if (user) {
          user.firstName = body.firstName;
          user.lastName = body.lastName;
          user.age = body.age ? body.age : 0;
          user.profilePhoto = photoUrl;
          let updatedUser = await user.save();
          delete updatedUser.password;
          delete updatedUser.id;
          delete updatedUser.__v;
          delete updatedUser.createdAt;
          delete updatedUser.updatedAt;

          return Promise.resolve(updatedUser);
        }
        return Promise.reject(new ServiceError(400, "Load fail!!!"));
      },
      async (error) => {
        return Promise.reject(new ServiceError(500, error.message, error));
      }
    );
  },

  getProfile: async (userId) => {
    return User.findOne({ _id: userId }).then(
      async (user) => {
        if (user) {
          return Promise.resolve(user);
        }
        return Promise.reject(new ServiceError(400, "User is not exists!"));
      },
      async (error) => {
        return Promise.reject(new ServiceError(500, error.message, error));
      }
    );
  },
  post: async (userID, status, link, originalName, photoOfUser) => {
    let post = new Post({ userID, status, link, originalName, photoOfUser });
    return post
      .save()
      .then(async (result) => {
        let post = JSON.parse(JSON.stringify(result));
      })
      .catch((error) => {
        return Promise.reject(new ServiceError(500, error.message, error));
      });
  },
  postWithTicket: async (userID, link, originalName, photoOfUser) => {
    let post = new Post({ userID, link, originalName, photoOfUser });
    return post
      .save()
      .then(async (result) => {
        return JSON.parse(JSON.stringify(result));
      })
      .catch((error) => {
        return Promise.reject(new ServiceError(500, error.message, error));
      });
  },

  getPhotos: async (userId) => {
    return Post.find({ userID: userId }).then(
      async (photos) => {
        if (photos) {
          return Promise.resolve(photos);
        }
        return Promise.reject(new ServiceError(400, "Not found any photo!"));
      },
      async (error) => {
        return Promise.reject(new ServiceError(500, error.message, error));
      }
    );
  },
  postComment: async (userID, postID, ownerName, linkAvatar, content) => {
    let comment = new Comment({
      userID,
      postID,
      ownerName,
      linkAvatar,
      content,
    });
    return comment
      .save()
      .then(async (result) => {
        let post = JSON.parse(JSON.stringify(result));
      })
      .catch((error) => {
        return Promise.reject(new ServiceError(500, error.message, error));
      });
  },

  forgotPassword: async (email) => {
    return User.findOne({ email }).then(
      async (user) => {
        if (user) {
          const newPassword = crypto.randomBytes(4).toString("hex");

          //gui mail
          const smtp = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "doctinhdhqg@gmail.com",
              pass: "Doctinhdhqg1!", // naturally, replace both with your real credentials or an application-specific password
            },
          });
          try {
            var d = new Date();
            var result =
              d.getDate() +
              "/" +
              (d.getMonth() + 1) +
              "/" +
              d.getFullYear() +
              " " +
              d.getHours() +
              ":" +
              d.getMinutes() +
              ":" +
              d.getSeconds();
            await smtp.sendMail({
              to: user.email,
              from: "Pinteres",
              subject: "New password for Pinterest account", // Tiêu đề email
              text: "You recieved email from ",
              html: `<div style="margin: 0 auto; width: 100%;">
                <div style="width: '90%'; text-align: center;" ><img style="width: '100%'; height: 250px" src="https://drive.google.com/uc?id=1I1_dNSsDprpKAAoi-XvgnkWhvSLb3l7q" alt="Logo" ></div>
                        <div style="
                            font-family: sans-serif;
                            margin: 0 auto;
                            width: '90%';
                            font-size: large;
                        "
                        >
                            <p>Hello,</p> 
                            <p> We're received a request to reset the password (${result}) for the Pinterest account associated with ${
                email || "Customer"
              }. No changes have been made to your account yet.</p>  
                            <p>You can get your password by looking at the text below:</p> 
                            <a 
                                target="_blank" 
                                href="#"
                            >
                            <button style="padding: 10px; 
                                color: #fff; 
                                background-color: #BE1E2D; 
                                font-weight: 800;
                                display: block; 
                                border-radius: 5px;
                                width: 100%">   
                                ${newPassword}
                            </button>
                            </a>
                            <p>If you did not request a new password, please let us know 
                            immediately to replying to this email.
                            </p>
                            <p>You can find answers to most questions and get in touch with us at 
                            <a target="_blank" href="mailto:doctinhdhqg@gmail.com">support@pinterest.com</a>. We are here to help
                            you at any step along the way.
                            </p>
                            <p>__The Pinterest team</p>
                        </div>
                </div>`,
            });

            user.password = md5(newPassword);
            user.save();
          } catch (error) {
            console.log(error);
            return Promise.resolve({
              message: "Have an error. Please try again",
            });
          }

          return Promise.resolve({
            message: `Hi, ${
              user.email || "Customer"
            }. New your password was sent to your email. Please check your mail!`,
          });
        }
        return Promise.reject(new ServiceError(400, "User is not exists!"));
      },
      async (error) => {
        return Promise.reject(new ServiceError(500, error.message, error));
      }
    );
  },
  generateNewPassword: () => {
    return crypto.randomBytes(12).toString("hex");
  },

  getForgotPasswordMailTemplate(user, newPassword) {
    return `<p>Hi, ${
      user.name || "Customer"
    }, <br/> Your new password is ${newPassword}</p>`;
  },

  registerWithGoogle: async (
    email,
    firstName,
    lastName,
    profilePhoto,
    type
  ) => {
    let user = await User.findOne({ email });
    if (!user) {
      let register = new User({
        email,
        lastName,
        firstName,
        profilePhoto,
        type,
      });
      return register
        .save()
        .then(async (result) => {
          let user = JSON.parse(JSON.stringify(result));
        })
        .catch((error) => {
          return Promise.reject(new ServiceError(500, error.message, error));
        });
    }
    return Promise.resolve({
      email,
    });
  },
};
