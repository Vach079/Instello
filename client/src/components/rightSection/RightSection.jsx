import './rightSection.scss'
import UserList from '../UserList/UserList'
import PremiumPhotos from '../premiumPhotos/PremiumPhotos'
import OnlineFriends from '../OnlineFriends/OnlineFriends'
import Trends from '../Trends/Trends'
import Members from '../allMembers/Members'
function RightSection() {
  return (
    <section className="rightSection">
      <UserList />
      <PremiumPhotos />
      <OnlineFriends />
      <Members/>
      <Trends />
    </section>
    )
}

export default RightSection





