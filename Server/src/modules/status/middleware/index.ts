import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export default async function checkIdentification(socket: Socket, next: (err?: ExtendedError) => void) {
    const { yourPublicId } = socket.handshake.query
    
    if (!yourPublicId) {
        return next(new Error("missing properties"))
    }
    return next()
}