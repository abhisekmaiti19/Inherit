/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({children})=>{
    const apiUri = 'https://inheritbackend.onrender.com/api';

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const checkLoginStatus = async ()=>{
        if(cookies['token']){
            setIsLoggedIn(true);
            const res = await fetch(apiUri+'/profile', {
                headers: {
                    'token': `Bearer ${cookies['token']}`
                }
            });
            const userData = await res.json();
            setUser(userData);
        }
    }

    const login = async(email, password)=>{
        const res = await fetch(apiUri+'/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
            body: JSON.stringify({
                email: email,
                password: password
            })
		})
        const msg = await res.json();
        if(res.ok){
            setIsLoggedIn(true);
            setUser(msg.user);
            setCookie('token', msg.token, {maxAge: 86400});

            const userProfile = await fetch(apiUri+'/profile')
            console.log(userProfile.json());
        }
            
        return {status: res.ok, message: msg?.message};
    }


    const signup = async(email, password)=>{
        const res = await fetch(apiUri+'/signup', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
            body: JSON.stringify({
                email: email,
                password: password
            })
		})
        const msg = await res.json();
        if(res.ok){
            setIsLoggedIn(true);
            setUser(msg.user);
            setCookie('token', msg.token, {maxAge: 86400});
        }
            
        return {status: res.ok, message: msg?.message};
    }

    const logout = async ()=>{
        const res = await fetch(apiUri+'/logout', {
			method: 'POST',
            headers: {
                token: `Bearer ${cookies['token']}`
            }
		})
        if(res.status == 400) {
            setIsLoggedIn(false);
            removeCookie('token');
            setUser({}); 
        } else {
            alert('Internal Server Error');
        }
    }

    const value = {
        isLoggedIn,
        user,
        setUser,
        logout,
        login,
        signup,
        checkLoginStatus
    }

    return (
        <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    )
}

export default GlobalContext;