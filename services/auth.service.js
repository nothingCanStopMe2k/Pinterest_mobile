import { requestUrl } from "../config/request-url";
import { requestService } from "./request.service";

const login = (payload) => requestService.post(requestUrl.auth, payload);

const register = (payload) => requestService.post(requestUrl.register, payload);

const logout = () => localStorage.clear();

const updateRegisterProfile = (payload) =>
  requestService.post(requestUrl.updateRegisterProfile, payload);

const forgotPassword = (payLoad) =>
  requestService.post(requestUrl.forgotPassword, payLoad);

const registerWithGoogle = (payLoad) =>
  requestService.post(requestUrl.registerWithGoogle, payLoad);

export const authService = {
  login,
  register,
  logout,
  updateRegisterProfile,
  forgotPassword,
  registerWithGoogle,
};
