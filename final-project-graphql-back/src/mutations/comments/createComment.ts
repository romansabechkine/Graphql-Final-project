import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPassword } from "../../modules/auth.js";
import { Article, MutationResolvers } from "../../types.js";
import { GraphQLError } from "graphql";
import { getSessionUser } from "../../modules/session.js";
import { graphqlErrorHandler, prismaErrorHandler } from "../../modules/customErrors.js";
import { connect } from "net";
 
export const createComment: MutationResolvers['createComment'] = async (_, {articleId, body}, {dataSources, user}, __) => {

  // throws session expired if user and !active session and deletes expired session from db

  if (!user) {
    graphqlErrorHandler()
    }
  await getSessionUser(user)

  try {
    const createdComment = await dataSources.db.comment.create({
      data: {
        body: body,
        author: {
            connect: {
                id: user.id,
            }
        },
        article: {
            connect: {
                id: articleId
            }
        }
        }
    })
    const {authorId, ...rest} = createdComment
    return {
      code: 201,
      message: 'the comment has been created',
      success: true,
      comment: {
        authorName: user.username,
        ...rest
      }
    }
  } catch(e) {
    prismaErrorHandler(e)
  }
};