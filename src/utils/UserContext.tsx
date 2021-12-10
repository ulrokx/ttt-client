import { createContext, useEffect, useState } from "react";

interface UserContextInteface {
    messages: Array<string>
    users: Array<string>
    auth: boolean
    position: null | 0 | 1
    currentUser: string | null
    updateMessages: (msg: string) => void
    updateUsers: (msg: Array<string>) => void
    updateAuth: (msg: string) => void
    updatePosition: (msg: 0 | 1) => void
    updateCurrentUser: (user: string) => void
}
    export const UserContext = createContext<UserContextInteface>(undefined as any);

export const UserContextProvider: React.FC = ({children}) => {
    const [messages, setMessages] = useState<Array<string>>([]);
    const [users, setUsers] = useState<Array<string>>([]);
    const [auth, setAuth] = useState(false)
    const [position, setPosition] = useState<0 | 1| null>(null)
    const [currentUser, setCurrentUser] = useState<string | null>(null)
    const updateMessages = (msg: string) => {
        const newMsg = messages.slice();
        newMsg.push(msg);
        setMessages(newMsg);
    };

    const updateUsers = (msg: Array<string>) => {
        setUsers(msg);
    };

    const updateAuth = (msg: string) => {
        setAuth(msg === "true" ? true : false)
    }

    const updatePosition = (msg: 1 | 0) => {
        setPosition(msg);
    }

    const updateCurrentUser = (user: string) => {
        setCurrentUser(user);
    }

    useEffect(() => {
        console.log(users)
    }, [users])

    return (
        <UserContext.Provider
            value={{ currentUser: currentUser, updateCurrentUser, users: users, messages: messages, auth: auth, position: position, updatePosition, updateMessages, updateUsers, updateAuth }}
        >
            {children}
        </UserContext.Provider>
    );
};
