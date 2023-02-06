import React from "react";
import { auth } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    // console.log("logout click");   // testcode
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
// 로그아웃 처리 코드
/*
  jsx 문법은 무조건 상단에 <div>나 빈태그(<></>)를 넣는다.
  코딩할 때는 화면을 먼저 그리고(return)
  여기에 기능을 준다. onclick에서 onLogOutClick() 추가

*/

export default Profile