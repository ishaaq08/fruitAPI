
/*
Install nodemon -  Avoid constant manual restart of server 

Change scripts in package.json: scripts > dev and start

In the terminal to run the server input 'npm run dev'

Server(request, response) :
    Request > from the client to the server
    Response > from the server to the client i.e. logging on the screen
*/


require("dotenv").config()

// Installed and imported the Express JS package via Node Package(module) Manager

const express = require("express")

// Create our server through the express() function which is imported via Express JS 

const app = express()

//  Setup a port
const port = process.env.PORT

// Imported the fruit.json file - this file was an array of objects 

const fruits = require("./fruits.json")

// Express.JSON 
    // Every single request will hit that middle ware

app.use(express.json())

// Simple GET requests

app.get("/", (req,res) => {
    res.send("Hello Fruit API")
})

app.get("/fruits", (req,res) => {
    res.send(fruits)
})

/*
Creating a GET request which returns the result for a specific fruit. 
*/

app.get("/fruits/:name", (req,res) => {
    const name = req.params.name.toLowerCase()
    
    // Search through the fruits.json file for a fruit that matches the users input 

    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)
   
    if(fruit == undefined){
        // If there is no match
        res.status(404).send(`${req.params.name}: does not exist as a fruit`)
    }else{
        res.send(fruit)
    }
})

/*
WHAT - This function will search for the index of a fruit inputted by the user 
RESULT - the index of the inputted fruit: TRUE = >-1, FALSE = -1
*/

const getFruitIndex = name => {
    // Take in a lowercase fruit name and return the index of the fruit or -1
    // 'fruit' is the iterative variable taking on the value of each object with each iteration

    /*
    Iterating through the array 
    With each iteration 'fruit' is equal to the next object 
    The function then checks if the name property of the iterative variable is the same as the argument 
    The argument is 'name' and thats what the user either wants to delete or post
    */
    return fruits.findIndex(fruit => fruit.name.toLowerCase() == name)
}

app.post("/fruits", (req, res) => {

    /*
    Creating a variable 
    Invoking the getFruitIndex with an argument of req.body.name.toLowerCase()
    The argument will be the fruit that the person wants to add to the json file - unsure about method of submission
    It will return a number
    */
    const fi = getFruitIndex(req.body.name.toLowerCase())

    if(fi > -1){
        res.status(409).send("The fruit already exists")
    } else {

        /*
        We need to insert the inputted value in to the array.
        We can't just push it to the end however as every object in the array has a unique ID. 
        Therefore, we calculate the maximum ID, increment it by 1 and assign it to the new value.   
        */

        const ids = fruits.map((fruit) => fruit.id)
        let maxId = Math.max(...ids)
        maxId ++
        req.body.id = maxId

        const newFruit = req.body
        fruits.push(newFruit)

        //res.status(201).send(fruit)
        console.log(fruit)
        res.send(`${req.body} was created as a new Fruit `)
    }
})


/* 
Defining a route so the user can delete a fruit
*/

app.delete("/fruits/:name", (req, res) => {

    /*
    > WHAT - Checking if the parameter exists in the json file.
    > WHY - You can only delete the fruit if it exists! If it doesn't exist the function will return -1. 

    REMEMBER -
         getFruitIndex(arg=name)
         req.params {
            name: "..."
         }
    */

    const fi = getFruitIndex(req.params.name.toLowerCase())

    if(fi == -1){
        res.status(404).send("Fruit cannot be found")
    }else{
        fruits.splice(fi,1)
        // res.sendStatus(200)
        res.send("Item deleted sucessfully!")
    }
})


// Turn on the server so that it listens out for requests 

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
})



