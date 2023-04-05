import React from 'react'
import './navbar.css'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Fade, IconButton, Paper, Popper, Typography } from '@mui/material';
import P1 from '../assets/f1.png'
import P2 from '../assets/f2.png'
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slice/loginSlice';
import { addToCart } from '../slice/cartSlice';
import { ToastContainer as Toast, toast } from 'react-toastify';


const Navbar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items)

    const user = useSelector((state) => state.login.user)

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
        setPlacement(newPlacement);
    };

    const deleteCart = (i) => {
        let _delete = cartItems.filter((val) => val._id !== i._id);
        dispatch(addToCart(_delete))
    }
    return (
        <div className='header_section'>
            <Toast />
            <div className='container'>
                <nav className='navbar navbar-expand-lg custom_nav-container '>
                    <div className='navbar-brand font1'>
                        <span>Crave Cafe</span>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className=""> </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav  mx-auto ">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#menu">Menu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#about">About</a>
                            </li>
                        </ul>
                        <div className='user_option d-flex align-items-center justify-content-center'>
                            <IconButton className="icon_button" onClick={() => { navigate("/login") }}>
                                <PersonIcon />
                            </IconButton>
                            <IconButton className="icon_button" onClick={handleClick('bottom-end')}>
                                <ShoppingCartIcon />
                                <Badge style={{ marginTop: "15px" }} badgeContent={cartItems.length} color="secondary"></Badge>
                            </IconButton>
                            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Paper className='cartPaper'>
                                            <h5 className='font1 ps-2 py-2 text-center'><b>Cart</b></h5>
                                            <div className='cartBody'>
                                                {cartItems.map((i) => {
                                                    return (<div className='cartItem mx-2 d-flex align-items-center'>
                                                        <img style={{ width: "25%" }} src={`http://localhost:5000/getimage/${i.image}`} />
                                                        <div className='cartDetails ms-2'>
                                                            <p><b>{i.productName}</b></p>
                                                            <p>{i.price}</p>
                                                        </div>
                                                        <IconButton onClick={() => { deleteCart(i) }}>
                                                            <Delete />
                                                        </IconButton>
                                                    </div>)
                                                })}

                                            </div>
                                            <button className="checkoutButton block my-2" onClick={() => {
                                                toast.success("Your Order will be Delivered Soon", {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "colored",
                                                });
                                            }}>
                                                Checkout
                                            </button>
                                        </Paper>
                                    </Fade>
                                )}
                            </Popper>
                            <a className="order_online" onClick={() => {
                                if (user?.firstName != undefined) {
                                    dispatch(logout())
                                }
                                else {
                                    navigate("/login")
                                }
                            }}>
                                {user?.firstName != undefined ? user.firstName : "Order Online"}
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar