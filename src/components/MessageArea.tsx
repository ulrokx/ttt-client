import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "../socket/socket";
import { Button } from "../styled/Button";
import { FlexDiv } from "../styled/FlexDiv";
import { StandardText } from "../styled/Text";
import { TextInput } from "../styled/TextInput";
import { UserContext } from "../utils/UserContext";

const MessageBox = styled.div`
    overflow-y: auto;
    flex-direction: column;
    height: 500px;
`;

export const MessageArea: React.FC = () => {
    const { currentUser } = useContext(UserContext);
    useEffect(() => {}, [currentUser]);
    const sendMessage = (e: any) => {
        console.log("sending message, ", { msg: msg, sender: currentUser });
        e.preventDefault();
        socket.emit("messagesend", {
            msg: msg,
            sender: currentUser,
        });
        setMsg("");
        setMessages([{ msg: msg, sender: currentUser }, ...messages ]);
    };
    const [messages, setMessages] = useState<any>([]);
    const [msg, setMsg] = useState("");
    useEffect(() => {
    socket.on("messagerec", (arg) => {
        setMessages([...messages, arg]);
    });
}, [messages]);
    if (!currentUser) return null;
    return (
        <>
            <FlexDiv>
                <form
                    onSubmit={(e) => {
                        sendMessage(e);
                    }}
                >
                    <TextInput
                        name="message"
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
            <MessageBox>
                {messages.reverse().map(
                    (
                        m: {
                            sender: string
                            msg: string
                        },
                        id: React.Key | null | undefined
                    ) => (
                        <StandardText key={id}>
                            {m.sender}: {m.msg}
                        </StandardText>
                    )
                )}
            </MessageBox>
        </>
    );
};
