import csv  from 'csv-parser';
import fs from 'fs';
import UserModel from '../collections/user.collection';
import Transaction from '../services/Transaction';

interface txn {
    username: string,
    amount: number,
    txnCategory: string,
    name: string,
    date: Date,
    description: string
}
 
export const readCsvFile = async () => {
    return new Promise((resolve, reject) => {
        const filePath = '/Users/admin/Desktop/DT/Testing/fingrow/backend/src/data/previoustransactions.csv'
        const stream = fs.createReadStream(filePath);
        const csvStream = csv();
        const csvPipe = stream.pipe(csvStream);
        csvPipe.on('data', async (data: txn) => {
            csvPipe.pause();
            try {
                console.log(data);
                const finduser = await UserModel.findOne({username: data.username});
                if(!finduser) {
                    console.log("User does not exists");
                } else {
                    console.log(finduser);
                    const transaction = new Transaction(data.amount, data.txnCategory, data.name, data.description, data.date);
                    const status = await transaction.addTransaction(data.username);
                    console.log(status);
                }
            }
            catch (e) {
                console.log("Error:", e);
            }
            finally {
                csvPipe.resume();
            }
        })
        .on('end', () => {
            console.log(`EOF reached`);
        })
        .on('error', (error: string) => reject(error));
    })
}
