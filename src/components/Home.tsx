import { useState, useEffect } from "react";

import { Toaster } from "@/components/ui/toaster"

import Login from "./Login";
import Dashboard from "./Dashboard";
import { toast } from "./ui/use-toast";
import axiosInstance from "axiosInstance";

import LoadingModal from "./Loading";
import { useUserStore } from "stores/useUserStore";
import { useNotesStore } from "stores/useNoteStore";
import { useLoadingStore } from "stores/useLoadingStore";
const Home = () => {
    const { toggleLoading, isLoading } = useLoadingStore();
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    const { user, saveUser, isUserLoggedIn, logInUser, logOutUser } = useUserStore();
    const { fetchNotes } = useNotesStore();
    useEffect(() => {
        // toggleLoading(true);
        let isLoggedIn = null;
        toggleLoading(true)
        isLoggedIn = localStorage.getItem('accessToken');
        if (isLoggedIn != null || isLoggedIn != undefined) {
            logInUser();
            toggleLoading(false);
        } else {
            logOutUser()
            toggleLoading(false);
        }
        //setIsLoading(false);
    }, []);
    useEffect(() => {
        if (isUserLoggedIn) {
            toggleLoading(true);
            axiosInstance.get("user/getdetails").then(async (res) => {
                saveUser({ id: res.data.id, name: res.data.name, email: res.data.email });
                await fetchNotes();
                toggleLoading(false);
            }).catch((error) => {
                toggleLoading(false);
                if (isUserLoggedIn == true && error.status !== 200 && error.response.data) {
                    toast({ title: "Something Went wrong", description: error.response.data.detail });
                    logOutUser();
                }
            });
        }


    }, [isUserLoggedIn]);

    function loginHandler() {
        toast({ title: 'Welcome!!!', description: 'Start adding notes by clicking add icon...' })
        const isLoggedIn = localStorage.getItem('accessToken');
        if (isLoggedIn != null || isLoggedIn != undefined) {
            logInUser();
        }
    }

    return (
        <div >
            {
                isLoading ?? <LoadingModal />
            }
            {
                isUserLoggedIn ?
                    (
                        <Dashboard />

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

export default Home;