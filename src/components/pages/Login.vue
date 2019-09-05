<template>
  <div class="b-login">
    <div class="b-login__inner">

      <div class="b-login__description">
        <h1>p1.Ptah</h1>
        <p>
          Ptah is a free, powerful and open source Web Builder Framework helping you to fast create modern cross
          browser landing pages for the games and e-commerce. Mainly Ptah designed to be used as a separate product
          or like edit component inside CMS to speed up the creation of landing pages.
        </p>

        <div class="b-login__github">
          <a href="https://github.com/ProtocolONE/storefront" target="_blank">
            <img src="https://gn91.cdn.stg.gamenet.ru/0/7nKD8/o_yOEML.png" alt="Github">
          </a>
        </div>

        <p></p>
      </div>

      <div class="b-login__form">
        <div class="b-login__already" v-if="alreadyLogged">
          You are already authorized <br>
          <router-link to="/dashboard">Go to dashboard</router-link>
        </div>
        <iframe :src="frameSrc" frameborder="none" width="100%" height="100%"></iframe>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',

  data () {
    return {
      alreadyLogged: false
    }
  },

  computed: {
    frameSrc () {
      return `${window.location.protocol}//${window.location.hostname}/auth1/login`
    }
  },

  created () {
    this.listenFrame()
  },

  methods: {
    ...mapActions('User', ['setToken', 'logout']),

    listenFrame () {
      window.addEventListener('message', (e) => {
        let data = {}

        try {
          data = JSON.parse(e.data)
        } catch (e) { }

        if (data.access_token && data.success) {
          this.setToken(data.access_token)
          this.$router.push({ path: `/dashboard` })
        }

        // the client has lost the token
        // logout & reload
        if (data.error === 'user-already-logged') {
          if (localStorage.getItem('token') !== null) {
            this.alreadyLogged = true
          } else {
            this.logout()
            setTimeout(() => {
              window.location.reload()
            }, 500)
          }
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.b-login
  background: $dark-blue
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center

  &__inner
    height: 50rem
    width: 80rem
    display: flex

    &> div
      flex-basis: 50%
  &__description
    color: rgba($white, .8)
    padding-right: 3rem

    p
      font-size: 1.5rem
      line-height: 1.6
      margin: 0
      padding: 1rem 0

    h1
      font-size: 4.8rem
      color: $white

  &__github
    width: 5rem
    height: 5rem
    border-radius: 50%
    margin-top: 3rem

    img
      max-width: 100%

  &__already
    color: #FFFFFF
    font-size: 1.7rem
    line-height: 2.6rem
    a
      font-size: 3rem
      color: $emerald-green
      text-decoration: none
      &:hover
        text-decoration: underline

iframe
  border: none
  outline: none
</style>
