import { ModeToggle } from "./ModeToggle";
import { Input } from "./ui/input";
import Profile from "./Profile";
import type { User } from "types";
interface NavBarProps{
    user: User | null
}
const NavBar:React.FC<NavBarProps> = ({user}) => {
    return (
        <div className="grid grid-cols-4 m-4">
            <h1 className=" col-span-1 text-3xl font-bold"> Simple Notes</h1>
            <div className=" col-span-2">
                <Input type="search" placeholder="Search" />
            </div>
            <div className="col-span-1  ml-5">
                <div className="grid-cols-2 justify-items-end">
                    <div className="flex justify-end w-full">
                        <div className="mr-4">
                            <ModeToggle />
                        </div>


                        <Profile user={user} />

                    </div>
                </div>

            </div>
        </div>
    );
}

export default NavBar;