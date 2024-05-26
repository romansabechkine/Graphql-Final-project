import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPassword } from "../../modules/auth.js";
import { Article, MutationResolvers } from "../../types.js";
import { GraphQLError } from "graphql";
import { getSessionUser } from "../../modules/session.js";
import { graphqlErrorHandler, prismaErrorHandler } from "../../modules/customErrors.js";
 
export const updateComment: MutationResolvers['updateComment'] = async (_, {commentId, body}, {dataSources, user}, __) => {

  if (!user) {
    graphqlErrorHandler()
  }

  await getSessionUser(user)

  try {
    const updatedComment = await dataSources.db.comment.update({
      where: {
        id: commentId,
        authorId: user.id
      },
      data: {
        body: body,
      },
    })
    return {
      code: 201,
      message: 'the comment has been updated',
      success: true,
      comment: updatedComment
    }
  } catch(e) {
    prismaErrorHandler(e)
  }
};