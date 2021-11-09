import { Avatar, TextField } from '@mui/material';
import ShoppingCardBanner from '../../../public/images/shoppingCard.png';
import { imageConfig, buttonConfig3 } from '../muiConfig';
import Instructor from '../../../public/images/Instructor.png';
import { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
// import { CategoryContext } from '../../../contexts/categoryContext';
import axios from '../../../config/axios';
import '../styleInstructorEdit.css';
function DummyHeaderInst({
  item,
  setInstructorEdit,
  instructorEdit,
  toggle2,
  setToggle2,
}) {
  const [personName, setPersonName] = useState([]);
  const [category, setCategory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [itemDetail, setItemDetail] = useState({});
  const Input = styled('input')({
    display: 'none',
  });
  // console.log(item);
  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const response = await axios.get('/category');
        setCategory(response.data.category.map(item => item.categoryName));
        setPersonName(
          item.InstructorCats.map(item => item.Category.categoryName)
        );
        const map = item.InstructorCats.map(item => item.Category.categoryName);
        // console.log('map', map);
        setInstructorEdit({
          ...instructorEdit,
          category: map,
          ...item,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataCategory();
  }, [item, toggle2]);
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setInstructorEdit({ ...instructorEdit, category: value });
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  // console.log(item.fullName);
  return (
    <div
      className='divMainHeaderInstructorCard'
      style={{
        backgroundImage: `url(${ShoppingCardBanner})`,
      }}>
      <div className='textOnInstructorCardBannerControl'>
        <div className='textFieldInstructorEditHeader'>
          {item.fullName && (
            <TextField
              sx={buttonConfig3}
              id='outlined-basic'
              label='Enter Instructor Name'
              defaultValue={item.fullName}
              onChange={e =>
                setInstructorEdit({
                  ...instructorEdit,
                  fullName: e.target.value,
                })
              }
              variant='outlined'
            />
          )}
        </div>
        <div className='textFieldInstructorEditHeader'>
          <TextField
            sx={buttonConfig3}
            id='outlined-basic'
            label='Job Title'
            variant='outlined'
            onChange={e =>
              setInstructorEdit({ ...instructorEdit, jobTitle: e.target.value })
            }
            defaultValue={item.jobTitle}
          />
        </div>
        <div className='textFieldInstructorEditHeader'>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
            <Select
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              sx={buttonConfig3}
              value={personName}
              onChange={handleChange}
              onClick={() => setToggle(!toggle)}
              input={<OutlinedInput label='Tag' />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}>
              {category.map(item => (
                <MenuItem key={item} value={item}>
                  <Checkbox checked={personName.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='textFieldInstructorEditHeader'>
          <label
            htmlFor='contained-button-file'
            className='labelUploadImageInsEdit'>
            <Input
              accept='image/*'
              id='contained-button-file'
              multiple
              type='file'
              onChange={e =>
                setInstructorEdit({
                  ...instructorEdit,
                  profileImage: e.target.files[0],
                  profileImageName: e.target.value,
                })
              }
            />
            <Button
              variant='contained'
              component='span'
              sx={{ marginBottom: '10px' }}>
              Upload Instructor Image
            </Button>
          </label>
          {instructorEdit.profileImage && (
            <TextField
              id='outlined-multiline-static'
              label='File name'
              multiline
              rows={4}
              sx={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }}
              value={instructorEdit.profileImageName}
            />
          )}
        </div>
      </div>
      <div className='InstructorCardImage'>
        <Avatar alt='Remy Sharp' src={item.profileImage} sx={imageConfig} />
      </div>
    </div>
  );
}

export default DummyHeaderInst;
