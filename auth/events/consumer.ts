import amqp from 'amqplib';
import { UserService } from '../services/user.service';

export class Consumer {

    static async consumeMessage() {
        const connection = await amqp.connect('amqps://gjwjvqar:HRcY8BfKZpGnuslK9fRqfPVDguFgCm4U@cow.rmq2.cloudamqp.com/gjwjvqar');
        const channel = await connection.createChannel();
        const queue = 'BUY_TICKET';

        await channel.assertQueue(queue);
        console.log('Waiting for messages...');

        channel.consume(queue, async (data: any) => {
            const content = data.content.toString();
            console.log(`Received: ${content}`);
            await UserService.buyTicket(JSON.parse(content));

        }, { noAck: true });
    }

}