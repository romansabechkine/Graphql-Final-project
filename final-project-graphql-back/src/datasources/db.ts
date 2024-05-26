import { PrismaClient } from '@prisma/client'
 
// This line exports the newly created instance as the default export of the module.
export default new PrismaClient()

// i could do this:
//export const db = new PrismaClient()