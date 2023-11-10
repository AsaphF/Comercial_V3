<template>
  <form @submit.prevent="doReset()" class="form-login">
    <div class="container-fluid">
      <div class="row">
        <div class="card col-lg-4 col-md-12 col-sm-12">
          <div class="card-header">
            <!-- <img class="img-fluid" src="../../assets/images/logo-color-3x.png"> -->
            <h2>Esqueceu a senha ?</h2>
            <p>Preencha o campo abaixo com o e-mail de acesso, para solicitar sua nova senha.</p>
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
            <button class="btn btn-primary w-100" :disabled='loading'>
              <template v-if="loading">
                <i class="fas fa-circle-notch fa-spin"></i>
              </template>
              <template v-else>
                Solicitar nova senha
              </template>
            </button>
            <div class="btn-link"><router-link to="/register">Ainda não tenho conta Emissão Simples</router-link></div>
            <div><router-link class="btn-link" to="/login">Lembrei da minha senha</router-link></div>
          </div>
        </div>
        <div class="right-side col-0 col-lg-8">
          <img class="img-fluid" src="../../assets/images/logo-white-1x.png">
          <div>
            <h5 class="title">Não perca mais tempo com a emissão de guias</h5>
            <h5 class="subtitle">O Emissão Simples veio pra automatizar ainda mais a sua contabilidade, abra já a sua conta em nosso novo sistema.</h5>
          </div>
        </div>
      </div>
      <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
        <div class="modal-dialog modal-dialog-centered" role="dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Redefinição de senha solicitada</h4>
            </div>
            <div class="modal-body">
              <p>Foi enviado um e-mail para o endereço {{email}}, para que a senha da sua conta Simples seja redefinida.</p>
              <h5>Muito Obrigado!</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="$router.push({ name: 'login' })">Voltar para página de login</button>
              </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}"></div>
      <div v-if="status.info" class="alert text-center" :class="status.color" role="alert">
        {{status.info}}
      </div>
    </div>
  </form>
</template>

<script>

export default {
  name: 'Password',
  data: () => {
    return {
      showModal: false,
      loading: false,
      email: '',
      status: {
        info: '',
        color: ''
      }
    }
  },
  methods: {
    async doReset () {
      this.loading = true
      this.$firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        this.showModal = true
      }).catch(err => {
        this.status = {
          info: 'Conta Emissão Simples não encontrada',
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
      })
      setTimeout(() => {
        this.loading = false
      }, 2000)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
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
    img{
      margin: 0 auto;
      width: 213px;
      height: 100px;
    }
  }
  .card {
    height: 100vh;
    border: none;
    padding-top: 16vh;
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
.modal-dialog{
  max-width: 550px !important;
}

.modal-content{
  box-shadow: 0px 0px 8px 6px rgba(0,0,0,0.1);

  .modal-header, .modal-footer{
    border: none !important;
  }

  .modal-body{
    padding-top: 0;
  }

  .nav-tabs {
      border-bottom: none !important;
      cursor: pointer;
  }

  .nav-tabs .nav-item {
    width: 50%;
    margin-bottom: 0px;
    border: none !important;
    text-align: center;
    color: var(--featured);
    font-weight: 500;

    &.active{
      border-bottom: var(--featured) solid 5px !important;
    }
  }
  h4, h5{
    font-weight: 700;
  }
  h5{
    font-size: 15px;
  }
  .form-group{
    margin: 7px 0;
  }
}
</style>
