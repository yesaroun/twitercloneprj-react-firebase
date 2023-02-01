import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onEmailChange = (event) => {
        const {value} = event.target
        setEmail(value)
    }
    const onPasswordChange = (event) => {
        const {value} = event.target
        setPassword(value)
        // value는 입력된 값 자체를 말한다.
    }

    const onSubmit = (event) => {
        event.preventDefault();     // submit 버튼 클릭 시 새로고침 방지
    }

    return (
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
            <input type="submit" value="sign in"/>
        </form>
    )
}

export default Auth