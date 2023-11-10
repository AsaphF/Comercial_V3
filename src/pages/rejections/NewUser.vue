<template>
  <div>
    <button class="btn btn-sm btn-white" @click="showModal = true; initialChanges()">
      <i class="fas fa-plus"></i>Adicionar Cliente
    </button>
    <transition name="fade" mode="out-in">
      <div v-if="showModal" class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Adicionar Cliente</h4>
              <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <form @submit.prevent="createUser()">
              <div class="modal-body" v-if="user">
                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link" :class="[user.documentType === 'cnpj' ? 'active' : '']" @click="initialChanges(); user.documentType = 'cnpj'">Jurídica</a>
                    <a class="nav-item nav-link" :class="[user.documentType === 'cpf' ? 'active' : '']" @click="initialChanges(); user.documentType = 'cpf'">Física</a>
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
                      type="cpf"
                      v-model="user.documentNumber"
                      class="form-control input-body"
                      placeholder="CPF do Cliente"
                      v-mask="'###.###.###-##'"
                      required
                    >
                  </div>
                </div>
                <div class="form-group" v-if="user.documentType == 'cnpj'">
                  <p class="mb-0 font-weight-bold">Razão Social</p>
                  <input
                    type="name"
                    v-model="user.name"
                    class="form-control input-body"
                    placeholder="Razão Social"
                    required
                    style="text-transform:uppercase"
                  >
                </div>
                <div class="form-group" v-if="user.documentType == 'cpf'">
                  <p class="mb-0 font-weight-bold">Nome Completo</p>
                  <input
                    type="name"
                    v-model="user.name"
                    class="form-control input-body"
                    placeholder="Nome Completo"
                    required
                    style="text-transform:uppercase"
                  >
                </div>
                <div class="form-group" v-if="user.documentType == 'cnpj'">
                  <p class="mb-0 font-weight-bold">Nome Fantasia</p>
                  <input
                    type="name"
                    v-model="user.fantasia"
                    class="form-control input-body"
                    placeholder="Nome Fantasia"
                    required
                  >
                </div>
                <div class="form-group" v-if="user.documentType == 'cpf'">
                  <p class="mb-0 font-weight-bold">Nome Fantasia (como deve aparecer para os clientes dele)</p>
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

                <h5 class="mt-3 mb-3">Login do Cliente</h5>
                <div class="form-group">
                  <p class="mb-0 font-weight-bold">E-mail de Acesso</p>
                  <input
                    type="text"
                    v-model="user.email"
                    class="form-control input-body"
                    placeholder="E-mail de Login"
                    onfocus="this.removeAttribute('readonly');"
                    readonly
                    required
                  >
                </div>
                <div class="form-group">
                  <p class="mb-0 font-weight-bold">Senha Provisória</p>
                  <input
                    type="text"
                    ref="password"
                    v-model="user.password"
                    class="form-control input-body disabled"
                    placeholder="Defina sua Senha"
                    minlength="8"
                    onfocus="this.removeAttribute('readonly');"
                    readonly
                    required
                    disabled
                  >
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-primary" :disabled="loading">
                  <template v-if="loading" style="transition: all .3s !important">
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </template>
                  <template v-else>
                    <i class="fas fa-plus"></i>Adicionar Cliente
                  </template>
                </button>

              </div>
            </form>
          </div>
        </div>
        <div v-if="status.info" class="alert-container alert text-center alert-warning" :class="status.color" role="alert">
         {{ status.info }}
        </div>
        <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{display: showModal ? 'block' : 'none'}"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['allUsers'],
  data: () => ({
    showModal: false,
    loading: false,
    infoLoading: false,
    status: {
      info: '',
      color: ''
    },
    user: {
      documentType: 'cnpj',
      actived: false,
      email: '',
      password: '',
      documentNumber: '',
      currentSubscriptionId: '',
      currentPlanId: '',
      lastUploadEmissions: '',
      lastBoletoUrl: '',
      totalGuides: 0,
      emissions: 50,
      name: '',
      phone: '',
      uf: '',
      city: '',
      zipcode: '',
      street: '',
      streetNumber: '',
      neighborhood: '',
      fantasia: '',
      emailToSend: '',
      passwordToSend: '',
      uId: '',
      pagarmeId: '',
      createdAt: '',
      affiliateId: window.uid,
      affiliatePercentage: 0,
      schedulingDays: {
        installments: 15,
        meiCollections: 10,
        dctfwebCollections: 10,
        simplesCollections: 10
      },
      visualizedInfo: true
    }
  }),

  mounted () {
    this.initialChanges()
  },
  methods: {
    initialChanges () {
      const randomPassword = String(Math.floor(10000000 + Math.random() * 90000000))
      const copyText = randomPassword
      const textArea = document.createElement('textarea')
      textArea.textContent = copyText
      // document.body.append(textArea)
      textArea.select()
      document.execCommand('copy')
      // this.user = {
      //   documentType: 'cnpj',
      //   actived: false,
      //   email: 'aaaa@gmail.com',
      //   password: randomPassword,
      //   documentNumber: '706.798.932-36',
      //   currentSubscriptionId: '',
      //   currentPlanId: '',
      //   lastUploadEmissions: '',
      //   lastBoletoUrl: '',
      //   totalGuides: 0,
      //   emissions: 50,
      //   name: 'aaa',
      //   phone: '11933776782',
      //   uf: 'ss',
      //   city: 'aa',
      //   zipcode: '129852-225',
      //   street: 'R teste aaa',
      //   streetNumber: '100',
      //   neighborhood: '',
      //   fantasia: '',
      //   emailToSend: '',
      //   passwordToSend: '',
      //   uId: '',
      //   pagarmeId: '',
      //   createdAt: '',
      //   affiliateId: window.uid,
      //   affiliatePercentage: 0,
      //   schedulingDays: {
      //     installments: 15,
      //     meiCollections: 10,
      //     dctfwebCollections: 10,
      //     simplesCollections: 10
      //   }
      // }
      this.user = {
        documentType: 'cnpj',
        actived: false,
        email: '',
        password: randomPassword,
        documentNumber: '',
        currentSubscriptionId: '',
        currentPlanId: '',
        lastUploadEmissions: '',
        lastBoletoUrl: '',
        totalGuides: 0,
        emissions: 50,
        name: '',
        phone: '',
        uf: '',
        city: '',
        zipcode: '',
        street: '',
        streetNumber: '',
        neighborhood: '',
        fantasia: '',
        emailToSend: '',
        passwordToSend: '',
        uId: '',
        pagarmeId: '',
        createdAt: '',
        affiliateId: window.uid,
        affiliatePercentage: 0,
        schedulingDays: {
          installments: 15,
          meiCollections: 10,
          dctfwebCollections: 10,
          simplesCollections: 10
        }
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
        console.log(this.user.documentNumber)
        console.log(this.user.documentNumber.replace(/[^a-zA-Z0-9]/g, ''))
        await this.$http.get(`https://api.cnpja.com/office/${this.user.documentNumber.replace(/[^a-zA-Z0-9]/g, '')}`, { headers }).then(res => {
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
    async createUser () {
      this.user.name = this.user.name.toUpperCase()
      const result = this.allUsers.filter(user => user.documentNumber === this.user.documentNumber && user.documentType === this.user.documentType)
      if (result.length > 0) {
        if (this.user.documentType === 'cpf') {
          this.status = {
            info: 'Número do CPF já cadastrado',
            color: 'alert-warning'
          }
          setTimeout(() => {
            this.status = {
              info: '',
              color: ''
            }
          }, 3000)
          return null
        } else {
          this.status = {
            info: 'Número do CNPJ já cadastrado',
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
      }
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
      this.loading = true
      this.user.createdAt = String(Date())
      await this.$firebase.database().ref('affiliates').child(window.uid).child('percentage').once('value', snapshot => {
        this.user.affiliatePercentage = parseInt(snapshot.val())
      })
      try {
        await this.$authWorker.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then(res => {
          this.user.uId = res.user.uid
          this.$firebase.database().ref('users').child(res.user.uid).set(this.user).then(() => {
            this.$authWorker.auth().signOut()
          })
        })
        const formattedEmail = this.user.email.replace(/[^a-zA-Z0-9]/g, '')
        await this.$firebase.database().ref(`hotLeads/${formattedEmail}/status`).update({ color: 'status-warning' })
        await this.$firebase.database().ref(`hotLeads/${formattedEmail}/status`).update({ info: 'Cadastrado' })
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
        return null
      }
      setTimeout(() => {
        this.loading = false
        this.closeModal()
      }, 1000)
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
    // color: rgb(6, 131, 115, 0.8);
    color: #5b5d6b;
  }
  .btn-action {
    color: var(--featured);
    background: rgba(6, 131, 115, 0.1);
    border: 2px solid rgb(6, 131, 115, 0.5);
    padding: 0px 25px;

    &:disabled{
      color: var(--gray) !important;
      background: rgba(52, 58, 64, .075) !important;
      border: 2px solid rgba(52, 58, 64, .075);
    }
    &.loading {
      padding: 0px 22px;

      svg {
        margin-bottom: 1px;
      }
    }
  }
}
.modal-content{
  width: 580px !important;
  color: #282a3a;
  margin-left: 50%;
  margin-top: 5%;
  padding: 32px;
  .modal-body{
    padding-top: 0;
    height: 70vh;
  }

  .modal-header, .modal-footer{
    border: none !important;
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
    border-radius: 9px;
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
      border-radius: 9px;
      border: 1px solid #d2d4da !important;
      box-shadow: none !important;
      padding: 0 8px;
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
  border-radius: 9px !important;
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
  color: var(--featured-light);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: .3px;
  border-radius: 0px;
  border: var(--featured-light) solid 2px !important;
  cursor: pointer !important;
  &:first-child{
    border-top-left-radius: 9px;
    border-bottom-left-radius: 9px;
  }
  &:last-child{
    border-top-right-radius: 9px;
    border-bottom-right-radius: 9px;
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

.alert-container {
  left: 41.1% !important;
  right: 28.2% !important;
  top: 2px !important;
}
</style>
