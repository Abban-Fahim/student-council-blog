import { doc, getDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import Loading from "../Loading";

const Login = ({ isAdmin, setIsAdmin }) => {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);

  function auth() {
    const date = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000 + date;
    console.log(sevenDays - date);
    setLoadingPass(true);
    getDoc(doc(db, "password", "admin")).then((val) => {
      if (password === val.data().password) {
        window.localStorage.setItem(
          "isAdmin",
          JSON.stringify({ expiry: sevenDays, auth: true })
        );
        setIsAdmin(true);
      } else {
        setErr(true);
      }
      setLoadingPass(false);
    });
  }

  return (
    <main className="container">
      {isAdmin ? (
        <h2>
          You're already signed in. Go to
          <Link to="/admin">admin dashboard</Link>.
        </h2>
      ) : (
        <div className="col-8">
          {loadingPass ? (
            <Loading />
          ) : (
            <>
              {err ? (
                <div id="err" className="alert">
                  Wrong password!
                </div>
              ) : null}
              <h2>Sign in</h2>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary" onClick={auth}>
                Enter
              </button>
            </>
          )}
        </div>
      )}
    </main>
  );
};

export default Login;
