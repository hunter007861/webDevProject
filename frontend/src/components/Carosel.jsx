import React from 'react'
import './Carosel.css'

const Carosel = () => {
    return (
        <div className='slider_section'>
            <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="2000">
                        <div className="container ">
                            <div className="row">
                                <div className="col-md-7 col-lg-6 ">
                                    <div className="detail-box">
                                        <h1>
                                            Fast Food Restaurant
                                        </h1>
                                        <p>
                                        Fast food restaurants are popular dining destinations that offer quick and convenient meals to customers on the go. They typically feature a menu of affordable, pre-prepared dishes that are ready to serve in a matter of minutes.                                        </p>
                                        <div className="btn-box">
                                            <a href="/" className="btn1">
                                                Order Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item " data-bs-interval="2000">
                        <div className="container ">
                            <div className="row">
                                <div className="col-md-7 col-lg-6 ">
                                    <div className="detail-box">
                                        <h1>
                                            Fast Food Restaurant
                                        </h1>
                                        <p>
                                            Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.
                                        </p>
                                        <div className="btn-box">
                                            <a href="/" className="btn1">
                                                Order Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <div className="container ">
                            <div className="row">
                                <div className="col-md-7 col-lg-6 ">
                                    <div className="detail-box">
                                        <h1>
                                            Fast Food Restaurant
                                        </h1>
                                        <p>
                                            Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.
                                        </p>
                                        <div className="btn-box">
                                            <a href="/" className="btn1">
                                                Order Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#customCarousel1" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#customCarousel1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#customCarousel1" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carosel