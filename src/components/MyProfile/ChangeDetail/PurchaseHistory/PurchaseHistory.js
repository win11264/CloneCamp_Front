import axios from '../../../../config/axios';
import { useEffect, useState } from 'react';
import './stylePurchaseHistory.css';
import TableBody from './TableBody/TableBody';
function PurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  useEffect(() => {
    const fetchDataAllMyCoursesPurchaseHistory = async () => {
      try {
        const response = await axios.get('/mycourse/my');
        // console.log(response.data.result);
        setPurchaseHistory(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAllMyCoursesPurchaseHistory();
  }, []);
  return (
    <div>
      <div className='tablePurchaseHistory'>
        <div className='tableHeader1'>Date</div>
        <div className='tableHeader2'>Order Id</div>
        <div className='tableHeader3'>Course Name</div>
        <div className='tableHeader4'>Price</div>
      </div>
      <div>
        {purchaseHistory.map(item => (
          <TableBody key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default PurchaseHistory;
