import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { User } from "types";
import { Button } from "./ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";

interface ProfileProps {
    user: User | null
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    function handelLogout() {
        sessionStorage.removeItem('accessToken');
        location.reload();
    }
    const [isLogout, setIsLogout] = useState(false);
    return (
        <>

            <HoverCard>
                <HoverCardTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </HoverCardTrigger>
                <HoverCardContent>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{user ? user.name : ""}</h4>
                        <p className="text-sm">
                            {user ? user.email : user}
                        </p>
                        {/* <div className="flex items-center pt-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                            {user.created}
                        </span>
                    </div> */}
                        <AlertDialog >
                            <AlertDialogTrigger asChild>
                                <Button  className="mt-6" variant="destructive">Logout</Button>
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
                        {/* <Button className="mt-6" variant={"destructive"} onClick={() => setIsLogout(true)} >Logout</Button> */}
                    </div>
                </HoverCardContent>
            </HoverCard >

        </>
    );
}

export default Profile;