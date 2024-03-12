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

const update = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional()
})

const balance = z.object({
    balance: z.number()
})

module.exports = {
    signIn, signUp, update, balance
};