import 'styled-components'
import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string;

        colors: {
           lightblue: string;
           darkerblue: string;
           hoverblue: string;
           black: string;
           orange: string;
           bbackground: string 
        }
    }
}

const myTheme: DefaultTheme = {
    borderRadius: '5%',

    colors: {
    lightblue: "#A9EBFF",
    darkerblue: "#4B9EFD",
    hoverblue: "#86BDFC",
    black: "#00171E",
    orange: "#FFD390",
    bbackground: "#D8FFDD"
    }
}