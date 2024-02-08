import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useUserStore } from "stores/useUserStore";
import type { User } from "types";
import { Button } from "./ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ProfileProps {
    user: User | null
}

const Profile = () => {
    const { user, logOutUser } = useUserStore();
    const nameFirstLetter = user?.name.charAt(0).toUpperCase();
    function handelLogout() {
        logOutUser();
    }
    const [isLogout, setIsLogout] = useState(false);
    return (
        <>

            <HoverCard>
                <HoverCardTrigger>
                    <Avatar>
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback>{nameFirstLetter}</AvatarFallback>
                    </Avatar>

                </HoverCardTrigger>
                <HoverCardContent>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{user ? user.name : ""}</h4>
                        <p className="text-sm">
                            {user ? user.email : user}
                        </p>
                        <AlertDialog >
                            <AlertDialogTrigger asChild>
                                <Button className="mt-6" variant="destructive">Logout</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>

                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handelLogout} >Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </HoverCardContent>
            </HoverCard >

        </>
    );
}

export default Profile;