<template>
  <div>
    <div class="button-container">
      <button class="btn-exclude" @click="showModal = true">Excluir</button>
    </div>
    <transition name="fade">
      <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
        <div class="modal-dialog" role="dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Excluir Modelo</h4>
              <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <h5 v-if="this.origem === 'whats'" >Deseja excluir o modelo de título: {{model.title}} ?</h5>
              <h5 v-else >Deseja excluir o modelo de título: {{model.templateTitle}} ?</h5>
            </div>
            <div class="modal-footer">
              <button class="btn btn-desactivate" @click="closeModal()">
                Cancelar
              </button>
              <button v-if="process === 'initial'" class="btn btn-activate" @click="excludeModel()">
                <template v-if="loading" style="transition: all .3s !important">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </template>
                <template v-else>
                  <i class="fas fa-check"></i>Excluir
                </template>
              </button>
              <button v-else-if="process === 'loading'" class="btn btn-activate loding">
                  Carregando
                  <svg width="18px" height="18px" version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <circle fill="none" stroke="#2fb490" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
                    <line fill="none" stroke-linecap="round" stroke="#2fb490" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                      <animateTransform
                          attributeName="transform"
                          dur="2s"
                          type="rotate"
                          from="0 50 50"
                          to="360 50 50"
                          repeatCount="indefinite" />
                    </line>
                    <line fill="none" stroke-linecap="round" stroke="#2fb490" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
                      <animateTransform
                          attributeName="transform"
                          dur="15s"
                          type="rotate"
                          from="0 50 50"
                          to="360 50 50"
                          repeatCount="indefinite" />
                    </line>
                  </svg>
              </button>
              <butto v-else-if="process === 'concluded'" class="btn btn-activate">
                Concluído
                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.333 6.8877L9.33209 16.8877L4.33298 11.8877" stroke="#068373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </butto>
              <button v-else class="btn btn-activate">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.7727 14.0008C19.8797 17.9187 16.4986 20.7705 12.4863 20.9902C8.47401 21.2099 4.80182 18.7443 3.4864 14.9473C2.17098 11.1504 3.5308 6.94148 6.81909 4.63193C10.1074 2.32238 14.528 2.47136 17.6534 4.99708" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21.0038 8.00034L18.0025 10.9976" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.0045 7.99832L21.0017 10.9996" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 11.6689V8.3985" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 15.2794C11.9572 15.2793 11.9162 15.2965 11.8861 15.3269C11.856 15.3574 11.8394 15.3986 11.8399 15.4414C11.8415 15.5291 11.9123 15.5999 12 15.6015C12.0895 15.6015 12.1621 15.5289 12.1621 15.4394C12.1621 15.3499 12.0895 15.2773 12 15.2773" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div v-if="status.info" class="alert text-center" :class="status.color" role="alert">
          {{status.info}}
        </div>
        <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{display: showModal ? 'block' : 'none'}"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['model', 'localList', 'origem'],
  data: () => ({
    showModal: false,
    loading: false,
    process: 'initial',
    contacts: [],
    status: {
      info: '',
      color: ''
    }
  }),
  methods: {
    closeModal () {
      this.showModal = false
      this.process = 'initial'
    },
    excludeModel () {
      if (this.origem === 'whats') {
        try {
          this.process = 'loading'
          this.$emit('updateList', this.model)
          this.$firebase.database().ref(`support/textsModel/${window.uid}/whatsMessage`).child(`${this.model.id}`).remove()
          setTimeout(() => {
            this.process = 'concluded'
          }, 1000)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          this.process = 'loading'
          this.$emit('updateListMail', this.model)
          this.$firebase.database().ref(`support/textsModel/${window.uid}/mailMessage`).child(`${this.model.id}`).remove()
          setTimeout(() => {
            this.process = 'concluded'
          }, 1000)
        } catch (error) {
          console.log(error)
        }
      }
      this.closeModal()
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
  .btn-exclude{
    color: #de6767 !important;
    border: 2px solid #fbe6e6 !important;
    border-radius: 3px;
    background-color: #fbe6e6 !important;
    padding: 0px 9px !important;
    font-size: 12px;
    font-weight: 700 !important;
    letter-spacing: 0.5px;
    transition: all .3s !important;
    cursor: pointer;
    &:hover{
        transform: translate(0, -3px);
        border: 2px solid #f1bebe !important;
        background-color: #f1bebe!important;
    }
    &:focus {
        border: 2px solid #f1bebe !important;
        background-color: #f1bebe!important;
        transform: translate(0, -3px);
        outline: none !important;
        box-shadow: none !important;
    }
  }
}
.modal-content{
  padding: 24px;
  margin-top: 50%;
  outline: 2px solid #2FB490;

  .modal-header, .modal-footer{
    border: none !important;
  }

  h4, h5{
    font-weight: 600;
    color: #282A3A;
  }
  h5{
    font-size: 15px;
  }
  .form-group{
    margin: 7px 0;
  }

  .modal-footer {
    .btn-desactivate {
      display: flex;
      gap: 5px;
      align-items: center;
      color: var(--red-light) !important;
      background: rgba(232, 121, 121, .13) !important;
      border: 2px solid rgb(232, 121, 121, 0.5) !important;
      padding: 10px 20px !important;

      &:disabled{
        color: var(--gray) !important;
        background: rgba(52, 58, 64, .075) !important;
        border: 2px solid rgba(52, 58, 64, .075);
      }
      &.loading {
        padding: 14.5px 20px !important;

        svg {
          margin-bottom: 1px;
        }
      }
    }
    .btn-activate {
      display: flex;
      gap: 5px;
      align-items: center;
      color: var(--featured);
      background: rgba(6, 131, 115, 0.1);
      border: 2px solid rgb(6, 131, 115, 0.5) !important;
      padding: 10px 20px !important;

      &.loading {
        padding: 15px 20px !important;

        svg {
          margin-bottom: 1px;
        }
      }
    }
  }
}
</style>
