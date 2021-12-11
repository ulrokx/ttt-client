import { io } from "socket.io-client";
let socketlink = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    socketlink = "localhost:4000"
} else {
    socketlink = "https://arcane-fjord-05208.herokuapp.com/"
}
console.log(socketlink)
export const socket = io(socketlink, {autoConnect: true})

socket.on("connect", () => {
    console.log("connected")
})
