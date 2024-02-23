import { ApiUrl } from "~/env";

import { Alertify } from "~/scripts/Alertify";
import { ErrorExtractor } from "~/scripts/Error-extractor";

import { LOGOUT } from "~/reducers/chat-reducer";
import { GET_USER_DETAILS } from "~/reducers/login-reducer";

/**
 * @description function to get user login
 * @param {string} token
 * @returns {Promise}
 */
export const GoogleLogin = (token) => (dispatch) => {
  return fetch(`${ApiUrl}/user/google-login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then(() => {
      dispatch(GetUserDetails());
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could not login ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
      return Promise.reject();
    });
};

/**
 * @description function to get user details from the server
 * @returns {Promise}
 */
export const GetUserDetails = () => (dispatch) => {
  return fetch(`${ApiUrl}/user/userDetails`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      if (data.logged_in_success) {
        dispatch(GET_USER_DETAILS(data));
      } else {
        dispatch(LOGOUT());
      }
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could not get user details ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
    });
};

/**
 * @description function to get user logout
 * @returns  {Promise}
 */
export const GetUserLogout = () => (dispatch) => {
  return fetch(`${ApiUrl}/user/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res.ok ? dispatch(LOGOUT()) : Promise.reject(res)))
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could not get user details ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
      return Promise.reject();
    });
};
