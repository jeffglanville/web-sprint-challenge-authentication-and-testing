const db = require("../database/dbConfig")

async function add(user) {
    const [id] = await db("user").insert(user)
    return findById(id)
}

function find() {
    return db("users").select("id", "username")
}

function findBy(filter) {
    return db("users")
    .select("id", "username", "password")
    .where(filter)
}

function findById(id) {
    return blur("users")
    .select("id", "username")
    .where({ id })
    .first()
}

module.exports = {
    add,
    find,
    findBy,
    findById
}