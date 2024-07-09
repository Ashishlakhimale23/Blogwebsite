import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import {useLocation} from "react-router-dom"
import Home from "../page/home" 
import CreatePost from "../page/createpost" 
import Signin from '../page/signin'
import Login from '../page/login'
import Header from './header'
import Usersinfo from '../page/edituserinfo'
import BlogPage from '../page/BlogPage'
import { UserProfile } from '../page/userprofile'
import Draft from '../page/draft'
import ManageBlogs from '../page/manageblogs'
import Bookmark from '../page/bookmarks'



function Layout() {
  const authtoken = localStorage.getItem("authtoken");
  const location = useLocation();
  const noheader = ["/signin","/login","/createpost"]
  !authtoken?noheader.push("/"):null

  return (
    <>
              {!noheader.includes(location.pathname) && <Header />}
              <Routes>
                <Route path='/' element={authtoken?<Home/>:<Signin/>}></Route>
                <Route path="/signin" element={<Signin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/createpost" element={<CreatePost />} />
                <Route path='/edit/:username' element={<Usersinfo/>}/>  
                <Route path='/:username' element={<UserProfile/>}></Route>
                <Route path='/blog/:title' element={<BlogPage/>}/>
                <Route path='/draft' element={<Draft/>} />
                <Route path='/manageblogs' element={<ManageBlogs/>}></Route>
                <Route path='/bookmarks' element={<Bookmark/>}/>
              </Routes>
           
    </>
  );
}

export default Layout; 
