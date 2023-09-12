
// // 1) Install nodemon -  Avoid constant manual restart of server 

// // 2) change scripts in package.json file: dev and start

// // npm run dev in terminal -  anytime a change is made to the doc it runs again

// // import 
// // create server that can respond to request
// // create server listening

// // Importing http modules from node

// const { log } = require("console")
// const http = require("http")

// // Create a server and sends the response: (req=object, res=object)

// const server = http.createServer((req, res)=>{
    
//     console.log(req.url)
//     console.log(req.method)

//     // Set the header - tell the browser that the following content will be HTML
//     res.setHeader("Content-Type", "text/html")


//     // What to do when no more data is coming
//     res.statusCode = 404
//     res.end("<img src='https://pbs.twimg.com/media/Dj8XlmjV4AEzsvr.jpg'>")
// }
// )

// // Start out server - tell the server to listen 

// server.listen(3000, () => {
//     console.log("Server Ready")
// }
// )

// Import express js

require("dotenv").config()

const express = require("express")

// Create our server
const app = express()

//  Setup a port
const port = process.env.PORT

// Imports fruit json file 
const fruits = require("./fruits.json")

// middleware 

// app.use((req, res, next) => {
//     console.log("I am a piece of Midleware")
//     next()
// })

// app.use((req, res, next) => {
//     console.log("I am also a piece of Midleware")
//     next()
// })

// Express.JSON 
    // Every single request will hit that middle ware

app.use(express.json())

// Define the roots 

app.get("/", (req,res) => {
    res.send("Hello Fruit API")
})

app.get("/fruits", (req,res) => {
    res.send(fruits)
})

// body - contains the information we will use

const getFruitIndex = name => {
    // Take in a lowercase fruit name and return the index of the fruit or -1

    // By default findIndex will return -1 if it cant find anything 

    return fruits.findIndex((fruit) => fruit.name.toLowerCase() == name)
}

app.post("/fruits", (req, res) => {

    const fi = getFruitIndex(req.body.name.toLowerCase())
    if(fi > -1){
        res.status(409).send("The fruit already exists")
    } else {
        // fruits.push(req.body)
        // res.status(201).send(req.body)

        // Create an array of all ids
        const ids = fruits.map((fruit) => fruit.id)

        // Get the maximum id
        let maxId = Math.max(...ids)

        // Increment that by one 
        maxId ++

        // Adjust id to new max id
        req.body.id = maxId

        fruits.splice(fi,1)
        res.sendStatus(200)
    }

    const fruit = req.body
    console.log(fruit)
    res.send("New Fruit Created")
})

app.delete("/fruits/:name", (req, res) => {
    const fi =getFruitIndex(req.params.name.toLowerCase())
    if(fi == -1){
        res.status(404).send("Fruit cannot be found")
    }else{
        
    }
})

// req.params > Returns an object hence why we use object dot notation to access the value of the 'name' key

app.get("/fruits/:name", (req,res) => {
    // res.send(`Return a fruit with ${req.params.name} name`)
    
    // Define a variable that records the fruit name the user is searching for
    const name = req.params.name.toLowerCase()
    
    // Now search for the fruit - match param name with a name in fruits.json
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)
  
    // Displaying the fruit if it does exist 
    if(fruit == undefined){
        // If there is no match
        res.status(404).send("The fruit doesn't exist")
    }else{
        res.send(fruit)
    }
})

// We now want the server to return a particular fruit 


// Make the server listen

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
})


// app.get("/params", (req,res) => {
//     res.send(req.params)
// })


//     // forward slash represents the root e.g. matilda.com
// app.get(`/`, (req,res) => {
//     res.send("Hello world")
// })

// app.get("/chicken", (req,res) => {
//     res.send("Hello Chicken")
// })

// // Parameters - route out specific things
//     // Queries come after a question mark in a url

// app.get("/chicken/:name", (req,res) => {
//     res.send(req.params)
// })

// app.get("/example", (req, res) => {
//     res.sendStatus(418)
// })

