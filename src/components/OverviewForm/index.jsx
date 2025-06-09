import './style.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const OverviewForm = ({ selectedView, setSelectedView }) => {
  // const [view, setView] = useState('monthly');

  const handleChange = (event) => {
    setSelectedView(event.target.value);
  };

  return (
    <div>
      <FormControl className="input">
        <InputLabel>Overview</InputLabel>
        <Select
          style={{ height: 50 }}
          value={selectedView}
          label="Overview"
          onChange={handleChange}
        >
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Daily">Daily</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
