import "./greeting.css";
import { useSelector, useDispatch } from "react-redux";
import { userLogout, userLogin, selectUser, selectIsLoggedIn } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Greeting() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleStatisticsButton = () => {
    if (!isLoggedIn) {
      toast.error("Must log in to access content");
      return;
    }

    navigate("/stats");
  };

  const handleDashboardButton = () => {
    if (!isLoggedIn) {
      toast.error("Must log in to access content");
      return;
    }

    navigate(`/u/${user.username}`);
  };

  return (
    <div className="greeting-container">
      <h1>Hello, {user?.username ? user.username : "user"}!</h1>

      <h4>
        This is a PINC Data analysis website. This site was created for the purpose of analyzing the
        data of pinc students.
      </h4>

      <button className="greeting_button" onClick={handleStatisticsButton}>
        Statistics
      </button>

      <button className="greeting_button" onClick={handleDashboardButton}>
        Dashboard
      </button>
    </div>
  );
}

export default Greeting;
