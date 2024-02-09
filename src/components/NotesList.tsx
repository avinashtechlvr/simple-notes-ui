import type { Note } from "types";
import { Notes } from "./Notes";
import NotesModal from "./NotesModal";
import useNotes from "hooks/useNotes";

interface NotesListProps {
    notes: Note[]
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
    const { deleteNote, setNote, note, openModal, isModalOpen, closeModal, saveNote, updateNote } = useNotes();
    return (
        <>
        {
            isModalOpen &&
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                <NotesModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={saveNote}
                    onUpdate={updateNote}
                    onDelete={deleteNote}
                    note={note}
                />
            </div>
        }

            <div className="ml-8 flex flex-row space-x-4 overflow-y-auto  py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
                    {
                        notes.length > 0 ? notes.map((item) => {
                            return (

                                <Notes key={item.id} note={item} openModal={openModal} setNote={setNote} ></Notes>
                            )
                        }) : (
                            <div className="flex justify-center items-center font-3xl font-bold">
                                <h1 className="ml-5 font-bold font-3xl" >No note found...</h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </>

    );
}
export default NotesList;