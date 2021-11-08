import logger from "pino";
import dayjs from "dayjs";
import { deflate } from "zlib";

const log = logger({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
})

export default log;