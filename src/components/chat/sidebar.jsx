import { useState, useEffect } from "react";
import { connect } from "react-redux";

import LogoImage from "~/images/logo.jpg";

import { GetUserLogout } from "~/actions/login-actions";
import { ChatGetChatList, ChatGetMessageList, ChatSetChatId, ChatResetChatData } from "~/actions/chat-actions";

const Sidebar = ({ showLoginModal, ...props }) => {
  const [search_chat, setSearchChat] = useState("");
  const [show_history, setShowHistory] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.logged_in_success) {
      props.Chat_Get_Chat_List();
    }
  }, []);

  useEffect(() => {
    const handler = (e) => !e.target.matches(".userProfile") && setIsOpen(false);
    isOpen && window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [isOpen]);

  const handleShowHistory = () => {
    isOpen && setIsOpen(false);
    setShowHistory(!show_history);
  };

  const togglePopup = () => {
    show_history && setShowHistory(false);
    setIsOpen(!isOpen);
  };

  const getMessage = (chatId) => {
    props.Chat_Set_Chat_Id(chatId);
    props.Chat_Get_Message_List().then(() => {});
  };

  const createnewConversation = () => {
    props.Chat_Reset_Chat_Data();
  };

  const searchChat = () => {
    props.Chat_Get_Chat_List(search_chat);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchChat();
    }
  };

  const onLogout = () => {
    props
      .Get_User_Logout()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {});
  };

  return (
    <aside className="flex bg-zinc-500 bg-black ">
      {/* First Column */}
      <div className="flex h-screen w-12 flex-col max-[550px]:flex-row max-[550px]:h-auto max-[550px]:justify-center max-[550px]:gap-4 bg-black max-[550px]:w-full items-center space-y-8 border-r border-slate-300 py-8 max-[550px]:py-0 max-[550px]:pt-2 sm:w-16 bg-black">
        {/* Logo */}
        <button className="rounded-lg p-1.5  text-slate-500 transition-colors duration-200  focus:outline-none  bg-black text-blue-600 max-[550px]:-mb-8">
          <img src={LogoImage} className="h-7 w-7 rounded-full" />
        </button>

        {/* New conversation */}
        <button onClick={createnewConversation} title="New Conversation" className="rounded-lg p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-800 focus:outline-none  bg-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 9h8"></path>
            <path d="M8 13h6"></path>
            <path d="M12.01 18.594l-4.01 2.406v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5"></path>
            <path d="M16 19h6"></path>
            <path d="M19 16v6"></path>
          </svg>
        </button>

        {/* Conversations */}
        <button onClick={() => (props.logged_in_success ? handleShowHistory() : showLoginModal())} title="Conversations" className={` ${show_history ? "bg-slate-800" : ""}  rounded-lg p-1.5 bg-black text-slate-500 transition-colors duration-200 hover:bg-slate-800 focus:outline-none  userHistory`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pointer-events-none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path>
            <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
          </svg>
        </button>

        {/* User */}
        <div className="relative ">
          <button onClick={() => (props.logged_in_success ? togglePopup() : showLoginModal())} title="Profile" className={`rounded-lg p-1.5 bg-black usertoggle text-slate-500  ${isOpen ? "bg-slate-800" : ""} transition-colors duration-200 hover:bg-slate-800 focus:outline-none  userProfile`}>
            {props.logged_in_success ? (
              <img src={props.profile_image} className="h-6 w-6 rounded-full pointer-events-none" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  pointer-events-none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
              </svg>
            )}
          </button>
          <div className={`w-full max-w-sm rounded-lg ${isOpen ? "absolute max-[550px]:right-0" : "hidden"} z-20 border p-3 border-slate-200 bg-black px-3 py-3 shadow `} style={{ width: "250px", border: ".5px solid gray" }}>
            <div className="flex items-center justify-between ">
              <div className="flex">
                <div className="relative inline-flex w-10 ">
                  {props.profile_image ? (
                    <img src={props.profile_image} className="h-10 w-10 rounded-full" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                    </svg>
                  )}
                </div>
                <div className="ml-4 flex flex-col justify-center gap-y-1">
                  <h3 className="text-sm font-bold text-slate-300">{props.name}</h3>
                  <span className="text-xs text-slate-300">{props.email}</span>
                  <button onClick={onLogout} className="cursor-pointer hover:text-white hover:bg-red-500 text-sm mt-2 rounded-xl">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Column */}
      <div className={`h-screen w-62 overflow-y-auto py-8  z-101 ${show_history ? "fixed z-10 transition ease-in-out" : "hidden w-0"} bg-black `} style={{ borderRight: ".5px solid gray" }}>
        <div className="flex justify-between bg-black pr-2 items-center">
          <div>
            <h2 className="inline px-5 text-lg font-medium text-slate-100 ">Chats</h2>
            <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-slate-200">{props.chat_list.length}</span>
          </div>
          <a onClick={() => setShowHistory(false)} className="cursor-pointer rounded-full w-5 h-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </a>
        </div>

        <div className="mx-2 mt-8 space-y-4">
          <label htmlFor="chat-input" className="sr-only">
            Search chats
          </label>
          <div className="relative">
            <input
              id="search-chats"
              type="text"
              value={search_chat}
              onChange={(e) => setSearchChat(e.target.value)}
              onKeyUp={handleKeyDown}
              className="w-full rounded-lg border border-slate-300 p-3 pr-10 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="Search chats"
              rows="1"
              required
            />
            <button type="button" onClick={searchChat} className="absolute bottom-2 right-2.5 rounded-lg p-1.5 bg-black text-slate-500 transition-colors duration-200 hover:bg-slate-800 focus:outline-none ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 9h8"></path>
                <path d="M8 13h5"></path>
                <path d="M11.008 19.195l-3.008 1.805v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"></path>
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M20.2 20.2l1.8 1.8"></path>
              </svg>
              <span className="sr-only">Search chats</span>
            </button>
          </div>
          <div className="overflow-auto bg-zinc-900 flex flex-col h-80">
            {props.chat_list.map((chat, i) => {
              return (
                <>
                  <div type="button" onClick={() => getMessage(chat._id)} className={`flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors text-slate-200 duration-200 hover:bg-slate-800 focus:outline-none ${chat._id === props.chatId ? "bg-slate-800" : ""}`} key={i}>
                    <h1 className="text-sm font-medium capitalize text-sm text-slate-200">{chat.preview.length > 30 ? <>{chat.preview.slice(0, 30)}...</> : chat.preview}</h1>
                    <p className="text-xs text-slate-400">{chat.date}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => ({
  chatId: state.chat_store.chatId,
  chat_list: state.chat_store.chat_list,
  name: state.login_store.datalist.name,
  email: state.login_store.datalist.email,
  profile_image: state.login_store.datalist?.profile_image,
  logged_in_success: state.login_store.datalist?.logged_in_success,
});
const mapDispatchToProps = (dispatch) => ({
  Get_User_Logout: () => dispatch(GetUserLogout()),
  Chat_Reset_Chat_Data: () => dispatch(ChatResetChatData()),
  Chat_Get_Message_List: () => dispatch(ChatGetMessageList()),
  Chat_Set_Chat_Id: (chatId) => dispatch(ChatSetChatId(chatId)),
  Chat_Get_Chat_List: (text) => dispatch(ChatGetChatList(text)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
