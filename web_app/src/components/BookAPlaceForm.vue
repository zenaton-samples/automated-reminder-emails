<template>
  <form @submit="submit" class="px-8 pt-6 pb-8">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
        >Email</label
      >
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        placeholder="Event name. ex: MyEvent"
        v-model="booking.email"
      />
      <FieldErrorMessage :error="errors.email" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="date"
        >Date</label
      >
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="date"
        type="date"
        min="minDate"
        v-model="booking.date"
      />
      <FieldErrorMessage :error="errors.date" />
    </div>

    <button v-on:click="submit" type="submit">Book</button>
  </form>
</template>

<script>
import moment from "moment";
import FieldErrorMessage from "../components/FieldErrorMessage.vue";

export default {
  name: "BookAPlaceForm",
  components: {
    FieldErrorMessage
  },
  data() {
    return {
      errors: {
        name: null,
      },
      booking: {
        email: "john@example.com",
        date: moment()
          .add(14, "days")
          .format("YYYY-MM-DD")
      }
    };
  },
  computed: {
    minDate() {
      return moment()
        .add(7, "days")
        .format("YYYY-MM-DD");
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();

      if (!this.validateForm()) {
        return false;
      }

      this.$store.dispatch("dispatchWorkflow", {
        name: "BookAPlaceWorkflow",
        input: { ...this.booking }
      });
    },
    validateForm() {
      this.errors = {};
      if (this.email == "") {
        this.errors.email = "required";
      }

      if (this.date == "") {
        this.errors.date = "required";
      }

      return Object.keys(this.errors).length === 0;
    }
  }
};
</script>
