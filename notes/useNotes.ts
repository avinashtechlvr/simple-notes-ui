import { useState } from 'react';
import type { Note } from 'types';

const useNotes = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [notes, setNotes] = useState<Note[]>([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const saveNote = (note: Note) => {
        setNotes((prevNotes) => [...prevNotes, note]);
        closeModal();
    };

    const deleteNote = (noteId: number) => {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId));
    };

    return { isModalOpen, openModal, closeModal, notes, saveNote, deleteNote };
};

export default useNotes;
