import { createContext } from "react";
import { UserDataType } from "../../pages/Reconhecimento";

export type UserContextType = {
    user: UserDataType | null;
    userId: number | null;
    photo: string;
    setUserInContext: (user: UserDataType) => void;
    setPhotoInContext: (base64: string | null) => void;
    setUserIdInContext: (id: number) => void;
}

export const UserContext = createContext<UserContextType>(null!)