import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import api from '../../axios';


function CommentDelet({ id, dataId, setData }) {

  function submit_delete(e) {
    e.preventDefault()
    api.patch(`comment/${dataId}/${id}`)
      .then(response => {

        setData((data) => data.map((item) => {
          if (item._id === response.data._id) {
            return response.data
          }
          return item
        }))
        console.log('this is comment deleted true');
      })
      .catch(error => {
        console.error(error);
      });
  }
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={opens ? 'long-menu' : undefined}
        aria-expanded={opens ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={opens}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '15ch',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#0F172AFF',
            border: '1px solid #1976d2',
            borderRadius: '10px',
          },
        }}
      >
        <form onSubmit={submit_delete} style={{width:'100%'}}>
          <input type="submit"
            value='delete'
            onClick={handleClose}
            style={{
              width: '100%',
              height: '40px',
              backgroundColor: '#334155FF',
              border: 'none',
              color: 'white',
              fontFamily: 'sans-serif',
              fontSize: '16px',
              borderRadius: '10px',
              padding:'10px'
            }}
          />

        </form>

      </Menu>
    </div>
  )
}

export default CommentDelet