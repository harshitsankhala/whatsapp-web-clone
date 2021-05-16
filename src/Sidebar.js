import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import "./Sidebar.css";
import { useStateValue } from "./StateProvider";
// import firebase from "firebase";
import db from "./firebase";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // const temp = db.firestore();
    const unsubscribe = db.collection("room").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <SearchOutlined /> <input type="text" placeholder="Search" />
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat={true} />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
        {/* <h1>Hey it's sidebar</h1>
        <h1>Hey it's sidebar</h1>
        <h1>Hey it's sidebar</h1>
        <h1>Hey it's sidebar</h1>
        <h1>Hey it's sidebar</h1>
        <h1>Hey it's sidebar</h1>
        <h1>Hey it's sidebar</h1> */}
      </div>
    </div>
  );
}

export default Sidebar;
