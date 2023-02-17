import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "yyyy-mm-dd HH:MM:ss.l",
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
});

export default log;
