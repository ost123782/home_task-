import * as amqp from 'amqplib';

export async function createChannel() {
    try {
        const connection = await amqp.connect(process.env.RABBIT_MQ_URL!);
        const channel = await connection.createChannel();
        await channel.assertExchange('user.events', 'topic', { durable: true });
        return channel;
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        throw error;
    }
}
