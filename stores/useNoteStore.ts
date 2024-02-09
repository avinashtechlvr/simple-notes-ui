import { create } from "zustand";
import axiosInstance from "axiosInstance";
import axios from "axios";
import type { Note } from "types";
import { useUserStore } from "./useUserStore";
import { toast } from "@/components/ui/use-toast";

interface NotesState {
  notes: Note[];
  notesFilteredList: Note[];
  searchString: string;
  setSearchString: (query: string) => void;
  fetchNotes: (query: string) => Promise<void>;
  saveNotes: (note: Note) => Promise<void>;
  updateNotes: (note: Note) => Promise<void>;
  deleteNotes: (noteId: number) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  notesFilteredList: [],
  searchString: "",
  setSearchString: (query) =>  set({searchString: query}),
  fetchNotes: async (query: string) => {
    // Access user store within the action
    const { user, logOutUser } = useUserStore.getState();

    if (user) {

      try {
        // toggleLoading(true);
        const res = await axiosInstance.get(`/users/${user.id}/notes`);
        set({ notes: res.data });
        if (query == "") {
          set({ notesFilteredList: res.data});
        } else {
          const filtered = res.data.filter((ele: Note) => ele.title.toLowerCase().includes(query.toLowerCase()));
          set({notesFilteredList : filtered})
        }
        // toggleLoading(false);
      } catch (error: unknown) { // Explicitly marking error as unknown is optional but can improve clarity
        if (axios.isAxiosError(error)) { // Using Axios's built-in type guard
          // toggleLoading(false);
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
          post_id: note.id
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
