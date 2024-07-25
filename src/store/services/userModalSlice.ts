import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types/users";

type IntialStateType = {
    isOpen:boolean;
    modalType:'create'|'edit';
    initialValue:IUser;
}

const initialState: IntialStateType = {
    isOpen:false,
    modalType:'create',
    initialValue: {
        id:0,
        name:'',
        email:'',
        gender:'',
        status:''
    }
};

const userModalSlice = createSlice({
    name: "userModal",
    initialState,
    reducers: {
        openNewUserModal:(state)=>{
            state.isOpen = true;
            state.modalType='create';
        },
        closeUserModal:(state)=>{
            state.isOpen = false;
            state.modalType='create';
        },
        openEditUserModal:(state,action:PayloadAction<IUser>)=>{
            state.isOpen = true;
            state.modalType='edit';
            state.initialValue = action.payload;
        }

    }
});

export const userModalActions = userModalSlice.actions;
export const userModalReducer = userModalSlice.reducer;
