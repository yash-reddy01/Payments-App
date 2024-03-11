const z = require("zod");

const signUp = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

const signIn = z.object({
    username: z.string().email(),
    password: z.string()
})

module.exports = {
    signIn, signUp
};