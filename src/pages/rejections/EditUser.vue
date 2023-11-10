<template>
  <div>
    <div class="button-container">
      <span>Editar Cliente</span>
      <button class="btn-action"  @click="initialChanges()"><i class="fas fa-user-edit"></i></button>
    </div>
    <transition name="fade">
      <div v-if="showModal" class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
        <div class="modal-dialog " role="dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Editar Cliente</h4>
              <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <form @submit.prevent="EditCustomer()">
              <div class="modal-body" v-if="user.documentType">
                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link" :class="[user.documentType === 'cnpj' ? 'active' : '']">Jurídica</a>
                    <a class="nav-item nav-link" :class="[user.documentType === 'cpf' ? 'active' : '']">Física</a>
                  </div>
                </nav>
                <h5 class="mb-2 mt-3">Informações do Cliente</h5>
                <div class="form-group" v-if="user.documentType == 'cnpj'">
                  <p class="mb-0 font-weight-bold">CNPJ</p>
                  <div class="input-group">
                    <input
                      type="cnpj"
                      v-model="user.documentNumber"
                      class="form-control input-body"
                      placeholder="CNPJ da Empresa"
                      v-mask="'##.###.###/####-##'"
                      required
                    >
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroupPrepend2" @click="autoInfoRequest()">
                        <template v-if="infoLoading">
                          <i class="fas fa-circle-notch fa-spin"></i>
                        </template>
                        <template v-else>
                          <i class="fa fa-search"></i>
                        </template>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group" v-if="user.documentType == 'cpf'">
                  <p class="mb-0 font-weight-bold">CPF do Cliente</p>
                  <div class="input-group">
                    <input
                      type="cnpj"
                      v-model="user.documentNumber"
                      class="form-control input-body"
                      placeholder="CPF do Cliente"
                      v-mask="'###.###.###-##'"
                      required
                    >
                  </div>
                </div>
                <div class="form-group">
                  <p class="mb-0 font-weight-bold">Razão Social | Nome do Cliente</p>
                  <input
                    type="name"
                    v-model="user.name"
                    class="form-control input-body"
                    placeholder="Razão Social"
                    required
                    style="text-transform:uppercase"
                  >
                </div>
                <div class="form-group">
                  <p class="mb-0 font-weight-bold">Nome Fantasia</p>
                  <input
                    type="name"
                    v-model="user.fantasia"
                    class="form-control input-body"
                    placeholder="Nome Fantasia"
                    required
                  >
                </div>
                <div class="form-group">
                  <p class="mb-0 font-weight-bold">Celular</p>
                  <input
                    type="phone"
                    v-model="user.phone"
                    class="form-control input-body"
                    placeholder="Celular do Responsável"
                    v-mask="user.phone.length >= 15 ? '(##) #####-####' : '(##) ####-####'"
                    minlength="14"
                    required
                  >
                </div>
                <div class="container-flex">
                  <div class="row">
                    <div class="form-group col-4">
                      <p class="mb-0 font-weight-bold">Estado</p>
                      <input
                        type="uf"
                        v-model="user.uf"
                        class="form-control input-body"
                        placeholder="UF"
                        v-mask="'AA'"
                        style="text-transform:uppercase"
                        required
                      >
                    </div>
                    <div class="form-group col-8 pl-0">
                      <p class="mb-0 font-weight-bold">Município</p>
                      <input
                        autocomplete="false"
                        type=""
                        v-model="user.city"
                        class="form-control input-body"
                        placeholder="Município"
                        required
                      >
                    </div>
                  </div>
                </div>
                <div class="container-flex">
                  <div class="row">
                    <div class="form-group col-10">
                      <p class="mb-0 font-weight-bold">Rua</p>
                      <input
                        type="uf"
                        v-model="user.street"
                        class="form-control input-body"
                        placeholder="Rua"
                        required
                      >
                    </div>
                    <div class="form-group col-2 pl-0">
                      <p class="mb-0 font-weight-bold">N°</p>
                      <input
                        autocomplete="false"
                        type=""
                        v-model="user.streetNumber"
                        class="form-control input-body"
                        placeholder="N°"
                        required
                      >
                    </div>
                  </div>
                </div>
                <div class="container-flex">
                  <div class="row">
                    <div class="form-group col-8">
                      <p class="mb-0 font-weight-bold">Bairro</p>
                      <input
                        autocomplete="false"
                        type=""
                        v-model="user.neighborhood"
                        class="form-control input-body"
                        placeholder="Bairro"
                        required
                      >
                    </div>
                    <div class="form-group col-4 pl-0">
                      <p class="mb-0 font-weight-bold">CEP</p>
                      <input
                        autocomplete="false"
                        type=""
                        v-model="user.zipcode"
                        class="form-control input-body"
                        placeholder="CEP"
                        v-mask="'#####-###'"
                        required
                      >
                    </div>
                  </div>
                </div>
                <h5 class="mt-4 mb-3">Créditos do Cliente</h5>
                <div class="form-group">
                  <p class="mb-0 font-weight-bold">Emissões Disponíveis</p>
                  <input
                    type=""
                    v-model="user.emissions"
                    class="form-control input-body"
                    placeholder="Emissões Disponíveis"
                    required
                  >
                </div>
                <label class="mt-3 custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input input-body" :checked="user.free" @click="user.free = !user.free">
                  <span class="custom-control-label">Plano Totalmente Liberado (Emergencia)</span>
                </label>
                <h5 class="mt-4 mb-3">Login do Cliente</h5>
                <div class="form-group">
                  <p class="mb-0 font-weight-bold">E-mail de Acesso</p>
                  <input
                    type="email"
                    v-model="user.email"
                    class="form-control input-body"
                    placeholder="E-mail de Login"
                    required
                    disabled
                  >
                </div>
                <div class="form-group">
                  <p class="mb-0 font-weight-bold">Senha Provisória</p>
                  <input
                    type="text"
                    v-model="user.password"
                    class="form-control input-body"
                    placeholder="Defina sua Senha"
                    minlength="8"
                    required
                    disabled
                  >
                </div>
              </div>
              <div class="modal-footer">
                <!-- <button class="btn-undo" @click=closeModal()>
                  <template style="transition: all .3s !important">
                    <i class="fas fa-undo" style="color: #777986;"></i> Voltar
                  </template>
                </button> -->
                <!-- <button class="btn btn-primary" :disabled="loading">
                  <template v-if="loading" style="transition: all .3s !important">
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </template>
                  <template v-else>
                    <i class="fas fa-pen"></i>Editar Cliente
                  </template>
                </button> -->
                <EditConfirmation :user="user" @update="handleUpdateUser" />
              </div>
            </form>
          </div>
        </div>
        <div v-if="status.info" class="alert-container alert text-center alert-success" :class="status.color" role="alert">
         {{ status.info }}
        </div>
        <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{display: showModal ? 'block' : 'none'}" style="background-color: transparent;"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import EditConfirmation from './EditConfirmation.vue'

export default {
  props: ['userData'],
  data: () => ({
    showModal: false,
    loading: false,
    hasCpf: false,
    infoLoading: false,
    status: {
      info: '',
      color: ''
    },
    user: {}
  }),
  components: {
    EditConfirmation
  },
  methods: {
    async initialChanges () {
      await this.$firebase.database().ref('users').child(this.userData.uId).once('value', snapshot => {
        this.user = snapshot.val()
        this.showModal = true
      })
      if (!this.user.free) {
        this.user.free = false
      }
    },
    closeModal () {
      this.showModal = false
    },
    async autoInfoRequest () {
      this.infoLoading = true
      if (this.user.documentNumber.length === 18 && this.user.documentType === 'cnpj') {
        const headers = {
          Authorization: '4ca930bf-446e-4202-911c-a14bc2200d23-b0adcdfa-904b-4c8b-9482-bfefd949bb52'
        }
        await this.$http.get(`https://api.cnpja.com/office/${this.user.documentNumber.replace(/[^a-zA-Z0-9]/g, '')}&strategy=CACHE`, { headers }).then(res => {
          if (res.data.company.name.length) {
            this.user.name = res.data.company.name
            this.user.uf = res.data.address.state
            this.user.city = res.data.address.city
            this.user.fantasia = res.data.alias
            this.user.zipcode = res.data.address.zip
            this.user.street = res.data.address.street
            this.user.streetNumber = res.data.address.number
            this.user.neighborhood = res.data.address.district
          } else {
            this.user.name = ''
            this.user.uf = ''
            this.user.city = ''
            this.user.fantasia = ''
            this.user.zipcode = ''
            this.user.street = ''
            this.user.streetNumber = ''
            this.user.neighborhood = ''
            this.status = {
              info: 'CNPJ não encontrado',
              color: 'alert-danger'
            }
            setTimeout(() => {
              this.infoLoading = false
            }, 2000)

            setTimeout(() => {
              this.status = {
                info: '',
                color: ''
              }
            }, 3000)
            return null
          }
        }).catch(err => {
          console.log(err)
          this.user.name = ''
          this.user.uf = ''
          this.user.city = ''
          this.user.fantasia = ''
          this.user.zipcode = ''
          this.user.street = ''
          this.user.streetNumber = ''
          this.user.neighborhood = ''
          this.status = {
            info: 'CNPJ não encontrado',
            color: 'alert-danger'
          }
          setTimeout(() => {
            this.infoLoading = false
          }, 2000)

          setTimeout(() => {
            this.status = {
              info: '',
              color: ''
            }
          }, 3000)
          return err
        })
      }
      this.infoLoading = false
    },
    async EditCustomer () {
      this.user.name = this.user.name.toUpperCase()
      if (this.user.documentNumber.length !== 18 && this.user.documentType === 'cnpj') {
        this.status = {
          info: 'CNPJ Inválido',
          color: 'alert-warning'
        }
        setTimeout(() => {
          this.status = {
            info: '',
            color: ''
          }
        }, 3000)
        return null
      }
      if (this.user.documentNumber.length !== 14 && this.user.documentType === 'cpf') {
        this.status = {
          info: 'CPF Inválido',
          color: 'alert-warning'
        }
        setTimeout(() => {
          this.status = {
            info: '',
            color: ''
          }
        }, 3000)
        return null
      }

      // if (this.oldEmail !== this.user.email || this.oldPassword !== this.user.password) {
      //   await this.$firebase.auth()
      //     .signInWithEmailAndPassword(this.oldEmail, this.oldPassword)
      //     .then(userCredential => {
      //       userCredential.user.updateEmail(this.user.email)
      //       userCredential.user.updatePassword(this.user.password)
      //     })
      // }

      // this.$emit('update', this.user)
    },
    handleUpdateUser (user) {
      this.localUser = user
      this.$emit('update', this.localUser)
    }
  }
}
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 15px;
    font-weight: 500;
    // color: rgba(105, 115, 182, 0.9);
    color: #5b5d6b;
  }
  .btn-action {
    background: rgba(214, 221, 253, 0.45);
    color: rgba(105, 115, 182, 0.9);
    border: 2px solid rgba(214, 221, 253, 1);
    padding: 0px 22px;
  }
}
.modal-content{
  width: 605px !important;
  height: 900px !important;
  margin-left: 0px !important;
  margin-top: -17px;
  padding: 20px 30px 20px 30px!important;
  outline: 2px solid #2FB490;
  border-radius: 9px !important;
  // overflow-y: scroll;
  .modal-body{
    padding: 15px;
    overflow-y: scroll;
    height: 720px !important;
  }

  .modal-header, .modal-footer{
    border: none !important;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn-undo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #777986 !important;
      border: none;
      background-color: #ffffff;
      padding: 6px 9px !important;
      font-weight: 500 !important;
      font-size: 17px;
      letter-spacing: 0.5px;
      margin-left: -5px !important;
      transition: all .3s !important;
      &:hover{
          transform: translate(0, -3px);
      }
    }
  }

  .custom-checkbox{
    margin: 10px 0 0 2px;
  }

  .custom-control-label::before{
    height: 1.2rem !important;
    width: 1.2rem !important;
    top: .15rem;
    left: -1.60rem;
    box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.15) !important;
    border-color: white !important;
    border-radius: 5px;
  }
  .custom-control-label::after{
    border-color: var(--featured) !important;
  }
  .custom-control-input:checked~.custom-control-label::before {
    box-shadow: none !important;
    color: white !important;
    background-color: var(--featured) !important;
    border-color: var(--featured) !important;
    &:focus {
        border: none !important;
    }
  }
  h4, h5{
    font-weight: 700;
  }
  .form-group{
    margin: 7px 0;

    .input-body {
      width: 100%;
      font-size: 15px;
      font-weight: 400;
      border-radius: 4px;
      border: 1px solid #d2d4da !important;
      box-shadow: none !important;
      padding: 0 8px;
    }
    .input-file {
      border: none !important;
      box-shadow: none;
    }
  }
  .btn-remove{
    color: var(--red-light);
    padding: 0;
    border: none;
    background-color: white;
    margin-left: 3px;
    i {
      margin-right: 5px;
    }
  }
}
.input-group-text{
  position: absolute;
  background-color: var(--featured) !important;
  color: white;
  right: 2px;
  bottom: 3px;
  top: 3px;
  border: none;
  cursor: pointer;
  border-radius: 10px !important;
  z-index: 999;
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
  color: #a5a5a5;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: .3px;
  border-radius: 0px;
  border: #a5a5a5 solid 2px !important;
  cursor: pointer !important;
  &:first-child{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &:last-child{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  &.active{
    color: white;
    background: #a5a5a5;
  }
}
input[type="text"][disabled] {
   color: #a1a1a1;
   background: #f3f3f3 !important;
}
.alert-container {
  left: 28.1% !important;
  right: 28.2% !important;
  top: 2px !important;
  margin-left: 168px;
  margin-right: 60px;
}
</style>
