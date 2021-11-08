import adminService from "../services/AdminService";
import Log from "../core/logging";

export default {
  getAllUser: async (req, res, next) => {
    adminService
      .getAllUser()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        Log.error("AdminService", error.message, error);
        return res.status(error.code).json(error);
      });
  },
};
