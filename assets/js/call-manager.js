export default async (instance, action, actionParam, successMsg, errorMsg) => {
  // instance.$nuxt.$loading.start()

  try {
    // eslint-disable-next-line
    console.log('Call Manager')
    await instance.$store.dispatch(action, actionParam)
    if (successMsg != null) {
      instance.$toast.success(successMsg)
    }
    // eslint-disable-next-line
    console.log('Call Manager SUcesso')
  } catch (error) {
    // eslint-disable-next-line
    console.log('Call Manager erro')
    if (errorMsg == null) {
      errorMsg = 'Ups...desculpe mas algo correu mal!!!! ' + error.message
    }
    instance.$toast.error(errorMsg)
  }
  // instance.$nuxt.$loading.finish()
}
