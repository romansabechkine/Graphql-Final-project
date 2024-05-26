import { User } from "@prisma/client"
import db from "../datasources/db.js"
import { AuthenticatedUser } from "./auth"
import { SignInUserRepsonse } from "../types.js"
import { GraphQLError } from "graphql"

export const getSessionUser = async (user:AuthenticatedUser):Promise<SignInUserRepsonse|AuthenticatedUser> => {

      // get the user session 
      const sessionUser = await db.session.findFirst({
          where:{userId:user.id}})  

      console.log("Session.ts Session User: ")
      console.log(sessionUser)


      // verify if session hasn't expired
      const activeSession = new Date(sessionUser?.tokenExpiresAt.getTime()) > new Date() ? true : false
      
      console.log(` Session.ts activeSession: ${activeSession}`)

      // if token has expired delete old session
      if (user && !activeSession) {
        if (sessionUser) {
            await db.session.delete({
                where: {
                    userId: user.id
                    }
                })
            throw new GraphQLError('User is not authenticated', {
                extensions: {
                    code: 401,
                    message: "Your session has expired",
                    success: false,
                },
            });
        }
        throw new GraphQLError('User is not authenticated', {
            extensions: {
                code: 401,
                message: "You are not logged in",
                success: false,
            },
            });
        }
        return
    }
