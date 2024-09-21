<template>
  <div>
    <b-carousel>
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <section class="hero is-medium">
          <div class="hero-body">
            <div class="carousel-image-container">
              <img
                :src="carousel.image"
                :alt="`Slide ${i + 1}`"
                class="carousel-image"
              />
            </div>
          </div>
        </section>
      </b-carousel-item>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousels: [
        {
          image: "/images/Banner_1.jpg",
        },
        {
          image: "/images/Banner_2.jpg",
        },
        {
          image: "/images/Banner_3.jpg",
        },
        {
          image: "/images/Banner_4.png",
        },
      ],
    };
  },
};
</script>

<style src="../styles/components/carousel.css" scoped></style>
