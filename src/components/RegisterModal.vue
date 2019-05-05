<template>
  <span>
    <b-button v-b-modal.modalRegister class="ml-lg-2">
      <font-awesome-icon icon="user-plus"/>&nbsp;Register
    </b-button>

    <!-- Modal Component Register -->
    <b-modal
      id="modalRegister"
      title="Register"
      hide-footer
      header-close-variant="light"
      ok-title="Register"
      centered
      ref="modalRegister"
    >
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="emailGroup" label="Email address:" label-for="email">
          <b-form-input
            id="email"
            type="email"
            v-model="form.email"
            required
            placeholder="Enter email"
          />
        </b-form-group>

        <b-form-group id="loginGroup" label-for="login">
          <label for="login">
            Login:
            <b-spinner small v-if="checkingUniqueLogin"></b-spinner>
          </label>
          <b-form-input
            id="login"
            type="text"
            v-model="form.login"
            required
            placeholder="Enter login"
            @change="checkUniqueLogin(form.login)"
            :state="fieldsStates.login"
          />

          <b-form-invalid-feedback
            v-if="serverValidationErrors.login"
          >{{ serverValidationErrors.login }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="nameGroup" label="Your Name:" label-for="name">
          <b-form-input
            id="name"
            type="text"
            v-model="form.name"
            required
            placeholder="Enter name"
          />
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
            v-model="form.pwd2"
            required
            placeholder="Confirm password"
          />
        </b-form-group>

        <footer class="form-footer form-footer-modal">
          <b-button type="reset" variant="secondary">Cancel</b-button>&nbsp;&nbsp;
          <b-button type="submit" variant="primary" :disabled="errors.any() || checkServerErrors()">
            <b-spinner v-if="updatingProcess" small></b-spinner>Submit
          </b-button>
        </footer>

      </b-form>
    </b-modal>
  </span>
</template>

<script>
import UserService from '@/services/UserService'
import RequestHandlers from "@/mixins/RequestHandlers"

export default {
  name: "RegisterModal",
  props: {},
  data() {
    return {
      form: {},
      checkingUniqueLogin: false,
      serverValidationErrors: {},
      fieldsStates: {
        login: null
      },
    }
  },
  mixins: [RequestHandlers],
  methods: {
    onSubmit(evt) {

      evt.preventDefault()

      this.$validator.validate().then(valid => {
        if (valid) {
          this.handleRequestStart()

          this.form.avatar = "/img/users/default.png"

          UserService.createOne(this.form)
            .then(() => {
              this.handleRequestSuccess("New user is created. Try to login with new credentials.")
              this.closeModal('modalRegister')
            })
            .catch((err) => {
              this.handleRequestFailed(err)
            })
            .finally(() => {
              this.handleRequestFinished()
              
            })
        }
      })

    },
    onReset(evt) {
      evt.preventDefault()
      this.closeModal('modalRegister')
    },
    checkUniqueLogin(login) {
      this.checkingUniqueLogin = true
      UserService.getOneByLogin(login)
        .then(() => {
          this.serverValidationErrors.login = "This login is already used"
          this.fieldsStates.login = false
        })
        .catch(() => {
          this.serverValidationErrors.login = null
          this.fieldsStates.login = true
        })
        .finally(() => {
          this.checkingUniqueLogin = false
        })
    },
    checkServerErrors() {
      Object.keys(this.fieldsStates).findIndex(fieldName => {
        return this.fieldsStates[fieldName] === false
      }) >= 0
    },
    validateState(ref) {

      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.errors.has(ref)
      }
      return null
    },
    closeModal(modalRef) {
      this.$refs[modalRef].hide()
    }
  }
};
</script>



