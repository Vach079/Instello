import './profileBlock.scss'
import { userContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useContext, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import api from '../../axios';
import CommentDelet from '../commentDelet/CommentDelet';


function ProfileBlock() {
  const [line_hover, setLineHover] = useState({ paragraf1: true, paragraf2: false, paragraf3: false })

  const navigate = useNavigate()

  const { user } = useContext(userContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get(`/posts/user/${user?._id}`).then(function (response) {
      setData(response.data);

      if (!user) {
        navigate('/login')
      }
    })
  }, []);




  const [prev, setPrev] = useState('');

  const count = useRef(null);

  useEffect(() => {
    const result = count.current.offsetWidth * prev

    count.current.scrollBy({ left: result, behavior: "smooth" })
  }), [prev];

  const [openOnePost, setOpenOnePost] = useState(false);
  const [onePostData, setOnePostData] = useState();
  const [comments, setComments] = useState('');
  const [postsCount, setPostsCount] = useState(4);
  let url = 'http://localhost:4000/';

  function submit(e, id) {
    e.preventDefault()
    api.post(`/comment/${id}`, {
      content:comments
    })
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error)
      });
    setComments('')
  }
  return (
    <section className='profile'>
      <div className='upperPart'>
        <div className='userImg'>
          {user?.profilePicture === '' || user?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${user?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
        </div>
        <div className='userInfo'>
          <h3>Monroe Parker</h3>
          <span>@Monroepak</span>
          <p className='userStatus'>I love beauty and emotion. 🥰 I’m passionate about photography and learning. 📚 I explore genres and styles. 🌈 I think photography is storytelling. 📖 I hope you like and feel my photos. 😊</p>
          <div className='statusBlock'>
            <div className='statusFollowing'>
              <p className='paragraf'>Posts <br /> 162</p>
              <p className='paragraf'>Following <br /> 14,260</p>
              <p className='paragraf'>Followers <br /> 8,542</p>
            </div>
            <div className="unfallowBlock">
              <button className='unfollow'>Unfollow</button>
              <button className='message'>Message</button>
              <button className='menu_Icon'>...</button>
            </div>
          </div>
        </div>
      </div>
      <div className='hrline'>
        <p
          className={line_hover.paragraf1 && 'line_hover'}
          onClick={() => setLineHover({ ...line_hover, paragraf1: !line_hover.paragraf1, paragraf2: false, paragraf3: false })}>
          <i className="fa-solid fa-camera" style={{ color: "#ffffff" }}></i>
          Posts
        </p>
        <p
          className={line_hover.paragraf2 && 'line_hover'}
          onClick={() => setLineHover({ ...line_hover, paragraf2: !line_hover.paragraf2, paragraf1: false, paragraf3: false })}>
          <i className="fa-solid fa-play" style={{ color: "#ffffff" }}></i>
          Reels
        </p>
        <p
          className={line_hover.paragraf3 && 'line_hover'}
          onClick={() => setLineHover({ ...line_hover, paragraf3: !line_hover.paragraf3, paragraf2: false, paragraf1: false })}>
          <i className="fa-solid fa-tags" style={{ color: "#ffffff" }}></i>
          Tagged
        </p>
      </div>
      <h3 className='hights'>Hights</h3>
      <div className='container'>
        <div className="slider-wrapper">
          <button id='prev-sider' className='buttonStories' onClick={() => setPrev(-1)}><KeyboardArrowLeftIcon /></button>
          <div className='myPosts' ref={count}>
            {data.map((item, index) => {

              return (
                <img src={url + item.image} className='image-item' alt="err" key={index} />
              )
            })}
          </div>
          <button id='next-sider' className='buttonStories' onClick={() => setPrev(1)}><ChevronRightIcon /></button>
        </div>
      </div>
      <h3 className='hights'>Posts</h3>
      <div className='myAllPosts'>
        {data.slice(0, postsCount).map((item, index) => {
          return (
            <img src={url + item.image} onClick={() => { setOpenOnePost(true), setOnePostData(item) }} key={index} />
          )
        })}
      </div>
      <button className='loadMore' onClick={() => setPostsCount(postsCount > data.length ? 4 : postsCount + 4)}>{postsCount < data.length ? 'Load More...' : 'Go Back'}</button>

      <dialog className='lookOnePost' open={openOnePost} onClick={() => setOpenOnePost(false)}>
        <div className='onePost' onClick={(e) => e.stopPropagation()}>
          <img src={url + onePostData?.image} alt="nkar" className='mainPostImage' />
          <div className='postAllInfo'>
            <div className='mainUserImage'>
              {user?.profilePicture === '' || user?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${user?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
              <span className='mainSpan'>
                <p>{user?.login}</p>
                <span>{onePostData?.createdAt}</span>
              </span>
              <i className="fa-solid fa-circle-xmark" style={{ color: "#db2777" }} onClick={() => setOpenOnePost(false)}></i>
            </div>
            <p className='postContent'>{onePostData?.content}</p>
            <div className='likeandcommCount'>
              <span >
                <span style={{ color: 'white' }}><i className="fa-solid fa-heart" style={{ color: "#ff0033" }}></i>368</span>
                <span><i className="fa-regular fa-bookmark"></i></span>
              </span>
              <span >
                <span><i className="fa-solid fa-message" style={{ color: "#ffffff" }}></i>368</span>
                <span><i className="fa-solid fa-share-from-square" style={{ color: "#ffffff" }}></i></span>
              </span>
            </div>
            <div className='commentBlock'>
              {onePostData?.comments.map((item, index) => {
                return (

                  <div className='allComments' key={index}>
                    {user?.profilePicture === '' || user?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${user?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
                    <span className='commentInfo'>
                      <h4>{user?.login}</h4>
                      <p>{item.content}</p>
                      <span>{item.createdAt}</span>
                    </span>
                    <IconButton aria-label="settings">
                      <CommentDelet id={item._id} dataId={onePostData._id} />
                    </IconButton>
                  </div>
                )
              })}
            </div>
            <form className='addNewComm' onSubmit={(e) => submit(e, onePostData._id)}>
              <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
              <button type='submit'>Create</button>
            </form>

          </div>
        </div>
      </dialog>

    </section>
  )
}

export default ProfileBlock