import { useEffect, useState } from "react";
import { connect } from "react-redux";

import Sidebar from "~/components/chat/sidebar";
import LoginModal from "~/components/common/login-modal";
import ChatContainer from "~/components/chat/chat-container";

import { ChatGetChatList } from "~/actions/chat-actions";

function ChatScreen(props) {
  const [is_login_modal_hidden, setLoginModalHidden] = useState(true);

  useEffect(() => {
    if (props.logged_in_success) {
      props.Chat_Get_Chat_List();
    }
  }, [props.logged_in_success]);

  useEffect(() => {
    const handler = (e) => !e.target.matches(".userProfile") && !e.target.matches(".loginModal") && !e.target.matches(".userHistory") && !e.target.matches(".loginButton") && hideLoginModal();
    !is_login_modal_hidden && window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [is_login_modal_hidden]);

  const hideLoginModal = () => {
    setLoginModalHidden(true);
  };

  const showLoginModal = () => {
    setLoginModalHidden(false);
  };

  return (
    <div className="w-full bg-black">
      <div className="flex gap-2 max-[550px]:flex-col max-[550px]:gap-0 h-screen m-auto  overflow-y-scroll no-scrollbar bg-black" style={{ maxWidth: "1200px" }}>
        <Sidebar showLoginModal={showLoginModal} />
        <ChatContainer />
      </div>
      <LoginModal is_login_modal_hidden={is_login_modal_hidden} hideLoginModal={hideLoginModal} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  logged_in_success: state.login_store.datalist?.logged_in_success,
});
const mapDispatchToProps = (dispatch) => ({
  Chat_Get_Chat_List: () => dispatch(ChatGetChatList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
