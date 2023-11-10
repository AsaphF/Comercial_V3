<template>
    <div>
      <div v-if="showModal" class="modal fade" :class="{ show: showModal }" :style="{ display: showModal ? 'block' : 'none' }">
        <div class="modal-dialog" role="dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Monitore seu cliente</h4>
              <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <form @submit.prevent="saveChanges()">
              <div class="modal-body">
                <div class="lead-info-container">
                  <div class="name-container">
                    <small>Nome</small>
                    <p class="lead-name"> {{ localUser.name.slice(0, 27).toUpperCase() }}</p>
                  </div>
                  <div class="phone-container">
                    <small>Telefone</small>
                    <p class="lead-phone"> {{ localUser.phone }}</p>
                  </div>
                  <div class="email-container">
                    <small>E-mail</small>
                    <p class="lead-email"> {{ localUser.email }}</p>
                  </div>
                  <div class="row origin-container">
                    <div class="col-6 left-container">
                      <small>Assinatura</small>
                      <p v-if="localUser.pagarmePlan" class="lead-origin"> {{ localUser.pagarmePlan.name }}</p>
                      <p v-else class="lead-origin" style="color: #b3b5bd;">Não informado</p>
                    </div>
                    <div class="col-6 right-container">
                      <small>Situação do pagamento</small>
                      <p v-if="localUser.pagarmePaymentStatus" class="lead-campaign"> {{ localUser.pagarmePaymentStatus }}</p>
                      <p v-else class="lead-campaign" style="color: #b3b5bd;">Não informado</p>
                    </div>
                  </div>
                </div>
                <div class="row first-line-form">
                  <div class="col-6 status-form">
                    <div class="label-container">
                      <label>Status</label>
                    </div>
                    <select v-model="statusValue" class="select-form" required>
                      <option disabled>Selecione</option>
                      <option value="Em Negociação">Em Negociação</option>
                      <option value="Testando">Testando</option>
                      <option value="Assinante">Assinante</option>
                      <option value="Não Quer">Não Quer</option>
                    </select>
                  </div>
                  <div class="col-6 return-date-form">
                    <div class="label-container">
                      <label for="return">Data Limite para Finalizar o Teste</label>
                    </div>
                    <input v-model="dtReturn" class="date-input" type="date" id="return" name="return" :required="dateRequired">
                  </div>
                </div>
                <div class="observations-form">
                  <label>Observações:</label>
                  <textarea v-model="obs" class="text-area-form" aria-label="observação" placeholder="Adicione uma observação sobre a negociação com o cliente" maxlength="120" style="height: 90px !important;"></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-cancel" style="font-weight: 600 !important; border-radius: 9px !important;" @click="closeModal()">
                  Cancelar
                </button>
                <button class="btn btn-submit" style="font-weight: 600 !important; border-radius: 9px !important;">
                  Salvar
                </button>
              </div>
            </form>
            <hr>
            <div class="buttons-section">
              <h4 class="secundary-title">Ações</h4>
              <small>Proposta Comercial</small>
              <div class="inner-container">
                <SendProposal :user="localUser" :loggedAffiliate="loggedAffiliate" @checkSend="handleCheckSend"/>
                <HistoricProposal :updated="historicUpdated" @checkSend="historicUpdated = false"/>
              </div>
            </div>
            <div class="buttons-section">
              <small>Gerenciar Cadastro</small>
              <div class="inner-container">
                <active-user :user="localUser"/>
                <disable-user :user="localUser"/>
                <edit-user :userData="localUser" @update="handleUpdateUser"/>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{ display: showModal ? 'block' : 'none' }"></div>
      </div>
    </div>
</template>

<script>
import moment from 'moment'
import EditUser from './EditUser'
import DisableUser from './DisableUser'
import ActiveUser from './ActiveUser'
import SendProposal from './SendProposal.vue'
import HistoricProposal from './HistoricProposal.vue'

export default {
  props: ['loggedAffiliate'],
  components: {
    EditUser,
    DisableUser,
    ActiveUser,
    SendProposal,
    HistoricProposal
  },
  data: () => ({
    showModal: false,
    localUser: [],
    exclude: true,
    loading: true,
    saved: false,
    statusValue: 'Selecione',
    obs: null,
    dtReturn: null,
    statusCopy: null,
    obsCopy: null,
    dtReturnCopy: null,
    dateRequired: false,
    historicUpdated: []
  }),
  methods: {
    async initialChanges (user) {
      this.showModal = true
      this.localUser = user
      if (user.status && user.status.info) {
        this.statusValue = user.status.info
        this.statusCopy = user.status.info
      }
      if (user.status && user.status.dtCallback) {
        this.dtReturn = moment(user.status.dtCallback).format('YYYY-MM-DD')
        this.dtReturnCopy = moment(user.status.dtCallback).format('YYYY-MM-DD')
      }
      if (user.status && user.status.obs) {
        this.obs = user.status.obs
        this.obsCopy = user.status.obs
      }
      this.loading = false
    },
    async saveChanges () {
      if ((this.statusValue === this.statusCopy) && (this.dtReturn === this.dtReturnCopy) && (this.obs === this.obsCopy)) {
        return
      }
      if ((this.statusValue === 'Selecione') && (this.dtReturn === null) && (this.obs === null)) {
        return
      }
      const responseObj = {
        info: this.statusValue === 'Selecione' ? null : this.statusValue,
        dtCallback: this.dtReturn === '' ? null : this.dtReturn,
        obs: this.obs,
        affiliateId: this.loggedAffiliate.affiliateId
      }

      this.localUser.status = responseObj
      this.$emit('checkUsers', this.localUser)
      await this.$firebase.database().ref(`support/monitoringComercial/${this.localUser.uId}`).update(responseObj)
      this.$toast("Informações Atualizadas com Sucesso!", {
          timeout: 2000
      })
      this.localUser = {}
      this.showModal = false
      this.showModal = false
      this.dateRequired = false
    },
    handleCheckSend (data) {
      console.log('Received data:', data)
      this.historicUpdated = data
    },
    handleUpdateUser () {
      this.$emit('update', this.localUser)
    },
    closeModal () {
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

.btn-primary-border {
  border-radius: 9px !important;
  transition: all .4s !important;
  &:hover {
    transform: translate(0, -2px) !important;
  }
}
.modal-content {
  width: 605px !important;
  height: 900px;
  // margin-left: 50%;
  margin-top: -10px;
  padding: 30px 30px 0px 30px!important;
  outline: 2px solid #2FB490;
  border-radius: 9px !important;
  .modal-header {
    border-bottom: none;
    padding: 0px;
    margin-bottom: 10px;
    .modal-title {
      font-size: 20px;
      font-weight: 600;
      color: #282A3A;
    }
  }
  .modal-body {
    border-bottom: none;
    padding: 0px;
    margin-bottom: 10px;
    .lead-info-container {
      display: flex;
      flex-direction: column;
      small {
        font-size: 12px;
        font-weight: 400;
        color: #9496A1;
      }
      p {
        font-size: 14.5px;
        color: #282A3A;
      }
      .name-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .phone-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .email-container{
        display: flex;
        flex-direction: column;
      }
      .origin-container {
        width: 100%;
        .left-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .right-container {
          display: flex;
          flex-direction: column;
        }
      }
    }
    .first-line-form {
      width: 100%;
      margin-bottom: 10px !important;
      label {
        font-size: 12px;
        font-weight: 400;
        color: #9496A1;
        margin-bottom: -5px;
      }
      .status-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 50%;
        .select-form {
          opacity: 0.8;
          width: 100%;
          font-size: 15px;
          font-weight: 400;
          border-radius: 4px;
          border: 1px solid #d2d4da !important;
          box-shadow: none;
          padding: 0 5px;
        }
      }
      .return-date-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 50%;
        .date-input {
          opacity: 0.8;
          width: 100%;
          font-size: 15px;
          font-weight: 400;
          border-radius: 4px;
          border: 1px solid #d2d4da !important;
          box-shadow: none;
          padding: 0 5px;
        }
      }
    }
    .observations-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 5px;
      label {
        font-size: 12px;
        font-weight: 400;
        color: #9496A1;
        align-self: flex-start;
        margin-bottom: 0px;
      }
      .text-area-form {
        width: 100%;
        opacity: 0.8;
        font-size: 14px;
        font-weight: 400;
        border-radius: 4px;
        border: 1px solid #d2d4da !important;
        box-shadow: none;
        padding: 8px 16px;
        resize: none;
      }
    }
    .exclusion-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      p {
        font-size: 13px;
        font-weight: 600;
        color: #E56B5B;
        align-self: flex-start;
        margin-bottom: 0px;
      }
      small {
        font-size: 12px;
        font-weight: 500;
        color: #E56B5B;
        text-align: justify;
        margin-bottom: 0px;
      }
      .buttons-container {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        padding-right: 5px;
        .btn-cancel {
          color: var(--featured-light) !important;
          color: #de6767 !important;
          border: 2px solid #fbe6e6 !important;
          border-radius: 3px;
          background-color: #fbe6e6 !important;
          padding: 2px 10px !important;
          font-size: 15px;
          font-weight: 500 !important;
          letter-spacing: 0.5px;
          transition: all .3s !important;

          &:hover {
            transform: translate(0, -3px);
          }
        }
      }
    }
  }
  .modal-footer {
    height: 50px;
    display: flex;
    padding: 0px;
    border-top: none !important;
    .btn-cancel {
      color: var(--featured-light) !important;
      border-top: none;
      border: 2px solid var(--featured-light) !important;
      border-radius: 4px;
      background-color: white !important;
      padding: 9px 16px !important;
      font-size: 15px;
      font-weight: 500 !important;
      letter-spacing: 0.5px;
      transition: all .3s !important;
      &:hover {
        transform: translate(0, -3px);
      }
    }
    .btn-submit {
      color: white !important;
      border-top: none;
      border: 2px solid var(--featured-light) !important;
      border-radius: 4px;
      background-color: var(--featured-light) !important;
      border-top: none !important;
      padding: 10px 16px !important;
      font-size: 15px;
      font-weight: 500 !important;
      letter-spacing: 0.5px;
      transition: all .3s !important;
      margin-right: -0px !important;
      &:hover {
        transform: translate(0, -3px);
      }
    }
  }
  .buttons-section {
    .secundary-title {
      font-size: 18px;
      font-weight: 600;
      color: #404252;
    }
    small {
      font-size: 12px;
      font-weight: 400;
      color: #9496A1;
    }
    .inner-container {
      border-radius: 4px;
      border: 1px solid #d2d4da !important;
      box-shadow: none;
      padding: 8px;

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
          padding: 0px 20px;

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
    }
  }
}

</style>
