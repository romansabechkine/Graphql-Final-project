import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { comparePasswords, createJWT, hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";
import { prismaErrorHandler } from "../../modules/customErrors.js";


 
export const signInUser: MutationResolvers['signInUser'] = async (_, {username, password}, {dataSources, user}, __) => {
  try {
    const user = await dataSources.db.user.findFirst({
      where: {
        username: username,
      }
    })
    console.log("User in signin: ")
    console.log(user)

    const sessionUser = await dataSources.db.session.findFirst({
        where: {
          userId: user?.id,
        }
      })
    console.log("Session in signin: ")
    console.log(sessionUser)

    const activeSession = new Date(sessionUser?.tokenExpiresAt.getTime()) > new Date() ? true : false
    console.log("ActiveSession in signin: ")
    console.log(activeSession)

    if (activeSession) {
        return {
            code: 200,
            message: "You are already logged in",
            success: true,
            token: sessionUser.token,
            user: {
                id: user.id,
                username: user.username
            }
          } 
        }
    if(user && !activeSession && await comparePasswords(password, user.password)) {
      if (sessionUser){
        await dataSources.db.session.delete({
          where: {
              userId: user.id,
          }})
        }
        const token = createJWT(user)
        console.log("TOKEN:")
        console.log(token)
        const twentyMinutesFromNow = new Date(Date.now() + 600 * 60000); // session expires in 600 minutes
        const session = await dataSources.db.session.create({
            data: {
                userId: user.id,
                token: token,
                tokenExpiresAt: twentyMinutesFromNow
            }
        })

        console.log("New session: ")
        console.log(session)
        
        return {
            code: 201,
            message: 'you are signed in now',
            success: true,
            token: token,
            user: {
              id: user.id,
              username: user.username
            },
            sessionId: session.id
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
    };
  }