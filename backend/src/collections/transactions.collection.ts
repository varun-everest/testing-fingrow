import mongoose, {Schema, SchemaTypes} from "mongoose";


const transactionSchema = new Schema({
    userId : {
        type : SchemaTypes.ObjectId,
        ref : 'Users'
    },
    transactions : [
        {
            amount : Number,
            txnCategory : String,   
            name : String,
            date : Date,
            description : String
        }
    ]
});

const TransactionModel = mongoose.model('Transactions', transactionSchema);
console.log('Successfully created Transaction Collection');

export default TransactionModel; 