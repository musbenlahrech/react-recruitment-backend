const { ApolloServer, gql } = require('apollo-server');
const { GraphQLDateTime } = require('graphql-iso-date')
const {notifications, kpis, user} = require('./data')

console.log(kpis);
console.log(notifications)


const typeDefs = gql`
  
  type Kpi {
    id: Int
    name: String!
    avg: Float!
    data: [Float!]!
    type: String!
    change: Float!

  }

  type Measurement {
    id: Int
    name: String!
    value: String!
    date: String!
  }

  type Location {
    lat: Float!
    lon: Float!
  }

  type Notification {
    id: Int
    type: String!
    location: Location!
    street: String!
    kpis: [Kpi!]!
    pictures:[String!]!
    measurement:[Measurement]
    createdAt: String!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    photo: String!
  }

  type Query {
    notification(id: Int!): [Notification],
    notifications: [Notification],
    homeKpis: [Kpi],
    me: User
  }
`;



var queryNotifications = (notificationId) => {
  return notifications.filter((notification, index, filteredArray) => {
    return notification.id == notificationId
  });
}

const resolvers = {
  Query: {
    //Reference: https://www.apollographql.com/docs/graphql-tools/resolvers/
    notification: (parent, args, context, info) => {
      return queryNotifications(args.id)
    },
    notifications: () => notifications,
    homeKpis: () => kpis,
    me: () => user,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const PORT = 3000;

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});