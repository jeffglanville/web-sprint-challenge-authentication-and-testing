const hashPass = "2c6c8ab6ba8b9c98a1939450eb4089ed";

exports.seed = async function(knex) {
  await knex("users").insert([
    {username: "jeff", password: hashPass},
    {username: "jane", password: hashPass}
  ])
};
