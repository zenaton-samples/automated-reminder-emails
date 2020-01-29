<template>
  <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <router-link to="/"
        ><span class="font-semibold text-xl tracking-tight"
          >WebApp</span
        ></router-link
      >
    </div>
    <div class="block flex-grow flex items-center w-auto">
      <div class="text-sm flex-grow">
        <router-link
          class="block mt-4 inline-block mt-0 text-blue-200 hover:text-white mr-4"
          to="/examples/reminder-loop"
          ><b>Ex 1</b><br />Reminder loop</router-link
        >
        <router-link
          class="block mt-4 inline-block mt-0 text-blue-200 hover:text-white mr-4"
          to="/examples/book-a-place"
          ><b>Ex 2</b><br />Book a place</router-link
        >
      </div>
    </div>
  </nav>
</template>
