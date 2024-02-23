import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import ChatAnswer from "~/components/chat/chat-answer";

import { useLoader } from "~/hooks/useLoader";

import { ChatSetQuestion, ChatGetQuestionReply } from "~/actions/chat-actions";

const ChatContainer = (props) => {
  const question_ref = useRef(null);
  const [question, setQuestion] = useState("");

  const [loader, startLoader, endLoader] = useLoader(false);

  useEffect(() => {
    if (props.question !== "") {
      const textarea = document.getElementById("chat-box");
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [props.question]);

  useEffect(() => {
    if (question_ref.current) {
      question_ref.current.style.height = "0px";
      const scrollHeight = question_ref.current.scrollHeight;

      question_ref.current.style.height = scrollHeight + "px";
    }
  }, [question_ref.current, question]);

  const generateReply = () => {
    props.Chat_Set_Question(question);
    startLoader();
    props.Chat_Get_Question_Reply(question).then(endLoader);
    setQuestion("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !loader) {
      generateReply(question);
    }
  };

  return (
    <>
      <div className="flex h-[97vh] max-[550px]:h-[77vh] m-auto  w-full flex-col p-5 pb-0" style={{ maxWidth: "850px" }}>
        <div id="chat-box" className="flex-1  space-y-6 overflow-auto rounded-2xl  bg-black outline-red   p-4 text-sm leading-6 text-slate-900 shadow-sm sm:text-base sm:leading-7 border-white" style={{ border: "2px solid" }}>
          {props.message_list.map((message, i) => {
            return (
              <div className="flex flex-col -gap-2" key={i}>
                <div className="flex px-2 py-4 sm:px-4">
                  {props.logged_in_success ? (
                    <img src={props.profile_image} className="h-9 w-9 -ml-5 mr-4 rounded-full" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 -ml-5 mr-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                    </svg>
                  )}
                  <div className="flex max-w-3xl items-center">
                    <p>{message.question}</p>
                  </div>
                </div>

                <div className="mb-4 flex rounded-xl bg-zinc-900 px-2 py-6 sm:px-4">
                  <img className="-ml-1 mr-4 h-8 w-8 rounded-full" src="https://cdn.dribbble.com/userupload/10543013/file/still-ea4dc478539e52662286d4f78a76f56f.gif?resize=400x0" />
                  <div className="flex max-w-3xl items-center rounded-xl">
                    <ChatAnswer answer={message.answer} />
                  </div>
                </div>
              </div>
            );
          })}

          {!props.question && props.message_list.length === 0 && (
            <>
              <div className="flex flex-col items-center mt-10 gap-2">
                <h1 className="text-4xl  text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 max-[550px]:text-2xl">Hello, {props.name}</h1>
                <h1 className="text-4xl text-gray-700  max-[550px]:text-2xl">How can I help you today?</h1>
              </div>
            </>
          )}

          {props.question ? (
            <div className="flex px-2 py-4 sm:px-4">
              {props.logged_in_success ? (
                <img src={props.profile_image} className="h-9 w-9 -ml-5 mr-4 rounded-full" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 -ml-5 mr-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                </svg>
              )}
              <div className="flex max-w-3xl items-center">
                <p>{props.question}</p>{" "}
              </div>
            </div>
          ) : null}

          {loader ? (
            <div className="flex items-start">
              <img src={"https://raw.githubusercontent.com/emjose/kinetic-loader-2/main/Assets/007-kinetic-2.gif"} style={{ height: "150px", width: "150px" }} />
            </div>
          ) : null}
        </div>

        <form className="mt-2">
          <label htmlFor="chat-input" className="sr-only">
            Enter your prompt...
          </label>
          <div className="relative rounded-full " style={{ border: ".5px solid gray" }}>
            <textarea
              id="chat-input"
              name="question"
              value={question}
              ref={question_ref}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyUp={handleKeyDown}
              className="block w-full resize-none rounded-full border-none bg-zinc-900 p-4 pl-10 pr-20 max-[550px]:pl-2   text-sm text-slate-300  sm:text-base"
              placeholder="Enter your prompt..."
              rows="1"
              required
            />
            <button
              type="button"
              onClick={generateReply}
              disabled={question.length < 1 || loader}
              className={`absolute  bottom-2 right-2.5 rounded-full ${
                question.length < 1 || loader ? "bg-blue-300 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
              } px-4 py-2 text-sm font-medium text-slate-200  focus:outline-none focus:ring-4 focus:ring-blue-300  sm:text-base flex gap-2 items-center `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10 14l11 -11"></path>
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  chatId: state.chat_store.chatId,
  question: state.chat_store.question,
  name: state.login_store.datalist.name,
  message_list: state.chat_store.message_list,
  profile_image: state.login_store.datalist?.profile_image,
  logged_in_success: state.login_store.datalist?.logged_in_success,
});
const mapDispatchToProps = (dispatch) => ({
  Chat_Set_Question: (question) => dispatch(ChatSetQuestion(question)),
  Chat_Get_Question_Reply: (question) => dispatch(ChatGetQuestionReply(question)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
