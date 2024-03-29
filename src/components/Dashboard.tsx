import NavBar from "./NavBar";
import AddNote from "./AddNote";
import type { User } from "types";
import NotesList from "./NotesList";
import NotesModal from "./NotesModal";

import { useNotesStore } from "stores/useNoteStore";
import useNotes from "hooks/useNotes";
import LoadingModal from "./Loading";
import { useLoadingStore } from "stores/useLoadingStore";
const Dashboard = () => {
    const { isModalOpen, openModal, closeModal, updateNote, saveNote, deleteNote, note, setNote } = useNotes();
    const { notesFilteredList } = useNotesStore();
    const { isLoading } = useLoadingStore();
    const onAddNote = () => {
        setNote(note);
        openModal();
    }
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex-grow overflow-auto">
                <NotesList notes={notesFilteredList} />
            </div>
            <div className="grid m-4 justify-items-end">
                <AddNote onClick={onAddNote} />
            </div>
            <NotesModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={saveNote}
                onUpdate={updateNote}
                onDelete={deleteNote}
                note={note}
            />
            {
                isLoading ?? <LoadingModal />
            }
        </div>
    );
}

export default Dashboard;