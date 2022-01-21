import React from "react";
import Nav from "../../components/nav/Nav";
import Greeting from "../../components/greeting/Greeting";
import InfoRow from "../../components/info_row/InfoRow";
import "./home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="image-container">
        <div className="header-container">
          <Nav light={false} />
          <Greeting />
        </div>
      </div>
      <InfoRow />
    </div>
  );
}

export default Home;
