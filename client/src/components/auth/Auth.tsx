import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, selectUser, selectIsLoggedIn } from "../../store/slices/userSlice";
import Login from "./Login";
import Register from "./Register";

import { useCookies } from "react-cookie";

import "./auth.css";

function Auth({ close_modal_cb }: any) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [inLogInScreen, setInLogInScreen] = useState<boolean>(true);
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <div>
      <div className="container">
        {inLogInScreen && (
          <Login switch_auth_cb={setInLogInScreen} close_modal_cb={close_modal_cb} />
        )}
        {!inLogInScreen && (
          <Register switch_auth_cb={setInLogInScreen} close_modal_cb={close_modal_cb} />
        )}
      </div>
    </div>
  );
}

export default Auth;
