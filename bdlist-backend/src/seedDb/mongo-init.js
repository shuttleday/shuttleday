// Initialise users for authentication
db.createUser({ user: "admin", pwd: "admin", roles: ["dbAdmin"] });

db.createUser({
  user: "user",
  pwd: "password",
  roles: [{ role: "readWrite", db: "shuttleday-prod" }],
});

db["users"].drop();
db["game-sessions"].drop();

// Seed test users
db["users"].insertMany([
  {
    _id: ObjectId("6416dd3f1fa5f32e354bfc02"),
    email: "contact@pierreccesario.com",
    firstName: "Pierre",
    lastName: "Cesario",
    username: "PScoriae",
    createdAt: new Date("2023-03-19T10:00:31.171Z"),
    userType: "player",
    accessToken:
      "$argon2id$v=19$m=65536,t=3,p=4$0mWjhqlFbeMjl+JStrWYAg$hwlDxcgGxCvJsJ/gkp0YMHfZABETIN8C8IQtztyesPU",
    refreshToken:
      "$argon2id$v=19$m=65536,t=3,p=4$IvwcOJCO84O9sj0vQniCbg$/m2crfQSG3X5eldxRYguVz8hLLcK6IkkjE3Ab3IGtPg",
  },
  {
    _id: ObjectId("6416dfe71b2a978617f9c27f"),
    email: "tehyeuhaw@gmail.com",
    firstName: "Yeu Haw",
    lastName: "Teh",
    username: "Kirix",
    createdAt: new Date("2023-03-19T10:11:51.693Z"),
    userType: "player",
    accessToken:
      "$argon2id$v=19$m=65536,t=3,p=4$wv1qv5LWFQNOlj4dm0sIZw$9qu+KtX6I4i/R69JX/2rbKvbxA/7IrmC+xUhl1ztcm0",
    refreshToken:
      "$argon2id$v=19$m=65536,t=3,p=4$JHKW8x+dpnt6Oazdeg1lng$TYI0E+RKEODcLWLFhkTwQPMFd+LDW1F7EiM0fG5ABDg",
  },
  {
    _id: ObjectId("6416e081090bb857e3384aa3"),
    email: "yunjin@huh.com",
    firstName: "Yunjin",
    lastName: "Huh",
    username: "jenaissante",
    createdAt: new Date("2023-03-19T10:00:31.171Z"),
    userType: "admin",
    accessToken:
      "$argon2id$v=19$m=65536,t=3,p=4$3xeJHi84oq9krTjm+839gQ$aCzetWKSfqQZa9XQu9hZpEC+ReogmLlOIqO8Vg02PlE",
    refreshToken:
      "$argon2id$v=19$m=65536,t=3,p=4$k6t0jdtr3ijZnneVH9s8WA$qznkQLe+UNwCI/O5cEhezBX5CAYW6G3HDwIvlqhuwSs",
  },
]);

// Seed test game-sessions
db["game-sessions"].insertMany([
  {
    _id: ObjectId("63f873eb06409eab241847ed"),
    start: new Date("2023-03-11T06:35:46.000Z"),
    end: new Date("2023-03-11T08:35:46.000Z"),
    players: [
      {
        userEmail: "tehyeuhaw@gmail.com",
        username: "Kirix",
        paid: true,
        paidAt: new Date("2023-02-27T15:58:14.987Z"),
      },
      {
        userEmail: "contact@pierreccesario.com",
        username: "PScoriae",
        paid: false,
        paidAt: null,
      },
      {
        userEmail: "yunjin@huh.com",
        username: "jenaissante",
        paid: false,
        paidAt: null,
      },
    ],
    cost: 26,
    courts: ["1", "2"],
    createdAt: new Date("2023-02-24T08:23:07.856Z"),
    payTo: "yunjin@huh.com",
  },
  {
    _id: ObjectId("63fa27430e3ade06b7a244eb"),
    start: new Date("2023-03-15T10:35:46.000Z"),
    end: new Date("2023-03-15T12:35:46.000Z"),
    players: [],
    cost: 60,
    courts: ["5", "6"],
    createdAt: new Date(1677338435600),
    payTo: "yunjin@huh.com",
  },
  {
    _id: ObjectId("640972e1ab208acdf081d294"),
    start: new Date("2023-03-29T06:35:46.000Z"),
    end: new Date("2023-03-29T07:35:46.000Z"),
    players: [
      {
        userEmail: "contact@pierreccesario.com",
        username: "PScoriae",
        paid: false,
        paidAt: null,
      },
      {
        userEmail: "yunjin@huh.com",
        username: "jenaissante",
        paid: false,
        paidAt: null,
      },
    ],
    cost: 0,
    courts: ["1"],
    createdAt: new Date("2023-03-09T05:47:13.786Z"),
    payTo: "yunjin@huh.com",
  },
  {
    _id: ObjectId("640972e1ab208acdf081d299"),
    start: new Date("2022-03-29T06:35:46.000Z"),
    end: new Date("2022-03-29T07:35:46.000Z"),
    players: [
      {
        userEmail: "yunjin@huh.com",
        username: "jenaissante",
        paid: false,
        paidAt: null,
      },
    ],
    cost: 25,
    courts: ["1"],
    createdAt: new Date("2022-03-09T05:47:13.786Z"),
    payTo: "yunjin@huh.com",
  },
  {
    _id: ObjectId("640972e1ab208acdf081d011"),
    start: new Date("2022-05-29T10:35:46.000Z"),
    end: new Date("2022-05-29T11:35:46.000Z"),
    players: [
      {
        userEmail: "kazuha@nakamura.com",
        username: "k_a_z_u_h_a__",
        paid: false,
        paidAt: null,
      },
    ],
    cost: 25,
    courts: ["1"],
    createdAt: new Date("2022-03-09T05:47:13.786Z"),
    payTo: "yunjin@huh.com",
  },
  {
    _id: ObjectId("640972e1ab208acdf081d069"),
    start: new Date("2022-05-30T10:35:46.000Z"),
    end: new Date("2022-05-30T11:35:46.000Z"),
    players: [
      {
        userEmail: "yunjin@huh.com",
        username: "jenaissante",
        paid: false,
        paidAt: null,
      },
    ],
    cost: 25,
    courts: ["1"],
    createdAt: new Date("2022-03-01T05:47:13.786Z"),
    payTo: "yunjin@huh.com",
  },
  {
    _id: ObjectId("640972e1ab208acdf081d025"),
    start: new Date("2022-05-30T10:35:46.000Z"),
    end: new Date("2022-05-30T11:35:46.000Z"),
    players: [
      {
        userEmail: "yunjin@huh.com",
        username: "jenaissante",
        paid: false,
        paidAt: null,
      },
    ],
    cost: 25,
    courts: ["1"],
    createdAt: new Date("2022-03-01T05:47:13.786Z"),
    payTo: "yunjin@huh.com",
  },
  {
    _id: ObjectId("640972e1ab208acdf081d525"),
    start: new Date("2022-05-30T10:35:46.000Z"),
    end: new Date("2022-05-30T11:35:46.000Z"),
    players: [
      {
        userEmail: "yunjin@huh.com",
        username: "jenaissante",
        paid: false,
        paidAt: null,
      },
      {
        userEmail: "chaewon@kim.com",
        username: "_chaechae_1",
        paid: true,
        paidAt: "2022-05-30T13:35:46.000Z",
      },
    ],
    cost: 10,
    courts: ["13", "14"],
    createdAt: new Date("2021-10-10T05:47:13.786Z"),
    payTo: "sakura@miyawaki.com",
  },
  {
    _id: ObjectId("640972e1ab208acdf081d139"),
    start: new Date("2022-05-30T10:35:46.000Z"),
    end: new Date("2022-05-30T11:35:46.000Z"),
    players: [
      {
        userEmail: "yunjin@huh.com",
        username: "jenaissante",
        paid: false,
        paidAt: null,
      },
    ],
    cost: 10,
    courts: ["1", "5"],
    createdAt: new Date("2021-10-10T05:47:13.786Z"),
    payTo: "sakura@miyawaki.com",
  },
]);
