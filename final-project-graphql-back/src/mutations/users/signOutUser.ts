import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { MutationResolvers } from "../../types.js";
import { Session } from "inspector";
import { graphqlErrorHandler, prismaErrorHandler } from "../../modules/customErrors.js";

export const signOutUser: MutationResolvers['signOutUser'] = async (_, __, {dataSources, user}, ___) => {

    if (!user) {
        return graphqlErrorHandler()
      } 

    try {
        const session = await dataSources.db.session.findFirst({
            where: {
                    userId: user.id,
                }
        })
        console.log("Session in session.ts")
        console.log(session)
        if (session) {
            await dataSources.db.session.delete(
                {where: {...session}}
            )
            return {
                code: 200,
                message: "You have successefully logged out",
                success: true
            }
        }
        else {
            return {
                code: 400,
                message: "You are already logged out",
                success: false,
            }
        }
    }catch(e){
        prismaErrorHandler(e)
        }
    }