<template>
  <div>
    <div class="modal fade" :class="{ show: showModal }" :style="{ display: showModal ? 'block' : 'none' }">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Monitore sua lead</h4>
            <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form @submit.prevent="saveChanges()">
            <div class="modal-body">
              <div class="lead-info-container" v-if="localLead && localLead.name">
                <div class="name-container">
                  <small>Nome</small>
                  <p class="lead-name"> {{ localLead.name.slice(0, 30) }}</p>
                </div>
                <div class="phone-container">
                  <small>Telefone</small>
                  <p class="lead-phone"> {{ localLead.phone }}</p>
                </div>
                <div class="email-container">
                  <small>E-mail</small>
                  <p class="lead-email"> {{ localLead.email }}</p>
                </div>
                <div class="origin-container">
                  <div class="left-container">
                    <small>Origem</small>
                    <p v-if="localLead.originData && localLead.originData.origin" class="lead-origin"> {{ localLead.originData.origin }}</p>
                    <p v-else class="lead-origin" style="color: #b3b5bd;">Não informado</p>
                  </div>
                  <div class="right-container">
                    <small>Campanha</small>
                    <p v-if="localLead.originData && localLead.originData.campaign" class="lead-campaign"> {{ localLead.originData.campaign }}</p>
                    <p v-else class="lead-campaign" style="color: #b3b5bd;">Não informado</p>
                  </div>
                </div>
              </div>
              <div class="first-line-form">
                <div class="status-form">
                  <div class="label-container">
                    <label>Status</label>
                  </div>
                  <select v-model="statusValue" class="select-form" required>
                    <option disabled>Selecione</option>
                    <option value="Ligar">Ligar</option>
                    <option value="Retornar">Retornar</option>
                    <option value="Cadastrado">Cadastrado</option>
                    <option value="Não Quer">Não Quer</option>
                    <option value="Assinante">Assinante</option>
                  </select>
                </div>
                <div class="return-date-form">
                  <div class="label-container">
                    <label for="return">Data de retorno:</label>
                  </div>
                  <input v-model="dtReturn" class="date-input" type="date" id="return" name="return" :required="dateRequired">
                </div>
              </div>
              <div class="observations-form">
                <label>Observações:</label>
                <textarea v-model="obs" class="text-area-form" aria-label="observação" placeholder="Adicione uma observação sobre o contato com a lead" style="height: 90px !important;"></textarea>
              </div>
              <div v-if="loggedAffiliate.adm" class="exclusion-container" @click="removeLead()">
                <p>Exclusão:</p>
                <small>Lembre-se, apenas exclua uma lead caso não caracterize como lead ou tenha sido preenchido por engano.</small>
                <small>Toda exclusão será salva e reportada!</small>
                <div class="buttons-container">
                  <button v-if="exclude" class="btn btn-cancel" style="font-weight: 600 !important;">Excluir</button>
                  <button v-else class="btn btn-cancel" style="font-weight: 600 !important;">Confirmar</button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-cancel" style="font-weight: 600 !important;" @click="closeModal()">
                Cancelar
              </button>
              <button class="btn btn-submit" style="font-weight: 600 !important;">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{ display: showModal ? 'block' : 'none' }"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['loggedAffiliate'],
  data: () => ({
    localLead: {},
    showModal: false,
    exclude: true,
    loading: true,
    saved: false,
    statusValue: 'Selecione',
    obs: null,
    dtReturn: null,
    dateRequired: false,
    statusObj: [
      {
        info: 'Ligar',
        color: 'status-pending',
        obs: null
      },
      {
        info: 'Retornar',
        color: 'status-danger',
        obs: null
      },
      {
        info: 'Cadastrado',
        color: 'status-warning',
        obs: null
      },
      {
        info: 'Não Quer',
        color: 'status-inactivate',
        obs: null
      },
      {
        info: 'Assinante',
        color: 'status-success',
        obs: null
      }
    ]
  }),
  methods: {
    async initialChanges (lead) {
      this.localLead = lead
      this.showModal = true
      this.statusValue = this.localLead.status.info
      if (this.localLead.dtReturn) {
        this.dtReturn = moment(this.localLead.dtReturn).format('YYYY-MM-DD')
      }
      if (this.localLead.status.obs) {
        this.obs = this.localLead.status.obs
      }
      this.loading = false
    },
    async saveChanges () {
      this.dateRequired = false
      if (moment(this.dtReturn).isBefore(new Date()) ) {
        this.$toast.warning('Data não é válida, corriga para salvar a informação.', {
          timeout: 2000,
        })
        return null
      }
      if ((this.statusValue === 'Retornar' && (this.dtReturn === null || this.dtReturn === ''))) {
        this.dateRequired = true
      } else {
        for (let index = 0; index < this.statusObj.length; index++) {
          if (this.statusValue === this.statusObj[index].info) {
            this.localLead.status.info = this.statusObj[index].info
            this.localLead.status.color = this.statusObj[index].color
            this.localLead.dtReturn = this.dtReturn !== null || this.dtReturn !== '' ? this.dtReturn : null
            if (this.obs !== null) {
              this.localLead.status.obs = this.obs
            }
            if (this.dtReturn !== null || this.dtReturn !== undefined) {
              this.$firebase.database().ref(`hotLeads/${this.localLead.key}`).update({ dtReturn: this.localLead.dtReturn })
            }
            await this.$firebase.database().ref(`hotLeads/${this.localLead.key}`).child('status').update(this.localLead.status)
            this.$toast('Alterações salvas com sucesso', {
              timeout: 2000,
            })
            this.showModal = false
          }
        }
      }
    },
    removeLead () {
      if (this.exclude) {
        this.exclude = false
      } else {
        this.$firebase.database().ref(`leads/excluded/${this.localLead.key}`).update(this.localLead)
        this.$firebase.database().ref(`hotLeads/${this.localLead.key}`).remove()
        setTimeout(() => {
          this.showModal = false
        }, 600)
      }
    },
    formatEmail () {
      return this.localLead.email.replace(/[^a-zA-Z0-9]/g, '')
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
  width: 140px;
  padding: 8px 20px !important;
  margin-right: -10px;
  margin-left: -5px;
  transition: all .4s !important;

  &:hover {
    transform: translate(0, -2px) !important;
  }
}
.modal-content {
  width: 605px !important;
  outline: 2px solid #2FB490 !important;
  height: 670;
  padding: 42px;
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
    .modal-body-title {
      text-align: left;
      padding-top: 12px;
      font-size: 19px;

      strong {
        font-size: 16px;
      }
    }

    .lead-info-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      // gap: 5px;
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
        align-items: flex-start;
      }
      .origin-container {
        width: 100%;
        display: flex;
        gap: 15px;
        justify-content: space-between;
        .left-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .right-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-right: 70px;
        }
      }
    }
    .first-line-form {
      width: 100%;
      display: flex;
      gap: 15px;
      justify-content: space-between;
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
      margin-top: 10px;
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
    height: 70px;
    display: flex;
    padding: 0px;
    padding-top: 25px;
    .btn-cancel {
      color: var(--featured-light) !important;
      border-top: none;
      border: 2px solid var(--featured-light) !important;
      border-radius: 9px !important;
      background-color: white !important;
      padding: 10px 24px !important;
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
      border-radius: 9px !important;
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
  }
}
</style>
