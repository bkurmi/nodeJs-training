1. install nodemon as dev dependency
2. app.js should be at root level
3. Create all folders
    a. models
    b. controllers
    c. data - if there i any static Json data to be maintained
    d. routes
4. create model classes
    a. Create Constructor (if required)
    b. write all the methods required to get/updatet he details of that model like save(), deleteById(), findById() etc. 
5. import model in controller
6. create routes.js file and create required routes
7. write all logic inside respective controller js file and call all the methods inside the model for ant action on model attributes like to save, get, delete etc.
7. Update routes.js file to link controller to respective route
8. test application from postman.
