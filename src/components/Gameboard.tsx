import React, {
    useCallback,
    useContext,
    useEffect, useState
} from "react";
import { socket } from "../socket/socket";
import { BoardWrapper } from "../styled/BoardWrapper";
import { Button } from "../styled/Button";
import { FlexDiv } from "../styled/FlexDiv";
import { StandardText } from "../styled/Text";
import { UserContext } from "../utils/UserContext";
import { JoinGameTexts } from "./JoinGameTexts";
import SquareTile from "./square";

// const initialState = {
//     boardState: Array(10).fill(null),
//     isXnext: true,
//     turnCount: 0,
//     waitingForAgain: false,
//     winner: "",
//     winningLine: [],
//     canMove: false
// }

// type StateType = typeof initialState;
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

// type ActionType = any

// const reducer: Reducer<StateType, ActionType> = (state: StateType, action) => {

// }

export const Gameboard: React.FC = () => {
    const { position } = useContext(UserContext);

    // const [state, dispatch] = useReducer(reducer, initialState);
    const [boardState, setBoardState] = useState(Array(10).fill(null));

    const [waiting, setWaiting] = useState(false);

    const [turn, setTurn] = useState("x");

    const [turnCount, setTurnCount] = useState(0);

    const [tie, setTie] = useState(false);

    const [winner, setWinner] = useState<null | string>(null);

    const [liney, setLiney] = useState<Array<number> | null>();

    const [playing, setPlaying] = useState(false);

    const [letter, setLetter] = useState<null | "x" | "o">(null);

    const checkWin = useCallback((board: Array<string>[] | any) => {
        setTurnCount(turnCount + 1);
        console.log("checking for win", board);
        lines.forEach((line) => {
            if (
                board[line[0]] === board[line[1]] &&
                board[line[1]] === board[line[2]] &&
                board[line[0]] !== null
            ) {
                console.log("board condieitons met")
                setWinner(board[line[0]]);
                setPlaying(false);
                setLiney(line);
            } else if (turnCount > 9) {
                setTie(true);
                setPlaying(false);
            }
        });
    }, [turnCount])

    const handleClick = (id: number) => {
        // we don't mutate around here -_-
        if (!playing) return;
        if (letter !== turn) return;
        if (winner !== null) return;
        const newState = boardState.slice();
        newState[id] = turn;
        setBoardState(newState);
        setTurn(turn === "x" ? "o" : "x");
        socket.emit("clientmove", { id: id });
        checkWin(newState);
    };
useEffect(() => {
    socket.on("game", (arg) => {
        setPlaying(arg.start);
        setTurn(arg.move);
        setLetter(arg.first === position ? "x" : "o");
    });

    socket.on("servermove", (arg) => {
        console.log("servermove")
        setTurn(turn === "x" ? "o" : "x");
        const newState = boardState.slice();
        newState[arg.id] = letter === "x" ? "o" : "x";
        setBoardState(newState);
        checkWin(newState);
    });

    socket.on("playagain", (arg) => {
        setBoardState(Array(10).fill(null));
        setWaiting(false);
        setTurn("x");
        setTurnCount(0);
        setTie(false);
        setWinner(null);
        setLiney(null);
        setPlaying(true);
        setLetter(arg.first === position ? "x" : "o");
    });
}, [boardState, checkWin, letter, position, turn])

    return (
        <>
            {playing ? (
                <StandardText>
                    it is {turn} turn to play, you are {letter}
                </StandardText>
            ) : winner ? (
                <StandardText>{winner} is the winner!!</StandardText>
            ) : tie ? (
                <StandardText>it's a tie :|</StandardText>
            ) : waiting ? (
                <StandardText>waiting for other player...</StandardText>
            ) : null}
            {!playing && boardState.includes("x") ? (
                <Button
                    onClick={() => {
                        socket.emit("game:again");
                        setWaiting(true);
                    }}
                >
                    play again
                </Button>
            ) : null}
            <BoardWrapper>
                {Array.from({ length: 9 }, (_, i) => i + 1).map(
                    (id: number, i) => (
                        <SquareTile
                            key={i}
                            isLine={!!liney?.includes(id)}
                            id={id}
                            display={boardState[id]}
                            press={() => {
                                if (boardState[id] !== null) return;
                                handleClick(id);
                            }}
                        />
                    )
                )}
            </BoardWrapper>
            <JoinGameTexts />
            <FlexDiv></FlexDiv>
        </>
    );
};
