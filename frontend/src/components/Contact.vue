<!-- src/components/Contact.vue -->
<template>
  <div>
    <h2>Contact Us</h2>
    <form @submit.prevent="submitForm" >
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <button type="submit">Submit</button>
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
      message: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.name, email: this.email })
        });

        if (response.ok) {
          this.message = `Thank you for contacting us, ${this.name}!`;
          this.name = '';
          this.email = '';
        } else {
          this.message = 'Failed to submit the form. Please try again.';
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        this.message = 'An error occurred. Please try again.';
      }
    }
  }
}
</script>
