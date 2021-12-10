import React, { useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { BoardWrapper } from "../styled/BoardWrapper";
import { FlexDiv } from "../styled/FlexDiv";
import { StandardText } from "../styled/Text";
import { UserContext } from "../utils/UserContext";
import { JoinGameTexts } from "./JoinGameTexts";
import SquareTile from "./square";

const lines = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
];

export const Gameboard: React.FC = () => {
    const {position} = useContext(UserContext)
    const [boardState, setBoardState] = useState(Array(10).fill(null));

    const [turn, setTurn] = useState("x");

    const [winner, setWinner] = useState<null | string>(null);

    const [liney, setLiney] = useState<Array<number>>();

    const [playing, setPlaying] = useState(false);

    const [letter, setLetter] = useState<null | "x" | "o">(null)

    const checkWin = (board: Array<string | null>) => {
        lines.forEach((line) => {
            if (
                board[line[0]] === board[line[1]] &&
                board[line[1]] === board[line[2]] &&
                board[line[0]] !== null
            ) {
                setWinner(board[line[0]]);
                setPlaying(false)
                setLiney(line);
            } else {
                return;
            }
        });
    };

    useEffect(() => {
        checkWin(boardState);
    }, [boardState]);

    const handleClick = (id: number) => {
        // we don't mutate around here -_-
        if (!playing) return;
        if(letter !== turn) return;
        if (winner !== null) return;
        const newState = boardState.slice();
        newState[id] = turn;
        setBoardState(newState);
        setTurn(turn === "x" ? "o" : "x");
        socket.emit("clientmove", {id: id})
    };

    socket.on("game", (arg) => {
        setPlaying(arg.start);
        setTurn(arg.move);
        setLetter(arg.first === position ? "x" : "o")
    });

    socket.on("servermove", arg => {
        setTurn(turn === "x" ? "o" : "x")
        const newState = boardState.slice();
        newState[arg.id] = letter === "x" ? "o" : "x"
        setBoardState(newState)
    })

    return (
        <>
            {playing ? (
                <StandardText>it is {turn} turn to play, you are {letter}</StandardText>
            ) : winner ? <StandardText>{winner} is the winner!!</StandardText> : null}
            <BoardWrapper>
                {Array.from({ length: 9 }, (_, i) => i + 1).map(
                    (id: number) => {
                        return (
                            <SquareTile
                                isLine={!!liney?.includes(id)}
                                id={id}
                                display={boardState[id]}
                                press={() => {
                                    if (boardState[id] !== null) return;
                                    handleClick(id);
                                }}
                            />
                        );
                    }
                )}
            </BoardWrapper>
            <JoinGameTexts />
            <FlexDiv></FlexDiv>
        </>
    );
};
