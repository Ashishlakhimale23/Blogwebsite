import BlogProvider from './context/blogcontent'
import AuthProvider from './context/AuthProvider'
import Layout from './component/layout'
import { UserInfoProvider } from './context/UserInfoProvider';
import SearchProvider from './context/SearchProvider';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from "./page/home" 
import CreatePost from "./page/createpost" 
import Signin from './page/signin'
import Login from './page/login'
import Usersinfo from './page/edituserinfo'
import BlogPage from './page/BlogPage'
import { UserProfile } from './page/userprofile'
import Draft from './page/draft'
import ManageBlogs from './page/manageblogs'
import Bookmark from './page/bookmarks'
import { PrivateRoute } from './component/PrivateRoute'



function App() {

  const authtoken = localStorage.getItem("authtoken");
  return (
    <>
      <Router>
        <SearchProvider>
          <BlogProvider>
            <UserInfoProvider>
              <AuthProvider>
                <Layout>
                  <Routes>
                    <Route
                      path="/"
                      element={authtoken ? <Home /> : <Signin />}
                    ></Route>
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                      <Route path="/home" element={<Home />} />
                      <Route path="/createpost" element={<CreatePost />} />
                      <Route path="/edit/:username" element={<Usersinfo />} />
                      <Route
                        path="/:username"
                        element={<UserProfile />}
                      ></Route>
                      <Route path="/blog/:BlogLink" element={<BlogPage />} />
                      <Route path="/draft" element={<Draft />} />
                      <Route
                        path="/manageblogs"
                        element={<ManageBlogs />}
                      ></Route>
                      <Route path="/bookmarks" element={<Bookmark />} />
                    </Route>
                  </Routes>
                </Layout>
              </AuthProvider>
            </UserInfoProvider>
          </BlogProvider>
        </SearchProvider>
      </Router>
      <Toaster />
    </>
  );
}

export default App

