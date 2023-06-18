import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const Logout = async() =>{
        try{
            await axios.delete('http://localhost:5000/logout');
            navigate("/");
        } catch(error){
            console.log(error);
        }

    }


  return (

    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
    <div className="container">
      <div className="navbar-brand">
        <img src={require('./assets/logoremovebg.png')} width="155" height="" alt='logo'/>
    
        <a href="/" role='button' className='navbar-burger burger' aria-label='menu'>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
        </div>
        
      <div id="navbarBasicExample" className="navbar-end">
        <div className="navbar-start">
          <Link to="/dashboard" className="navbar-item">
            Beranda
          </Link>
          <Link to="/pemesanan" className="navbar-item">
            Pemesanan
          </Link>
          <Link to='/akun' className="navbar-item">
            Akun
          </Link>
        </div>
    
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={Logout} className="button is-danger">
                <strong>Log Out</strong>
              </button>
            </div>
          </div>
        </div>

      </div>
      </div>
    </nav>
  );
}

export default Navbar
