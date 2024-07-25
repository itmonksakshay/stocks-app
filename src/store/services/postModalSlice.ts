import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "@/types/post";

type IntialStateType = {
    isOpen: boolean;
    modalType: 'create' | 'edit';
    initialValue: IPost;
}

const initialState: IntialStateType = {
    isOpen: false,
    modalType: 'create',
    initialValue: {
        id: 0,
        user_id: 0,
        title: '',
        body: ''
    }
};

const postModalSlice = createSlice({
    name: "postModal",
    initialState,
    reducers: {
        openNewPostModal: (state) => {
            state.isOpen = true;
            state.modalType = 'create';
        },
        closePostModal: (state) => {
            state.isOpen = false;
            state.modalType = 'create';
        },
        openEditPostModal: (state, action: PayloadAction<IPost>) => {
            state.isOpen = true;
            state.modalType = 'edit';
            state.initialValue = action.payload;
        }

    }
});

export const postModalActions = postModalSlice.actions;
export const postModalReducer = postModalSlice.reducer;
