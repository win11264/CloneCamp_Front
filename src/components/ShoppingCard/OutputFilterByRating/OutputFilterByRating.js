import '../styleShoppingCard.css';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { AuthContext } from '../../../contexts/authContext';
import { useContext, useEffect } from 'react';
import axios from 'axios';
function OutputFilterByRating({ item, setToggle, ratingSelect }) {
  const { commentName, rating, commentBody, createdAt, id } = item;
  const { user } = useContext(AuthContext);
  // useEffect(() => {
  //   const fetchDataUser = async () => {
  //     const response = await axios.get(``);
  //   };
  //   fetchDataUser();
  // }, [user]);
  // console.log('item: ', item);
  // console.log('user:', user);
  const handleClickDeleteComment = async () => {
    const response = await axios.put(`/comment/delete/${id}`);
    // console.log('response:', response);
    setToggle(current => !current);
  };
  return (
    <>
      {(ratingSelect === rating || ratingSelect === 'all') && (
        <div className='OutputFilterByRatingControl'>
          <div className='FiberManualRecordIconControl'>
            {/* <div className='FiberManualRecordIconGreen'>
          <FiberManualRecordIcon sx={{ color: 'green', margin: '0px' }} />
        </div> */}
            {user?.role === 'admin' && (
              <div
                className='FiberManualRecordIconRed'
                style={{
                  cursor: 'pointer',
                }}>
                <FiberManualRecordIcon
                  sx={{ color: 'red', margin: '0px' }}
                  onClick={handleClickDeleteComment}
                />
              </div>
            )}
          </div>
          <div className='OutputFilterByRatingName'>
            <h4 className='OutputFilterByRatingScoreH4'>{commentName}</h4>
          </div>
          <div className='OutputFilterByRatingScore'>
            <p className='OutputFilterByRatingScoreP'>{rating}</p> &nbsp;&nbsp;
            <p className='OutputFilterByRatingScoreP'>Score:</p> &nbsp;
            <p className='OutputFilterByRatingScoreP'>
              ({createdAt.slice(0, 10)})
            </p>
          </div>
          <div className='OutputFilterByRatingComment'>
            <p className='OutputFilterByRatingScoreP'>{commentBody}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default OutputFilterByRating;
