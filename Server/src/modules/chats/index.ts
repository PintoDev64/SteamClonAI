import { Socket } from "socket.io";
import { insertMessage, getChats } from "../../database/MongoModels/FriendChat";
import { creteNewDate } from "../../utils";

const userSockets = new Map();

export default async function ChatWebsocket(socket: Socket) {
    const { yourPublicId, chatId } = socket.handshake.query

    console.log(`the user ${yourPublicId} is connected to /chat`);

    userSockets.set(yourPublicId, socket);

    socket.on('disconnect', () => {
        console.log('user disconnected from /chat');
        userSockets.delete(yourPublicId);
    });

    socket.emit("get messages", (await getChats({ relationId: parseInt(chatId as string), limit: undefined })).data)

    socket.on('chat message', async (data) => {
        const { yourFriendId, message, ProfileImage, ProfileName } = data;
        const recipientSocket = userSockets.get(yourFriendId);
        const mySocket = userSockets.get(yourPublicId);

        const responseStatus = await insertMessage({
            content: message,
            image: ProfileImage,
            username: ProfileName,
            date: creteNewDate(),
        }, parseInt(chatId as string))

        const responseObject = {
            content: message,
            image: ProfileImage,
            username: ProfileName,
            date: creteNewDate(),
            status: responseStatus
        }

        if (recipientSocket) {
            recipientSocket.emit('chat message', responseObject);
            mySocket.emit('chat message', responseObject);
        } else {
            console.log(`No socket found for user ${yourFriendId}`);
        }
    });
}