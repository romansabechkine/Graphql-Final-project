import { MutationResolvers } from "../../types.js";
import { getSessionUser } from "../../modules/session.js";
import { graphqlErrorHandler, prismaErrorHandler } from "../../modules/customErrors.js";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedUser } from "../../modules/auth.js";


const createLike = async (articleId: string, likeType: string, db: PrismaClient, user: AuthenticatedUser ) => {
  const createdLike = await db.like.create({
    data: {
      likeType: likeType,
      user: {
        connect: {
            id: user.id,
        },
      },
      article: {
          connect: {
              id: articleId
          }
        }
      }})
  return createdLike
}

const deleteLike = async (id: string, db: PrismaClient, user: AuthenticatedUser) => {
  // temporary solution 
  const deletedLike = await db.like.delete({
  where: {
      id: id,
      userId: user.id, 
  }})
 return deletedLike
}

const incrementLikesQuantity = async (articleId: string, likeType: string, db: PrismaClient) => {
  const findLikeType = await db.likesQuantity.findFirst({
    where: {
      articleId: articleId,
      likeType: likeType
    }
  })
  if (findLikeType) {
    return await db.likesQuantity.update({
      where: {articleId: articleId}, data: {
        likeType: likeType,
        numberOfLikeType: {increment: 1}
      }
   })
   } else {
      return await db.likesQuantity.create({
        data: {likeType: likeType, article: {connect: {id: articleId}}}
     })
   }
}

const decrementLikesQuantity = async (articleId: string, likeType: string, db: PrismaClient) => {
  return await  db.likesQuantity.update({
    where: {articleId: articleId}, data: {
      likeType: likeType,
      numberOfLikeType: {decrement: 1}
    }
 })
}

 
export const processLike: MutationResolvers['processLike'] = async (_, {articleId, likeType}, {dataSources, user}, __) => {

  // throws session expired if user and !active session and deletes expired session from db

  if (!user) {
    graphqlErrorHandler()
    }
  await getSessionUser(user)


  // for future ameliorations
  //const likeTypes = ["heart", "smile", "laugh", "thunbup", "thumbdown", "angry", "mean"]

  const likeTypes= ["thumbup"]

  if (!likeTypes.includes(likeType)){
    return {
        code: 409,
        message: 'INVALID like',
        success: false,
        madeAction: null,
        likeType: likeType
    }
  }

  try {
    const existingLike = await dataSources.db.like.findFirst({
      where: {
        userId: user.id,
        articleId: articleId,
      }
    })
    console.log("Existing like")
    console.log(existingLike)

    // if there is no like for the article and the user create one
    if (!existingLike){
      console.log("Not like, incremented like")
      const createdLike = await createLike(articleId, likeType, dataSources.db, user)
      console.log(createdLike)
      const incrementLike = await incrementLikesQuantity(articleId, likeType, dataSources.db)
      console.log("INCREMENTED:")
      console.log(incrementLike)

     return {
      code: 201,
      message: 'the article is LIKED',
      success: true,
      madeAction: "createlike",
      likeType: likeType
    }
    }

    if(existingLike) {
      console.log("EXISTING LIKE")
      // if the user made the same liketype delete the liketype
      if(existingLike.likeType === likeType){
        console.log("deleted like")
        const deletedLike =  await deleteLike(existingLike.id, dataSources.db, user)
        console.log("DELETED LIKE")
        console.log(deletedLike)

        const decremented = await decrementLikesQuantity(articleId, likeType, dataSources.db)

        console.log("DECREMENTED")
        console.log(decremented)

        return {
          code: 201,
          message: 'the article is UNLIKED',
          success: true,
          madeAction: "deletelike",
          likeType: likeType
        }
      }
    }
  } catch(e) {
    prismaErrorHandler(e)
  }
};