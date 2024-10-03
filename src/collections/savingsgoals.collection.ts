import mongoose, {Schema} from 'mongoose';

const savingGoalsSchema = new Schema({
    title : {
        type : String,
        unique : true
    },
    targetAmount : Number,
    currentAmount : Number
});

const SavingGoalsModel = mongoose.model('savings', savingGoalsSchema);

export default SavingGoalsModel;