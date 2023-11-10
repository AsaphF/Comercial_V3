<template>
  <div>
    <!-- <button class="btn btn-sm btn-finalize" @click="showModal = true; initialChanges()">
      Cadastrar
    </button> -->
    <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Adicionar Colaborador</h4>
            <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form @submit.prevent="createOrExclude()">
            <div class="modal-body" v-if="employee">
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <a class="nav-item nav-link" :class="[register ? 'active' : '']" @click="initialChanges()" >Cadastrar</a>
                  <a class="nav-item nav-link" :class="[!register ? 'active' : '']" @click="initialChanges()">Descadastrar</a>
                </div>
              </nav>
              <h5 v-if="!register" class="mb-2 mt-3">Escolha um colaborador para desativar</h5>
              <div class="form-group" v-if="!register">
                <select v-model="affiliateIdChoosen" required class="input-body" @change="selectEmployee()" style="box-shadow: none !important;">
                  <option value="Selecione" style="color: rgb(64, 66, 82, 0.9) !important;" disabled>Selecione</option>
                  <option style="color: rgb(64, 66, 82, 0.9) !important;" v-for="(affiliate, index) in this.affiliates" :key="index" :value="affiliate.affiliateId">{{ affiliate.name }}</option>
                </select>
              </div>
              <h5 class="mb-3 mt-3">Informações do Colaborador</h5>
              <div class="form-group">
                <p class="mb-0 font-weight-bold">CPF do Colaborador</p>
                <div class="input-group">
                  <input
                    type="cpf"
                    v-model="employee.cpf"
                    class="form-control input-body"
                    placeholder="CPF do Colaborador"
                    v-mask="'###.###.###-##'"
                    required
                    :disabled="allDisable"
                  >
                </div>
              </div>
              <div class="form-group">
                <p class="mb-0 font-weight-bold">Nome Completo</p>
                <input
                  type="name"
                  v-model="employee.name"
                  class="form-control input-body"
                  placeholder="Nome Completo"
                  required
                  style="text-transform:uppercase"
                  :disabled="allDisable"
                >
              </div>
              <div class="form-group">
                <p class="mb-0 font-weight-bold">Celular</p>
                <input
                  type="phone"
                  v-model="employee.phone"
                  class="form-control input-body"
                  placeholder="Celular do Colaborador"
                  v-mask="employee.phone.length >= 15 ? '(##) #####-####' : '(##) ####-####'"
                  minlength="14"
                  :disabled="allDisable"
                  required
                >
              </div>
              <div class="container-flex">
                <div class="row">
                  <div class="form-group col-4">
                    <p class="mb-0 font-weight-bold">Estado</p>
                    <input
                      type="uf"
                      v-model="employee.uf"
                      class="form-control input-body"
                      placeholder="UF"
                      v-mask="'AA'"
                      style="text-transform:uppercase"
                      :disabled="allDisable"
                      required
                    >
                  </div>
                  <div class="form-group col-8 pl-0">
                    <p class="mb-0 font-weight-bold">Município</p>
                    <input
                      autocomplete="false"
                      type=""
                      v-model="employee.city"
                      class="form-control input-body"
                      placeholder="Município"
                      :disabled="allDisable"
                      required
                    >
                  </div>
                </div>
              </div>
              <div class="form-group">
                <p class="mb-0 font-weight-bold">Imagem do Colaborador</p>
                <input
                  type="file"
                  class="form-control input-file"
                  accept="image/png, image/jpeg, image/svg"
                  :disabled="allDisable"
                  @change="previewFile"
                  required
                >
              </div>
              <h5 class="mt-3 mb-3">Login do Colaborador</h5>
              <div class="form-group">
                <p class="mb-0 font-weight-bold">E-mail de Acesso</p>
                <input
                  type="email"
                  v-model="employee.email"
                  class="form-control input-body"
                  placeholder="exemplo@emissaosimples.com.br"
                  :disabled="allDisable"
                  required
                >
              </div>
              <div class="form-group">
                <p class="mb-0 font-weight-bold">Senha Provisória</p>
                <input
                  type="text"
                  ref="password"
                  v-model="employee.password"
                  class="form-control input-body disabled"
                  placeholder="Defina sua Senha"
                  minlength="8"
                  readonly
                  required
                  disabled
                >
              </div>
            </div>
            <div class="modal-footer">
              <button v-if="!register" class="btn btn-submit-exclude" :disabled="loading">
                <template v-if="confirmExclusion" style="transition: all .3s !important">
                  Confirmar
                </template>
                <template v-else>
                  Excluir Colaborador
                </template>
              </button>
              <button v-else class="btn btn-submit" :disabled="loading">
                <template v-if="loading" style="transition: all .3s !important">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </template>
                <template v-else>
                  Adicionar Colaborador
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="status.info" class="alert text-center" :class="status.color" role="alert" style="left: 40.8% !important; right: 27.7% !important; top: 0.3% !important;">
        {{status.info}}
      </div>
      <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{display: showModal ? 'block' : 'none'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['affiliate'],
  data: () => ({
    register: false,
    showModal: false,
    loading: false,
    affiliates: [],
    status: {
      info: '',
      color: ''
    },
    employee: {
      actived: true,
      affiliateId: '',
      city: '',
      cnpj: '',
      cpf: '',
      email: '',
      indicated: '',
      logoUrl: '',
      name: '',
      occupation: '',
      password: '',
      percentage: '',
      phone: '',
      uf: '',
      createdAt: ''
    },
    affiliateIdChoosen: 'Selecione',
    allDisable: false,
    confirmExclusion: false,
    imgObj: {},
    uploadValue: 0,
    imgUrl: ''
  }),

  mounted () {
    this.$root.$on('NewAffiliate::show', () => this.initialChanges())
  },

  methods: {
    async initialChanges () {
      const randomPassword = String(Math.floor(10000000 + Math.random() * 90000000))
      // const textArea = document.createElement('textarea')
      // textArea.textContent = copyText
      // textArea.style.visibility = 'hidden'
      // document.body.append(textArea)
      // textArea.select()
      // document.execCommand('copy')
      if (this.register) {
        await this.$firebase.database().ref('affiliates').on('value', snapshot => {
          const values = snapshot.val()
          if (values) {
            this.affiliates = Object.keys(values).map(i => values[i])
            this.affiliates = this.affiliates.filter(a => a.actived === true)
          }
        })
        this.employee = {
          actived: true,
          affiliateId: '',
          city: '',
          cnpj: '',
          cpf: '',
          email: '',
          indicated: this.affiliate.affiliateId,
          lastLeadSearch: {
            city: "Campinas",
            state: "São Paulo"
          },
          logoUrl: '',
          name: '',
          occupation: '',
          password: '',
          payments: {},
          percentage: '',
          phone: '',
          uf: ''
        }
        this.allDisable = true
        this.register = false
      } else {
        this.employee = {
          actived: true,
          affiliateId: '',
          city: '',
          cnpj: '',
          cpf: '',
          email: '',
          indicated: this.affiliate.affiliateId,
          logoUrl: '',
          name: '',
          occupation: '',
          password: randomPassword,
          percentage: '',
          phone: '',
          uf: ''
        }
        this.affiliateIdChoosen = 'Selecione'
        this.allDisable = false
        this.register = true
      }
      this.showModal = true
    },
    previewFile (event) {
      this.imgObj = event.target.files[0]
      console.log(this.imgObj)
    },
    async createOrExclude () {
      if (this.register) {
        this.employee.name = this.employee.name.toUpperCase()
        if (this.employee.cpf.length !== 14) {
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
        if (!this.employee.email.includes('@emissaosimples.com.br')) {
          this.status = {
            info: 'e-mail inválido',
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
        this.loading = true
        this.employee.createdAt = Date()
        try {
          await this.$authWorker.auth().createUserWithEmailAndPassword(this.employee.email, this.employee.password).then(res => {
            this.employee.affiliateId = res.user.uid
            this.$firebase.database().ref('affiliates').child(res.user.uid).set(this.employee).then(() => {
              this.$authWorker.auth().signOut()
            })
            if (this.imgObj.name || this.imgObj.size) {
              const metadata = {
                name: this.imgObj.name,
                size: this.imgObj.size,
                contentType: this.imgObj.type
              }
              this.imgUrl = null
              const storageRef = this.$firebase.storage().ref(`affiliatesProfilesUrls/${metadata.name}`).put(this.imgObj)
              storageRef.on('state_changed', snapshot => {
                this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              }, error => { console.log(error.message) }, () => {
                this.uploadValue = 100
                // storageRef.snapshot.ref.getDownloadURL().then((url) => {
                //   this.imgUrl = url
                //   console.log(this.imgUrl)
                // })
              })
            }
          })
          this.$toast('Afiliado criado com sucesso', {
            timeout: 2000,
          })
        } catch (err) {
          console.log(err)
          if (err.message === 'The email address is already in use by another account.') {
            this.status = {
              info: 'Este e-mail já está sendo usado em outra conta!',
              color: 'alert-danger'
            }
          }

          setTimeout(() => {
            this.loading = false
          }, 2000)

          setTimeout(() => {
            this.status = {
              info: '',
              color: ''
            }
          }, 3000)
          this.loading = false
          return null
        }
        setTimeout(() => {
          this.loading = false
          this.closeModal()
        }, 1000)
      } else {
        if (this.affiliateIdChoosen === 'Selecione') {
          this.status = {
            info: 'Afiliados não selecionado',
            color: 'alert-warning'
          }
          setTimeout(() => {
            this.status = {
              info: '',
              color: ''
            }
          }, 1000)
          return null
        }
        if (this.confirmExclusion) {
          this.$firebase.database().ref(`affiliates/${this.employee.affiliateId}`).update({ actived: false })
          setTimeout(() => {
            this.closeModal()
          }, 500)
        } else {
          this.confirmExclusion = true
        }
      }
    },
    selectEmployee () {
      const tempArray = this.affiliates.filter(a => a.affiliateId === this.affiliateIdChoosen)
      this.employee = tempArray[0]
    },
    closeModal () {
      this.$root.$emit('Refresh::users')
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.btn-finalize{
  color: white !important;
  border: 4px solid var(--featured-light) !important;
  background-color: var(--featured-light) !important;
  padding: 6px 10px !important;
  font-weight: 500 !important;
  letter-spacing: 0.5px;
  transition: all .3s !important;
  &:hover{
      transform: translate(0, -3px);
  }
  &:focus {
      background-color: white !important;
      color: var(--featured) !important;
      transform: translate(0, -3px);
      outline: none !important;
      box-shadow: none !important;
  }
}
.modal-content{
  width: 600px !important;
  margin-top: 20px;
  padding: 32px;
  outline: 2px solid #2FB490;

  .modal-header, .modal-footer{
    border: none !important;
    color: rgb(64, 66, 82, 0.9);
  }
  .modal-body{
    padding-top: 0;
    height: 70vh;
    color: rgb(64, 66, 82, 0.9);

    .input-body {
      width: 100%;
      font-size: 15px;
      font-weight: 400;
      border-radius: 4px;
      border: 1px solid #d2d4da !important;
      box-shadow: none;
      padding: 0 8px;
    }
    .input-file {
      border: none !important;
      box-shadow: none;
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
    color: rgb(64, 66, 82, 0.9);
  }
  .form-group{
    margin: 7px 0;

    .input-file {
      background-color: white !important;
      box-shadow: none !important;
      content: '';
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

.nav-tabs {
  border-bottom: none !important;
  cursor: pointer;
}

.nav-tabs .nav-item {
  width: 50%;
  margin-bottom: 0px;
  border: none !important;
  text-align: center;
  color: var(--featured-light);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: .3px;
  border-radius: 0px;
  border: var(--featured-light) solid 2px !important;
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
    background: var(--featured-light);
  }
}
input[type="text"][disabled] {
   color: #a1a1a1;
   background: #f3f3f3 !important;
}

.btn-submit {
  color: white !important;
  border-top: none;
  border: 2px solid var(--featured-light) !important;
  border-radius: 4px;
  background-color: var(--featured-light) !important;
  border-top: none !important;
  padding: 10px 24px !important;
  font-size: 15px;
  font-weight: 500 !important;
  letter-spacing: 0.5px;
  transition: all .3s !important;
  &:hover {
    transform: translate(0, -3px);
  }
}
.btn-submit-exclude {
  border-top: none;
  color: #de6767 !important;
  border: 2px solid #fbe6e6 !important;
  border-radius: 3px;
  background-color: #fbe6e6 !important;
  border-top: none !important;
  padding: 10px 24px !important;
  font-size: 15px;
  font-weight: 500 !important;
  letter-spacing: 0.5px;
  transition: all .3s !important;
  &:hover {
    transform: translate(0, -3px);
  }
}
</style>
