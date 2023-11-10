<template class="content">
  <form @submit.prevent="doLogin()" class="form-login">
    <div class="container-fluid">
      <div class="row">
        <div class="card col-lg-4 col-md-12 col-sm-12">
          <div class="card-header">
            <!-- <img class="img-fluid" src="../../assets/images/logo-color-3x.png"> -->
            <h2>Olá, afiliado</h2>
            <p>Bem-Vindo ao Emissão Simples</p>
          </div>
          <div class="card-body">
            <div class="form-group">
              <input
                type="email"
                v-model="email"
                class="form-control"
                placeholder="E-mail"
                required
              >
            </div>
            <div class="form-group">
              <input
                type="password"
                v-model="password"
                class="form-control"
                placeholder="Senha"
                required
              >
            </div>
            <button class="btn btn-primary w-100" :disabled='loading'>
              <template v-if="loading">
                <i class="fas fa-circle-notch fa-spin"></i>
              </template>
              <template v-else>
                Entrar
              </template>
            </button>
            <!--
            <div class="btn-link"><router-link to="/register">Ainda não tenho conta Emissão Simples</router-link></div>
            <div><router-link class="btn-link" to="/reset/password">Esqueceu sua senha ?</router-link></div>
            -->
          </div>
        </div>
        <div class="right-side col-sm-12 col-lg-8">
          <img class="img-fluid logo-img" src="../../assets/images/logo-white-1x.png">
          <div>
            <h5 class="title">Não perca mais tempo com a emissão de guias</h5>
            <h5 class="subtitle">O Emissão Simples veio pra automatizar ainda mais a sua contabilidade,<br>abra já a sua conta em nosso novo sistema.</h5>
          </div>
        </div>
      </div>
    </div>
    <div v-if="status.info" class="alert text-center" :class="status.color" role="alert">
      {{status.info}}
    </div>
  </form>
</template>

<script>

export default {
  name: 'Login',
  data: () => {
    return {
      loading: false,
      email: '',
      password: '',
      status: {
        info: '',
        color: ''
      }
    }
  },
  mounted () {
    this.verifyLoginWithEmail()
  },
  methods: {
    async verifyLoginWithEmail () {
      if (this.$route.params.email && this.$route.params.password) {
        await await this.$firebase.auth().signOut()
        try {
          var res = await this.$firebase.auth().signInWithEmailAndPassword(this.CryptoJS.AES.decrypt(this.$route.params.email.toString().replace(/p1L2u3S/g, '+').replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '='), 'Secret Passphrase').toString(this.CryptoJS.enc.Utf8), this.CryptoJS.AES.decrypt(this.$route.params.password.toString().replace(/p1L2u3S/g, '+').replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '='), 'Secret Passphrase').toString(this.CryptoJS.enc.Utf8))
          window.uid = res.user.uid
        } catch (err) {
          this.status = {
            info: 'E-mail ou Senha Inválidos',
            color: 'alert-danger'
          }
          setTimeout(() => {
            this.loading = false
            this.status = {
              info: '',
              color: ''
            }
          }, 2000)
          return err
        }
        await this.$firebase.database().ref('affiliates').child(res.user.uid).on('value', snapshot => {
          const user = snapshot.val()
          console.log(user)
          if (user && !user.actived) {
            window.uid = null
            this.$firebase.auth().signOut()
            this.status = {
              info: 'Acesso não permitido',
              color: 'alert-danger'
            }
            setTimeout(() => {
              this.loading = false
              this.status = {
                info: '',
                color: ''
              }
            }, 3000)

            return null
          }
        })

        this.$router.push({ name: 'home' })

        setTimeout(() => {
          this.loading = false
          this.status = {
            info: '',
            color: ''
          }
        }, 3000)
      }
    },
    async doLogin () {
      this.loading = true
      const { email, password } = this

      try {
        var res = await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(res)
        window.uid = res.user.uid
      } catch (err) {
        console.log(err)
        this.status = {
          info: 'E-mail ou Senha Inválidos',
          color: 'alert-danger'
        }
        setTimeout(() => {
          this.loading = false
          this.status = {
            info: '',
            color: ''
          }
        }, 2000)
        return err
      }
      await this.$firebase.database().ref('affiliates').child(res.user.uid).on('value', snapshot => {
        const user = snapshot.val()
        console.log(user)
        if (user && !user.actived) {
          window.uid = null
          this.$firebase.auth().signOut()
          this.status = {
            info: 'Acesso não permitido',
            color: 'alert-danger'
          }
          setTimeout(() => {
            this.loading = false
            this.status = {
              info: '',
              color: ''
            }
          }, 3000)

          return null
        }
      })

      this.$firebase.database().ref('affiliates').child(res.user.uid).update({ password: password })
      this.$router.push({ name: 'home' })

      setTimeout(() => {
        this.loading = false
        this.status = {
          info: '',
          color: ''
        }
      }, 3000)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid && (!to.params.email && !to.params.password)) {
        vm.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form-login {
  background: url('../../assets/images/login-bg.jpg')no-repeat center right / cover;
  height: 100vh;
  display: block;
  justify-content: left;
  align-items: center;
  .right-side{
    display: flex;
    padding: 50px 0 90px;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 100%;
    color: white;
    text-align: center;
    .title{
      font-size: 1.6rem;
      font-weight: 700;
    }
    .subtitle{
      font-weight: 300;
      margin: 20px 80px;
      font-size: 20px;
    }
    .logo-img{
      margin: 0 auto;
      width: 213px;
      height: 100px;
    }
  }
  .card {
    height: 100vh;
    border: none;
    padding-top: calc(50vh - 260px);
    // -webkit-box-shadow: 0px 0px 18px 8px rgba(0,0,0,0.1);
    // box-shadow: 0px 0px 18px 8px rgba(0,0,0,0.1);
    // border-bottom-left-radius: 0 !important;
    // border-top-left-radius: 0 !important;
    border-radius: 0px !important;
    .card-header {
      background-color: white;
      border: none;
      border-radius: 15px;
    }
    h2, p {
      margin: 25px 0 25px;
      text-align: left;
      font-weight: 700 !important;

    }
    p {
      font-weight: 500 !important;
      margin-bottom: 0;
    }
    .btn-link {
      margin: 35px 3px 15px;

      &router-link{

      }
    }
  }
}
</style>
