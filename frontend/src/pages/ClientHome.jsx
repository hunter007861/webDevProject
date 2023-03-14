import React from 'react';
import './ClientHome.css';
import Navbar from '../components/Navbar';
import heroBg from '../assets/hero-bg.jpg';
import Carosel from '../components/Carosel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Of1 from "../assets/o1.jpg"
import Of2 from "../assets/o2.jpg"


const ClientHome = () => {
    return (
        <div>
            <div className='hero_area'>
                <div className='bg-box'>
                    <img src={heroBg} alt="" />
                </div>
                <Navbar />
                <Carosel/>
            </div>
            <div className='offer_section layout_padding-bottom'>
            <div class="offer_container">
      <div class="container ">
        <div class="row">
          <div class="col-md-6  ">
            <div class="box ">
              <div class="img-box">
                <img src={Of1} alt=""/>
              </div>
              <div class="detail-box">
                <h5>
                  Tasty Thursdays
                </h5>
                <h6>
                  <span>20%</span> Off
                </h6>
                <a href="">
                  Order Now <ShoppingCartIcon/>
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-6  ">
            <div class="box ">
              <div class="img-box">
                <img src={Of2} alt=""/>
              </div>
              <div class="detail-box">
                <h5>
                  Pizza Days
                </h5>
                <h6>
                  <span>15%</span> Off
                </h6>
                <a href="">
                  Order Now <ShoppingCartIcon/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

            </div>
        </div>
    )
}

export default ClientHome