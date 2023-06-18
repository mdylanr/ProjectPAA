
const Pembayaran = () =>{

 
  return(
    <section className="hero has-background0grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-desktop">
              
                <div className="box">
                  <div className="notification is-primary is-light">
                   <p className="is-size-6 has-text-centered">Pemesanan Berhasil</p>
                  </div>

                  <div className="control ">
                    <p className="is-size-5">Bank BRI</p>
                    <p>6199-1942-2390-500</p>
                  </div>
                  
                  <br/>
                  <div className="control">  
                    <p className="is-size-5">Bank BCA</p>
                    <p>6199-1942-2390-500</p>
                  </div>
                  
                  <br/>
                  <p className="is-size-5">DANA</p>
                  <p>0821783674099</p>
                  <br/>
                  <button className="button is-success is-fullwidth"><a href="https://wa.me/6282234702123" className="has-text-white">Lanjutkan Pembayaran</a></button>
                </div>
              </div>
          </div>
        </div>
      </div>
      
    </section>
    
  );
}



export default Pembayaran