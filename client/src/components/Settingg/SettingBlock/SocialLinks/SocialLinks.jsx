import './sociallinks.scss'
function SocialLinks() {
  return (
    <div className='social_links'>
      <div className='setting_title'>
        <h3>Social Links</h3>
        <p>We may still send you important notifications about your account and content outside of you preferred notivications settings</p>
      </div>
      <div className='links'>
        <div>
          <i className="fa-brands fa-facebook" style={{color: "#0091ff"}}></i>
          <input type="text" placeholder='https://www.facebook.com/myname'/>
        </div>
        <div>
          <i className="fa-brands fa-instagram" style={{color:"#DC2C7AFF"}}></i>
          <input type="text" placeholder='https://www.instagram.com/myname'/>
        </div>
        <div>
          <i className="fa-brands fa-twitter" style={{color:"#74C0FC"}}></i>
          <input type="text" placeholder='https://twitter.com/myname'/>
        </div>
        <div>
          <i className="fa-brands fa-youtube" style={{color: "#ff0019"}}></i>
          <input type="text" placeholder='https://youtube.com/myname'/>
        </div>
        <div>
          <i className="fa-brands fa-github" style={{color: "#000000"}}></i>
          <input type="text" placeholder='https://github.com/myname'/>
        </div>
      </div>
    </div>
  )
}

export default SocialLinks