import UserModel from "../collections/user.collection"

class User {
    username: string
    password: string
    totalIncome: number

    constructor(username: string, password: string, totalIncome: number) {
        this.password = password
        this.username = username
        this.totalIncome = totalIncome
    }

    registerUser = async() => {
        const findUser = await UserModel.findOne({username: this.username});
        if(findUser) {
            return false; 
        }
        const user = await UserModel.create({
            username: this.username,
            password: this.password,
            totalIncome: this.totalIncome
        });
        await user.save();
        return true;
    }
}

export default User;