import React from 'react';
import './ClientHome.css';
import Navbar from '../components/Navbar';
import heroBg from '../assets/hero-bg.jpg';
import Carosel from '../components/Carosel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Of1 from "../assets/o1.jpg"
import Of2 from "../assets/o2.jpg"
import CafeMenu from '../components/CafeMenu';
import About from '../components/About';


const ClientHome = () => {
    return (
        <div>
            <div className='hero_area'>
                <div className='bg-box'>
                    <img src={heroBg} alt="" />
                </div>
                <Navbar />
                <Carosel />
            </div>
            <div className='offer_section layout_padding-bottom'>
                <div className="offer_container">
                    <div className="container ">
                        <div className="row">
                            <div className="col-md-6  ">
                                <div className="box ">
                                    <div className="img-box">
                                        <img src={Of1} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>
                                            Tasty Thursdays
                                        </h5>
                                        <h6>
                                            <span>20%</span> Off
                                        </h6>
                                        <a href="/">
                                            Order Now <ShoppingCartIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6  ">
                                <div className="box ">
                                    <div className="img-box">
                                        <img src={Of2} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>
                                            Pizza Days
                                        </h5>
                                        <h6>
                                            <span>15%</span> Off
                                        </h6>
                                        <a href="/">
                                            Order Now <ShoppingCartIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <CafeMenu />
            <About/>
        </div>
    )
}

export default ClientHome