const qraphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = qraphql;

// const users = [
//     { id: '23', firstName: 'Bill', age: 20 },
//     { id: '47', firstName: 'Samantha', age: 21 }
// ]

// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: {
//         id: { type: GraphQLString },
//         firstName: { type: GraphQLString },
//         age: { type: GraphQLInt },
//     }
// })

const BuildingType = new GraphQLObjectType({
    name: 'Building',
    fields: {
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        cluster: { type: GraphQLString },
        content: { type: GraphQLString },
        description: { type: GraphQLString },
        id: { type: GraphQLString },
        lastModified: { type: GraphQLString },
        lat: { type: GraphQLString },
        lon: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        postalCode: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
        url: { type: GraphQLString }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        building: {
            type: BuildingType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`https://myuvaapp-575f7.firebaseio.com/buildings/${args.id}.json`)
                    .then(response => response.data);
            }
        },
        allBuildings: {
            type: new GraphQLList(Building),
            resolve(parentValue, args){
                return axios.get(`https://myuvaapp-575f7.firebaseio.com/buildings.json`)
                    .then(response => response.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
