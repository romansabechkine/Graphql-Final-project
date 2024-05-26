import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {gql} from 'graphql-tag'
import { typeDefs } from './schema.js';
import db from './datasources/db.js';
import { resolvers } from './resolvers.js';
import { AuthenticatedUser, getUser } from './modules/auth.js';
import { GraphQLError } from 'graphql';
import { getSessionUser } from './modules/session.js';


const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
   
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({req}) => {
        const cache = server.cache
        // Get the user token from the headers.
        const authorization = (req.headers.authorization)?.split('Bearer ')?.[1]
        // Try to retrieve a user with the token
        let user = authorization ? getUser(authorization) : null

        //console.log("USER in index.ts")
        //console.log(user)
        
        return {
          dataSources: {
            db,
          },
          user,
        }
      }
  });
   
  console.log(`🚀  Server ready at: ${url}`);