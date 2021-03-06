import React, { useContext, useEffect } from 'react'
import { socket } from '../socket/socket';
import { UserItem, UserList } from '../styled/Lists';
import { TitleText } from '../styled/Text';
import { UserContext } from '../utils/UserContext';
import { MessageArea } from './MessageArea';

interface RightAreaProps {

}

export const RightArea: React.FC<RightAreaProps> = () => {
    const {users, updateUsers, updateAuth} = useContext(UserContext)

    useEffect(() =>   {  socket.on("game:users:list", (arg) => {
        console.log("joined,", arg)
        updateAuth(arg.auth)
        updateUsers(arg.list)
    })

    }, [updateUsers, updateAuth]);


        return (<>
            {users.length > 0 ? <TitleText>Connected users:</TitleText> : null}
            <UserList>
            {users?.map((u, i)  => {
            return    <UserItem key={i}>{u}</UserItem>
            })}
            </UserList>
            <MessageArea />
            </>
        );
}