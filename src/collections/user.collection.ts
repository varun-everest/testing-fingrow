import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required : true,
    },
    totalIncome: {
       type : Number,
       required: true
    },
    amountUsed : {
        type : Number,
        default : 0
    }
});

const UserModel = mongoose.model('Users', userSchema);
console.log("Successfully created Users Collections");

export default UserModel;