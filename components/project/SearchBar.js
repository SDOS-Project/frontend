import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

function SearchBar({ state, onChange }) {
  return (
    <div className="w-full mb-6">
      <TextField
        placeholder="Search Projects"
        className="w-full bg-paper"
        value={state}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default SearchBar;
