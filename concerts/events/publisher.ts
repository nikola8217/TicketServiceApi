import amqp from 'amqplib';

export class Producer {

    static async produceMessage(data: String) {
        const connection = await amqp.connect('amqps://gjwjvqar:HRcY8BfKZpGnuslK9fRqfPVDguFgCm4U@cow.rmq2.cloudamqp.com/gjwjvqar');
        const channel = await connection.createChannel();
        const queue = 'BUY_TICKET';

        await channel.assertQueue(queue);
        
        channel.sendToQueue(queue, Buffer.from(data));

        console.log(`Sent: ${data}`);
        
        setTimeout(() => {
            connection.close();
        }, 500);
    }

}