import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import api from '../../axios';
import { Button } from "@mui/material";
import Dialogs from './../Dialogs/Dialogs';
import Typography from '@mui/material/Typography';
import CollectionsIcon from '@mui/icons-material/Collections';


function PostMenu({ data }) {

  const [file, setFile] = useState();
  const [content, setContent] = useState(data?.content);

  function submit(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('img', file);
    formData.append('someInfo', JSON.stringify({
      content: content,
    }))
    api.patch(`posts/${data._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const updatePost = <form onSubmit={submit}>
    <Typography gutterBottom>
      <input type='text' className='urlImg' placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} />
    </Typography>
    <div className='uploadImage' >
      <img src={'http://localhost:4000/' + data?.image} alt="" width={'300px'} />
      <input type='file' style={{ color: 'white' }} name='filedata' placeholder='Browse to Upload image' onChange={(e) => setFile(e.target.files[0])} />
      <button type='submit
  '>
        <CollectionsIcon sx={{ color: '#0D9488FF', fontSize: '30px', cursor: 'pointer' }} />
      </button>
    </div>
  </form>


  function submit_delete(e) {
    e.preventDefault()
    api.delete(`posts/${data._id}`)
      .then(response => {
        console.log(`Deleted post with ID ${data._id}`);
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
            width: '20ch',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0F172AFF',
            border: '1px solid #1976d2',
            borderRadius: '10px',
          },
        }}
      >
        <form onSubmit={submit_delete}>
          <input type="submit"
            value='Delete'
            onClick={handleClose}
            style={{
              width:'90%',
              height:'40px',
              backgroundColor:'#334155FF',
              border:'none',
              color:'white',
              fontFamily:'sans-serif',
              fontSize:'16px',
              borderRadius:'10px',
            }}
             />
        </form>
        <Dialogs open={open} setOpen={setOpen} updatePost={updatePost} >
          <Button variant="outlined" onClick={handleClickOpen} sx={{ width: '90%', bgcolor: '#334155FF', height: '40px', borderRadius: '10px', color: 'white', fontSize: "12px", border: 'none',marginTop:'20px' }}>
            Update
          </Button>
        </Dialogs>
      </Menu>
    </div>
  )
}

export default PostMenu