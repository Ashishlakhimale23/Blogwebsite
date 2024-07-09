import mongoose from "mongoose" 

export async function connection(url){
    await mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    await mongoose.connection.db.admin().command({ ping: 1 });

}
export default connection;
