const { expectCt } = require("helmet")
const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("authentication integration tests", () => {
    it("POST registers the user", async () => {
        const res = await supertest(server).post("/api/auth/register")
        .send({
            username: "johndoe",
            password: "abc123"
        })
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("johndoe")
    })

    it("POST logsin the user with correct credentials", async () => {
        const user = { username: "mike", password: "abc123" }

        const register = await supertest(server)
        .post("/api/auth/register")
        .send(user)
        expect(register.statusCode).toBe(201)

        const res = await supertest(server)
        .post("/api/auth/login")
        .send(user)
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Welcome mike")
    })

    it("POST gives message when invalid credentials are entered", async () => {
        const res = await supertest(server)
        .post("/api/auth/login")
        .send({
            username: "jeff",
            password: "abc123"
        })
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Invalid Credentials")
    })
})