<template>
  <div>
    <pre class="language-javascript"><code>curl --request POST \
  --url 'https://gateway.zenaton.com/graphql' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer &lt;api Token&gt;' \
  --data '
  {
    "query": "mutation($input: DispatchTaskInput!) { dispatchTask(input: $input) { id } }",
    "variables": {
      "input": {
        "appId": "&lt;app id&gt;",
        "environment": "&lt;environment&gt;",
        "name": "&lt;task name&gt;",
        "input": "[...&lt;task input&gt;]"
      }
    }
  }</code></pre>
  </div>
</template>

<script>
export default {
  name: "GraphQL"
};
</script>
