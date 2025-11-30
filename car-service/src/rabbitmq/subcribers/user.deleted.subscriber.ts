import { deleteAllCarsByUserId } from '../../controllers/car.controller';
import { createChannel } from '../connect';

export async function subscribeToUserDeleted() {
    const channel = await createChannel();

    await channel.assertQueue('service-user-deleted');
    await channel.bindQueue('service-user-deleted', 'user.events', 'user.deleted');

    channel.consume('service-user-deleted', async (msg) => {
        if (!msg?.content) return;

        const data = JSON.parse(msg.content.toString());
        await deleteAllCarsByUserId(data.userId);
        console.log('User deleted event:', data.userId);
        channel.ack(msg);
    });
}
