import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { QueryResolvers } from "../types.js";
import { GraphQLError } from "graphql";
import { getSessionUser } from "../modules/session.js";
import { graphqlErrorHandler, prismaErrorHandler } from "../modules/customErrors.js";
 
export const getArticle: QueryResolvers['getArticle'] = async (_, {articleId}, {dataSources, user}, ___) => {

  if (!user) {
    return graphqlErrorHandler()
  } 

  await getSessionUser(user)

  try {
    const article = await dataSources.db.article.findFirst({
      select: {
        id:true,
        title:true,
        body:true,
        createdAt:true,
        updatedAt:true,
        comments: {
          include: { // the same thing as select, it doesn't include only author, it resolves it
            author: {
              select: {
                username: true,
              }}}},
        likesQuantity: true,
        author: {
          select: {
            username: true,
          },
        }
      },
      where: {
        id: articleId
        },
      },
    )
    console.log("ARTICLE:")
    console.log(article)
    /*const likes = await dataSources.db.likesQuantity.findFirst({
      where: {
        articleId: articleId
      }
    })
    const comments = await dataSources.db.comment.findMany({
      where: {
        articleId: articleId
      } 
    })*/
    const {author, likesQuantity, comments, ...rest} = article
    return {
        code: 200,
        message: "OK",
        success: true,
        article: {
          ...rest,
          authorName: author.username
        },
        likes: likesQuantity,
        comments: comments.map((el) => {
          const {authorId, author, ...rest} = el
          return {
            ...rest, authorName: author.username
          }}),
        
  } } catch(e) {
    return prismaErrorHandler(e)
  };
}