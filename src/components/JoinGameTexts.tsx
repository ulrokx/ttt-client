import React, { useContext, useState } from 'react'
import { socket } from '../socket/socket';
import { Button } from '../styled/Button';
import { FlexDiv } from '../styled/FlexDiv';
import { StandardText } from '../styled/Text';
import { TextInput } from '../styled/TextInput';
import { UserContext } from '../utils/UserContext';

interface JoinGameTextsProps {

}

export const JoinGameTexts: React.FC<JoinGameTextsProps> = () => {

    const {auth, updatePosition, updateCurrentUser} = useContext(UserContext)
    const [name, setName] = useState("")
    const [roomCode, setRoomCode] = useState("")
    const [response, setResponse] = useState("")

    socket.on("game:join:good", (arg) => {
        setResponse(arg.msg)
        updatePosition(arg.position)
        updateCurrentUser(arg.username)
    })

        return (
<>
            {!auth ? <> <FlexDiv>
                <TextInput value={name} onChange={(v) => setName(v.target.value)} placeholder="your name"/>
                <Button onClick={(e) => {
                    socket.emit("game:join", {nick: name, room: roomCode})
                }}>Connect</Button>
            </FlexDiv>
                <TextInput value={roomCode} onChange={(v) => setRoomCode(v.target.value)} placeholder="room code"/> </>: null}
                <StandardText>{response}</StandardText>
                </>
        );
}