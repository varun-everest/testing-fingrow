import mongoose from 'mongoose';

const startDatabase = async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/fingrow');
        console.log('Successfully connected to database.');
    } catch(err) {
        console.log("Error Occurred : ", err);
    }
}

export default startDatabase;