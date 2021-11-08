import mongoose from 'mongoose';
import config from 'config'
import log from '../../logger';

const connect = () => {
    const dbUri = config.get("dbUri") as string;
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    }
    return mongoose
        .connect(dbUri, options)
        .then(() => {
            log.info("Database connected");
        })
        .catch((error) => {
            log.error("DB error", error);
            process.exit(1);
        })
}

export default connect;