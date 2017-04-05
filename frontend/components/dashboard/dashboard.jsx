import React from "react";

import ToneTrends from "./tone_trends";

class Dashboard extends React.Component {
  render() {
    return <div className="dashboard">
        <div className="dashboard-tabs">
          <div className="dashboard-tab selected-tab">Tone Trends</div>
          <div className="dashboard-tab unselected-tab">Personality</div>
          <div className="dashboard-tab unselected-tab">Documents</div>
        </div>
        <ToneTrends />
      </div>;
  }
}

export default Dashboard;
