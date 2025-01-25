import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better experience Download  <br />My Restaurant App <br />And enjoy seamless access to our services anytime, anywhere!</p>
        <div className="app-download-logo">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload;
