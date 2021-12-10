import React, { MouseEventHandler } from "react";
import { ImCross } from "react-icons/im";
import { BsCircle } from "react-icons/bs";
import { Tile } from "../styled/Tile";

interface SquareProps {
    display: "x" | "o" | null
    id: number
    press: MouseEventHandler
    isLine: boolean
}

const SquareTile: React.FC<SquareProps> = ({ display, id: _, press, isLine }) => {
    return (
            <Tile onClick={press} line={isLine}>
                {display === "x" ? (
                    <ImCross size="8em"/>
                ) : display === "o" ? (
                    <BsCircle size="8em"/>
                ) : null}
            </Tile>
    );
};

export default SquareTile
