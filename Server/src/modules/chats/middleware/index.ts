import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export default async function checkChatIdentification(socket: Socket, next: (err?: ExtendedError) => void) {
    const { yourPublicId, chatId } = socket.handshake.query
    
    if (!yourPublicId || !chatId) {
        return next(new Error("missing properties"))
    }
    return next()
}