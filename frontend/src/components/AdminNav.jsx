import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slice/loginSlice';

const AdminNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Crave Cafe</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/">
                            <a class="nav-link active" aria-current="page">Home</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=>{dispatch(logout())}}>Logout</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav