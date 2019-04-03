<template>
  <div>
    <b-button v-b-modal.modalLogin class="mb-md-2 mb-lg-0">
      <font-awesome-icon icon="sign-in-alt"/> Sign in
    </b-button>
    <b-modal
      id="modalLogin"
      ref="modalLogin"
      header-close-variant="light"
      title="Sign In"
      hide-footer
      centered
    >
      <login-form :modal="true" @exit="closeModal('modalLogin')"></login-form>

    </b-modal>
  </div>
</template>

<script>
import LoginForm from "./LoginForm.vue"

export default {
  name: 'LoginModal',
  components: {
    LoginForm
  }, 
  methods: {
    closeModal(modalRef) {
      this.$refs[modalRef].hide();
    }
  }
}
</script>


