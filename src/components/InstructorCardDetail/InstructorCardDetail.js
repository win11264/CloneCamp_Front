import './styleInstructorCard.css';
import ShoppingCardBanner from '../../public/images/shoppingCard.png';
import Button from '@mui/material/Button';
import InstructorCard from '../InstructorCard/InstructorCard';
import CourseCard from '../CourseCard/CourseCard';
import { Avatar } from '@mui/material';
import { imageConfig, buttonConfig2 } from './muiConfig';
import { useContext, useEffect, useState } from 'react';
import Instructor from '../../public/images/Instructor.png';
import AreaOfExpertiseTag from './AreaOfExpertiseTag/AreaOfExpertiseTag';
import { useLocation, useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { ToggleContext } from '../../contexts/toggleContext';
import DummyHeaderLocation from './DummyHeader/DummyHeaderLocation';
import DummyHeaderInst from './DummyHeader/DummyHeaderInst';
function InstructorCardDetail() {
  const [image, setImage] = useState({ profileImage: '' });
  const [instructor, setInstructor] = useState({});
  const [instructorByInsId, setInstructorByInsId] = useState([]);
  const [instructorTopics, setInstructorTopics] = useState([]);
  const [i, setI] = useState(5);
  const [instructorFront, setInstructorFront] = useState([]);
  const [instructorBack, setInstructorBack] = useState([]);
  const [instructorUxUi, setInstructorUxUi] = useState([]);
  const { toggle, setToggle } = useContext(ToggleContext);
  const [firstLoad, setFirstLoad] = useState(false);
  const params = useParams();
  const location = useLocation();

  console.log('location', location.state.instructor);
  useEffect(() => {
    const newArr = location.state.instructor;

    // console.log('newArr: ', newArr);
  }, [toggle]);
  useEffect(() => {
    const fetchDataInstructorById = async () => {
      try {
        const response = await axios.get(`/instructor/${params.id}`);
        const response2 = await axios.get(`/topic/ins/${params.id}`);
        const response3 = await axios.get(`/insCat/byinstructor/${params.id}`);
        const newArr = location.state.instructor.InstructorCats.map(
          item => item.categoryId
        );

        const mapInsCourse = response2.data.result.map(item => item.Course);

        // console.log(`mapInsCourse`, mapInsCourse);

        // console.log(`response`, response.data);
        // console.log(`response2`, response2.data.Course);
        // console.log(`response3`, response3.data);
        // console.log('response3', response3.data);
        setInstructor(response.data.instructorResult);
        const newArr3 = response2.data.result;
        const newArr2 = [];
        for (let i = 0; i < newArr3.length; i++) {
          if (newArr3[i].Course.status === 'ready') {
            newArr2.push(newArr3[i]);
          }
        }
        // console.log('newArr2', newArr2);
        setInstructorTopics(newArr2);
        setInstructorByInsId(newArr);
        // console.log('res: ', response.data.instructorResult);
        console.log(`instructorTopics`, instructorTopics);
        if (newArr.includes(1)) {
          const response4 = await axios.get(`/insCat/bycat/${1}`);
          setInstructorFront(response4.data.result);
          // console.log('response4', response4.data.result);
        }
        if (newArr.includes(2)) {
          const response5 = await axios.get(`/insCat/bycat/${2}`);
          setInstructorBack(response5.data.result);
          // console.log('response5', response5.data.result);
        }
        if (newArr.includes(3)) {
          const response6 = await axios.get(`/insCat/bycat/${3}`);
          setInstructorUxUi(response6.data.result);
        }
        setToggle(currentToggle => !currentToggle);
        setFirstLoad(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataInstructorById();
  }, [params.id, location.state.instructor]);
  console.log(`instructorFront`, instructorFront);
  const handleClickToWebsite = () => {
    window.open(instructor.website, '_blank');
  };
  const handleClickSeeMore = () => {
    setI(i + 3);
  };
  const handleClickToEmail = () => {
    window.location.href = `mailto:${instructor.email}?subject=Offer Inquiry&cc=support@email.com&bcc=info@company.com&body=test mail send massage`;
  };

  const handleClickToFacebook = () => {
    window.open(instructor.facebook, '_blank');
  };
  const handleClickToYoutube = () => {
    window.open(instructor.youtube, '_blank');
  };
  const handleClickToLinkedIn = () => {
    window.open(instructor.linkedin, '_blank');
  };
  const handleClickToTwitter = () => {
    window.open(instructor.twitter, '_blank');
  };
  // console.log('location', location.state.instructor.InstructorCats);
  console.log('location', location);
  console.log('instructorFront: ', instructorFront);
  console.log('instructorBack: ', instructorBack);
  console.log('instructorUxUi: ', instructorUxUi);
  // console.log('instructorTopics: ', instructorTopics);
  return (
    <div className='divMainInstructorCardController'>
      {/* <DummyHeaderInst item={instructor} setImage={setImage} /> */}
      <DummyHeaderInst item={location.state} setImage={setImage} />

      <div className='InstructorCardContent'>
        <div className='InstructorCardContentLeft'>
          <div className='aboutThisMeControl'>
            <h4 className='aboutThisMeH4'>About Me</h4>
            <p className='aboutThisMeP'>{instructor.about}</p>
          </div>
          <div className='grayLine'></div>
          <div className='divMoreFrontEndCourse'>
            <div className='divMoreFrontEndCourseHeader'>
              <h4 className='aboutThisMeH4'>My Course</h4>
            </div>
            <div className='InstructorCardCourseCardControl'>
              {instructorTopics
                ?.filter((item, index) => index < i)
                .filter(item => item.Course !== null)
                .map(item => (
                  <CourseCard key={item.id} item={item} />
                ))}
            </div>

            <div className='SeeMoreControl'>
              <p className='SeeMoreP' onClick={handleClickSeeMore}>
                {`<-- See More -->`}
              </p>
            </div>
          </div>
          <div className='grayLine'></div>
          {instructorFront
            .filter(item => item.instructorId !== instructor.id)
            .filter(item => item.Instructor !== null).length !== 0 && (
            <div className='divMoreFrontEndInstructor'>
              <h4 className='aboutThisMeH4'>More Front - End Instructor</h4>
              {/* {location.state.instructorFront */}
              {instructorFront
                ?.filter((item, index) => index < 4)
                .filter(item => item.Instructor !== null)
                .filter(item => item.instructorId !== instructor.id)
                .map(item => (
                  <InstructorCard key={item.id} item={item} />
                ))}
            </div>
          )}
          {instructorBack
            .filter(item => item.Instructor !== null)
            .filter(item => item.instructorId !== instructor.id).length !==
            0 && (
            <div className='divMoreFrontEndInstructor'>
              <h4 className='aboutThisMeH4'>More Back - End Instructor</h4>
              {instructorBack
                ?.filter((item, index) => index < 4)
                .filter(item => item.Instructor !== null)
                .filter(item => item.instructorId !== instructor.id)
                .map(item => (
                  <InstructorCard key={item.id} item={item} />
                ))}
            </div>
          )}
          {instructorUxUi
            .filter(item => item.Instructor !== null)
            .filter(item => item.instructorId !== instructor.id).length !==
            0 && (
            <div className='divMoreFrontEndInstructor'>
              <h4 className='aboutThisMeH4'>More UX/UI Instructor</h4>
              <div className='courseCatControllerIns'>
                {instructorUxUi
                  ?.filter((item, index) => index < 4)
                  .filter(item => item.Instructor !== null)
                  .filter(item => item.instructorId !== instructor.id)
                  .map(item => (
                    <InstructorCard key={item.id} item={item} />
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className='InstructorCardContentRight'>
          <h4 className='aboutThisMeH4'>Area of Expertise</h4>
          <div className='AreaOfExpertiseTagController'>
            {location.state.instructor.expertise}
          </div>
          <div className='grayLineRight'></div>
          <div className='InstructorCardContentRightButton'>
            <Button
              sx={buttonConfig2}
              variant='contained'
              onClick={handleClickToWebsite}>
              Website
            </Button>
            <Button
              sx={buttonConfig2}
              variant='contained'
              onClick={handleClickToEmail}>
              Email
            </Button>
            <Button
              sx={buttonConfig2}
              variant='contained'
              onClick={handleClickToFacebook}>
              Facebook
            </Button>
            <Button
              sx={buttonConfig2}
              variant='contained'
              onClick={handleClickToYoutube}>
              Youtube
            </Button>
            <Button
              sx={buttonConfig2}
              variant='contained'
              onClick={handleClickToLinkedIn}>
              LinkedIn
            </Button>
            <Button
              sx={buttonConfig2}
              variant='contained'
              onClick={handleClickToTwitter}>
              Twitter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorCardDetail;
