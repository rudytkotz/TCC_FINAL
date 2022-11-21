import { useState } from "react"
import { UserDataType } from "../../pages/Reconhecimento"
import { UserContext } from "./UserContext"

export const UserProvider = ({children}: {children: JSX.Element}) => {
    const [user, setUser] = useState<UserDataType | null>(null)
    const [userId, setUserId] = useState<number | null>(null)
    const [photo, setPhoto] = useState<any>("")

    const setUserInContext = (user: UserDataType) => {
        setUser(user)
    }

    const setPhotoInContext = (base64: any) => {
        setPhoto(base64)
    }

    const setUserIdInContext = (id: number) => {
        setUserId(id)
    }

    return (
        <UserContext.Provider value={{ user, photo, userId, setUserInContext, setPhotoInContext, setUserIdInContext}}>
            {children}
        </UserContext.Provider>
    )
}