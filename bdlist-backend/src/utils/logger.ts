const pino = require("pino");

const prod = {
  targets: [
    {
      level: "info",
      target: "pino-pretty",
      options: {
        destination: "./last.log",
        translateTime: "yyyy-mm-dd HH:MM:ss.l",
        colorize: false,
      },
    },
  ],
};

const dev = {
  targets: [
    {
      level: "info",
      target: "pino-pretty",
      options: {
        translateTime: "yyyy-mm-dd HH:MM:ss.l",
        colorize: true,
        ignore: "pid,hostname",
      },
    },
    {
      level: "info",
      target: "pino-pretty",
      options: {
        destination: "./last.log",
        translateTime: "yyyy-mm-dd HH:MM:ss.l",
        colorize: false,
      },
    },
  ],
};

const pinoConfig = process.env.NODE_ENV === "dev" ? dev : prod;
const transport = pino.transport(pinoConfig);
const log = pino(transport);

export default log;
