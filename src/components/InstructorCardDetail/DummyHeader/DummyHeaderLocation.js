import { Avatar } from '@mui/material';
import { imageConfig, buttonConfig2 } from '../muiConfig';
import ShoppingCardBanner from '../../../public/images/shoppingCard.png';
import Instructor from '../../../public/images/Instructor.png';
function DummyHeaderLocation({ item, setImage }) {
  return (
    <div
      className='divMainHeaderInstructorCard'
      style={{
        backgroundImage: `url(${ShoppingCardBanner})`,
      }}>
      <div className='textOnInstructorCardBannerControl'>
        <h3 className='InstructorCardH3'>{item.fullName}</h3>
        <div className='InstructorCardH4Control'>
          <h4 className='InstructorCardH4'>Rating : </h4>&nbsp;&nbsp;
          <h4 className='InstructorCardH4'> {item.rating} / 5</h4>
        </div>
        <div className='InstructorCardH4Control'>
          <h4 className='InstructorCardH4'>{item.learner}</h4>
          &nbsp;&nbsp;
          <h4 className='InstructorCardH4'>Enrolls</h4>
        </div>
        <div>
          <p className='InstructorCardP'>{item.jobTitle}</p>
        </div>
      </div>
      <div className='InstructorCardImage'>
        <Avatar
          alt='Remy Sharp'
          src={item.profileImage}
          sx={imageConfig}
          onClick={() => {
            setImage({ profileImage: Instructor });
          }}
        />
      </div>
    </div>
  );
}

export default DummyHeaderLocation;
