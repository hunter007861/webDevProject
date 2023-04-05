import React from 'react';
import aboutImg from '../assets/about-img.png'
import "./About.css";

const About = () => {
  return (
    <div className="about_section layout_padding" id="about">
      <div className="container  ">

        <div className="row">
          <div className="col-md-6 ">
            <div className="img-box">
              <img src={aboutImg} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="detail-box">
              <div className="heading_container">
                <h2>
                  We Are Crave Cafe
                </h2>
              </div>
              <p>
              Crave Cafe is a popular coffee shop and restaurant chain that offers a wide range of food and drink options to its customersThe menu at Crave Cafe features a variety of breakfast items, sandwiches, salads, and specialty dishes, all made with fresh and high-quality ingredients. The coffee selection is also extensive, featuring a range of espresso drinks, drip coffee, and iced beverages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About