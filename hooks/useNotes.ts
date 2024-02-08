import { useState } from 'react';
import type { Note } from 'types';
import { useNotesStore } from 'stores/useNoteStore';
const useNotes = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [note,setNote] = useState<Note | undefined>(undefined);
    const {saveNotes, fetchNotes, updateNotes, deleteNotes} = useNotesStore();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const updateNote = async (note: Note) => {
        await updateNotes(note);
        fetchNotes();
        closeModal();
    };
    const saveNote = async (note: Note) => {
        await saveNotes(note);
        fetchNotes();
        closeModal();
    };

    const deleteNote = async (noteId: number) => {
        // setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId));
        await deleteNotes(noteId);
        fetchNotes();
    };

    return { isModalOpen, openModal, closeModal, saveNote, updateNote, deleteNote, note,setNote };
};

export default useNotes;
