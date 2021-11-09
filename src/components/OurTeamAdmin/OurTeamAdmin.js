import './styleOurTeam.css';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/SearchSharp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InstructorCard from '../InstructorCard/InstructorCard';
import Pagination from '@mui/material/Pagination';

import { InputBaseConfig, IconButtonConfig, ButtonConfig } from './muiConfig';
import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import InstructorCardEdit from '../InstructorCardEdit/InstructorCardEdit';
import axios from '../../config/axios';
function OurTeamAdmin() {
  const [search, setSearch] = useState([]);
  const [allInstructor, setAllInstructor] = useState([]);

  const handleSummitSearch = e => {};
  useEffect(() => {
    const fetchDataAllInstructor = async () => {
      const response = await axios.get('/instructor/rt');
      // console.log(response.data.insResultRating);
      setAllInstructor(response.data.insResultRating);
    };
    fetchDataAllInstructor();
  }, []);
  return (
    <>
      <div className='divMainControllerOurTeamAdmin'>
        <AppBar position='static' sx={{ color: '#03045E', bgcolor: '#ADE8F4' }}>
          <Toolbar variant='dense'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              align='center'
              sx={{ width: '100%' }}>
              Our Team Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <div className='OurTeamSearch'>
          <div className='searchBarOurTeam'>
            <div className='searchByInputTextOurTeam'>
              <form action='' onSubmit={handleSummitSearch}>
                <div className='inputSearchTextOurTeam'>
                  <p>Search</p>
                  <InputBase
                    sx={InputBaseConfig}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <IconButton type='submit' aria-label='search'>
                    <SearchIcon sx={IconButtonConfig} />
                  </IconButton>
                </div>
              </form>
            </div>
          </div>

          <div className='outputSearchFieldOurTeam'>
            {allInstructor.map(item => (
              <InstructorCardEdit key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OurTeamAdmin;
