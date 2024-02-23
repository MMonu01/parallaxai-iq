import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: "",
  question: "",
  chat_list: [], // [{_id,date,preview}]
  message_list: [], // [{_id,question,answer}]
};

export const LoginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    CHAT_GET_CHAT_LIST: (state, { payload }) => {
      state.chat_list = payload;
      return state;
    },

    CHAT_SET_CHAT_ID: (state, { payload }) => {
      state.chatId = payload;
      return state;
    },

    CHAT_SET_QUESTION: (state, { payload }) => {
      state.question = payload;

      return state;
    },

    CHAT_GET_MESSAGE_LIST: (state, { payload }) => {
      state.message_list = payload;

      return state;
    },

    CHAT_RESET_CHAT_DATA: (state) => {
      state = { ...initialState, chat_list: state.chat_list };

      return state;
    },

    CHAT_GET_QUESTION_REPLY: (state, { payload }) => {
      state.message_list = [...state.message_list, payload.message];
      if (state.chatId !== payload.chatId) {
        state.chatId = payload.chatId;
        state.chat_list = [...state.chat_list, { _id: payload.chatId, date: new Date().toISOString(), preview: payload.message.question }];
      }
      state.question = "";
      return state;
    },

    LOGOUT: (state) => {
      return initialState;
    },
  },
});

export const { CHAT_GET_CHAT_LIST, CHAT_SET_CHAT_ID, CHAT_GET_MESSAGE_LIST, CHAT_GET_QUESTION_REPLY, CHAT_SET_QUESTION, CHAT_RESET_CHAT_DATA, LOGOUT } = LoginSlice.actions;

export default LoginSlice.reducer;
