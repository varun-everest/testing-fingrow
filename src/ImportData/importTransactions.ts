import csv  from 'csv-parser';
import fs from 'fs';
import UserModel from '../collections/user.collection';
import User from '../classes/User';

interface txn {
    username: string,
    amount: number,
    txnCategory: string,
    name: string,
    date: Date,
    description: string
}

export const readCsvFile = async (filepath: string) => {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filepath)
        const csvStream = csv();
        const csvPipe = stream.pipe(csvStream);
        csvPipe.on('data', async (data: txn) => {
            csvPipe.pause();
            try {
                const finduser = await UserModel.findOne({username: data.username});
                if(!finduser) {
                    console.log("User does not exists");
                } else {
                    const user = new User(finduser.username, finduser.password, finduser.totalIncome);
                    await user.makeTransaction(data.amount, data.txnCategory, data.name, data.description, data.date);
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
