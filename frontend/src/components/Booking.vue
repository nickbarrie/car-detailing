<template>
  <div>
    <h2>Book an Appointment</h2>
    <form @submit.prevent="submitBooking">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="date">Date:</label>
      <input type="date" id="date" v-model="date" required />

      <label for="time">Time:</label>
      <input type="time" id="time" v-model="time" required />

      <label for="Service">Service:</label>
      <select id="Service" v-model="selectedService" required>
        <option v-for="service in services" :key="service" :value="service">
          {{ service }}
        </option>
      </select>

      <button type="submit">Book Now</button>
    </form>

    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      date: '',
      time: '',
      selectedService: '', // To hold the selected service
      services: [ // Example static services
        'Full Detailing',
        'Interior Detailing',
        'Exterior Detailing'
      ],
      message: ''
    };
  },
  methods: {
    async submitBooking() {
      try {
        const response = await fetch('/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            date: this.date,
            time: this.time,
            service: this.selectedService // Include selected service in request body
          })
        });

        if (response.ok) {
          this.message = 'Booking successful!';
          this.name = '';
          this.email = '';
          this.date = '';
          this.time = '';
          this.selectedService = ''; // Reset the service selection
        } else {
          this.message = 'Booking failed. Please try again.';
        }
      } catch (error) {
        this.message = 'Error: ' + error.message;
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
