import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "MCM SCHOLARSHIP",
      subTitle: "147 Open Scholarship",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Non-Convocation",
      subTitle: "50 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "MCM Scholarship",
      subTitle: "10 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "Fee Waiver",
      subTitle: "1500",
      icon: <MdAccountBalance />,
    },
    {
      id: 5,
      title: "NSP",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
        id: 5,
        title: "Other Government Scholarships",
        subTitle: "150 Open Positions",
        icon: <MdAccountBalance />,
      },
   
 
   
  ];
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;