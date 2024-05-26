import { GraphQLScalarType } from 'graphql';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value:Date) {
    return new Date(value);
  },
  serialize(value:Date) {
    return value.toISOString();
  },
})