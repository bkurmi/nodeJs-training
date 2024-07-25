1. install nodemon as dev dependency
2. app.js should be at root level
3. Create all folders
    a. models
    b. controllers
    c. data - if there i any static Json data to be maintained
    d. routes
4. create model classes
    a. Create Constructor (if required)
    b. if not using Sequaliser for SQL or Mongooes for NOSQL than write all the methods required to get/updatet he details of that model like save(), deleteById(), findById() etc. 
    c. if using mongoose, than write schemas and create model to link ModelName/MongoDB collection with the schema and export the same.
5. import model in controller
6. create routes.js file and create required routes
7. write all logic inside respective controller js file and call all the methods inside the model for ant action on model attributes like to save, get, delete etc.
7. Update routes.js file to link controller to respective route
8. test application from postman.



Await Vs .Then approach
------------------------
Its totally your choice which pattern suits you more. with await, we mighten up with lesser code and with .then might help with more modular and clean code.