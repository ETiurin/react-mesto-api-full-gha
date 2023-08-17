import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";

import authApi from "../utils/AuthApi";

import Login from "./Login";
import Register from "./Register";
import Mesto from "./Mesto";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [popupSucceeded, setPopupSucceeded] = useState(false);
    const [popupFailed, setPopupFailed] = useState(false);

    useEffect(() => {
        checkToken();
    },[])

    function handleSingOut() {
        localStorage.removeItem('jwt');
        setCurrentUser({});
        setLoggedIn(false);
        navigate('/sign-in');
    }

    function handleClosePopup() {
        setPopupSucceeded(false);
        setPopupFailed(false);
    }

    function checkToken() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            authApi
                .checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setCurrentUser((user) => ({
                            ...user,
                            userEmail: res.data.email
                        }));
                        setLoggedIn(true);
                        setIsLoaded(true);
                        navigate('/', { replace: true });
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setIsLoaded(true);
        }
    }

    if (!isLoaded) return null;

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header onSignOut={handleSingOut} userData={currentUser} isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute isLoggedIn={isLoggedIn} element={<Mesto setCurrentUser={setCurrentUser}/>}/>
                    } />
                    <Route path="/sign-up" element={<Register setPopupSucceeded={setPopupSucceeded} setPopupFailed={setPopupFailed} />}/>
                    <Route path="/sign-in" element={<Login setLoggedIn={setLoggedIn} setUserData={setCurrentUser} setPopupFailed={setPopupFailed} />}/>
                </Routes>
                <InfoTooltip name="info" isOpen={popupSucceeded || popupFailed} isSuccess={popupSucceeded} onClose={handleClosePopup} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
