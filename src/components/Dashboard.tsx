import NavBar from "./NavBar";
import AddNote from "./AddNote";
import type { User } from "type";
import NotesList from "./NotesList";

interface DashboardProps {
    user: User | null
}
const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const notesList = [
        {
            id: 1,
            title: "Test",
            content: "Hello Test",
            created_at: "02-07-2024",
        },
        {
            id: 2,
            title: "Test",
            content: "Hello Test",
            created_at: "02-07-2024",
        },
        {
            id: 3,
            title: "Test",
            content: "Hello Test",
            created_at: "02-07-2024",
        },
        {
            id: 4,
            title: "Test",
            content: "Hello Test",
            created_at: "02-07-2024",
        },
        {
            id: 5,
            title: "Test",
            content: "Hello Test",
            created_at: "02-07-2024",
        },
        {
            id: 6,
            title: "Test",
            content: "Hello Test",
            created_at: "02-07-2024",
        },
        {
            id: 7,
            title: "Test",
            content: "Hello Test",
            created_at: "02-07-2024",
        },
        {
            id: 8,
            title: "Test",
            content: "Hello Test",
            created_at: "02-07-2024",
        },
        {
            id: 9,
            title: "Test",
            content: "Hello Test",
            created_at: "02-07-2024",
        }
        
    ]
    return (
        <div className="flex flex-col h-screen">
            <NavBar user={user} />
            <div className="flex-grow overflow-auto">
                <NotesList notes={notesList} />
            </div>
            <div className="grid m-4 justify-items-end">
                <AddNote />
            </div>

        </div>
    );
}

export default Dashboard;