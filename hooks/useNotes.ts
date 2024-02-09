import { useState } from 'react';
import type { Note } from 'types';
import { useNotesStore } from 'stores/useNoteStore';
import { useLoadingStore } from 'stores/useLoadingStore';
const useNotes = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [note,setNote] = useState<Note | undefined>(undefined);
    const {saveNotes, fetchNotes, updateNotes, deleteNotes} = useNotesStore();
    const {isLoading, toggleLoading} = useLoadingStore();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const updateNote = async (note: Note) => {
        toggleLoading(true);
        await updateNotes(note);
        fetchNotes("");
        setNote(undefined);
        closeModal();
        toggleLoading(false);
    };
    const saveNote = async (note: Note) => {
        toggleLoading(true);
        await saveNotes(note);
        fetchNotes("");
        setNote(undefined);
        closeModal();
        toggleLoading(false);
    };

    const deleteNote = async (noteId: number) => {
        // setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId));
        await deleteNotes(noteId);
        fetchNotes("");
    };

    return { isModalOpen, openModal, closeModal, saveNote, updateNote, deleteNote, note,setNote };
};

export default useNotes;
