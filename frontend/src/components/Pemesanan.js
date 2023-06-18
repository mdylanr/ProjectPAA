import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import Navbar from './Navbar';

const Pemesanan = () => {
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
    
    const [ inputValue, setInputValue ] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/pembayaran');
    }

    const handleCancel = () => {
        setInputValue("");
    };
  function Submit() {
    const formEle = document.querySelector("form");
    const formDatab = new FormData(formEle);
    console.log();
    fetch(
      "https://script.google.com/macros/s/AKfycbzqVQaTL13GPB3NsVrmZqDPhJnuRFYgma-3MB_ho1PsyBZGlx6zUSWWrZgdYCeg_w1g/exec",
      {
        method: "POST",
        body: formDatab
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })

      .catch((error) => {
        console.log(error);
      });
  }
  

    return( 
        <>
        {email === "admin@gmail.com" ? <NavbarAdmin /> : <Navbar /> }
        <section className="hero has-background0grey-light">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-8-desktop">
                            <h1 className='is-size-2 has-text-centered'>Form Pemesanan</h1>
                            <form className="" onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">Nama Lengkap</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Nama Lengkap" name="NamaLengkap" required value= {inputValue}  onChange={(e) => setInputValue(e.target.value)}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Nomor Handphone</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Nomor Handphone" name="NomorHandphone" required />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input className="input" type="email" placeholder="Email" name="Email"/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Tujuan</label>
                                <div className="control">
                                    <div className="select">
                                        <select name="Tujuan">
                                        <option>Pilih Tujuan</option>
                                        <option>Jember - Malang</option>
                                        <option>Jember - Surabaya</option>
                                        <option>Jember - Jogjakarta</option>
                                        <option>Jember - Jakarta</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Kelas</label>
                                <div className="control">
                                    <div className="select">
                                        <select name="Kelas">
                                        <option>Pilih Kelas</option>
                                        <option>Eksekutif</option>
                                        <option>Bisnis</option>
                                        <option>Ekonomi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Tanggal Berangkat</label>
                                <div className="control">
                                    <input type="date" name="TangalBerangkat"/>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-link" onClick={Submit} type="submit">
                                        Pembayaran
                                    </button>
                                </div>
                                <div className="control">
                                    <button className="button is-link is-light" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Pemesanan