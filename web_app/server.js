'use strict'

var express = require('express')
var bodyParser = require('body-parser')

const client = require("./src/zenaton_client")

var app = express()

var config = require('./src/config')
const PORT = process.env.PORT || config.port
const publicPath = __dirname + '/dist'
app.use(bodyParser.json())
app.use(express.static(publicPath))
app.listen(PORT)

console.log('App listening on http://localhost:' + PORT)

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: publicPath  })
})

app.post('/api/:workflow_name/dispatch', async (req, res) => {
  console.log(`Dispatch a new instance of ${req.params.workflow_name} with inputs params: ${JSON.stringify(req.body, null, 2)}`)

  const {id} = await client.run.workflow(req.params.workflow_name, req.body)

  res.json({id});
});

app.post('/api/:workflow_id/event', function (req, res) {
  console.log(`Send an event ${req.body.name} to the instance ${req.params.workflow_id} with data: ${JSON.stringify(req.body.data, null, 2)}`)

  // Send an event to a Zenaton Workflow instance
  client.select
    .workflow()
    .withId(req.params.workflow_id)
    .send(req.body.name, ...req.body.data)

  res.json({})
})


// app.post('/api/:workflow_name/register', function (req, res) {
//   console.log(`Register a new user: ${req.body.email}`)
//   const user = { ...req.body }

//   // Here we launch the 'OnboardingWorkflow' Zenaton Workflow.
//   // We pass the user as a parameter to this new workflow instance.
//   // the withTag function is used to give the new instance an ID
//   // so we will be able later to send event to it.
//   client.run.withTag(user.email).workflow(req.params.workflow_name, user)

//   res.json()
// })

// app.post('/api/:workflow_name/event', function (req, res) {
//   console.log(`Send the event '${req.body.event.name}' for the user '${req.body.user.email}'`)

//   // Send an event to a Zenaton Workflow instance
//   client.select
//     .workflow(req.params.workflow_name)
//     .withTag(req.body.user.email)
//     .send(req.body.event.name, req.body.event.data)

//   res.json()
// })