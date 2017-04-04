import React from "react";
import { LineChart } from "react-d3-basic";

class Dashboard extends React.Component {
  render() {
    let chartSeries =  [
      {
        field: 'y',
        name: 'y',
        color: 'cornflowerblue'
      }
    ];

    let x = (d) => {
      return d.x;
    };

    // let y = (d) => {
    //   return d.value;
    // };

    return <div>
      Welcome to our awesome dashboard!
      <LineChart
        margins={{left: 100, right: 100, top: 50, bottom: 50}}
        data={[{x: 1, y: 1}, {x: 2, y: 4} , {x: 3, y: 9}]}
        width={500}
        height={300}
        chartSeries={chartSeries}
        x={x}
      />
    </div>;
  }
}

export default Dashboard;
