import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton, Input } from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import EmojiPicker from "./EmojiPicker";
import ClearIcon from "@material-ui/icons/Clear";

function Chat() {
  const { roomId } = useParams();
  const [seed, setSeed] = useState("");
  let [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  let [chosenEmoji, setChosenEmoji] = useState({});
  const [emojiPicker, setEmojiPicker] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("room")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      console.log("Hey, it's message", message);
      db.collection("room")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessage(snapshot.docs.map((doc) => doc.data()));
        });
    }

    console.log();
  }, [roomId]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("room").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  const emojiHandler = () => {
    return <EmojiPicker parent={handleCallBack} />;
  };
  const handleCallBack = (childData) => {
    // setChosenEmoji(childData);
    // console.log(chosenEmoji.emoji);
    if (childData) {
      setInput((prevalue) => prevalue + childData.emoji);
      console.log("***************", input);
    }

    // console.log(typeof chosenEmoji?.emoji);
    // console.log("Whole object : ", chosenEmoji);
    // console.log("hey its me", input.concat(chosenEmoji?.emoji));
  };
  const btnEmojiHandler = (e) => {
    e.preventDefault();
    setEmojiPicker(emojiHandler());
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h2>{roomName}</h2>
          <p>
            Last seen{" "}
            {message[message.length - 1]
              ? new Date(
                  message[message.length - 1]?.timestamp?.toDate()
                ).toUTCString()
              : "Months ago"}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {message.map((message) => (
          <p
            className={`chat__message ${
              message?.name === user.displayName && `chat__reciever`
            }`}
          >
            <span className="chat__name">{message?.name}</span>
            {message?.message}
            <span className="chat__timestamp">
              {new Date(message?.timestamp?.toDate()).toUTCString}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        {emojiPicker.length === undefined ? (
          <button
            onClick={() => {
              setEmojiPicker([]);
              console.log("Hey it's me", emojiPicker);
              console.log(emojiPicker === null);
            }}
            className="chat__footerCrossBtn"
          >
            <ClearIcon />
          </button>
        ) : (
          ""
        )}
        <button
          className="chat__footerEmojiBtn"
          onClick={(e) => {
            btnEmojiHandler(e);
          }}
        >
          {emojiPicker}
          {console.log("Hey it's open", emojiPicker.length)}
          <InsertEmoticonIcon />
        </button>
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // console.log("its ", input);
            }}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
