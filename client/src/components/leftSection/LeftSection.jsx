import HideCard from "../HideCard/HideCard";
import PostCard from '../PostCard/PostCard';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import './leftSection.scss';
import Dialogs from "../Dialogs/Dialogs";
import Typography from '@mui/material/Typography';
import CollectionsIcon from '@mui/icons-material/Collections';
import api from '../../axios'

function LeftSection() {

  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const [file, setFile] = useState();
  const [content, setContent] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  function AddPost(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('img',file);
    formData.append('someInfo',JSON.stringify({
      content:content,
    }))
    api.post('/posts', formData, {
        headers:{
          "Content-Type":"multipart/form-data",
        }
    })
      .then((res) => {
        console.log(res);
        setReset(true);
      })
      .catch(function (error) {
        console.log(error)
      });
    }


  const formaAddPost = <form onSubmit={AddPost} >
    <Typography gutterBottom>
      <input type='text' className='urlImg' placeholder='Content' onChange={(e) => setContent(e.target.value)} />
    </Typography>
    <div className='uploadImage' >
      <input type='file' style={{ color: 'white' }} name='filedata' placeholder='Browse to Upload image' onChange={(e) => setFile(e.target.files[0])} />
      <button type='submit
    '>
        <CollectionsIcon sx={{ color: '#0D9488FF', fontSize: '30px', cursor: 'pointer' }} />
      </button>
    </div>
  </form>

  return (
    <section className="leftSection">

      <div className='leftChildren dialogBlock'>

        <Dialogs open={open} setOpen={setOpen} formaAddPost={formaAddPost}>
          <Button variant="outlined" onClick={handleClickOpen} sx={{ width: '90%', bgcolor: '#334155FF', height: '40px', borderRadius: '10px', color: 'white', border: 'none' }}>
            What do you have in mind?
          </Button>
        </Dialogs>

        <Dialogs open={open} setOpen={setOpen} formaAddPost={formaAddPost}>
          <Button variant="outlined" onClick={handleClickOpen} sx={{ width: '10px', bgcolor: '#E0F2FEFF', borderRadius: '10px', color: '#0284C7FF', fontSize: "18px", border: 'none' }}>
            <ImageIcon sx={{ width: '100%' }} />
          </Button>
        </Dialogs>

        <Dialogs open={open} setOpen={setOpen} formaAddPost={formaAddPost}>
          <Button variant="outlined" onClick={handleClickOpen} sx={{ width: '5%', bgcolor: '#FCE7F3FF', borderRadius: '10px', color: '#DB2777FF', fontSize: "18px", border: 'none' }}>
            <VideocamIcon />
          </Button>
        </Dialogs>
        

      </div>

      <PostCard reset={reset} setReset={setReset}/>

      <div className='leftChildren'>

        <HideCard />

      </div>

    </section>
  )
}

export default LeftSection

