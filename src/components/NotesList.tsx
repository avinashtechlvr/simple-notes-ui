import type { Note } from "types";
import { Notes } from "./Notes";

interface NotesListProps {
    notes: Note[]
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
    return (
        <div className="ml-8 flex flex-row space-x-4 overflow-y-auto  py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
                {
                    notes.length>0 ? notes.map((item) => {
                        return (
                            
                                <Notes note={item} ></Notes>
                        )
                    }) : (
                        <div className="flex justify-center items-center font-3xl font-bold">
                            <h1>Add Some Note....</h1>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default NotesList;