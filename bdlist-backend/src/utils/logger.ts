import { pino } from "pino";

const dev = {
  translateTime: "yyyy-mm-dd HH:MM:ss.l",
  colorize: true,
  ignore: "pid,hostname",
};

const prod = {
  destination: "./last.log",
  translateTime: "yyyy-mm-dd HH:MM:ss.l",
  colorize: false,
  ignore: "pid,hostname",
};

const log = pino({
  transport: {
    target: "pino-pretty",
    level: "info",
    options: process.env.NODE_ENV === "development" ? dev : prod,
  },
});

export default log;
