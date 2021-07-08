const {MongoClient} = require('mongodb');
const Request = require('jest-express/lib/request').Request;
const Response = require('jest-express/lib/response').Response;
const request = require("supertest");
const controller = require("../controller/gettingData.controller").data;
process.env.NODE_ENV = "test";


const app = require("../app");

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getircase-study?retryWrites=true', {
      useNewUrlParser: true,
    });
    db = await connection.db('getir-case-study');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Success Response on giving valid data', async () => {

    const response = await request(app)
    .post("/")
    .send({
        "startDate": "2016-12-30",
        "endDate": "2017-01-28",
        "minCount": 10,
        "maxCount": 3000
    });

    await connection.close();

    console.log("REspnse ",response.body);

    expect(response.body.msg).toBe("Success");
  });

  it('Success Response on giving valid data', async () => {
    const response = await request(app)
    .post("/")
    .send({
        "startDate": "2016-12-30",
        "endDate": "2017-01-28",
        "minCount": 2,
        "maxCount": 3000
    });

    await connection.close();

    expect(response.body.msg).toBe("Success");
  });

  it('Health check', async () => {

    expect(1+1).toBe(2);
  }, 35000);
});