import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Article, MutationResolvers } from "../../types.js";
import { GraphQLError } from "graphql";
import { getSessionUser } from "../../modules/session.js";
import { graphqlErrorHandler, prismaErrorHandler } from "../../modules/customErrors.js";
 
export const deleteArticle: MutationResolvers['deleteArticle'] = async (_, {articleId}, {dataSources, user}, __) => {

  await getSessionUser(user)

  if (!user) {
    graphqlErrorHandler()
  }

  await getSessionUser(user)
  
  try {
    const deletedArticle = await dataSources.db.article.delete({
        where: {
            id: articleId,
            authorId: user.id
        },
    })
    console.log(deletedArticle)
    return {
      code: 201,
      message: 'The article has been deleted',
      success: true,
      article: {
        id: deletedArticle.id,
        title: deletedArticle.title,
        body: deletedArticle.body,
        authorId: deletedArticle.authorId,
        createdAt: deletedArticle.createdAt,
      }
    }
  } catch(e) {
    prismaErrorHandler(e)
  }
};