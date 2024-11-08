// import { userInfo } from "os";

export const CreateAuthSlice = (set) =>(
    {
        userInfo:undefined,
        setUserInfo: (userInfo) => set({userInfo}) ,
    
});
