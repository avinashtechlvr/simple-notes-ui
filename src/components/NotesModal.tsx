// src/components/NotesModal.tsx
import React, { useState } from 'react';
import type { Note } from 'types';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
  onDelete: (noteId: number) => void;
  note?: Note;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, onSave, onDelete, note }) => {
  const [noteContent, setNoteContent] = useState(note?.content || '');
  const [noteTitle, setNoteTitle] = useState(note?.title || '');
  const [noteId, setNoteId] = useState(note?.id || 0);
  const handleSave = () => {
    if (!note) {
      const newNote = { id: noteId,title:noteTitle, content: noteContent, created_at: "", };
      onSave(newNote);
    } else {
      onSave({ ...note, content: noteContent });
    }
  };

  if (!isOpen) return null;

  return (
    // Modal structure remains the same
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Note</h2>
        <button onClick={onClose} className="text-sm">Cancel</button>
      </div>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Write your note here..."
        defaultValue={note?.content || ''}
      />
      <div className="flex justify-end space-x-2">
        {note && <button onClick={() => onDelete(note.id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>}
        <button onClick={() => onSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      </div>
    </div>
  </div>
  );
};

export default NotesModal;
