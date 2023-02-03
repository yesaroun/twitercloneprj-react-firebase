import React, {useState} from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onEmailChange = (event) => {
    const {value} = event.target;
    setEmail(value);
  }
  const onPasswordChange = (event) => {
    console.log(event);
    const {value} = event.target;
    setPassword(value);
    // value는 입력된 값 자체를 말한다.
  }

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();     // submit 버튼 클릭 시 새로고침 방지
    console.log(event.target.value);
    // 여기서 firebase로 정보를 보내야 한다.
    // firebase authentication 서비스를 검색하며 잘 나온다.

    const auth = getAuth();
    // auth 불러와서 사용한다.
    let data;

    if (newAccount) {
      data = await createUserWithEmailAndPassword(auth, email, password);
    } else {
      data = await signInWithEmailAndPassword(auth, email, password)
    }
  }

  const onSocialClick = async (event) => {
    console.log(event);

    const {name} = event.target
    console.log(name)

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    console.log(data)

    //signInWithPopup(auth, provider)

    if (name === "google") {
      const provider = new GoogleAuthProvider();
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="input email"
          value={email}
          onChange={onEmailChange}
          required
        />
        <input type="password" name="password" placeholder="input password"
          value={password}
          onChange={onPasswordChange}
          required
        />
        <input type="submit" value={newAccount ? "Create Account": "Sign in"}/>

        <span onClick={toggleAccount}>
          {newAccount ? "Sign In" : "Create Account"}
        </span>
      </form>

      <button onClick={onSocialClick} name="google">Google Login</button>
      <button onClick={onSocialClick} name="github">GitHub Login</button>
      <button onClick={onSocialClick} name="facebook">Facebook Login</button>

    </div>
  )
}

export default Auth