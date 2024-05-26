/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query GetArticles {\n        getArticles {\n        code\n        success\n        message\n        articlesWithLikes {\n            article {\n            id\n            title\n            body\n            createdAt\n            updatedAt\n            authorName\n            }\n            likes {\n            likeType\n            numberOfLikeType\n            articleId\n            }\n        }\n        }\n    }\n    ": types.GetArticlesDocument,
    "mutation CreateArticle($title: String!, $body: String!) {\n    createArticle(title: $title, body: $body) {\n      code\n      success\n      message\n      article {\n        id\n        title\n        body\n        createdAt\n        updatedAt\n        authorName\n      }\n    }\n  }": types.CreateArticleDocument,
    "\nmutation Mutation($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n        code\n        success\n        message\n        user {\n            id\n            username\n        }\n    }\n}": types.MutationDocument,
    "\nmutation SignIn($username: String!, $password: String!) {\n    signInUser(username: $username, password: $password) {\n        code\n        success\n        message\n        token\n        user {\n            id\n            username\n        }\n        sessionId\n  }\n    }\n": types.SignInDocument,
    "\nmutation signOut {\n    signOutUser {\n      code\n      success\n      message\n    }\n  }\n": types.SignOutDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetArticles {\n        getArticles {\n        code\n        success\n        message\n        articlesWithLikes {\n            article {\n            id\n            title\n            body\n            createdAt\n            updatedAt\n            authorName\n            }\n            likes {\n            likeType\n            numberOfLikeType\n            articleId\n            }\n        }\n        }\n    }\n    "): (typeof documents)["\n    query GetArticles {\n        getArticles {\n        code\n        success\n        message\n        articlesWithLikes {\n            article {\n            id\n            title\n            body\n            createdAt\n            updatedAt\n            authorName\n            }\n            likes {\n            likeType\n            numberOfLikeType\n            articleId\n            }\n        }\n        }\n    }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateArticle($title: String!, $body: String!) {\n    createArticle(title: $title, body: $body) {\n      code\n      success\n      message\n      article {\n        id\n        title\n        body\n        createdAt\n        updatedAt\n        authorName\n      }\n    }\n  }"): (typeof documents)["mutation CreateArticle($title: String!, $body: String!) {\n    createArticle(title: $title, body: $body) {\n      code\n      success\n      message\n      article {\n        id\n        title\n        body\n        createdAt\n        updatedAt\n        authorName\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Mutation($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n        code\n        success\n        message\n        user {\n            id\n            username\n        }\n    }\n}"): (typeof documents)["\nmutation Mutation($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n        code\n        success\n        message\n        user {\n            id\n            username\n        }\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation SignIn($username: String!, $password: String!) {\n    signInUser(username: $username, password: $password) {\n        code\n        success\n        message\n        token\n        user {\n            id\n            username\n        }\n        sessionId\n  }\n    }\n"): (typeof documents)["\nmutation SignIn($username: String!, $password: String!) {\n    signInUser(username: $username, password: $password) {\n        code\n        success\n        message\n        token\n        user {\n            id\n            username\n        }\n        sessionId\n  }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation signOut {\n    signOutUser {\n      code\n      success\n      message\n    }\n  }\n"): (typeof documents)["\nmutation signOut {\n    signOutUser {\n      code\n      success\n      message\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;