<template>
  <div>
    <vue-cal :views="['Month', 'Week', 'Day']" @cell-click="handleCellClick" :events="events" :time-from="9 * 60"
      :time-to="21 * 60"></vue-cal>

    <div>
      <h2>Book an Appointment</h2>
      <form @submit.prevent="submitBooking">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />

        <label for="Service">Service:</label>
        <select id="Service" v-model="selectedService" required>
          <option v-for="service in services" :key="service" :value="service">
            {{ service }}
          </option>
        </select>

        <p v-if="time">Selected Time: {{ formatTime(time) }}</p>

        <button type="submit">Book Now</button>

        <p>{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { addBooking, fetchBookings } from '../services/firestoreService';

export default {
  components: {
    VueCal
  },
  data() {
    return {
      name: '',
      email: '',
      time: '',
      selectedService: '',
      services: [
        'Full Detailing',
        'Interior Detailing',
        'Exterior Detailing'
      ],
      message: '',
      events: []
    };
  },
  methods: {
    formatTime(time) {
      const date = new Date(time);
      return date.toLocaleString(); // Adjust this to your desired format
    },

    handleCellClick(day, event) {
      if (event === undefined) {
        // console.log('Cell clicked:', day);
        this.time = this.roundToNearest15Minutes(day);
      } else {
        //console.log('Event clicked:', event);
      }
    },
    roundToNearest15Minutes(date) {
      const minutes = 15;
      const ms = 1000 * 60 * minutes;
      return new Date(Math.round(date.getTime() / ms) * ms);
    },


    async submitBooking() {
      try {
        if (this.time === '') {
          this.message = 'Please select a time slot.';
          return;
        }
        await addBooking(this.name, this.email, this.time, this.selectedService);
        this.message = 'Booking successful!';
        this.name = '';
        this.email = '';
        this.time = '';
        this.selectedService = '';
        this.fetchBookings(); // Refresh bookings after successful booking
      } catch (error) {
        this.message = 'Error: ' + error.message;
      }
    },


    
    async fetchBookings() {
      const serviceDurations = {
      'Full Detailing': 180,
      'Exterior Detailing': 120,
      'Interior Detailing': 90,
    };
      try {
        const response = await fetchBookings();
        this.events = response.map(event => {
        const startTime = new Date(event.time.seconds * 1000); // Convert timestamp
        const duration = serviceDurations[event.service] || 60; // Get duration or default
        const endTime = new Date(startTime.getTime() + duration * 60000); // Calculate end time

        return {
          title: event.service,
          start: startTime,
          end: endTime
        };
      });
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  },
  async mounted() {
    await this.fetchBookings();
  }
};
</script>

<style></style>