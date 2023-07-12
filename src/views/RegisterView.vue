<template>
  <section id="contact" class="col contact">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <p class="mt-2">Register</p>
      </div>

      <form class="php-email-form p-3 p-md-4">
        <div class="row">
          <div class="col-xl-6 form-group">
            <input
              type="text"
              name="name"
              class="form-control"
              id="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div class="col-xl-6 form-group">
            <input
              type="text"
              name="phone"
              class="form-control"
              id="phone"
              placeholder="Phone number"
              required
            />
          </div>
          <div class="col-xl-6 form-group">
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
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            name="password"
            id="password1"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            name="password"
            id="password2"
            placeholder="Password"
            required
          />
        </div>
        <div class="my-3">
          <div class="loading">Loading</div>
          <div class="error-message"></div>
          <div class="sent-message">Your message has been sent. Thank you!</div>
        </div>
        <div class="text-center"><button type="submit">Register</button></div>
      </form>
    </div>
  </section>
</template>
