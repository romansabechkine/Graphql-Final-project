import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Article, MutationResolvers } from "../../types.js";
import { GraphQLError } from "graphql";
import { getSessionUser } from "../../modules/session.js";
import { graphqlErrorHandler, prismaErrorHandler } from "../../modules/customErrors.js";
 
export const deleteComment: MutationResolvers['deleteComment'] = async (_, {commentId}, {dataSources, user}, __) => {

  await getSessionUser(user)

  if (!user) {
    graphqlErrorHandler()
  }

  await getSessionUser(user)
  
  try {
    const deletedComment = await dataSources.db.comment.delete({
        where: {
            id: commentId,
            authorId: user.id
        },
    })
    return {
      code: 201,
      message: 'the comment has been deleted',
      success: true,
      comment: deletedComment
    }
  } catch(e) {
    prismaErrorHandler(e)
  }
};