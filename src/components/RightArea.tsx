import React, { useContext } from 'react'
import { socket } from '../socket/socket';
import { UserItem, UserList } from '../styled/Lists';
import { TitleText } from '../styled/Text';
import { UserContext } from '../utils/UserContext';
import { MessageArea } from './MessageArea';

interface RightAreaProps {

}

export const RightArea: React.FC<RightAreaProps> = () => {
    const {users, updateUsers, updateAuth} = useContext(UserContext)

    socket.on("game:users:list", (arg) => {
        console.log("joined,", arg)
        updateAuth(arg.auth)
        updateUsers(arg.list)
    })



        return (<>
            <TitleText>Connected users:</TitleText>
            <UserList>
            {users?.map((u, i)  => {
            return    <UserItem key={i}>{u}</UserItem>
            })}
            </UserList>
            <MessageArea />
            </>
        );
}