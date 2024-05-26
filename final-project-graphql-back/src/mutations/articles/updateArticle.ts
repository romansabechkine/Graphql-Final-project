import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPassword } from "../../modules/auth.js";
import { Article, MutationResolvers } from "../../types.js";
import { GraphQLError } from "graphql";
import { getSessionUser } from "../../modules/session.js";
import { graphqlErrorHandler, prismaErrorHandler } from "../../modules/customErrors.js";
 
export const updateArticle: MutationResolvers['updateArticle'] = async (_, {articleId, title, body}, {dataSources, user}, __) => {

  if (!user) {
    graphqlErrorHandler()
  }

  await getSessionUser(user)

  try {
    const updatedArticle = await dataSources.db.article.update({
      where: {
        id: articleId,
        authorId: user.id
      },
      data: {
        title: title,
        body: body,
      },
    })
    console.log(updatedArticle)
    return {
      code: 201,
      message: 'the article has been updated',
      success: true,
      article: {
        id: updatedArticle.id,
        title: updatedArticle.title,
        body: updatedArticle.body,
        authorId: updatedArticle.authorId,
        createdAt: updatedArticle.createdAt,
      }
    }
  } catch(e) {
    prismaErrorHandler(e)
  }
};