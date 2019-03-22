<template>
  <div>
    <b-form @submit="onSubmitInternal" @reset="onReset">
      <b-form-group id="emailGroup" label="Email address:" label-for="email">
        <b-form-input
          id="email"
          type="email"
          v-model="form.email"
          required
          placeholder="Enter email" />
      </b-form-group>

      <b-form-group id="pwdGroup" label="Your Password:" label-for="pwd">
        <b-form-input
          id="pwd"
          type="password"
          v-model="form.pwd"
          required
          placeholder="Enter password" />
      </b-form-group>

      loggedIn = {{ loggedIn }}

      <div v-if="showFooterBtns" class="w-100 text-right">
        <b-button type="submit" variant="primary" right>Submit</b-button>
        <b-button type="reset" variant="secondary" right>Reset</b-button>
      </div>

    </b-form>
  </div>
</template>

<script>

import AuthService from '../services/AuthService';

const AppAuthService = new AuthService();

  export default {
    name: "SignIn",
    props: {
      msg: String,
      loggedIn: {
        default: false,
        type: Boolean
      },
      showFooterBtns: {
        default: true,
        type: Boolean
      },
      onSubmit: {
        default: null,
        type: Function
      }
    },
    data() {
      return {
        form: {
          email: '',
          pwd: ''
        }
      }
    },
    methods: {
      onSubmitInternal(evt) {
        if(this.onSubmit != null){
          return this.onSubmit();
        } else {
          evt.preventDefault()
          this.loggedIn = true;
          AppAuthService.login();
        }        
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.email = ''
        this.form.pwd = ''
         /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>


