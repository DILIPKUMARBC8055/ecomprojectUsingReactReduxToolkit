import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelector } from "../../redux/Auth/authRedux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const { user, loading, error, message } = useSelector(authSelector);
  const isAuth = user;
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    // If user is authenticated redirect him to home page
    if (isAuth) {
      navigate("/");
    }

    // If some error occurs display the error
    if (error) {
      toast.error(message);
      dispatch(authActions.CLEAR_ERROR_MESSAGE());
    }
  }, [error, user]);

  const login = async (email, password) => {
    dispatch(authActions.TOGGLE_LOADING());
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(authActions.LOGIN_SUCCESS(res.user));
    } catch (error) {
      dispatch(authActions.LOGIN_FAIL(error.message.split(": ")[1]));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;

    // Form validation
    if (emailVal === "" || passwordVal === "" || passwordVal.length < 6) {
      return toast.error("Please enter valid data!");
    }

    await login(emailVal, passwordVal);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}> Sign In </h2>{" "}
        <input
          type="email"
          name="email"
          ref={emailRef}
          className={styles.loginInput}
          placeholder="Enter Email"
        />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          className={styles.loginInput}
          placeholder="Enter Password"
        />
        <button className={styles.loginBtn}>
          {" "}
          {loading ? "..." : "Sign In"}{" "}
        </button>{" "}
        <NavLink
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#224957",
            fontFamily: "Quicksand",
          }}
        >
          <p
            style={{
              fontWeight: "600",
              margin: 0,
            }}
          >
            {" "}
            Or SignUp instead{" "}
          </p>{" "}
        </NavLink>{" "}
      </form>{" "}
    </div>
  );
};

export default LoginPage;
