import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "../socket/socket";
import { Button } from "../styled/Button";
import { FlexDiv } from "../styled/FlexDiv";
import { StandardText } from "../styled/Text";
import { TextInput } from "../styled/TextInput";
import { UserContext } from "../utils/UserContext";


const MessageBox = styled.div`
    display: flex;
    flex: 1;
    overflow-y: scroll;
    flex-direction: column;
    height: 1vh;
`;

export const MessageArea: React.FC = () => {
    const {currentUser} = useContext(UserContext)
    useEffect(() => {
        
    }, [currentUser]);
    const sendMessage = (e: any) => {
        console.log("sending message, ", {msg: msg, sender: currentUser})
        e.preventDefault()
                            socket.emit("messagesend", {
                                msg: msg,
                                sender: currentUser,
                            })
                            setMessages([...messages, {msg: msg, sender: currentUser}])

    }
    const [messages, setMessages] = useState<any>([])
    const [msg, setMsg] = useState("");
    socket.on("messagerec", (arg) => {
        console.log("got message", arg)
        setMessages([...messages, arg])
    });
    if(!currentUser) return null;
    return (
        <>
            <MessageBox>
                <FlexDiv>
                    <form onSubmit={e => sendMessage(e)}>
                    <TextInput
                        style={{ height: "1.5em" }}
                        onChange={(v) => setMsg(v.target.value)}
                        onSubmit={sendMessage}
                        value={msg}
                    />
                    <Button onClick={sendMessage} type="submit">
Send
                    </Button>
                    </form>
                </FlexDiv>
                {messages.map((m: { sender: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; msg: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, id: React.Key | null | undefined) => (
                    <StandardText key={id}>
                        {m.sender}: {m.msg}
                    </StandardText>
                ))}
            </MessageBox>
        </>
    );
};
