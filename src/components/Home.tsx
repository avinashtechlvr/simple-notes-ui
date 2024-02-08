import { useState, useEffect } from "react";

import { Toaster } from "@/components/ui/toaster"

import Login from "./Login";
import Dashboard from "./Dashboard";
import { toast } from "./ui/use-toast";
import { Progress } from "./ui/progress";
import axiosInstance from "axiosInstance";
import type { User } from "types";


const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [progressValue, setProgressValue] = useState(40);
    const [user, setUser] = useState<User|null>(null);
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setProgressValue(70), 2000);
        const isLoggedIn = sessionStorage.getItem('accessToken');

        if (isLoggedIn != null || isLoggedIn != undefined) {
            setLoggedIn(true);
            
            setIsLoading(false);
        } else {
            setLoggedIn(false);
            setIsLoading(false);
        }
        //setIsLoading(false);
    }, []);
    useEffect(()=>{
        axiosInstance.get("user/getdetails").then((res) => {
            setUser({id: res.data.id, name: res.data.name, email: res.data.email});
        }).catch((error)=>{
            
            if( loggedIn == true && error.status !== 200 && error.response.data){
               toast({title: "Something Went wrong", description: error.response.data.detail});
               setLoggedIn(false);
            }
        });
    
    },[loggedIn])
    function loginHandler() {
        toast({ title: 'Welcome!!!', description: 'Start adding notes by clicking add icon...' })
        const isLoggedIn = sessionStorage.getItem('accessToken');
        if (isLoggedIn != null || isLoggedIn != undefined) {
            setLoggedIn(true);
        }
    }
    if (isLoading == true) {
        return <div className="grid grid-cols-1 justify-items-center ">
            <div className="col-span-1">
                <Progress value={progressValue} />
            </div>
        </div>
    }
    else {
        return (
            <div >

                {
                    loggedIn ?
                        (
                            <Dashboard user={user} />

                        ) :
                        (
                            <div className="mt-20 flex justify-center items-center">
                                <Login loginHandler={loginHandler} />
                            </div>
                        )
                }

                <div>
                    <Toaster />

                </div>

            </div >
        );
    }

}

export default Home;