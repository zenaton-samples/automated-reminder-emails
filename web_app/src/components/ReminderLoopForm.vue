<template>
  <form @submit="submit" class="px-8 pt-6 pb-8">
    <h2 class="pb-6">#1 Dispatch Workflow</h2>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        required
        v-model="email"
      />
      <FieldErrorMessage :error="errors.email" />
    </div>
    <button v-on:click="submit" type="submit">Apply</button>
  </form>
</template>

<script>
import FieldErrorMessage from "../components/FieldErrorMessage.vue";

export default {
  name: "ReminderLoopForm",
  components: {
    FieldErrorMessage
  },
  data() {
    return {
      errors: {
        email: null
      },
      email: "john@example.com"
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();

      if (!this.validateForm()) {
        return false;
      }

      this.$store.dispatch("dispatchWorkflow", {
        name: "ReminderLoopWorkflow",
        input: { email: this.email, nb_max_reminder: 3, max_wait: 10 }
      });
    },
    validateForm() {
      this.errors = {};
      if (this.email == "") {
        this.errors.email = "required";
      }

      return Object.keys(this.errors).length === 0;
    }
  }
};
</script>
