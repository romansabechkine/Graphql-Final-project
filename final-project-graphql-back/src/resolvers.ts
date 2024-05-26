import { createArticle } from "./mutations/articles/createArticle.js";
import { createUser } from "./mutations/users/createUser.js";
import { deleteUser } from "./mutations/users/deleteUser.js";
import { signInUser,  } from "./mutations/users/signInUser.js";
import { signOutUser } from "./mutations/users/signOutUser.js";
import { dateScalar } from "./modules/customScalars.js";
import { deleteArticle } from "./mutations/articles/deleteArticle.js";
import { getArticles } from "./queries/getAllArticles.js";
import { updateArticle } from "./mutations/articles/updateArticle.js";
import { getArticle } from "./queries/getArticle.js";
import { Resolvers } from "./types.js";
import { createComment } from "./mutations/comments/createComment.js";
import { updateComment } from "./mutations/comments/updateComment.js";
import { deleteComment } from "./mutations/comments/deleteComment.js";
import { processLike } from "./mutations/likes/processLike.js";


export const resolvers: Resolvers = {
    Date: dateScalar,
    Mutation: {
        //User
        createUser,
        signInUser,
        signOutUser,
        deleteUser,
        //Article
        createArticle,
        deleteArticle,
        updateArticle,
        //Comment
        createComment,
        updateComment,
        deleteComment,
        //Like
        processLike,
    },
    Query: {
        getArticles,
        getArticle
    },
}