import {useLocation} from "react-router-dom"
import Header from './header'
import { Footer } from './Footer'



function Layout({children}) {
  const authtoken = localStorage.getItem("authtoken");
  const location = useLocation();
  const noheader = ["/signin", "/login", "/createpost"];
  !authtoken ? noheader.push("/") : null;

return (
    <div className="min-h-screen flex flex-col">
      {!noheader.includes(location.pathname) && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!noheader.includes(location.pathname) && <Footer />}
    </div>
  );
}
export default Layout; 
