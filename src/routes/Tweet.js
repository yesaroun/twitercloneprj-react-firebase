import React, { useState } from "react";
import {
    doc,
    updateDoc,
    deleteDoc,
    } from 'firebase/firestore';
import { dbFirestore } from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Do you want to delete this?");
    if(ok){
        await deleteDoc(doc(dbFirestore, "tweets", `${nweetObj.id}`));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // 트위터 데이터 업데이트
    const NweetTextRef = doc(dbFirestore, "tweets", `${nweetObj.id}`);

    console.log(nweetObj)

    await updateDoc(NweetTextRef, {
        text: newNweet,
        createAt: Date.now(),
        createdId: nweetObj.createdId
        });
    
    setEditing(false)
  };
  
  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;