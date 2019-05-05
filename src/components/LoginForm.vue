<template>

  <div>
    <b-form  @submit="onSubmit" @reset="onReset">
      <b-form-group id="loginGroup" label="Login:" label-for="login">
        <b-form-input
          id="login"
          v-model="form.login"
          required
          :state="fieldsStates.login"
          placeholder="Enter login"
        />
        <b-form-invalid-feedback id="login">
          {{ errors.login }}
        </b-form-invalid-feedback>
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

      <footer class="form-footer" :class="{ 'form-footer-modal': modal }">
        <b-button type="reset" variant="secondary">{{ resetText }}</b-button>&nbsp;&nbsp;
        <b-button type="submit" variant="primary">Submit</b-button>        
      </footer>      

    </b-form>

  </div>
</template>

<script>

export default {
  name: 'LoginForm',
  props: {
    modal: Boolean,
    refs: Object
  },
  data(){
    return {
      form: {},
      fieldsStates: {
        login: null
      }
    }
  },
  computed: {
    resetText() {
      return this.modal ? 'Cancel' : 'Reset'
    }
  },
  methods: {
      onSubmit(evt) {

        evt.preventDefault()
        const user = this.form

        this.$store.dispatch('logIn', user)
          .then(
            () => {
              if(this.modal){
                // close parent modal
                this.$emit('exit', true)
              } else {
                this.$router.push('/')
              }            
            }
          )
          .catch(          
            err => {        
              this.errors.login = err
              this.fieldsStates.login = false
            }
          )

      },
      onReset(evt) {
        if(this.modal){
          evt.preventDefault()
          // close parent modal
          this.$emit('exit', true)
        }
      }
    }
}
</script>


