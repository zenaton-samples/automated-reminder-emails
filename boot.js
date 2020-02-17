require('dotenv').config()

// load dependencies
const { workflow, task } = require('zenaton');

// load definitions
const ReminderLoopWorkflow = require("./Workflows/ReminderLoopWorkflow");
const BookAPlaceWorkflow = require("./Workflows/BookAPlaceWorkflow");

workflow("ReminderLoopWorkflow", ReminderLoopWorkflow);
workflow("BookAPlaceWorkflow", BookAPlaceWorkflow);

const SendEmail = require("./Tasks/SendEmailWithSendgrid_axios");
// const SendEmail = require("./Tasks/SendEmailWithSendgrid_sdk");
task("SendEmail", SendEmail);
