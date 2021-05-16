import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        console.log("Hey it's me ", result.user);
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login__text">
          <h1>Sign In to Whatsapp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;

// import React from "react";
// import { Button } from "@material-ui/core";
// import "./Login.css";
// import { auth, provider } from "./firebase";
// import { useStateValue } from "./StateProvider";
// import actionTypes from "./reducer";

// function Login() {
//   const [{}, dispatch] = useStateValue();
//   const signIn = () => {
//     auth
//       .signInWithPopup(provider)
//       .then((result) => {
//         dispatch({
//           type: actionTypes.SET_USER,
//           user: result.user,
//         });
//         console.log("Hey it's me ", result.user);
//       })
//       .catch((err) => alert(err.message));
//   };
//   return (
//     <div className="login">
//       <div className="login__container">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
//           alt=""
//         />
//         <div className="login__text">
//           <h1>Sign In to Whatsapp</h1>
//         </div>
//         <Button type="submit" onClick={signIn}>
//           Sign In With Google
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Login;
