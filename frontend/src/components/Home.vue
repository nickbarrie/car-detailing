<template>
  <div>
    <main>
      <section id="hero" class="hero">
        <div class="hero-content">
          <h1>Welcome to Barrie Clean Car Detailing</h1>
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
          "This site is just to demonstrate full stack development skills. It is not a real business. If you really want to get your car detailed, I'll consider it though."
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

<style>
.hero {
  background-color: #f5f5f5;
  padding: 40px 20px;
  text-align: center;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.hero button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.hero button:hover {
  background-color: #1976d2;
}

.about,
.services-overview,
.testimonials {
  padding: 40px 20px;
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.testimonials blockquote {
  font-size: 1rem;
  margin-bottom: 20px;
}

.testimonials cite {
  display: block;
  margin-top: 10px;
  font-style: normal;
  color: #555;
}
</style>
