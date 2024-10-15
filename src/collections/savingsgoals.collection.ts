import mongoose, {Schema, SchemaTypes} from 'mongoose';

const savingGoalsSchema = new Schema({
    userId : {
        type : SchemaTypes.ObjectId,
        ref : 'Users'
    },
    goals : [{
        title : {
            type : String,
        },
        targetAmount : Number,
        currentAmount : {
            type: Number,
            default : 0
        }
    }],
    
});

const SavingGoalsModel = mongoose.model('savings', savingGoalsSchema);

export default SavingGoalsModel;