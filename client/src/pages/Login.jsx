import React, { useContext, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Alert } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import clientAxios from "../api/index";
import { actions, useStore } from "../context/order";

export default function Login() {
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName, photoURL, email },
    } = await signInWithPopup(auth, provider);

    const response = await clientAxios.post("/auth/login-gg", {
      displayName,
      photoURL,
      email,
    });
    console.log(response.data);
    if (response.status === 200) {
      sessionStorage.setItem("accessToken", response.data.token);
      sessionStorage.setItem("userId", response.data.user._id);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  ///\\\///
  const handleLogin = () => {
    if (email === "" && password === "") {
      setError(true);
      return;
    }
    setError(false);

    clientAxios
      .post("/auth/login", {
        email,
        password,
      })
      .then((res) => {
        sessionStorage.setItem("userId", res.data.user._id);
        sessionStorage.setItem("accessToken", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow className="mt-2">
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt=""
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <MDBContainer className="align-middle justify-center">
            <h1 className="mb-3 mb-2 ">MT BOOKING</h1>
          </MDBContainer>
          {error ? (
            <Alert severity="error" style={{ marginBottom: "6px" }}>
              Email hoặc password bị sai!
            </Alert>
          ) : (
            ""
          )}
          <div>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <Link href="">Forgot password?</Link>
            </div>

            <MDBBtn className="mb-4 w-100" size="lg" onClick={handleLogin}>
              Sign in
            </MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <MDBBtn
            className="mb-4 w-100"
            size="lg"
            style={{ backgroundColor: "#3b5998" }}
          >
            <MDBIcon fab icon="facebook-f" className="mx-2" />
            Continue with facebook
          </MDBBtn>

          <MDBBtn
            className="mb-4 w-100"
            size="lg"
            style={{ backgroundColor: "#55acee" }}
            onClick={handleLoginWithGoogle}
          >
            <MDBIcon
              fab
              icon="google"
              className="mx-2"
              style={{
                color:
                  "linear-gradient(to right, #4285F4, #FF0000, #FFFF00, #008000, #0000FF)",
                "& .fab-img": {
                  fill: "linear-gradient(to right, #4285F4, #FF0000, #FFFF00, #008000, #0000FF)",
                },
              }}
            />
            Continue with Google
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
