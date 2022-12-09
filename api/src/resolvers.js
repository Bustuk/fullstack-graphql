/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, { input }, ctx) {
      return ctx.models.Pet.findMany(input)
    },
    pet(_, { input }, ctx) {
      return ctx.models.Pet.findOne(input)
    },
    me(_, __, ctx) {
      return ctx.models.User.findOne({ id: 'jBWMVGjm50l6LGwepDoty' })
    }
  },
  Mutation: {
    createPet(_, { input }, ctx) {
      return ctx.models.Pet.create(input)
    }
  },
  Pet: {
    // id() {
    //   return 1
    // },
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300'
    },
    owner(pet, _, ctx) { 
      return ctx.models.User.findOne({ id: pet.userId })
    }
  },
  User: {
    pets(user, _, ctx) {
      return ctx.models.Pet.findMany({ userId: user.id })
    }
  }
}
