import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import AppRoute from "~/routes";

import Spinner from "~/components/common/spinner";

import { useLoader } from "~/hooks/useLoader";

import { GetUserDetails } from "~/actions/login-actions";

const AppContainer = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, startLoader, endLoader] = useLoader(true);

  useEffect(() => {
    startLoader();
    props.Get_User_Details().then(endLoader);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") navigate("/");
  }, []);

  return (
    <div>
      {loader ? (
        <div className="flex justify-center items-center" style={{ height: "100vh", width: "100vw" }}>
          <Spinner />
        </div>
      ) : (
        <AppRoute />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  Get_User_Details: () => dispatch(GetUserDetails()),
});
export default connect(null, mapDispatchToProps)(AppContainer);
