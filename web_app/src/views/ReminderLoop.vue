<template>
  <div class="p-6">
    <InfoBox title="Reminder loop">
      <p class="mt-4">
        This workflow would be launched when a customer apply on your website.
      </p>
      <p class="mt-4">
        Then, the customer is supposed to achieve two sequential steps.<br/>
        Each of this step, once completed, would <b>send events</b> to a workflow instance dedicated to this given customer.<br/>
        We will call those event <b>Event A</b>, and then <b>Event B</b>.
      </p>
      <p class="mt-4">
        To encourage the customer to go througt the whole process,
        for each step, the workflow will send him a maximum of
        <b>3 reminders</b> spaced in time by <b>10 seconds</b>.
      </p>
    </InfoBox>

    <div class="flex bg-white shadow-md rounded">
      <ReminderLoopForm />
    </div>

    <div class="mt-6 flex bg-white shadow-md rounded">
      <send-event-form />
    </div>
  </div>
</template>

<script>
import ReminderLoopForm from "@/components/ReminderLoopForm.vue";
import SendEventForm from "@/components/SendEventForm.vue";
import InfoBox from "@/components/InfoBox.vue";

export default {
  name: "Home",
  components: {
    ReminderLoopForm,
    SendEventForm,
    InfoBox
  }
};
</script>
