import * as amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectRabbit() {
  const conn = await amqp.connect(process.env.RABBIT_MQ_URL!);
  channel = await conn.createChannel()
  await channel.assertExchange('user.events', 'topic', { durable: true })
}

export function publishUserCreated(data: {userId: string}) {
    console.log(data)
  channel.publish('user.events', 'user.created', Buffer.from(JSON.stringify(data)))
}
