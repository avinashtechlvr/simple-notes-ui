import React from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { BiNotepad } from "react-icons/bi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from './ui/button';

import type { Note } from 'types';
import useNotes from 'hooks/useNotes';
import NotesModal from "./NotesModal";
import { useLoadingStore } from 'stores/useLoadingStore';
import LoadingModal from './Loading';
interface NoteProps {
  note: Note;
  openModal: () => void;
  setNote: (note: Note) => void;
}

export const Notes: React.FC<NoteProps> = ({ note,setNote,openModal }) => {
  const { deleteNote} = useNotes();
  const {isLoading, toggleLoading} = useLoadingStore();
  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    toggleLoading(true)
    deleteNote(note.id);
    toggleLoading(false);
  }


  function handleOpenPopup() {
    setNote(note);
    openModal();
  }

  return (
    <>
      {
        isLoading && <LoadingModal />
      }
      <div className=" relative p-2 transform transition duration-500 hover:scale-110 w-80 m-4">

        <AlertDialog >
          <AlertDialogTrigger asChild>
            <div className='absolute top-2 right-2 m-2 text-red-500 hover:text-red-700 transition-colors duration-300 '>
              <TrashIcon className='w-5 h-5' />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>

            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="bg-gray-100 dark:bg-gray-700 cursor-pointer text-center shadow-md hover:shadow-lg p-4 rounded-lg w-full" onClick={handleOpenPopup}>


          <h1 className=" truncate font-bold dark:text-gray-300 text-xl  text-[#ffab4a] flex items-start justify-start mt-4">
            <BiNotepad className="ml-2 mt-1 mr-3 text-[#ffab4a]" />
            {note.title}
          </h1>
          <p className="truncate dark:text-gray-300 flex items-start justify-start mr-3 mt-4 mb-5 ml-5">{note.content}</p>
        </div>

      </div>
    </>


  );
};
