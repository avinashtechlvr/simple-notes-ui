import type { Note } from "type";
import { Notes } from "./Notes";

interface NotesListProps {
    notes: Note[]
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
    return (
        <div className="ml-8 flex flex-row space-x-4 overflow-y-auto  py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
                {
                    notes.map((item) => {
                        return (
                            
                                <Notes note={item} ></Notes>
                        )
                    })
                }
            </div>
        </div>
    );
}
export default NotesList;