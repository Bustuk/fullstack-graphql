const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
    shoes: [Shoe]!
  }

  enum ShoeType { 
    JORDAN
    NIKE
    ADIDAS
  } 

  interface Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String
    user: User!
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    hasGrip: Boolean
    user: User!
  }

  input ShoesInput {
    brand: ShoeType
    size: Int
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]!
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int! 
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`
const user = {
  id: 1,
  email: 'yoda@masters.com',
  avatar: 'http://yoda.png',
  friends: [],
  shoes: [],
}

const shoes = [
  {brand: 'NIKE', size: 12, sport: 'basketball', user: 1},
  {brand: 'ADIDAS', size: 13, hasGrip: true, user: 1},
]

const resolvers = {
  Query: {
    me() {
      return user
    },
    shoes(_, {input}) {
      return shoes
    }
  },
  Mutation: {
    newShoe(_, {input}) {
      throw 'xd'
      return input
    }
  },
  User: {
    shoes(user) {
      return shoes
    }
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) {
        return 'Sneaker'
      }
      return 'Boot'
    },
  },
  Sneaker: {
    user(shoe) {
      return user;
    }
  },
  Boot: {
    user(shoe) {
      return user;
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(4000).then(() => console.log('on port 4000'))