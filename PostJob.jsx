import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main.jsx";
const PostJob = () => {
  const [title, setTitle] = useState("");
  const [criteria, setcriteria] = useState("");
  const [discipline, setdiscipline] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setamount] = useState("");
  const [awardPrize, setawardPrize] = useState("");
  const [duration, setduration] = useState("");
  const [awardType, setawardType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (awardType === "amount ") {
      setawardPrize("");
      setduration("");
    } else if (awardType === "Cash Prize") {
      setamount("");
    } else {
      setamount("");
      setawardPrize("");
      setduration("");
    }
    await axios
      .post(
        "http://localhost:4003/api/v1/job/post",
        amount.length >= 4
          ? {
              title,
              criteria,
              discipline,
              country,
              city,
              location,
              amount,
            }
          : {
              title,
              criteria,
              discipline,
              country,
              city,
              location,
              awardPrize,
              duration,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Scholarship Giver")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW Scholarship</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Scholarship Title"
              />
              <select
                value={discipline}
                onChange={(e) => setdiscipline(e.target.value)}
              >
                <option value="">Select Discipline</option>
                <option value="Convocation">MCM SCHOLARSHIP</option>
                <option value="Non-Convocation">
                  Non-convocation
                </option>
                <option value="MCM Scholarships">
                  MCM Scholarships
                </option>
                <option value="Other Scholarship">
                 Other Scholarships
                </option>
                <option value="Fee Waiver">Fee Waiver</option>
                <option value="Yashasvi ">
                 Yashsvi
                </option>
                <option value="NSP">NSP</option>
                <option value="Some Other Scholarships">
                Some Other Scholarships
                </option>
                <option value="Institue Prizes">
                  Institute Prizes
                </option>
                <option value="Donor Based Awards">Donor Based Awards</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <div className="salary_wrapper">
              {/* <select
                value={awardType}
                onChange={(e) => setawardType(e.target.value)}
              > */}
                {/* <option value="default">Select Scholarship Type</option> */}
                {/* <option value="amount">amount</option>
                <option value="duration">duration</option> */}
              {/* </select> */}
              {/* <div>
                {awardType === "default" ? (
                  <p>Please provide Scholarship Type *</p>
                ) : awardType === "duration" ? (
                  <input
                    type="number"
                    placeholder="Enter Duration"
                    value={amount}
                    onChange={(e) => setamount(e.target.value)}
                  />
                ) : ( */}
                  {/* // <div className="ranged_salary"> */}
                    {/* <input
                      type="number"
                      placeholder="xyz"
                      value={amount}
                      onChange={(e) => setawardPrize(e.target.value)}
                    /> */}
                    {/* <input
                      type="number"
                      placeholder="xyz"
                      value={duration}
                      onChange={(e) => setduration(e.target.value)}
                    /> */}
                  {/* </div>
                )} */}
              {/* </div> */}
            </div>
            {/* <textarea
              rows="10"
              value={criteria}
              onChange={(e) => setcriteria(e.target.value)}
              placeholder="Scholarship Criteria"
            /> */}
            <button type="submit">Upload Scholarship</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;