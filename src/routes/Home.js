import React, {useState, useEffect} from "react";
import Tweet from "routes/Tweet";
// routes/Tweet 불러옴 너무 커져서 나눴다
import {dbFirestore} from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
// 위에는 필요할 라이브러리들
// addDoc, collection 은 데이터 추가할때 사용하는 라이브러리 / 공식문서에 나와 있다.

const Home = ({userObj}) => {   // userObj를 가져온다 왜냐하면 글을 누가 썼는지 알기 위해 / user는 App.js에서 12줄 auth.onAuthStateChanged에서 user 데이터 받아옴
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    // 이 코드는 새로고침을 방지하기 위해서,

    // db에 데이터 추가
    // 공식 문서에서 옮겨 왔고, 참고하기
    await addDoc(collection(dbFirestore, "tweets"), {
      text: tweet,
      createAt: Date.now(),
      createdId: userObj.uid
    });
  };

  // 입력값
  const onChange = (event) => {
    const {value} = event.target;
    setTweet(value);
    // 입력한 값을 value로 받아올 수 있고 이걸해야 서버에 데이터를 보낼 수 있다.
  };


  // db로 부터 데이터 불러오기(읽어오기)
  useEffect(() => {
    // 실행하면 useEffect가 실행된다.
    console.log("useEffect 실행");
    // 값이 두번 출력되는 이유는 index.js에서 React.StrictMode여서 일부러 2번식 데이터를 보낸다. 개발 모드임 /
    const q = query(
      // query 문 부분?
      collection(dbFirestore, "tweets"),
      // 아래는 정렬 부분 처리 코드
      orderBy("createAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));

      console.log("tweetArr")
      console.log(tweetArr)
      setTweets(tweetArr);
    });
  }, []);

  console.log(tweets)
  console.log(userObj)


  return (
    <div>
      {/*글을 작성하는 코드*/}
      <form onSubmit={onSubmit}>
        <input
          value={tweet}   // 여기서 어떤 값을 입력하느지는 알 수가 없다. 그래서 input을 쓰면 onchange함수를 반드시 쓴다 그리고 value로 받아온다.
          onChange={onChange}
          type="text"
          placeholder="당신의 마음을 표현해 주세요 :)"
        />
        <input type="submit" value="tweet"/>
        {/*글을 쓰면 제출을 해야해서 submit 그리고 onSubmit 속성과 메서드를 주면 위에 onSubmit 메서드 작동한다*/}
      </form>
      <div>
        {tweets.map((tweet) => (    // 안에 있는 값을 하나씩 불러온다.
          <div key={tweet.id}>
            <Tweet
              key={tweet.id}
              nweetObj={tweet}
              isOwner={tweet.createdId === userObj.uid}
              // 글을 쓸때 작성자 구분하기!  ㄴ
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;