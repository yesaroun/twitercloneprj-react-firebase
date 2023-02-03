import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "../routes/Home"
import Auth from "../routes/Auth"
import Profile from "../routes/Profile";

const AppRouter = ({isLoggedIn, userObj}) => {
  return (
    <Router>
      <Routes>
        {/*{isLoggedIn && <>*/}
        {/*  <Route path="/" element={<Home/>}/>*/}
        {/*  <Route path="/profile" element={<Profile/>}/>*/}
        {/*</>}*/}
        {/*{!isLoggedIn && <>*/}
        {/*  <Route path="/" element={<Auth/>}/>*/}
        {/*</>}*/}
        {/*로그인 된 경우 홈 화면으로  보내고 그렇지 않은 경우 auth로 보낸다.*/}
        {isLoggedIn ? (<>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </>) : (
        !isLoggedIn && <>
          <Route path="/" element={<Auth/>}/>
        </>)
        }
        {/*이렇게 처리하기도 한다*/}
      </Routes>
    </Router>
  );
}

export default AppRouter