<template>
  <div>
    <h2 class="text-center">Login</h2>
    <hr>
    <b-alert v-if="error" show variant="danger">{{ error + '' }}</b-alert>
    <b-alert show v-show="$auth.$state.redirect">
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center" align-v="center">
      <b-col md="4">
        <b-card bg-variant="light">
          <busy-overlay/>
          <form @keydown.enter="login">
            <b-form-group label="Email">
              <b-input v-model="email" placeholder="email" ref="email"/>
            </b-form-group>

            <b-form-group label="Password">
              <b-input type="password" v-model="password" placeholder/>
            </b-form-group>

            <div class="text-center">
              <b-btn @click="login" variant="primary" block>Login</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.login-button {
  border: 0;
}
</style>

<script>
import busyOverlay from '~/components/busy-overlay'
export default {
  middleware: ['auth'],
  components: { busyOverlay },
  data() {
    console.debug(process.env.API_URL) //eslint-disable-line

    return {
      email: '',
      password: '',
      error: null
    }
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    }
  },
  methods: {
    login() {
      // eslint-disable-next-line
      console.debug('Pressed login '+process.env.baseUrl)
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        // .then(() => (this.error = this.$auth.user))
        .catch(e => {
          this.error = e + ''
        })
    }
  }
}
</script>
