import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import IosShareIcon from '@mui/icons-material/IosShare';
import SendIcon from '@mui/icons-material/Send';
import avatar3 from '../../images/avatar-3.jpg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import * as React from 'react';
import CommentDelet from '../commentDelet/CommentDelet';
import './PostCard.scss';
import api from '../../axios';
import PostMenu from '../postMenu/PostMenu';
import { useState, useEffect, useContext } from 'react';
import { userContext } from './../../App';

export default function PostCard({ reset, setReset }) {

  const [data, setData] = useState([]);
  const [comments, setComments] = useState('');
  const { user } = useContext(userContext);

  useEffect(() => {
    api.get('posts').then(function (response) {
      setData(response.data)
      console.log(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [reset]);


  function submit(e, id) {
    e.preventDefault()
    api.post(`comment/${id}`, {
      content: comments
    })
      .then((res) => {
        setReset(!reset)
        console.log(res);
      })
      .catch(function (error) {
        console.log(error)
      });
    setComments('')
  }
  return (
    <>
      {data.map((item, index) => {
        return (
          <Card sx={{ bgcolor: "#1e293b", color: "#fafafa", borderRadius: '15px', paddingLeft: '15px', paddingRight: '15px' }} key={index} className='leftChildren'>
            <CardHeader
              avatar={
                <Avatar src={'http://localhost:4000/' + item.user.profilePicture}
                  alt="Paella dish">

                </Avatar>
              }
              action={
                <IconButton aria-label="settings" >
                  <PostMenu data={item} />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader={item.createdAt.slice(0,10)}
            />
            <CardMedia
              sx={{ borderRadius: '10px' }}
              component="img"
              height="350"
              image={'http://localhost:4000/' + item.image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" >

              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ borderBottom: '1px solid #263345FF', display: 'flex', justifyContent: 'space-between' }}>
              <IconButton aria-label="add to favorites" sx={{ color: 'white', fontSize: '18px', fontFamily: 'sans-serif', fontWeight: '600' }}>
                <FavoriteIcon sx={{ color: 'red', width: '30px', height: '30px', bgcolor: 'gray', borderRadius: '50%', padding: '5px', marginRight: '10px' }} />
                1,380
              </IconButton>
              <IconButton aria-label="chate" sx={{ color: 'white', fontSize: '18px', fontFamily: 'sans-serif', fontWeight: '600' }}>
                <ChatIcon sx={{ color: 'white', width: '30px', height: '30px', bgcolor: 'gray', borderRadius: '50%', padding: '5px', marginRight: '10px' }} />
                260
              </IconButton>
              <SendIcon />
              <IosShareIcon />
            </CardActions>
            <span style={{ paddingLeft: '10px', paddingTop: '20px', fontFamily: 'sans-serif', display: 'block', borderBottom: '1px solid #263345FF', paddingBottom: '15px' }}>
              {item.content && item.content}
            </span>
            <List sx={{ width: '100%' }}>
              {item.comments.map((it) => {
                return (
                  <ListItem alignItems="flex-start" key={it._id}>
                    <ListItemAvatar>
                      <Avatar alt="Travis Howard" src={`http://localhost:4000/${item.user.profilePicture}`}/>

                      {/* src={item.user.profilePicture === '' || item.user.profilePicture == undefined ? 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEUbv5Fv.jpg' : `http://localhost:4000/${item.user.profilePicture}`}  */}
                    </ListItemAvatar>

                    <ListItemText
                      primary="Monroe"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline', color: 'white' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {it.content}
                          </Typography>

                        </React.Fragment>

                      }
                    />

                    <IconButton aria-label="settings" >
                      <CommentDelet setData={setData} id={it._id} dataId={item._id} />
                    </IconButton>
                  </ListItem>
                )
              })}
            </List>
            <div className='userBlock'>
              {user?.profilePicture === '' || user?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${user?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
              <form onSubmit={(e) => submit(e, item._id)}>
                <input type="text" value={comments} placeholder='All comment...' onChange={(e) => setComments(e.target.value)} />
                <button type='submit'>Create</button>
              </form>
            </div>
          </Card>
        )
      })}
    </>


  )
};


