const RequestHandler = {
  data(){
    return {
      updatingProcess: false
    }
  },
  methods: {
    handleRequestStart() {
      this.updatingProcess = true
    },
    handleRequestSuccess(msg) {
      this.flashMessage.success({
        title: "Success",
        message: msg
      })
    },
    handleRequestFailed(err) {
      this.flashMessage.error({
        title: "Error",
        message: err
      })
    },
    handleRequestFinished() {
      this.updatingProcess = false
    }
  }
}

export default RequestHandler