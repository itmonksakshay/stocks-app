import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userModalActions } from "./services/userModalSlice";
import { postModalActions } from "./services/postModalSlice";
import { RootStore } from ".";

const actions = {
    ...userModalActions,
    ...postModalActions
};

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
