import { ApiUrl } from "~/env";

import { Alertify } from "~/scripts/Alertify";
import { ErrorExtractor } from "~/scripts/Error-extractor";

import { CHAT_GET_CHAT_LIST, CHAT_SET_CHAT_ID, CHAT_GET_MESSAGE_LIST, CHAT_GET_QUESTION_REPLY, CHAT_SET_QUESTION, CHAT_RESET_CHAT_DATA } from "~/reducers/chat-reducer";

/**
 * @description function to set chat id
 * @param {string} chatId
 */
export const ChatSetChatId = (chatId) => (dispatch) => {
  dispatch(CHAT_SET_CHAT_ID(chatId));
};

/**
 * @description function to set question asked by user
 * @param {string} answer
 */
export const ChatSetQuestion = (answer) => (dispatch) => {
  dispatch(CHAT_SET_QUESTION(answer));
};

/**
 * @description function to reset chat data
 */
export const ChatResetChatData = () => (dispatch) => {
  dispatch(CHAT_RESET_CHAT_DATA());
};

/**
 * @description function to get chat list
 * @param {string} text
 */
export const ChatGetChatList = (search) => (dispatch, getState) => {
  fetch(`${ApiUrl}/chat/get-chats`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: search }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      dispatch(CHAT_GET_CHAT_LIST(data));
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could get chats ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
    });
};

/**
 * @description function to get message list by chat id
 * @returns {Promise}
 */
export const ChatGetMessageList = () => (dispatch, getState) => {
  const { chat_store } = getState();
  const { chatId } = chat_store;
  return fetch(`${ApiUrl}/chat/get-message-list`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      dispatch(CHAT_GET_MESSAGE_LIST(data));
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could get chats ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
    });
};

/**
 * @description function to get reply from the question asked
 * @param {string} question
 * @returns {Promise}
 */
export const ChatGetQuestionReply = (question) => (dispatch, getState) => {
  const { chat_store } = getState();
  const { chatId } = chat_store;

  return fetch(`${ApiUrl}/chat/chat-response`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, question }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      dispatch(CHAT_GET_QUESTION_REPLY(data));
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could get chat response ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
    });
};
