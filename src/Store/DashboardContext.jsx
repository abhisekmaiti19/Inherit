/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import GlobalContext from "./GlobalContext";

export const DashboardContext = createContext({});

export const DashboardContextProvider = ({children})=>{
    const {setUser} = useContext(GlobalContext);
    const apiUri = 'https://inheritbackend.onrender.com/api';
    const [cookies] = useCookies(['token']);

    const updateProfile= async (data)=> {
        const res = await axios.put(apiUri+'/profile', data, {
            headers: {
                token: `Bearer ${cookies['token']}`
            }
        })
        console.log(res.data);
        setUser({...res.data});

        return {status: res.status, message: res.data?.message }
    }
    const value={
        updateProfile
    }
    return (
        <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
    )
}

export default DashboardContext;