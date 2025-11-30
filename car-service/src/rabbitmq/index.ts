import { subscribeToUserCreated } from "./subcribers/user.created.subscriber";
import { subscribeToUserDeleted } from "./subcribers/user.deleted.subscriber";

export async function initRabbitMQSubscribers() {
    try {
        await subscribeToUserCreated();
        await subscribeToUserDeleted();
        console.log('All RabbitMQ subscribers are running');
    } catch (err) {
        console.error('Failed to initialize RabbitMQ subscribers', err);
    }
}
