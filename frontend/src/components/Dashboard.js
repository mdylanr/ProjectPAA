import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import Navbar from './Navbar';

const Dashboard = () =>{
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

    const refreshToken = useCallback(async () => {
        try {
          const response = await axios.get('http://localhost:5000/token');
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setExpire(decoded.exp);
        } catch (error) {
          if (error.response) {
            navigate('/');
          }
        }
      }, [navigate]);
    
      useEffect(() => {
        refreshToken();
      }, [refreshToken]);


    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) =>{
        const currentDate = new Date();
        if(token && expire * 1000  < currentDate.getTime()){
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setExpire(decoded.exp);
        }
        return config;
    }, (error)=>{
        return Promise.reject(error);
    });
    
    useEffect(() => {
        const loggedInEmail = localStorage.getItem('email');
        setEmail(loggedInEmail);
    }, []);
 
    const pesan = () =>{
      navigate("/pemesanan");
    }
  
return(
    <>
     {email === "admin@gmail.com" ? <NavbarAdmin /> : <Navbar /> }
    <section className="hero is-info is-medium is-bold">   
        <div className="hero-body">
            <div className='container has-text-'>
                <div className='column is-6 is-offset-3'>
                    <h1 className="title">Selamat Datang di Kereta Api Nusantara</h1>
                    <h2 className="subtitle">
                    Jadikan perjalanan Anda menjadi pengalaman tak terlupakan dengan <strong>Kereta Api Nusantara.</strong> Pesan tiket kereta api Anda sekarang dan jelajahi keindahan Nusantara dengan kenyamanan dan keamanan yang terjamin.
                    </h2>
                </div>
            </div>
        </div>
    </section>
    
    <section className="container mt-4">
            <div className="columns features">
                <div className="column is-3">
                    <div className="card is-shady">
                        <div className="card-image has-text-centered">
                            <img src={require('./assets/station.jpg')} alt='img'/>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <h4>Jember - Jogjakarta</h4>
                                <p>Tersedia kelas eksekutif dari Jember ke Jogja, dengan tiket mulai dari 300.000 rupiah. Nikmati kenyamanan dan fasilitas terbaik dalam perjalanan Anda.</p>
                                <button className="button is-info" onClick={pesan}>Pesan</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-3">
                    <div className="card is-shady">
                        <div className="card-image has-text-centered">
                            <img src={require('./assets/station2.jpg')} alt='img'/>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <h4>Jember - Malang</h4>
                                <p>Tingkatkan pengalaman perjalanan Anda dengan kelas bisnis eksklusif dari Jember ke Malang, tiket tersedia mulai dari 200.000 rupiah.</p>
                                <button className="button is-info" onClick={pesan}>Pesan</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-3">
                    <div className="card is-shady">
                        <div className="card-image has-text-centered">
                            <img src={require('./assets/station3.jpg')} alt='img'/>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <h4>Jember - Surabaya</h4>
                                <p>Nikmati kenyamanan perjalanan yang lebih tinggi dengan kelas bisnis dari Jember ke Surabaya, dengan harga tiket mulai dari 100.000 rupiah.</p>
                                <button className="button is-info" onClick={pesan}>Pesan</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-3">
                    <div className="card is-shady">
                        <div className="card-image has-text-centered">
                            <img src={require('./assets/station4.jpg')} alt='img'/>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <h4>Jember - Jakarta</h4>
                                <p>Dapatkan kesempatan untuk menikmati perjalanan dari Jember ke Jakarta dengan harga tiket terjangkau, mulai dari 250.000 rupiah saja.</p>
                                <button className="button is-info" onClick={pesan}>Pesan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );   
}

export default Dashboard