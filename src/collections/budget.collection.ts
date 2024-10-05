import mongoose, {Document, Schema, SchemaTypes} from 'mongoose';

const budgetSchema = new Schema({
    userId : {
        type : SchemaTypes.ObjectId,
        ref : 'Users'
    },
    budgets : [
        {
            category : {
                type : String,
                unique : true,
            },
            allotedAmount : Number,
            usedAmount : {
                type : Number,
                default : 0
            }
        }
    ],
});

const BudgetModel = mongoose.model('Budgets', budgetSchema);
console.log("Successfully created Budget Model");

export default BudgetModel;