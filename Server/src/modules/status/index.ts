import { Socket } from "socket.io";
import MysqlHandler from "../../database/Handlers/MysqlHandler";

export default async function StatusWebsocket(socket: Socket) {
    const { yourPublicId } = socket.handshake.query

    MysqlHandler.Update("User", ["STATUS"], ["Online"], {
        Where: {
            Columns: ["PUBLIC_ID"],
            Values: [yourPublicId as string]
        }
    })

    socket.on('disconnect', () => {

        MysqlHandler.Update("User", ["STATUS"], ["Offline"], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [yourPublicId as string]
            }
        })
    });
}