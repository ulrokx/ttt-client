import styled from 'styled-components'
import colors from './colors'

export const BoardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1em 1em;
    background: ${colors.bbackground};
    padding: 4em 4em;
    border-radius: 5%;
`