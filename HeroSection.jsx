import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Scholarships",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "AvailableScholarships",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Scholarship Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Scholarship Givers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>


    
  
      <div className="heroSection">
        <div className="container">
          <div className="title">
            
            <h2>FIND YOUR SCHOLARSHIPS</h2>
            <p>
            <i>Kind gesture of bestowing the prestigious "Smt. Shashi Krishna Medal" upon me at the Convocation 2020 at IIT Roorkee. I feel that the awards received by an individual during his/her academic and professional life play an essential role in encouraging the individual. The prestigious award has similarly motivated me to continue my efforts in working towards advancing the frontiers of technology. . I thank you from the bottom of my heart for this award and motivating me to achieve my goals.</i>
          <b>- Pranjal Mathu Gajare (B.Tech Electrical Engineering 2020)</b>  
            </p>
          </div>
          <div className="image" >
            <img src="public/iitrthomson66.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;