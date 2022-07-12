import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import * as auth from "../utils/auth.js";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, openEditProfile] = useState(false);
  const [isAddPlacePopupOpen, openAddPlace] = useState(false);
  const [isEditAvatarPopupOpen, openEditAvatar] = useState(false);
  const [selectedCard, setSelectedCards] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterSuccess, setRegisterInfo] = useState(false);
  const [registerInfo, openRegisterInfo] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

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

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setEmail(data.data.email);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
        setEmail(email);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegister = (email, password) => {
    auth
      .register(password, email)
      .then((data) => {
        setRegisterInfo(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setRegisterInfo(false);
        console.error(err);
      })
      .finally(() => {
        openRegisterInfo(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setEmail("");
    setIsLoggedIn(false);
    navigate("/sign-in");
  };

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
          cards.filter(function(e) {
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
      <div className="page">
        <Header
          isloggedIn={isLoggedIn}
          handleLogout={handleLogout}
          email={email}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  selectedCard={selectedCard}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isCorrect={isRegisterSuccess}
          onClose={closeAllPopups}
          isOpen={registerInfo}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
