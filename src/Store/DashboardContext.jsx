/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import GlobalContext from './GlobalContext';

export const DashboardContext = createContext({});

export const DashboardContextProvider = ({ children }) => {
	const { setUser, setBatches, batches, userId } = useContext(GlobalContext);
	const apiUri = 'https://inheritbackend.onrender.com/api';
	const [cookies, setCookie] = useCookies(['token']);

    const [enrollments, setEnrollments] = useState([]);

	const updateProfile = async (data) => {
		const res = await axios.put(apiUri + '/profile', data, {
			headers: {
				token: `Bearer ${cookies['token']}`,
			},
		});
		console.log(res.data);
		setUser({ ...res.data.user });
		setCookie('token', res.data.token);

		return { status: res.status, message: res.data?.message };
	};

	const publishBatch = async ({
		course,
		reg_end,
		batch_start,
		bannerImageUrl,
		teacher,
		description,
		elig,
	}) => {
		try {
			const res = await axios.post(
				`${apiUri}/batch`,
				{
					courseName: course,
					batchStart: batch_start,
					regEnd: reg_end,
					batchImg: bannerImageUrl,
					description: description,
					eligibility: elig,
					teacher: teacher,
				},
				{
					headers: {
						token: `Bearer ${cookies['token']}`,
					},
				}
			);
			setBatches([res.data, ...batches]);
			return { ok: true, data: res.data };
		} catch (e) {
			return { ok: false, data: e.message };
		}
	};

	const getApplicationStatus = async () => {
		try {
			const res = await axios.get(`${apiUri}/application`, {
				headers: {
					userId: userId,
					token: `Bearer ${cookies['token']}`,
				},
			});

			return res.data;
		} catch (e) {
			return null;
		}
	};

	const getEnrollments = async () => {
		try {
			const res = await axios.get(`${apiUri}/applications`, {
				headers: {
					token: `Bearer ${cookies['token']}`,
				},
			});
            setEnrollments(res.data);
			return res.data;
		} catch (e) {
			console.log(e.message);
			return null;
		}
	};

    const updateEnrollment = async(userId, batchId, field, value)=>{
        const data = {
            userId,
            batchId
        }
        data[`${field}`] = value;
        try {
			const res = await axios.put(`${apiUri}/applications`,data, {
				headers: {
					token: `Bearer ${cookies['token']}`,
				},
			});
            setEnrollments((en)=>en.map((e)=>{
                if(e.userId==userId && e.batchId==batchId) 
                    return {...e, ...res.data}
                else
                    return e
            }));
		} catch (e) {
			console.log(e.message);
			return null;
		}
    }

	const value = {
		updateProfile,
		publishBatch,
		getApplicationStatus,
        getEnrollments,
        setEnrollments,
        enrollments,
        updateEnrollment
	};
	return (
		<DashboardContext.Provider value={value}>
			{children}
		</DashboardContext.Provider>
	);
};

export default DashboardContext;
