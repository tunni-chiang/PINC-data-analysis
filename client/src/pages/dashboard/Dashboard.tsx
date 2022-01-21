import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import mountain from "../../assets/galaxy.jpg";
import default_pfp from "../../assets/default_pfp.png";
import AdminPanel from "../../components/user/AdminPanel";
import Nav from "../../components/nav/Nav";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { userLogout, userLogin, selectUser, selectIsLoggedIn } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { sleep } from "../../helper/sleep";

import "./dashboard.css";
import { toast } from "react-toastify";

function Dashboard() {
  const { username } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    dispatch(userLogout());
    removeCookie("user", { path: "/" });
  };

  useEffect(() => {
    if (!cookies.user) {
      toast.error("Must log in to access content");
      logout();
      navigate("/");
    }
  }, [cookies.user]);

  useEffect(() => {
    sleep(500).then(() => setLoading(false));
  }, []);
  const override = `
    background-color: #282c34;
  `;
  return (
    <div className="dashboard">
      <RingLoader color="black" loading={loading} size={60} />
      {!loading && (
        <div className="dashboard_container">
          <div className="dashboard_header" style={{ backgroundImage: `url(${mountain})` }}>
            <Nav light={false} />
            <img className="dashboard_pfp" src={default_pfp}></img>
          </div>
          <div className="dashboard_info_container">
            <div className="dashboard_list">
              <div className="dashboard_info_element">{username}</div>
              <div className="dashboard_element">Admin Panel</div>
              <div className="dashboard_element">Settings</div>
            </div>
            <div className="dashboard_info">
              <AdminPanel ref_token={user.token} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
