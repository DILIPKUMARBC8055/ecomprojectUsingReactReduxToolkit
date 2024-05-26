import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import styles from "./RegisterPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { authActions, authSelector } from "../../redux/Auth/authRedux";

const RegisterPage = () => {
  // Input refs
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const { user, loading, error, message } = useSelector(authSelector);

  const isAuth = user;
  const dispatch = useDispatch();
  const auth = getAuth();
  const signup = async (formData) => {
    dispatch(authActions.TOGGLE_LOADING());
    try {
      const { name, email, password } = formData;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      dispatch(authActions.SIGNUP_SUCCESS(res.user));
    } catch (error) {
      console.log(error);

      dispatch(authActions.SIGNUP_FAIL(error.message.split(": ")[1]));
    }
  };

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
  }, [error, user, message]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const nameVal = nameRef.current.value;
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;

    // Form validation
    if (
      emailVal === "" ||
      nameVal === "" ||
      passwordVal === "" ||
      passwordVal.length < 6
    ) {
      return toast.error("Please enter valid data!");
    }

    // call the signup function
    await signup({
      name: nameVal,
      email: emailVal,
      password: passwordVal,
    });
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}> Sign Up </h2>{" "}
        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="Enter Name"
          className={styles.loginInput}
        />{" "}
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
          {loading ? "..." : "Sign Up"}{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
};

export default RegisterPage;
