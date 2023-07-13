<script setup></script>

<template>
  <!-- ======= Hero Section ======= -->
  <section id="hero" class="col hero d-flex align-items-center section-bg">
    <div class="container">
      <div class="row justify-content-between gy-5">
        <div
          class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start"
        >
          <h2 data-aos="fade-up">
            Cherit <br />Din pasiune pentru oameni și gătit!
          </h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Sed autem laudantium dolores. Voluptatem itaque ea consequatur
            eveniet. Eum quas beatae cumque eum quaerat.
          </p>
          <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
            <RouterLink to="/menu" class="btn-book-a-table">Meniu</RouterLink>
            <a href="#" class="btn-watch-video d-flex align-items-center"
              ><i class="bi bi-play-circle"></i><span>Watch Video</span></a
            >
          </div>
        </div>
        <div class="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
          <img
            src="http://cherit.test/img/aluat.jpg"
            class="img-fluid rounded border border-grey border-3"
            alt="Home image"
            data-aos="zoom-out"
            data-aos-delay="300"
          />
        </div>
      </div>
    </div>
  </section>
  <!-- End Hero Section -->
</template>
