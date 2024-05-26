import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPassword } from "../../modules/auth.js";
import { Article, MutationResolvers } from "../../types.js";
import { GraphQLError } from "graphql";
import { getSessionUser } from "../../modules/session.js";
import { graphqlErrorHandler, prismaErrorHandler } from "../../modules/customErrors.js";
import { likeTypes } from "../likes/likeTypes.js";
import { connect } from "http2";
 
export const createArticle: MutationResolvers['createArticle'] = async (_, {title, body}, {dataSources, user}, __) => {

  // throws session expired if user and !active session and deletes expired session from db

  if (!user) {
    graphqlErrorHandler()
    }
  await getSessionUser(user)

  try {
    const createdArticle = await dataSources.db.article.create({
      data: {
        title: title,
        body: body,
        author: {
            connect: {
                id: user.id,
            }
        }
      }
    })
    console.log("created article")
    console.log(createdArticle)
    
    console.log(createdArticle)
    return {
      code: 201,
      message: 'the article has been created',
      success: true,
      article: {
        id: createdArticle.id,
        title: createdArticle.title,
        body: createdArticle.body,
        authorName: user.username,
        createdAt: createdArticle.createdAt,
        updatedAt: createdArticle.updatedAt
      }
    }
  } catch(e) {
    prismaErrorHandler(e)
  }
};