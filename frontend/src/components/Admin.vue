<template>
  <div class="admin-container">
    <h1>Admin Dashboard</h1>

    <!-- Display the list of bookings -->
    <section v-if="bookings.length">
      <h2>Bookings</h2>
      <ul>
        <li v-for="booking in bookings" :key="booking.id">
          <span>{{ booking.name }} - {{ booking.service }} at {{ formattedTime(booking.time) }}</span>
          <button @click="deleteBooking(booking.id)">Delete</button>
        </li>
      </ul>
    </section>

    <!-- Block out time periods -->
    <section>
      <h2>Block Out Time Period</h2>
      <input type="datetime-local" v-model="blockStartTime" />
      <input type="datetime-local" v-model="blockEndTime" />
      <button @click="blockOutTimePeriod">Block Time</button>
    </section>

  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { fetchBookings, deleteBookingById, blockOutTime } from '../services/firestoreService';

export default {
  name: 'Admin',
  setup() {
    const bookings = ref([]);
    const blockStartTime = ref('');
    const blockEndTime = ref('');

    onMounted(async () => {
      bookings.value = await fetchBookings();
    });

    const deleteBooking = async (id) => {
      await deleteBookingById(id);
      bookings.value = bookings.value.filter(booking => booking.id !== id);
    };

    const blockOutTimePeriod = async () => {
      if (blockStartTime.value && blockEndTime.value) {
        await blockOutTime(blockStartTime.value, blockEndTime.value);
        alert('Time period blocked successfully!');
      } else {
        alert('Please select both start and end times.');
      }
    };

    const formattedTime = (timestamp) => {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    };

    return {
      bookings,
      blockStartTime,
      blockEndTime,
      deleteBooking,
      blockOutTimePeriod,
      formattedTime,
    };
  },
};
</script>

<style scoped>
.admin-container {
  padding: 20px;
}

h1, h2 {
  margin-bottom: 15px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
}

section {
  margin-bottom: 30px;
}
</style>
