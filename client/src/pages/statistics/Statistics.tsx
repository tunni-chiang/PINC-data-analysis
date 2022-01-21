import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import mountain from "../../assets/galaxy.jpg";
import default_pfp from "../../assets/pinc.png";
import StatsPanel from "../../components/stats/StatsPanel";
import Nav from "../../components/nav/Nav";
import "./statistics.css";
import FilterOptions from "../../components/stats/FilterOptions";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { userLogout, userLogin, selectUser, selectIsLoggedIn } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RingLoader from "react-spinners/RingLoader";
import { sleep } from "../../helper/sleep";
function Statistics() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedDemographic, setSelectedDemographic] = useState("ethnicity");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const isLoggedIn = useSelector(selectIsLoggedIn);
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

  return (
    <div className="stats_dashboard">
      <RingLoader color="black" loading={loading} size={60} />
      {!loading && (
        <div className="stats_dashboard_container">
          <div className="stats_dashboard_header" style={{ backgroundImage: `url(${mountain})` }}>
            <Nav light={false} />
          </div>
          <div className="stats_dashboard_info_container">
            <div className="stats_dashboard_list">
              <div
                style={{ backgroundImage: `url(${default_pfp}) ` }}
                className="stats_dashboard_pfp "
              ></div>
              <div className="stats_dashboard_element">Select Filters</div>
              <p className="small_text">
                These filters will be applied to the class you will be selecting to analyze
              </p>
              <FilterOptions select_demographic_cb={setSelectedDemographic} />
            </div>
            <div className="stats_dashboard_info">
              <StatsPanel selected_demographic={selectedDemographic} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Statistics;
