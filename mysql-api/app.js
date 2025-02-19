import express from 'express'
import asyncHandler from './utils/asyncHandler.js'
import {getAllUsers, getUserFromId, createUser, getTemplatesByUser, createTemplate, 
    submitWorkoutDrags, submitWorkoutComment, submitWorkout} from './database.js'

const app = express()

// Add CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(express.json())

// API Endpoints
app.get("/users", asyncHandler(async (req, res) => {
    const users = await getAllUsers();
    res.send(users)
}))

app.get("/users/:id", asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await getUserFromId(id);
    res.send(user)
}))

app.post("/users", asyncHandler(async (req, res) => {
    const {name} = req.body
    const user = await createUser(name)
    res.status(201).send(user)
}))

app.get("/templates/:user_id", asyncHandler(async (req, res) => {
    const user_id = req.params.user_id
    const templates = await getTemplatesByUser(user_id)
    res.send(templates)
}))

app.post("/templates", asyncHandler(async (req, res) => {
    console.log(req)
    const template = await createTemplate(req.body)
    
    res.status(201).send(template)
}))

app.post("/workouts", asyncHandler(async (req, res) => { // Trenger å opprette workout med kommentar først, finne ut hvilken ID den har, så sende payload med alle dragene med denne iden
    const workout_id = await submitWorkout(req.body.user_id, req.body.comment, req.body.drags)
    res.status(201).send({"message": "Workout saved successfully!", "workout_id": workout_id})
}))

//Idk what this is i followed a tutorial
app.use((err, req, res, next) => {
    console.error(err.stack)

    if (err.code && err.code.startsWith('ER_')) {
        res.status(400).json({error: err.sqlMessage || 'Database error oh noo'})
    } else {
        res.status(500).send('Something broke 💩')
    }
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})