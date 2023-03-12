import React, { useState } from 'react'
import './navbar.css'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
    const [showNav,setShowNav]= useState("show")
    return (
        <div className='header_section'>
            <div className='container'>
                <div className='navbar navbar-expand-lg custom_nav-container '>
                    <div className='navbar-brand font1'>
                        <span>Feane</span>
                    </div>
                    <button className="navbar-toggler" type="button" aria-expanded={showNav === "" ?false:true} onClick={()=>{
                        if(showNav===""){
                            setShowNav("open")
                        }
                        else{
                            setShowNav("")
                        }
                    }}>
                        <span className=""> </span>
                    </button>
                    <div className={"collapse navbar-collapse show " + showNav} id="navbarSupportedContent">
                        <ul className="navbar-nav  mx-auto ">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Menu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Book Table</a>
                            </li>
                        </ul>
                        <div className='user_option d-flex align-items-center justify-content-center'>
                            <PersonIcon style={{ margin: "0 10px" }} />
                            <ShoppingCartIcon style={{ margin: "0 10px" }} />
                            <a href="/" className="order_online">
                                Order Online
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar