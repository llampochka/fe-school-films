<template>
  <span>
    <b-button v-b-modal.modal2 class="ml-lg-2">
      <font-awesome-icon icon="user-plus"/> Register
    </b-button>

    <!-- Modal Component Register -->
    <b-modal id="modal2" title="Register" 
      header-close-variant="light"
      ok-title="Register" centered>
      <b-form>
        <b-form-group id="emailGroup" label="Email address:" label-for="email">
          <b-form-input
            id="email"
            type="email"
            v-model="form.email"
            required
            placeholder="Enter email"
          />
        </b-form-group>

        <b-form-group id="nameGroup" label="Your Name:" label-for="name">
          <b-form-input
            id="name"
            type="text"
            v-model="form.name"
            required
            placeholder="Enter name" />
        </b-form-group>

        <b-form-group id="pwdGroup" label="Your Password:" label-for="pwd">
          <b-form-input
            id="pwd"
            type="password"
            v-model="form.pwd"
            required
            placeholder="Enter password"
          />
        </b-form-group>

        <b-form-group id="pwdConfirmGroup" label="Confirm Password:" label-for="pwd2">
          <b-form-input
            id="pwd2"
            type="password"
            v-model="form.pwd"
            required
            placeholder="Confirm password"
          />
        </b-form-group>


      </b-form>
    </b-modal>
  </span>
</template>

<script>
export default {
  name: "RegisterModal",
  props: {},
  data() {
    return {
      form: {}
    };
  },
};
</script>



