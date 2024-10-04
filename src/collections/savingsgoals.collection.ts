import mongoose, {Schema, SchemaTypes} from 'mongoose';

const savingGoalsSchema = new Schema({
    userId : {
        type : SchemaTypes.ObjectId,
        ref : 'Users'
    },
    goals : [{
        title : {
            type : String,
            unique : true
        },
        targetAmount : Number,
        currentAmount : Number
    }],
    
});

const SavingGoalsModel = mongoose.model('savings', savingGoalsSchema);

export default SavingGoalsModel;