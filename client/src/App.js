import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Contact from './components/layout/Contact';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import {LOGOUT} from './actions/constants';

import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        store.dispatch(loadUser());

        window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({type: LOGOUT});
        });
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Navbar/>
                <Alert/>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="Contact" element={<Contact/>}/>
                    <Route path="profiles" element={<Profiles/>}/>
                    <Route path="profile/:id" element={<Profile/>}/>
                    <Route
                        path="dashboard"
                        element={<PrivateRoute component={Dashboard}/>}
                    />

                    <Route path="/*" element={<NotFound/>}/>
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
