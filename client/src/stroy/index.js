import { create } from "zustand";
import { CreateAuthSlice } from "./slice/auth-slice";

export const useAppStore = create()((...a) =>({
    ...CreateAuthSlice(...a),
}));