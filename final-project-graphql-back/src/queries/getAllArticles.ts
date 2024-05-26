import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { QueryResolvers } from "../types.js";
import { GraphQLError } from "graphql";
import { getSessionUser } from "../modules/session.js";
import { graphqlErrorHandler, prismaErrorHandler } from "../modules/customErrors.js";
import { likeTypes } from "../mutations/likes/likeTypes.js";
 
export const getArticles: QueryResolvers['getArticles'] = async (_, __, {dataSources, user}, ___) => {

  if (!user) {
    return graphqlErrorHandler()
  } 

  await getSessionUser(user)

  try {
    const articlesLikes = await dataSources.db.article.findMany({
      select: {
        id:true,
        title:true,
        body:true,
        createdAt:true,
        updatedAt:true,
        likesQuantity: true,
        
        author: {
          select: {
            username: true,
          },
        }
      },})

      /*likes: {
        select: {}
      },*/

      console.log("ARTICLELIKES")
      console.log(articlesLikes)
      /*_count: {
        select: {
          likes: {
          }
        },
      },*/
      /*include: {
        author: {
          select: {
            username: true,
          },
        },
      },*/
    

    /*const groupLikes = await dataSources.db.like.groupBy({
      by: ['articleId', 'likeType'],
      _count: {
        likeType: true,
      },
    })

    const groupLikes2 = await dataSources.db.like.count({})
    console.log(groupLikes)
    console.log(groupLikes2)*/

    /*const result = await dataSources.db.$queryRaw`SELECT id, title, body, createdAt,
      updatedAt, USER.authorName, likes FROM ARTICLE
      JOIN USER ON ARTICLE.userId = USER.id
      JOIN LIKES ON LIKES.articleId = ARTICLE.id`*/

    /*const result = await dataSources.db.$queryRaw`SELECT ARTICLE.title, 
                                                         LIKE.likeType,
                                                         COUNT(*)
    FROM ARTICLE
    INNER JOIN USER ON ARTICLE.authorId = USER.id
    INNER JOIN LIKE ON LIKE.articleId = ARTICLE.id
    GROUP BY LIKE.likeType, LIKE.articleId`*/

    //console.log("Result")
    //console.log(result)

    return {
        code: 200,
        message: "OK",
        success: true,
        articlesWithLikes: articlesLikes.map((el) => {
          const {author, likesQuantity, ...rest} = el
          const article = {...rest, authorName: author.username}
          return {article: article, likes:likesQuantity}
        }),
    }
  }
  catch(e) {
    prismaErrorHandler(e)
  }
};