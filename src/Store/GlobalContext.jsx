/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
	const apiUri = 'https://inheritbackend.onrender.com/api';

	const [cookies, setCookie, removeCookie] = useCookies(['token']);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({});
    const [userId, setUserId] = useState('');
	const [batches, setBatches] = useState([]);

	const getBatches = async () => {
		try {
			const res = await axios.get(`${apiUri}/batch`, {
				headers: {
					token: `Bearer ${cookies['token']}`,
				},
			});

			setBatches([...res.data].reverse());
		} catch (e) {
			console.log(e.message, e);
		}
	};
	const checkLoginStatus = async () => {
		if (cookies['token']) {
			setIsLoggedIn(true);
			const res = await fetch(apiUri + '/profile', {
				headers: {
					token: `Bearer ${cookies['token']}`,
				},
			});
			const userData = await res.json();
			setUser(userData);
			setUserId(cookies['uid']);
		}
	};

	useEffect(() => {
		checkLoginStatus();
	}, []);

	useEffect(() => {
		if (isLoggedIn && cookies.token) getBatches();
	}, [isLoggedIn, cookies.token]);

	const login = async (email, password) => {
		const res = await fetch(apiUri + '/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const msg = await res.json();
		if (res.ok) {
			setUser(msg.user);
            setUserId(msg.user._id);
			setCookie('uid', msg.user._id, { maxAge: 86400 });
			setCookie('token', msg.token, { maxAge: 86400 });
			setIsLoggedIn(true);
		}

		return { status: res.ok, message: msg?.message };
	};

	const signup = async (email, password) => {
		const res = await fetch(apiUri + '/signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const msg = await res.json();
		if (res.ok) {
			setUser(msg.user);
            setUserId(msg.user._id);
			setCookie('uid', msg.user._id, { maxAge: 86400 })
			setCookie('token', msg.token, { maxAge: 86400 });
			setIsLoggedIn(true);
		}

		return { status: res.ok, message: msg?.message };
	};

	const logout = async () => {
		const res = await fetch(apiUri + '/logout', {
			method: 'POST',
			headers: {
				token: `Bearer ${cookies['token']}`,
			},
		});
		if (res.status == 200) {
			setIsLoggedIn(false);
            setUserId('');
			removeCookie('token');
			removeCookie('uid');
			setUser({});
			setBatches([]);
		} else {
			alert('Internal Server Error');
		}
	};

	const applyCourse = async (batchId, courseName) => {
		try {
			const res = await axios.post(
				`${apiUri}/application`,
				{
					userId,
					batchId,
                    courseName
				},
				{
					headers: {
						token: `Bearer ${cookies['token']}`,
					},
				}
			);
			return { ok: true, data: res.data };
		} catch (e) {
			return { ok: false, data: e.message };
		}
	};

	const value = {
		isLoggedIn,
		user,
        userId,
		batches,
		setBatches,
		setUser,
		logout,
		login,
		signup,
		checkLoginStatus,
		applyCourse,
	};

	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContext;
