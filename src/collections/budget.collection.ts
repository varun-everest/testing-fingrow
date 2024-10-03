import mongoose, {Schema, SchemaTypes} from 'mongoose';
import { TBudget } from '../types/types';

export const budget = new Schema<TBudget>({
    category : {
        type : String,
        unique : true,
    },
    allotedAmount : Number,
    usedAmount : Number,
});

const budgetSchema = new Schema({
    userId : {
        type : SchemaTypes.ObjectId,
        ref : 'Users'
    },
    budgets : [
        {
            type : budget
        }
    ],
});

const BudgetModel = mongoose.model('Budgets', budgetSchema);
console.log("Successfully created Budget Model");

export default BudgetModel;