const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Kerbin Version ' + process.version);
});

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(8080, () => {
    console.log('\x1b[32m** GraphQL endpoint is running on http://127.0.0.1:8080/graphql **\x1b[0m');
});
