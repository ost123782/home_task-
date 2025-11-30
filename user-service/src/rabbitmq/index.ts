import * as amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectUserPublisher() {
    const conn = await amqp.connect(process.env.RABBIT_MQ_URL!);
    channel = await conn.createChannel();
    await channel.assertExchange('user.events', 'topic', { durable: true });
    console.log('User publisher connected to RabbitMQ');
}

export function publishUserCreated(data: { userId: string }) {
    if (!channel) throw new Error('RabbitMQ channel is not initialized');
    channel.publish('user.events', 'user.created', Buffer.from(JSON.stringify(data)));
    console.log('Published user.created event:', data);
}

export function publishUserDeleted(data: { userId: string }) {
    if (!channel) throw new Error('RabbitMQ channel is not initialized');
    channel.publish('user.events', 'user.deleted', Buffer.from(JSON.stringify(data)));
    console.log('Published user.deleted event:', data);
}
