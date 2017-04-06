import React from "react";

class Splash extends React.Component {
  render() {
    return (
      <div className="splash-page-container">
        <div className="image-container">
          <img className="img1" src="https://res.cloudinary.com/sharebnb/image/upload/v1491488792/thomas-lefebvre-3950_dtjxuq.jpg" />
          <img className="img2" src="https://res.cloudinary.com/sharebnb/image/upload/v1491497396/corinne-kutz-211251_vse5fa.jpg" />
          <img className="img3" src="https://res.cloudinary.com/sharebnb/image/upload/v1491497396/fabian-irsara-92113_v06r7y.jpg" />
          <img className="img4" src="https://res.cloudinary.com/sharebnb/image/upload/v1491497396/glenn-carstens-peters-203007_f1ubdz.jpg" />
          <img className="img5" src="https://res.cloudinary.com/sharebnb/image/upload/v1491497396/bonnie-kittle-186235_yoz438.jpg" />
          <img className="img6" src="https://res.cloudinary.com/sharebnb/image/upload/v1491497396/parker-byrd-139348_tiqg7x.jpg" />
        </div>
      </div>
    )
  }
}

export default Splash;
