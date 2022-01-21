import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, selectUser, selectIsLoggedIn } from "../../store/slices/userSlice";
import { toast } from "react-toastify";

import axios from "axios";

function Login({ switch_auth_cb, error_msg_cb, close_modal_cb }: any) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cookies, setCookie] = useCookies(["user"]);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const toast_notif = toast.loading("Loading...");
    try {
      const body = { username, password };

      let response = await axios.post("http://localhost:3001/users/authenticate", body, {
        headers: {
          "x-access-token": cookies.user,
        },
      });
      let status: any = response.data;
      console.log(JSON.stringify(status));
      if (status.success === false) {
        toast.dismiss(toast_notif);
        toast.warn(status.message);
        return;
      }

      dispatch(userLogin({ username }));
      setCookie("user", status.data.token, { path: "/" });

      toast.dismiss(toast_notif);
      toast.success("Successfully logged in");
      close_modal_cb();
    } catch (err) {
      toast.dismiss(toast_notif);
      toast.error("Connection Error");
    }
  };

  return (
    <div className="auth_container">
      <p className="auth_title">Log into your account</p>
      <div className="auth_form">
        <form onSubmit={(e) => handleLogin(e)}>
          <p className="auth_label_text">Username</p>
          <input
            placeholder="Enter username"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="auth_label_text">Password</p>
          <input
            placeholder="Enter password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth_buttons">
            <p className="switch_auth" onClick={() => switch_auth_cb(false)}>
              Create an account
            </p>

            <button className="auth_button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
