import axios from '../../config/axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './styleCertificate.css';
import { UserContext } from '../../contexts/userContext';
function Certificate() {
  const { userById } = useContext(UserContext);
  const location = useLocation();
  console.log('location: ', location.state.item.Course);
  console.log('userById: ', userById);
  const [certificateOwner, setCertificateOwner] = useState({});
  useEffect(() => {
    const fetchDataUserForCertificate = async () => {
      const response = await axios.get(`/user/userId`);
      setCertificateOwner(response.data.result);
      console.log(response.data.result);
    };
    fetchDataUserForCertificate();
  }, []);
  return (
    <div className='divMainControllerCertificate'>
      <div
        className='certificateController'
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dzgbxbl0j/image/upload/v1636022326/CertificateEdit_tpg4rp.jpg)`,
        }}>
        <p className='cloneCampHeader'>
          Clone Camp {location.state.item.Course.courseName}
        </p>
        <p className='cloneCampName'>{userById.fullName}</p>
        <p className='cloneCampCompleteDate'>
          {location.state.item.Course.updatedAt.slice(0, 10)}
          <br />
          วันที่สำเร็จหลักสูตร
        </p>
        <p className='cloneCampSignature'>
          John
          <br />
          ลายเซ็นต์ผู้สอน
        </p>
      </div>
    </div>
  );
}

export default Certificate;
