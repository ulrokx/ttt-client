import styled from "styled-components";
import colors from "./colors";

interface TileProps {
    line?: boolean;
}

export const Tile = styled.button<TileProps>`
    flex: 0.33;
    width: 10em;
    height: 10em;
    background: ${props => !props.line ?colors.lightblue : colors.orange};
    border-radius: 8%;
    border-width: 0;
    box-shadow: 5px 5px 3px grey;


    &:hover {
        background: ${props => !props.line ? colors.hoverblue : colors.hoverorange}
    }

    
    &:active {
        background: ${colors.darkerblue}
    }

`;
