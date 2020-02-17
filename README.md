# Zenaton Samples - Automated Reminder Emails

This is an example of Zenaton project showcasing how you can schedule automatic emails based on time or external events.

There are two workflows in this project:

1. `BookAPlaceWorkflow.js` sends emails based on intervals before a time.
2. `ReminderLoopWorkflow.js` will send up to a set number of emails, unless it receives some external events.

## Development

The `boot.js` file is where you tell the Zenaton Agent where to find - by name - the source code of your tasks and workflows. Also, you can set whether or not emails will be sent through the Sendground API or SDK.

> If you add a task or a workflow to your project, do not forget to update the `boot.js` file.

Look at Zenaton documentation to learn how to implement [workflows](https://docs.zenaton.com/workflows/implementation/) and [tasks](https://docs.zenaton.com/tasks/implementation/).

## Run

### Requirements

This example project uses uses Sendgrid to send some emails. You will need a Sendgrid API key to be able to send emails. If you don't have one yet, you can sign-in to your Sendgrid account and get an API [here](https://app.sendgrid.com/settings/api_keys). You will need to set the API key in your `.env` file.

### Starting the workflow

You can dispatch tasks and workflows by name from everywhere using [Zenaton API](https://docs.zenaton.com/client/graphql-api/).
They will be processed as soon as you run this project.

> Note: tasks and workflows are dispatched in an environment (`AppEnv`) of your Zenaton application (`AppId`).
> They will be processed by this project, **if** you setup it with the same `AppId` and `AppEnv`. You must also provide an `Api Token`
> to authorize access to this application (found at https://app.zenaton.com/api)

### Run Locally

First, install dependencies:

```sh
npm install
```

Then, fill-in the environment variables referenced in the `.env` file.

Install a Zenaton Agent:

```sh
curl https://install.zenaton.com | sh
```

and run it:

```sh
zenaton listen --boot=boot.js
```

### Run in Docker

Create your `.env` file

```sh
cp -n .env.sample .env
```

and fill-in the environment variables referenced in the `.env` file.

Then start your container:

```sh
cd docker && docker-compose up
```

### Run on Heroku

Follow this button [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy), then fill in the env variables and click "deploy".

### Run somewhere else

Check our [documentation](https://docs.zenaton.com/going-to-production/) for more options (AWS, Google Cloud, Clever Cloud ...)

### Checking that your project is running

Whatever your installation method, you should see that a new Agent is listening from this url: https://app.zenaton.com/agents. If you do not
see it, please check again that you have selected the right application and environment.

## Dispatching Tasks and Workflows

### Using Zenaton API

Tasks and workflows can be dispatched by name from everywhere using the [Zenaton API](https://docs.zenaton.com/client/graphql-api/) or our [Node.js SDK](https://github.com/zenaton/zenaton-node).

You can test it from your command line interface:

#### Dispatching a `"BookAPlaceWorkflow"` workflow:

```bash
curl -X POST https://gateway.zenaton.com/graphql \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -d '{"query":"mutation($input: DispatchWorkflowInput!) { dispatchWorkflow(input: $input) { id } }","variables":{"input":{"appId":"<API_ID>","environment":"dev","name":"BookAPlaceWorkflow","input":"[{\"email\":\"<email>\", \"date\":\"<date>\"}]"}}}'
```

> Do not forget to replace `<APP_ID>` and `<API_TOKEN>` by your Zenaton AppId and api token.

> `<email>` is the email address messages will be sent to.
> `<date>` is the date of the booking. You can use a format like "October 13, 2020 11:00:00".

#### Dispatching a `"ReminderLoopWorkflow"` workflow:

```bash
curl -X POST https://gateway.zenaton.com/graphql \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -d '{"query":"mutation($input: DispatchWorkflowInput!) { dispatchWorkflow(input: $input) { id } }","variables":{"input":{"appId":"<APP_ID>","environment":"dev","name":"ReminderLoopWorkflow","input":"[{\"email\":\"<email>\", \"max_wait\":<max_wait>, \"nb_max_reminder\":<nb_max_reminder>}]"}}}'
```

> Do not forget to replace `<APP_ID>` and `<API_TOKEN>` by your Zenaton AppId and api token.

> `<email>` is the email address messages will be sent to.
> `<max_wait>` is maximum amount of time to wait for events to be received before senidng a reminder.
> `<nb_max_reminder>` is maximum number of reminders to send before giving up.

This workflow will expect two events. First, `"EventA"`, then `"EventB"`.

Sending an `"EventA"` event to this workflow:

```bash
curl -X POST https://gateway.zenaton.com/graphql \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <API_TOKEN> \
  -d '{"query":"mutation($input: SendEventToWorkflowsInput!) { sendEventToWorkflows(input: $input) { status } }","variables":{"input":{"appId":"<APP_ID>","environment":"dev","name":"EventA","selector":{"id":"<WORKFLOW_ID>"}}}}'
```

> Do not forget to replace `<APP_ID>` and `<API_TOKEN>` by your Zenaton AppId and api token. And <WORKFLOW_ID> by your workflow's id that you have received when dispatched.

### Example App

We have provided an [example app](https://github.com/zenaton/nodejs-example-app) with basic UI to dispatch workflows and events with associated data to your Zenaton project. After installation, you can (optionaly) add your workflows and some examples of input and event in the `public/config.json` file. eg.

```json
{
  "workflows": [
    {
      "name": "BookAPlaceWorkflow",
      "input": ["<email>", "<date>"]
    }
  ]
}
```

> You need to rebuild your example app after having modified this file. If you prefer, you can update directly `dist/config.json` and simply reload the page - but your changes will be lost at the next rebuild.

## Monitoring Tasks and Worklows Processing

Look at your [dashboard](https://app.zenaton.com/workflows) (if you do not see your dispatched tasks or workflows, please check that you have selected the right application and environment).
