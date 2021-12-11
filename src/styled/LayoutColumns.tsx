import styled from "styled-components";

export const LayoutColumns = styled.div`
display: flex;
flex-direction: row;
padding: 1em 5em;
flex: 1;
justify-content: space-between;

@media(max-width: 1000px) {
    flex-direction: column;
    justify-content: flex-start;
}
`