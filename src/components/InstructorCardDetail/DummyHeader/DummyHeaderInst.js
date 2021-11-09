import { Avatar } from '@mui/material';
import ShoppingCardBanner from '../../../public/images/shoppingCard.png';
import { imageConfig, buttonConfig2 } from '../muiConfig';
import Instructor from '../../../public/images/Instructor.png';
function DummyHeaderInst({ item, setImage }) {
  // console.log('log', item.instructor.id);
  return (
    <div
      className='divMainHeaderInstructorCard'
      style={{
        backgroundImage: `url(${ShoppingCardBanner})`,
      }}>
      <div className='textOnInstructorCardBannerControl'>
        <h3 className='InstructorCardH3'>{item.instructor.fullName}</h3>
        <div>
          <p className='InstructorCardP'>{item.instructor.jobTitle}</p>{' '}
        </div>
        <div className='InstructorCardH4Control'>
          <h4 className='InstructorCardH4'>Rating : </h4>&nbsp;&nbsp;
          <h4 className='InstructorCardH4'> {item.instructor.rating} / 5</h4>
        </div>
        <div className='InstructorCardH4Control'>
          <h4 className='InstructorCardH4'>{item.instructor.learner}</h4>
          &nbsp;&nbsp;
          <h4 className='InstructorCardH4'>Enrolls</h4>
        </div>
      </div>
      <div className='InstructorCardImage'>
        <Avatar
          alt='Remy Sharp'
          src={item.instructor.profileImage}
          sx={imageConfig}
          onClick={() => {
            setImage({ profileImage: Instructor });
          }}
        />
      </div>
    </div>
  );
}

export default DummyHeaderInst;
