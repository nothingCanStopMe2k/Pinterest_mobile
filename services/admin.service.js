import { requestUrl } from "../config/request-url";
import { requestService } from "./request.service";

const getAllUser = () => requestService.get(requestUrl.getAllUser);

export const adminService = {
  getAllUser,
};
