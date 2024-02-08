// src/components/NotesModal.tsx
import { Cross2Icon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import type { Note } from 'types';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from './ui/textarea';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
  onUpdate: (note: Note) => void
  onDelete: (noteId: number) => void;
  note?: Note;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, onSave,onUpdate, onDelete, note }) => {
  const [noteContent, setNoteContent] = useState(note?.content || '');
  const [noteTitle, setNoteTitle] = useState(note?.title || '');
  const [noteId, setNoteId] = useState(note?.id || 0);
  const handleSave = () => {
    if (!note) {
      const newNote = { id: noteId, title: noteTitle, content: noteContent, created_at: "", };
      onSave(newNote);
    } else {
      onUpdate({...note, title: noteTitle, content: noteContent});
    }
  };

  if (!isOpen) return null;

  return (
    // Modal structure remains the same
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="p-4 rounded-lg space-y-4">
        <Card className="w-[350px] relative">
          <CardHeader>
            <div className='absolute top-2 right-2 m-2 text-red-500 hover:text-red-700 transition-colors duration-300'>
              <Button variant="ghost" onClick={() => onClose()}>
                <Cross2Icon />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4 mt-4">
                <div className="flex flex-col space-y-1.5">
                  <Input placeholder='Enter title' id="title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Textarea placeholder='Enter content' id='content' value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline" onClick={() => onClose()}>Cancel</Button> */}
            <div className='mt-6'>
              <div className='absolute bottom-2 right-4 m-2'>

                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>

          </CardFooter>
        </Card>
      </div>
    </div>

  );
};

export default NotesModal;
