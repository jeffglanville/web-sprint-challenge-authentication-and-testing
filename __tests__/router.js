const { expectCt } = require("helmet")
const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db.seed.run
})

afterAll(async () => {
    await db.destroy()
})

describe("router integration tests", () => {
    it("REGISTERS /users", async () => {
        const res = await supertest(server)
        .post("/register")
        .send({ username: "jeff", password: "abc123" })
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("jeff")
    })
    it("LOGSIN /login", async () => {
        const res = await supertest(server)
        .post("./login")
        .send({ username: "jeff", password: "abc123" })
        expect(res.statusCode).toBe(200)
    })
})