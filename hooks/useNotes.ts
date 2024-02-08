import { useState } from 'react';
import type { Note } from 'types';
import { useNotesStore } from 'stores/useNoteStore';
const useNotes = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {saveNotes, fetchNotes, updateNotes, deleteNotes} = useNotesStore();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const updateNote = (note: Note) => {
        updateNotes(note);
        fetchNotes();
        closeModal();
    };
    const saveNote = (note: Note) => {
        saveNotes(note);
        fetchNotes();
        closeModal();
    };

    const deleteNote = (noteId: number) => {
        // setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId));
        deleteNotes(noteId);
        fetchNotes();
    };

    return { isModalOpen, openModal, closeModal, saveNote, updateNote, deleteNote };
};

export default useNotes;
