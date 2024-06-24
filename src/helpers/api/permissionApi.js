import { get, post } from "../api_helper";
import {
  USER_ROUTES,
  GET_ALL_PERMISSIONS,
  GRANT_PERMISSIONS,
} from "helpers/constant";

const getPermissionsApi = () => get(`${USER_ROUTES + GET_ALL_PERMISSIONS}`);

const updatePermissionAPi = (data) =>
  post(`${USER_ROUTES + GRANT_PERMISSIONS}`, data);

export { getPermissionsApi, updatePermissionAPi };
