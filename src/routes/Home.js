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

    // db에 데이터 추가
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
  };


  // db로 부터 데이터 불러오기
  useEffect(() => {
    const q = query(
      collection(dbFirestore, "tweets"),
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
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="당신의 마음을 표현해 주세요 :)"
        />
        <input type="submit" value="tweet"/>
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <Tweet
              key={tweet.id}
              nweetObj={tweet}
              isOwner={tweet.createdId === userObj.uid}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;