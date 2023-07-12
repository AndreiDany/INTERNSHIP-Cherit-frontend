<template>
  <section id="contact" class="col contact">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <p class="mt-2">Login</p>
      </div>

      <form class="php-email-form p-3 p-md-4">
        <div class="row">
          <div class="col form-group">
            <input
              type="email"
              class="form-control"
              name="email"
              id="email"
              placeholder="Your Email"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div class="my-3">
          <div class="loading">Loading</div>
          <div class="error-message"></div>
          <div class="sent-message">Your message has been sent. Thank you!</div>
        </div>
        <div class="text-center"><button type="submit">Login</button></div>
      </form>
    </div>
  </section>
</template>
