import NavBar from "./NavBar";
import AddNote from "./AddNote";
import type { User } from "types";
import NotesList from "./NotesList";
import NotesModal from "./NotesModal";

import useNotes from "notes/useNotes";

interface DashboardProps {
    user: User | null
}
const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const { isModalOpen, openModal, closeModal, saveNote, deleteNote } = useNotes();
    const notesList = [
        {
            id: 1,
            title: "Why do we use it?",
            content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
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

    const onAddNote = () => {
        openModal();
    }
    return (
        <div className="flex flex-col h-screen">
            <NavBar user={user} />
            <div className="flex-grow overflow-auto">
                <NotesList notes={notesList} />
            </div>
            <div className="grid m-4 justify-items-end">
                <AddNote onClick={onAddNote} />
            </div>
            <NotesModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={saveNote}
                onDelete={deleteNote}
            />
        </div>
    );
}

export default Dashboard;