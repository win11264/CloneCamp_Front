import './styleFooter.css';
import iconFacebook from '../../public/images/facebook.png';
import iconYoutube from '../../public/images/youtube.png';
import iconTwitter from '../../public/images/twitter.png';
import iconLine from '../../public/images/line.png';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';

function Footer() {
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    axios
      .get('/contactus')
      .then(res => {
        setContactInfo(res.data.result[0]);
      })
      .catch(err => console.log(err));
  }, []);
  // console.log('contactInfo', contactInfo);

  return (
    <div className='FooterItem'>
      <div className='leftItemFooter'>
        <p>© CloneCampThailand, Inc. 2021.</p>
        <p>{`Email: ${contactInfo.email}`}</p>
        <p>{`Phone: ${contactInfo.phoneNo}`}</p>
      </div>
      <div className='rightItemFooter'>
        <p>Connect with us</p>
        <div className='connectIcon'>
          <a href={`${contactInfo.facebook}`} alt='facebook-link'>
            <img src={iconFacebook} alt='' />
          </a>
          <a href={`${contactInfo.youtube}`} alt='youtube-link'>
            <img src={iconYoutube} alt='' />
          </a>
          <a href={`${contactInfo.twitter}`} alt='twitter-link'>
            <img src={iconTwitter} alt='' />
          </a>
          <a href={`${contactInfo.line}`} alt='line-link'>
            <img src={iconLine} alt='' />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
