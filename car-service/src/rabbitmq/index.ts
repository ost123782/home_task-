import * as amqp from 'amqplib';
import { createEmptyCar } from '../controllers/car.controller';

export async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect(process.env.RABBIT_MQ_URL!);
        const channel = await connection.createChannel();

        await channel.assertExchange('user.events', 'topic', {durable: true});
        await channel.assertQueue('service-user-created');
        await channel.bindQueue('service-user-created', 'user.events', 'user.created');

        channel.consume('service-user-created', async (msg) => {
            if (msg?.content) {
                const data = JSON.parse(msg.content.toString())
                const createdEmptyCar = await createEmptyCar(data?.userId);
                console.log('User created event:', createdEmptyCar)
                channel.ack(msg)
            }
        })
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}