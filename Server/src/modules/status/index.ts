import { Socket } from "socket.io";
import MysqlHandler from "../../database/Handlers/MysqlHandler";

export default async function StatusWebsocket(socket: Socket) {
    const { yourPublicId } = socket.handshake.query

    console.log(`the user ${yourPublicId} is connected`);

    MysqlHandler.Update("User", ["STATUS"], ["Online"], {
        Where: {
            Columns: ["PUBLIC_ID"],
            Values: [yourPublicId as string]
        }
    })

    socket.on('disconnect', () => {
        console.log(`user ${yourPublicId} disconnected`);

        MysqlHandler.Update("User", ["STATUS"], ["Offline"], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [yourPublicId as string]
            }
        })
    });
}