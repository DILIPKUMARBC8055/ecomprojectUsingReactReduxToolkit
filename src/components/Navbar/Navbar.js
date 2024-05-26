import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelector } from "../../redux/Auth/authRedux";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const data=useSelector(authSelector);


  const { user } = useSelector(authSelector);
  const isAuthenticated = user;
  const dispatch=useDispatch();
  const auth=getAuth();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const logout = async () => {
    try {
      const res = await signOut(auth);
    

      dispatch(authActions.LOGOUT("Signed out successfully!"));
    } catch (error) {
      dispatch(authActions.CLEAR_ERROR_MESSAGE());
    }
  };

  // Function to logout from app
  const onLogoutHandler = () => {
    scrollTop();
    logout(); // inbuilt firebase function to logout
  };

  return (
    <nav
      className="navbar"
      style={{
        justifyContent: "space-evenly",
        boxShadow: "rgb(17 17 26 / 5%) 0px 15px 20px",
      }}
    >
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={() => {}}>
          Busy Buy{" "}
        </NavLink>{" "}
        <ul
          className={click ? "nav-menu active" : "nav-menu"}
          onClick={scrollTop}
        >
          <li className="nav-item active">
            <NavLink
              activeclassname="active-links"
              to="/"
              className="nav-links"
              exact="true"
            >
              <span>
                <img
                  className="icon_styles"
                  src="https://cdn-icons-png.flaticon.com/128/25/25694.png"
                  alt="Home"
                  onClick={scrollTop}
                />{" "}
              </span>{" "}
              Home{" "}
            </NavLink>{" "}
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item active">
                <NavLink
                  activeclassname="active-links"
                  to="/myorders"
                  className="nav-links"
                >
                  <span>
                    <img
                      className="icon_styles"
                      src={
                        "https://cdn-icons-png.flaticon.com/128/2435/2435281.png"
                      }
                      alt="Home"
                      onClick={scrollTop}
                    />{" "}
                  </span>{" "}
                  My orders{" "}
                </NavLink>{" "}
              </li>
              <li className="nav-item active">
                <NavLink
                  activeclassname="active-links"
                  to="/cart"
                  className="nav-links"
                >
                  <span>
                    <img
                      className="icon_styles"
                      src={
                        "https://cdn-icons-png.flaticon.com/128/3144/3144456.png"
                      }
                      alt="Home"
                      onClick={scrollTop}
                    />{" "}
                  </span>{" "}
                  Cart{" "}
                </NavLink>{" "}
              </li>{" "}
            </>
          )}
          <li className="nav-item active">
            {" "}
            {isAuthenticated ? (
              <NavLink
                to="/"
                onClick={onLogoutHandler}
                activeclassname="active-links"
                className="nav-links"
              >
                <span>
                  <img
                    className="icon_styles"
                    src={
                      "https://cdn-icons-png.flaticon.com/128/9208/9208320.png"
                    }
                    alt="Home"
                  />
                </span>
                Logout{" "}
              </NavLink>
            ) : (
              <>
                <NavLink
                  activeclassname="active-links"
                  to="/signin"
                  className="nav-links"
                >
                  <span>
                    <img
                      className="icon_styles"
                      src={
                        "https://cdn-icons-png.flaticon.com/128/10479/10479887.png"
                      }
                      alt="Home"
                      onClick={scrollTop}
                    />{" "}
                  </span>
                  SignIn{" "}
                </NavLink>{" "}
              </>
            )}{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </nav>
  );
};

export default Navbar;
