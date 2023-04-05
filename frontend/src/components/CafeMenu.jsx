import React, { useEffect, useState } from 'react'
import './CafeMenu.css'
import P1 from '../assets/f1.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Axios } from '../AxiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slice/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CafeMenu = () => {
    const [products, setProducts] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.items)
    const user = useSelector((state) => state.login.user)

    useEffect(() => {
        Axios.get("/getproducts").then(async (res) => {
            setProducts(res.data)
        })
    }, [])

    return (
        <div className='food_section layout_padding-bottom' id="menu">
            <div className='container'>
                <div className='heading_container heading_center'>
                    <h2 className='font1'>Our Menu</h2>
                </div>
                <ul className="filters_menu">
                    <li className="active" data-filter="*">All</li>
                    <li data-filter=".burger">Burger</li>
                    <li data-filter=".pizza">Pizza</li>
                    <li data-filter=".pasta">Pasta</li>
                    <li data-filter=".fries">Fries</li>
                </ul>
                <div className='filter-content'>
                    <div class="row grid">
                        {
                            products.map((i) => {
                                return (
                                    <div class="col-sm-6 col-lg-4 all pizza">
                                        <div class="box">
                                            <div>
                                                <div class="img-box">
                                                    <img src={`http://localhost:5000/getimage/${i.image}`} alt="" />
                                                </div>
                                                <div class="detail-box">
                                                    <h5>
                                                        {i.productName}
                                                    </h5>
                                                    <p>
                                                        {i.description}
                                                    </p>
                                                    <div class="options">
                                                        <h6>
                                                            € {i.price}
                                                        </h6>
                                                        <a onClick={()=>{
                                                            if(user.firstName !== undefined){
                                                                dispatch(addToCart([...cartItems,i]))
                                                                toast.success("Added to Cart", {
                                                                    position: "top-right",
                                                                    autoClose: 5000,
                                                                    hideProgressBar: false,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: true,
                                                                    draggable: true,
                                                                    progress: undefined,
                                                                    theme: "colored",
                                                                });
                                                            }
                                                            else{
                                                                navigate("/login")
                                                            }
                                                            }}>
                                                            <ShoppingCartIcon />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CafeMenu