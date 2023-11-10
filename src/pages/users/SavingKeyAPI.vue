<template>
  <div>
    <div v-if="showModal" class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog" role="dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Cadastro da chave de identificação</h4>
            <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <h6>Para usar o botConversa é necessário colocar a sua chave de identificação.</h6>
            <p>Acesse o botConvesa e siga as intruções abaixo :</p>
            <p>Configurações > Integrações > Chave API</p>
            <div class="tutorial-container">
              <img src="../../assets/images/config.jpg" alt="" srcset="">
            </div>
            <form @submit.prevent="saveAPI()">
              <label for="fname">Chave API : </label>
              <input v-model="inputValue" type="text" id="fname" name="fname" placeholder="Digite a chave de API..." required><br><br>
              <div class="button-container">
                <div v-if="!warning" ></div>
                <div v-if="warning" class="info-status status-warning warning">
                  Verifique se a chave não é a mesma já cadastrada, caso for atualizá-la.
                </div>
                <div v-if="warningSame" class="info-status status-warning warning">
                  A chave é a mesma que foi salva anteriormente.
                </div>
                <template v-if="updateButtonOn">
                  <button v-if="process === 'initial'" class="btn btn-activate">
                    Atualizar
                  </button>
                  <button v-else class="btn btn-activate">
                    Atualizado<i class="fas fa-check"></i>
                  </button>
                </template>
                <template v-else >
                  <button v-if="process === 'initial'" class="btn btn-activate">
                    Salvar
                  </button>
                  <button v-else class="btn btn-activate">
                    Salvo<i class="fas fa-check"></i>
                  </button>
                </template>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{display: showModal ? 'block' : 'none'}"></div>
    </div>
    <div v-if="status.info" class="alert text-center" :class="status.color" role="alert">
      {{status.info}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['affiliate'],
  data: () => ({
    inputValue: '',
    warningOn: 'hidden',
    warning: false,
    warningSame: false,
    updateButtonOn: false,
    showModal: false,
    loading: false,
    process: 'initial',
    status: {
      info: '',
      color: ''
    }
  }),
  mounted () {
    this.$root.$on('SavingKeyAPI::show', this.openModal)
  },
  methods: {
    openModal () {
      if (this.affiliate.botConversaAPI) {
        this.updateButtonOn = true
        this.inputValue = this.affiliate.botConversaAPI
        this.warning = true
      } else {
        this.warning = false
      }
      this.showModal = true
    },
    closeModal () {
      console.log('testing')
      this.showModal = false
    },
    async saveAPI () {
      if (this.inputValue !== this.affiliate.botConversaAPI) {
        await this.$firebase.database().ref(`affiliates/${window.uid}`).update({ botConversaAPI: this.inputValue })
        this.process = 'concluded'
        this.$toast("Chave Salva com sucesso!", {
          timeout: 2000
        })
      } else {
        this.warningSame = true
        this.warning = false
        setTimeout(() => {
          this.warningSame = false
          this.warning = true
        }, 1000)
      }
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
  padding: 24px;
  margin-top: 20%;
  margin-left: -20% !important;
  width: 900px !important;
  .modal-header, .modal-footer{
    border: none !important;
  }
  .modal-body {
    margin-top: -20px;
    p {
      // font-weight: 600;
      color: #282A3A;
      font-size: 15px;
    }
    .tutorial-container {
      img {
        width: 800px;
      }
    }
    form {
      color: #282A3A;
      font-size: 15px;
      margin-top: 15px;
      label {
        font-weight: 600;
        margin-right: 10px;
        color: #5b5d6b;
      }

      input {
        width: 340px;
        opacity: 0.8;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;
        border: 1px solid rgba(100,69,224,.1) !important;
        color: #6445e0;
        background-color: rgba(100,69,224,.1);
        box-shadow: none;
        padding: 8px 16px;
        resize: none;

        &:focus {
          color: #6445e0;
          box-shadow: none !important;
        }

        &::placeholder {
          color: #6445e0;
          opacity: 0.5;
        }
      }
      .button-container {
        display: flex;
        justify-content: space-between;
        gap: 5px;
        .warning {
          width: 520px;
          font-size: 13px !important;
        }
        .btn-activate {
          display: flex;
          gap: 5px;
          align-items: center;
          color: var(--featured);
          background: rgba(6, 131, 115, 0.1);
          border: 2px solid rgb(6, 131, 115, 0.5) !important;
          padding: 10px 20px !important;
          transition: all .3s !important;
          &.loading {
            padding: 15px 20px !important;

            svg {
              margin-bottom: 1px;
            }
          }

          &:hover {
            transform: translate(0, -3px);
          }
        }
      }
    }

  }
  h4, h5, h6{
    font-weight: 600;
    color: #282A3A;
  }
  h6{
    font-size: 15px;
  }
}
</style>
