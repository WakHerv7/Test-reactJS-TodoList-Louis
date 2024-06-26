import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Person } from '../../../utils';
import { useContext, useState } from 'react';
import GlobalContext from '../../../context/GlobalContext';

function AutoComplete({ data }: { data: Person[] }) {
  const { value, setValue, inputValue, setInputValue } = useContext(GlobalContext);
  const optionValue = [...new Set(data.map((val) => val.name))]

  return (
    <Autocomplete
      disablePortal
      value={value}
      onChange={(event: any, newValue: Person | null) => {
        setValue(newValue || data[0]);
      }}
      id="custom-autocomplete"
      options={optionValue}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Staff" />}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
    />
  )
}

export default AutoComplete
