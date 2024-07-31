<template>
  <div>


    <main>
      <section id="services">
        <h2>Our Services</h2>
        <div v-for="(service, index) in services" :key="index" class="service">
          <img :src="service.imageSrc" :alt="service.title" />
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </section>
    </main>

    <footer>
      <p>&copy; 2024 Car Detailing Services</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [
        {
          imageSrc: '/sponge.png',
          title: 'Exterior Wash',
          description: 'Get your car looking shiny and new with our comprehensive exterior wash service.'
        },
        {
          imageSrc: '/vaccum.png',
          title: 'Interior Cleaning',
          description: 'Keep the inside of your car spotless with our interior cleaning service.'
        },
        {
          imageSrc: '/cleaningSet.png',
          title: 'Full Detail',
          description: 'Experience a complete car makeover with our full detail package.'
        }
      ]
    };
  }
}
</script>

