import { io } from "socket.io-client";

export const socket = io("https://arcane-fjord-05208.herokuapp.com/", {autoConnect: true})

socket.on("connect", () => {
    console.log("connected")
})
