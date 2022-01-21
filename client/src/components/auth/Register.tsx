import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, selectUser, selectIsLoggedIn } from "../../store/slices/userSlice";
import { toast } from "react-toastify";

function Register({ switch_auth_cb, error_msg_cb, close_modal_cb }: any) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [cookies, setCookie] = useCookies(["user"]);

  const handleRegister = async (event: any) => {
    event.preventDefault();

    const toast_notif = toast.loading("Loading...");
    try {
      const body = { username, password, token };

      let response = await axios.post("http://localhost:3001/users/create", body);
      let status: any = response.data;

      if (!status.success) {
        toast.dismiss(toast_notif);
        toast.warn(status.message);
        return;
      }

      dispatch(userLogin({ username }));
      setCookie("user", status.data.token, { path: "/" });
      toast.dismiss(toast_notif);
      toast.success("Successfully created account");
      close_modal_cb();
    } catch (err) {}
  };

  return (
    <div className="auth_container">
      <p className="auth_title">Register an account</p>
      <div className="auth_form">
        <form onSubmit={(e) => handleRegister(e)}>
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
          <p className="auth_label_text">Referral Token</p>

          <input
            placeholder="Enter access token"
            value={token}
            type="text"
            onChange={(e) => setToken(e.target.value.toUpperCase())}
          />
          <div className="auth_buttons">
            <p className="switch_auth" onClick={() => switch_auth_cb(true)}>
              Already have an account? Log in
            </p>

            <button className="auth_button" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
