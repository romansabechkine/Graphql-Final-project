import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";
import { prismaErrorHandler } from "../../modules/customErrors.js";
 
export const createUser: MutationResolvers['createUser'] = async (_, {username, password}, {dataSources}, __) => {
  console.log(username)
  console.log(password)
  try {
    const existingUser = await dataSources.db.user.findFirst({
      where:{
        username: username
        }
      }
    )
    if (existingUser) {
      return {
        code: 409,
        message: 'the user already exists',
        success: true,
        user: null
        }
    }
  
    // the unique contraint doesnt work and returns null through graphql interface
    // but at the server side fail silently and doesn't log anything
    const createdUser = await dataSources.db.user.create({
      data: {
        username: username,
        password: await hashPassword(password)
      }
    })
    return {
      code: 201,
      message: 'the user has been created',
      success: true,
      user: {
        id: createdUser.id,
        username: createdUser.username
      }
    }
  } catch(e) {
    prismaErrorHandler(e)
  }
};