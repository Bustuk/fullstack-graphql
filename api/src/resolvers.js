/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(a, b, ctx) {
      console.log(ctx)
      return ctx.models.Pet.findMany()
    },
  },
  // Mutation: {
    
  // },
  // Pet: {
  //   img(pet) {
  //     return pet.type === 'DOG'
  //       ? 'https://placedog.net/300/300'
  //       : 'http://placekitten.com/300/300'
  //   },
  //   pet: (_, {input}, {x}) => models.Pet.findOne(input),
  // },
  // User: {
  //   user: (_, __, {x}) => models.User.findOne()
  // }
}
