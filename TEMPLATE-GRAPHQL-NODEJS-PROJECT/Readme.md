Postman Sample Request for Query
curl --location 'http://localhost:8082/graphql' \
--header 'Content-Type: application/json' \
--data '{
    "query": "{hello { text views } }"
}'

---------------------------------------------------------
GRAPHIQL - Alternative of Postman to work with GraphQl

http://localhost:8082/graphql
Query Sample Request:
    query{
        hello{
            text
            views
        }
    }

Mutation Sample Request for Create User (User Signup)
    mutation{
    createUser(userInput:{email: "bhawesh.kurmi1@royalcyber.com", name:"Bhawesh Kurmi",   password:"testpassword"}){
        _id
        name
        email
    }
    }


Validation
-------------
We use Validator package for the same, and its simple moved to resolver.js instead of middleware.

Error Handling
-----------------
Use formatError in app.js in graphql middleware.