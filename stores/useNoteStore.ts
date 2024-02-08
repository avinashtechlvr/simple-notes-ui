import { create } from "zustand";
import axiosInstance from "axiosInstance";
import axios from "axios";
import type { Note } from "types";
import { useUserStore } from "./useUserStore";
import { toast } from "@/components/ui/use-toast";

interface NotesState {
  notes: Note[];
  fetchNotes: () => Promise<void>;
  saveNotes: (note: Note) => Promise<void>;
  updateNotes: (note: Note) => Promise<void>;
  deleteNotes: (noteId: number) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  fetchNotes: async () => {
    // Access user store within the action
    const { user, logOutUser } = useUserStore.getState();
    
    if (user) {
      try {
        const res = await axiosInstance.get(`/users/${user.id}/notes`);
        set({ notes: res.data });
      } catch (error: unknown) { // Explicitly marking error as unknown is optional but can improve clarity
        if (axios.isAxiosError(error)) { // Using Axios's built-in type guard
          if (error.response && error.response.status !== 200) {
            toast({ title: "Something Went wrong", description: error.response.data.detail });
            logOutUser();
          }
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }
  },
  saveNotes: async (note) => {
    // Implement saving logic here
    const { user, logOutUser } = useUserStore.getState();
    
    if (user) {
      try {
        const res = await axiosInstance.post(`/notes/create`, {

            title: note.title,
            content: note.content,
            user_id: user.id
    
        });;
        set({ notes: res.data });
      } catch (error: unknown) { // Explicitly marking error as unknown is optional but can improve clarity
        if (axios.isAxiosError(error)) { // Using Axios's built-in type guard
          if (error.response && error.response.status !== 200) {
            toast({ title: "Something Went wrong", description: error.response.data.detail });
            logOutUser();
          }
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }
  },
  updateNotes: async (note) => {
    const { user, logOutUser } = useUserStore.getState();
    if (user) {
      try {
        const res = await axiosInstance.post(`/notes/update`, {
            title: note.title,
            content: note.content,
    
        });
        // set({ notes: res.data });
      } catch (error: unknown) { // Explicitly marking error as unknown is optional but can improve clarity
        if (axios.isAxiosError(error)) { // Using Axios's built-in type guard
          if (error.response && error.response.status !== 200) {
            toast({ title: "Something Went wrong", description: error.response.data.detail });
            logOutUser();
          }
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }
  },
  deleteNotes: async (noteId) => {
    // Implement delete logic here
    const { user, logOutUser } = useUserStore.getState();
    if (user) {
      try {
        const res = await axiosInstance.delete(`/notes/delete/${noteId}`)
        // set({ notes: res.data });
      } catch (error: unknown) { // Explicitly marking error as unknown is optional but can improve clarity
        if (axios.isAxiosError(error)) { // Using Axios's built-in type guard
          if (error.response && error.response.status !== 200) {
            toast({ title: "Something Went wrong", description: error.response.data.detail });
            logOutUser();
          }
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }
  }
}));
