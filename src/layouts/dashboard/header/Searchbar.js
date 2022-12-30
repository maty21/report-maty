import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as PapaParse from 'papaparse'
// @mui
import { styled } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// component
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };
  const fileEncoding = 'UTF-8';
  const handleFileChange = (e) => {
    const reader = new FileReader()
    if (!e.target.files) {
      return;
    }
    reader.onload = (e) => {
      const csvData = PapaParse.parse(
        reader.result,
        Object.assign(papaparseOptions, {

          encoding: fileEncoding,
        }),
      )
      console.log(csvData);
      navigate('/dashboard/app', { state: { csv: csvData } })
      setOpen(false);
      // 🚩 do the file upload here normally...
    };
    reader.readAsText(e.target.files[0], fileEncoding)
  }



  const handleOpen = () => {

    setOpen(!open);
    console.log(location.state);

  };

  const handleClose = e => {
    inputRef.current?.click();



  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Input

              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose} >
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
