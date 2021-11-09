import ToggleButton from '@mui/material/ToggleButton';

import { ToggleButtonConfig } from '../../muiConfig';
function ToggleButtonLeftBar({ item }) {
  // console.log('item: ', item);
  const { document, subTopName, topicId, video } = item;
  return (
    <ToggleButton sx={ToggleButtonConfig} value='htmlWww'>
      {subTopName}
    </ToggleButton>
  );
}

export default ToggleButtonLeftBar;
