<template>
  <form @submit.prevent="submit" class="px-8 pt-6 pb-8">
    <h2 class="pb-6">#2 Send Event to a Workflow</h2>
    <div class="mb-4">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="workflowId"
        >Workflow ID</label
      >
      <CustomSelect
        v-model="workflowId"
        :options="workflow_instances"
      />
      <FieldErrorMessage :error="errors.workflowId" />
    </div>

    <div class="mt-4">
      <button v-on:click.prevent="submit('EventA')" type="submit">
        Customer Event A
      </button>
    </div>

    <div class="mt-4">
      <button v-on:click.prevent="submit('EventB')" type="submit">
        Customer Event B
      </button>
    </div>
  </form>
</template>

<script>
import CustomSelect from "@/components/CustomSelect.vue";
import FieldErrorMessage from "@/components/FieldErrorMessage.vue";

export default {
  name: "SendEventForm",
  components: {
    CustomSelect,
    FieldErrorMessage
  },
  data() {
    return {
      errors: {
        workflowId: null,
      },
      workflowId: ""
    };
  },
  computed: {
    workflow_instances() {
      return [{ value: 0, text: "-- Choose an instance --" }].concat(
        this.$store.state.workflow_instances
          .filter(x => x.name === 'ReminderLoopWorkflow')
          .map(x => ({
            value: x.id,
            text: `${x.name} - ${x.id}`
          }))
      );
    }
  },
  methods: {
    submit(eventName) {
      if (!this.validateForm()) {
        return false;
      }

      this.$store.dispatch("sendEvent", {
        event: {
          name: eventName,
          data: []
        },
        workflowId: this.workflowId
      });
    },
    validateForm() {
      this.errors = {};

      if (this.workflowId == "") {
        this.errors.workflowId = "required";
      }

      return Object.keys(this.errors).length === 0;
    }
  }
};
</script>
