import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { User } from "type";

interface ProfileProps {
    user: User
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

            </HoverCardTrigger>
            <HoverCardContent>
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{user.name}</h4>
                    <p className="text-sm">
                        {user.email}
                    </p>
                    <div className="flex items-center pt-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                            {user.created}
                        </span>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard >
    );
}

export default Profile;