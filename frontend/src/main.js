const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      services: [
        {
          imageSrc: 'images/sponge.png',
          title: 'Exterior Wash',
          description: 'Get your car looking shiny and new with our comprehensive exterior wash service.'
        },
        {
          imageSrc: 'images/service2.jpg',
          title: 'Interior Cleaning',
          description: 'Keep the inside of your car spotless with our interior cleaning service.'
        },
        {
          imageSrc: 'images/service3.jpg',
          title: 'Full Detail',
          description: 'Experience a complete car makeover with our full detail package.'
        }
      ],
      name: '',
      email: '',
      message: ''
    };
  },
  methods: {
    submitForm() {
      // Handle form submission
      this.message = `Thank you for contacting us, ${this.name}!`;
    }
  },
  template: `
    <div>
      <header>
        <h1>Barrie clean Car Detailing Services</h1>
        <nav>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="services">
          <h2>Our Services</h2>
          <div v-for="(service, index) in services" :key="index" class="service">
            <img :src="service.imageSrc" :alt="service.title" />
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </section>

        <section id="contact">
          <h2>Contact Us</h2>
          <form @submit.prevent="submitForm">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required />
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
            <input type="submit" value="Submit" />
          </form>
          <p>{{ message }}</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Car Detailing Services</p>
      </footer>
    </div>
  `
});

app.mount('#app');
