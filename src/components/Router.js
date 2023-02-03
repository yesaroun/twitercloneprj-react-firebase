import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "../routes/Home"
import Auth from "../routes/Auth"
import Profile from "../routes/Profile";

const AppRouter = ({isLoggedIn, userObj}) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn && <div>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </div>}
        {!isLoggedIn && <div>
          <Route path="/auth" element={<Auth/>}/>
        </div>}
        {/*로그인 된 경우 홈 화면으로  보내고 그렇지 않은 경우 auth로 보낸다.*/}
      </Routes>
    </Router>
  );
}

export default AppRouter