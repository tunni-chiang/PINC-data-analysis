import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Auth from "../../components/auth/Auth";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { userLogout, userLogin, selectUser, selectIsLoggedIn } from "../../store/slices/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./nav.css";
Modal.setAppElement("#root");
function Nav({ light }: any) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const nav_links = { About: "/about", Home: "/" };

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "black";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const logout = () => {
    dispatch(userLogout());
    removeCookie("user", { path: "/" });
    toast.success("Successfully logged out");
  };

  const checkAuth = async () => {
    try {
      let response = await axios.get("http://localhost:3001/users/read", {
        headers: {
          "x-access-token": cookies.user,
        },
      });

      let status: any = response.data;
      if (status.success) {
        dispatch(userLogin({ username: status.data.username, token: status.data.referral_token }));
      } else {
        logout();
      }
    } catch (err) {}
  };

  useEffect(() => {
    checkAuth();
  }, [cookies.user]);

  return (
    <div className="nav-container">
      {isLoggedIn && (
        <i
          onClick={() => navigate(`/u/${user.username}`)}
          className={`fa fa-user user_icon ${light && "light_mode"}`}
          aria-hidden="true"
        ></i>
      )}

      {!isLoggedIn && (
        <p className={`nav-element ${light && "light_mode"}`} onClick={openModal}>
          Login
        </p>
      )}

      {isLoggedIn && (
        <>
          <p className={`nav-element ${light && "light_mode"}`} onClick={logout}>
            Logout
          </p>
          <p className={`nav-element ${light && "light_mode"}`} onClick={() => navigate(`/stats`)}>
            Stats
          </p>
        </>
      )}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.20)",
          },
          content: {
            top: "50%",
            left: "50%",
            border: "none",
            right: "auto",
            height: "420px",
            width: "350px",
            bottom: "auto",
            backgroundColor: "rgb(255,255,255)",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
          },
        }}
        contentLabel="Auth Section"
      >
        <i onClick={closeModal} className="fas fa-times black_icon"></i>
        <div className="modal_header">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        </div>
        <Auth close_modal_cb={closeModal} />
      </Modal>

      {Object.entries(nav_links).map(([key, value]) => {
        return (
          <Link key={key} className={`nav-element ${light && "light_mode"}`} to={value}>
            {key}
          </Link>
        );
      })}
    </div>
  );
}
export default Nav;
