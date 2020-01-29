<template>
  <div class="p-6">
    <InfoBox title="Book a place">
      <p class="mt-4">
        This workflow would be launched when a customer book a place.<br />
        Then a serie of reminders will be sent to him:
      </p>
      <ul class="list-disc mt-2 ml-6">
        <li>5 days before the date</li>
        <li>3 days before the date</li>
        <li>1 day before the date</li>
      </ul>
    </InfoBox>
    <div class="flex bg-white shadow-md rounded">
      <BookAPlaceForm />
    </div>
  </div>
</template>

<script>
import BookAPlaceForm from "@/components/BookAPlaceForm.vue";
import InfoBox from "@/components/InfoBox.vue";

export default {
  name: "BookAPlace",
  components: {
    BookAPlaceForm,
    InfoBox
      }
};
</script>
