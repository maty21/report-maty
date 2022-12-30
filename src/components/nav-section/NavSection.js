import PropTypes from 'prop-types';
import { useState } from 'react'
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, ListItemButton, Collapse, } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material'
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const location = useLocation()
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const tenants =
    location.state && location.state.csv &&

    <Collapse in={open} timeout="auto" >

      <List component="div" disablePadding>
        {
          location.state.csv.data.map(t => (
            <ListItemButton key={t.tenant} item={t}>
              <ListItemText disableTypography primary={t.tenant} />
            </ListItemButton>
          ))}
      </List>
    </Collapse>

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Tenants" />
        {open ? <ExpandMore /> : <ExpandLess />}
      </ListItemButton>
      {tenants}
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {

  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
