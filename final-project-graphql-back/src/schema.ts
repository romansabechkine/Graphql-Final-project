import gql from "graphql-tag";

 
export const typeDefs = gql`
  type Article {
    id: String
    title: String
    body: String
    createdAt:  Date   
    updatedAt:  Date  
    authorName: String
  }

  type LikesQuantity {
    id: Int
    likeType: String
    numberOfLikeType: Int
    articleId: String
  }

  type Comment {
    id: String
    body: String
    createdAt:  Date     
    updatedAt:  Date   
    authorName: String
    articleId: String
  }

  type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type User {
    id: ID!
    username: String!
  }

  type CreateArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
  }

  type SignInUserRepsonse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
    user: User
    sessionId : String
  }

  type SignOutUserRepsonse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type DeleteUserResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type CreateArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
  }

  type DeleteArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
  }

  type ArticleWithLikes {
    article: Article,
    likes: LikesQuantity
  }

  type getArticlesResponse {
    code: Int!
    success: Boolean!
    message: String!
    articlesWithLikes: [ArticleWithLikes]!
  }

  type getArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
    likes: LikesQuantity
    comments: [Comment]

  }

  type UpdateArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
  }

  type CreateCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type UpdateCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type DeleteCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type CreateLikeResponse {
    code: Int!
    success: Boolean!
    message: String!
    likeType: String
    madeAction: String
  }

  type Query {
    getArticles: getArticlesResponse
    getArticle(articleId: String!): getArticleResponse
  }

  type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse
    signInUser(username: String!, password: String!): SignInUserRepsonse
    signOutUser: SignOutUserRepsonse
    deleteUser(username: String!, password: String!): DeleteUserResponse
    createArticle(title: String!, body: String!): CreateArticleResponse
    deleteArticle(articleId: String!): DeleteArticleResponse
    updateArticle(articleId: String!, title: String, body: String): UpdateArticleResponse
    createComment(articleId: String!, body: String!): CreateCommentResponse
    updateComment(commentId: String!, body: String!): UpdateCommentResponse
    deleteComment(commentId: String!): DeleteCommentResponse
    processLike(articleId: String!, likeType: String!): CreateLikeResponse
  }

  scalar Date
  type MyType {
    created: Date
  }
`