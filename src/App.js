import "./App.css";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    console.log("It's not refreshing ", user);
  }, [user]);
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;

// import Sidebar from "./Sidebar";
// import "./App.css";
// import Chat from "./Chat";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { useStateValue } from "./StateProvider";
// import Login from "./Login";

// /*
// const firebaseConfig = {
//   apiKey: "AIzaSyAOdSQAMIXdlFeOq8jbfZ__7oFTmAB1bRQ",
//   authDomain: "whatsapp-web-clone-79999.firebaseapp.com",
//   projectId: "whatsapp-web-clone-79999",
//   storageBucket: "whatsapp-web-clone-79999.appspot.com",
//   messagingSenderId: "182804643353",
//   appId: "1:182804643353:web:d0161494d1102ae309f488",
//   measurementId: "G-4T6RQWS1KF"
// };

// */
// function App() {
//   const [{ user }, dispatch] = useStateValue();

//   return (
//     <div className="App">
//       {console.log("Inside app", user)}
//       {!user ? (
//         <Login />
//       ) : (
//         <div className="app__body">
//           <Router>
//             <Sidebar />
//             <Switch>
//               <Route path="/rooms/:roomId">
//                 <Chat />
//               </Route>
//             </Switch>
//           </Router>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
