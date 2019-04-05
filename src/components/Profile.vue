<template>
  <div class="profile">
    <h1>My profile</h1>
    <FlashMessage></FlashMessage>

    <b-form @submit="onSubmit">
      <b-row>
        <b-col lg="4">
          <img :src="user.avatar" width="300" height="300" class="profile__avatar"/>
        </b-col>
        <b-col lg="5">
          <p>ID: {{ user.id }}</p>
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="user.name"
              type="text"
              required
              placeholder="Enter your name"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Upload new photo:" label-for="input-2">
            <b-form-file
              v-model="file"
              placeholder="Choose a file..."
              drop-placeholder="Drop file here..."
              @change="onFileChange"
            ></b-form-file>
          </b-form-group>

          <footer class="form-footer">
            <b-button type="submit" variant="primary">Update your data</b-button>     
          </footer>   
          
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import UserService from "../services/UserService"

export default {
  name: "Profile",
  data() {
    return {
      file: null,
      image: null,
      user: {}
    };
  },
  created: function() {

    const userID = localStorage.getItem('user_id')

    if(userID){
        return UserService.getOne(userID)
            .then( user => {          
              this.user = user  
            })
            .catch(err => {
              this.flashMessage.error({
                title: 'Error', 
                message: err
              })
            })
    } 
        
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.user.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onSubmit(e) {
      e.preventDefault();
      UserService.saveOne(this.user)
        .then(user => {
          this.$store.dispatch("updateCurrentUser", user)
          this.flashMessage.success({
                title: 'Success', 
                message: 'Your profile is updated'
              })
        })
        .catch(err => {
          this.flashMessage.error({
                title: 'Error', 
                message: err
              })
        });
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  }
};
</script>

<style>
.profile__avatar {
  border-radius: 5px
}
</style>

