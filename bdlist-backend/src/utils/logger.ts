const pino = require("pino");
const transport = pino.transport({
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
});
const log = pino(transport);

export default log;
