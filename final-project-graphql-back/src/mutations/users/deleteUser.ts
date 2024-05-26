import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { MutationResolvers } from "../../types.js";
import { comparePasswords, createJWT } from "../../modules/auth.js";
import { prismaErrorHandler } from "../../modules/customErrors.js";


export const deleteUser: MutationResolvers['deleteUser'] = async (_, {username, password}, {dataSources}, __) => {
    try {
      const user = await dataSources.db.user.findFirst({
        where: {
          username: username,
        }
      })
      console.log("USER in deleteUser.ts:")
      console.log(user)
      if(user && await comparePasswords(password, user.password)) {
          await dataSources.db.user.delete({
            where: {
                username: username,
            }
          })
          return {
              code: 201,
              message: 'Your user profile have been deleted',
              success: true,
            }
          }
      else {
          return {
              code: 401,
              message: "Invalid username or password",
              success: false,
              user: null,
            } 
          }
      }
      catch(e) {
        prismaErrorHandler(e)
    }
  };