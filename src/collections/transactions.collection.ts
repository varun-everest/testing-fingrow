import mongoose, {Schema, SchemaTypes} from "mongoose";

export enum trans {
    CREDIT = 'credit',
    DEBIT = 'debit'
}

export const transaction = new Schema({
    transactionType : {
        type : String,
        enum: Object.values(trans)
    },
    amount : Number,
    date : {
        type : Date,
        default : Date.now()
    },
    note : String
})

const transactionSchema = new Schema({
    userId : {
        type : SchemaTypes.ObjectId,
        ref : 'Users'
    },
    transactions : [
        {
            type : transaction
        }
    ]
});

const TransactionModel = mongoose.model('Transactions', transactionSchema);
console.log('Successfully created Transaction Collection');

export default TransactionModel; 