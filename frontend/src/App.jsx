import { BrowserRouter as Router } from 'react-router-dom'
import BlogProvider from './context/blogcontent'
import AuthProvider from './context/AuthProvider'
import Layout from './component/layout'
import { UserInfoProvider } from './context/UserInfoProvider';
import { SearchContentProvider } from './context/SearchContentProvider';
import SearchProvider from './context/SearchProvider';
import { Toaster } from 'react-hot-toast';




function App() {

  return (
    <>
      <Router>
        <SearchProvider>
          <SearchContentProvider>
            <BlogProvider>
              <UserInfoProvider>
                <AuthProvider>
                  <Layout />
                </AuthProvider>
              </UserInfoProvider>
            </BlogProvider>
          </SearchContentProvider>
        </SearchProvider>
      </Router>
      <Toaster/>
    </>
  );
}

export default App
