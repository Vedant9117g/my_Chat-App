import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [], // List of conversations
  messages: {}, // Messages for each conversation
  activeChat: null, // Currently active chat user
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    addMessage: (state, action) => {
      const { receiverId, message } = action.payload;
      if (!state.messages[receiverId]) {
        state.messages[receiverId] = [];
      }
      state.messages[receiverId].push(message);
    },
  },
});

export const { setActiveChat, addMessage } = conversationSlice.actions;
export default conversationSlice.reducer;
