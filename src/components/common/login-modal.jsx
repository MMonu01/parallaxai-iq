import { connect } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

import { GoogleLogin } from "~/actions/login-actions";

const LoginModal = ({ is_login_modal_hidden, hideLoginModal, ...props }) => {
  const userLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      props
        .Google_Login(tokenResponse.access_token)
        .then(() => {
          hideLoginModal();
        })
        .catch(() => {});
    },
  });

  return (
    <div className={`py-4 bg-black bg-opacity-60 h-screen ${is_login_modal_hidden ? "hidden" : ""} flex justify-center items-center fixed z-100 top-0 right-0 left-0 bottom-0`}>
      <div className="flex flex-col justify-between rounded-2xl bg-zinc-900  p-8 min-w-20 loginModal" style={{ width: "250px" }}>
        <h1 className="m-auto flex text-3xl items-center gap-2 text-white pointer-events-none">Sign in</h1>
        <button onClick={userLogin} className="mt-8 block rounded-md  px-3 py-2 text-center text-md font-semibold leading-6 text-black shadow-sm hover:bg-blue-50 cursor-pointer flex justify-center  items-center cursor-pointer loginButton">
          <img src={"	https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"} className="w-10 h-6 pointer-events-none" /> Google
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Google_Login: (token) => dispatch(GoogleLogin(token)),
});

export default connect(null, mapDispatchToProps)(LoginModal);
