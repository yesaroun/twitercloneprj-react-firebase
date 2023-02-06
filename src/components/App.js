import React, {useEffect, useState} from "react";
import AppRouter from "./Router";
import {auth} from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const initializeUser = () => {
      auth.onAuthStateChanged((user) => {
        console.log("user");
        console.log(user);

        if (user) {
          setIsLoggedIn(true);
          // user가 로그인 되어있는지 확인
          setUserObj(user);
          // user 데이터 담기
        } else {
          setIsLoggedIn(false);
        }
        setInit(true);
        // initialising은 로그인 되었는지 아닌지 체킹하는 과정이다. 그 앱 들어가면 로그인 되는 그 과정
      });
  }

  useEffect(() => {
    initializeUser()
  }, []);

  return (
    <>
      <header>navigation</header>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing"}
      {/*로딩이 다 끝나면 approuter가 실행되고 로딩중이면(false)면 저 문구가 실행된다*/}
      <footer>twitter</footer>
    </>
  );
}

export default App;
