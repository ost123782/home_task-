import { createEmptyCar } from '../../controllers/car.controller';
import { createChannel } from '../connect';

export async function subscribeToUserCreated() {
    const channel = await createChannel();

    await channel.assertQueue('service-user-created');
    await channel.bindQueue('service-user-created', 'user.events', 'user.created');

    channel.consume('service-user-created', async (msg) => {
        if (!msg?.content) return;

        const data = JSON.parse(msg.content.toString());
        const createdEmptyCar = await createEmptyCar(data.userId);
        console.log('User created event:', createdEmptyCar);
        channel.ack(msg);
    });
}
