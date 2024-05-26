import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { GraphQLError } from "graphql"


export const prismaErrorHandler = (e) => {
    if (e instanceof PrismaClientKnownRequestError) {
        return {
          code: 401,
          message: e.message,
          success: false,
        }
      }
    
      return {
        code: 400,
        message: (e as Error).message,
        success: false,
      }
}

export const graphqlErrorHandler = () =>  {
    // throwing a `GraphQLError` here allows us to specify an HTTP status code,
    // standard `Error`s will have a 500 status code by default
    throw new GraphQLError('User is not authenticated', {
        extensions: {
            code: 401,
            message: "UNAUTHENTICATED or Corrupted Token",
            success: false,
            articles: null,
        },
     });
}
    

