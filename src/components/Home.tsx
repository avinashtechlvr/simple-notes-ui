import { useState, useEffect } from "react";

import { Toaster } from "@/components/ui/toaster"

import Login from "./Login";
import Dashboard from "./Dashboard";


const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('accessToken');
        if(isLoggedIn != null || isLoggedIn != undefined){
            setLoggedIn(true);
        }
    },[])
    return (
        <div >
            {
                loggedIn ?
                    (
                        <Dashboard />

                    ) :
                    (
                        <div className="mt-20 flex justify-center items-center">
                            <Login />
                        </div>
                    )
            }
            <div>
                <Toaster />
            </div>

        </div>
    );
}

export default Home;