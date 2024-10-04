import mongoose, {Schema} from "mongoose";
// import TIncome from "../types/TIncome";

/* const incomeSchema = new Schema<TIncome>({
    source: String,
    amount: Number,
}); */

const userSchema = new Schema({
    username : String,
    password : String,
    totalIncome: Number,
    amountUsed : {
        type : Number,
        default : 0
    }
});

const UserModel = mongoose.model('Users', userSchema);
console.log("Successfully created Users Collections");

export default UserModel;