import React from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { BiNotepad } from "react-icons/bi";
import type { Note } from 'type'; // Ensure this import path matches your type definition location

interface NoteProps {
  note: Note;
}

export const Notes: React.FC<NoteProps> = ({ note }) => {
  // Function to handle the delete action
  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); // Prevent click from bubbling to note's onClick
    // Implement deletion logic here, e.g., props.onDelete(note.id);
  }

  // Function to handle opening the popup to edit/update the note
  function handleOpenPopup() {
    // Implement popup open logic here, e.g., props.popupOpen(note.id);
  }

  return (
    // <div className="flex flex-col items-center md:w-60 sm:w-40 xs:w-40 p-2 transform transition duration-500 hover:scale-110 mr-4">
    //   <div className="note bg-gray-100 dark:bg-gray-700 cursor-pointer text-center shadow-md hover:shadow-lg p-4 rounded-lg relative w-full" onClick={handleOpenPopup}>
    //     <button onClick={handleDelete} className="text-red-500 hover:text-red-700 transition-colors duration-300 absolute top-0 right-0 m-2">
    //       <TrashIcon />
    //     </button>
    //     <h1 className="font-bold dark:text-gray-300 text-xl uppercase text-[#ffab4a] flex items-center justify-center gap-2">
    //       <BiNotepad className="text-[#ffab4a]" />
    //       {note.title}
    //     </h1>
    //     <p className="dark:text-gray-300">{note.content}</p>
    //   </div>
    // </div>
   
      <div className=" relative p-2 transform transition duration-500 hover:scale-110 w-80 m-4">
        <div className="bg-gray-100 dark:bg-gray-700 cursor-pointer text-center shadow-md hover:shadow-lg p-4 rounded-lg w-full" onClick={handleOpenPopup}>
          <button onClick={handleDelete} className="absolute top-2 right-2 m-2 text-red-500 hover:text-red-700 transition-colors duration-300 ">
            <TrashIcon />
          </button>
          <h1 className="font-bold dark:text-gray-300 text-xl uppercase text-[#ffab4a] flex items-start justify-start mt-4">
            <BiNotepad className="ml-2 mt-1 mr-3 text-[#ffab4a]" />
            {note.title}
          </h1>
          <p className="dark:text-gray-300 mt-4 mb-5 ml-5">{note.content}</p>
        </div>
      </div>

  );
};
