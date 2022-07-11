import React, { Component } from 'react';
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";

import Footer from "./Footer.js";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import * as auth from "../auth.js";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, openEditProfile] = useState(false);
  const [isAddPlacePopupOpen, openAddPlace] = useState(false);
  const [isEditAvatarPopupOpen, openEditAvatar] = useState(false);
  const [selectedCard, setSelectedCards] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isloggedIn, setIsloggedIn] = useState(false);
  const [isRegisterSuccess, setRegisterInfo] = useState(false);
  const [registerInfo, openRegisterInfo] = useState(false);
  const [userData, setUserData] = useState({
    email: ""
  });
  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data.email) {
            localStorage.setItem("jwt", data.jwt);
            setUserData({ email: data.user.email });
            navigate("/sign-in");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if(isloggedIn){navigate('/')}
  }, [isloggedIn]);

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          setUserData({ email: data.user.email });
          setIsloggedIn(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegister = (email, password) => {
    auth
      .register(password, email)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          setUserData({ email: data.user.email });
          isRegisterSuccess(true);
          navigate("/sign-up");
        }
      })
      .catch((err) => {
        console.error(err);
        isRegisterSuccess(false);
      })
      .finally(() => {
        openRegisterInfo(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserData({
      email: ""
    });
    setIsloggedIn(false);

  };

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.error(err));

    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .setLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.error(err));
    } else {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.error(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter(function (e) {
            return e._id !== card._id;
          })
        );
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  const handleEditAvatarClick = () => {
    openEditAvatar(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    openEditProfile(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    openAddPlace(!isAddPlacePopupOpen);
  };

  const closeAllPopups = () => {
    openEditAvatar(false);
    openEditProfile(false);
    openAddPlace(false);
    openRegisterInfo(false);
    setSelectedCards({});
  };

  const handleCardClick = (card) => {
    setSelectedCards(card);
  };

  function handleUpdateUser(data) {
    api
      .setUserData(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setNewAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <body className="root">
        <div className="page">
          <Header isloggedIn={isloggedIn} handleLogout={handleLogout} />

          <Routes>
              <Route path="/sign-up">
                <Register handleRegister={handleRegister} />
              </Route>
              <Route path="/sign-in">
                <Login handleLogin={handleLogin} />
              </Route>
            </Routes>

          {/* <Register handleRegister={handleRegister} /> */}
          {/* <Login /> */}
          {/* <InfoTooltip isCorrect={false}  onClose={closeAllPopups} isOpen={true}/>  */}

          <Footer />
        </div>
      </body>
    </CurrentUserContext.Provider>
  );
}

export default App;
