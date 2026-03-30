<template>

  <div>
    <main>
      <section id="hero" class="hero">
        <div class="hero-content">
          <h1>Welcome to Barrie Clean Detailing</h1>
          <p>Your car deserves the best care. Experience our premium detailing services today!</p>
          <button @click="bookAppointment">Book an Appointment</button>
        </div>
      

      <section id="about" class="about">
        <h2>About Us</h2>
        <p>
          At Barrie Clean Car Detailing, we are dedicated to providing top-notch car care services.
          Our team of experts uses the latest techniques and eco-friendly products to ensure your car looks as good as
          new.
        </p>
      </section>

      <section id="services-overview" class="services-overview">
        <h2>Our Services</h2>
        <ul>
          <li>Exterior Wash</li>
          <li>Interior Cleaning</li>
          <li>Full Detail</li>
        </ul>
        <button @click="viewServices">View All Services</button>
      </section>

    </section>
      <section id="testimonials" class="testimonials">
        <h2>Customer Testimonials</h2>
        <blockquote>
          "This site is just to demonstrate full stack development. It is not a real business. If you really want to get your car detailed, I'll consider it."
          <cite> - Nick Barrie.</cite>
        </blockquote>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    bookAppointment() {
      this.$router.push('/calendar');
    },
    viewServices() {
      this.$router.push('/service');
    }
  }
};
</script>

