<template>
  <div>
    <div class="button-container">
      <span>Desativar Cliente</span>
      <button class="btn-action"  @click="showModal = true" :disabled="!user.actived"><i class="fas fa-pause"></i></button>
    </div>
    <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog modal-dialog-centered" role="dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Desativar Cliente</h4>
            <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <h5>Deseja desativar o cliente de razão social: {{user.name}} ?</h5>
          </div>
          <div class="modal-footer">
            <button class="btn btn-desactivate" @click="closeModal()">
              Cancelar
            </button>
            <button v-if="process === 'initial'" class="btn btn-desactivate" @click="disableUser()">
                <template v-if="loading" style="transition: all .3s !important">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </template>
                <template v-else>
                  <i class="fas fa-pause"></i>Desativar
                </template>
            </button>
            <button v-else-if="process === 'loading'" class="btn btn-desactivate loading">
              Carregando
              <svg width="18px" height="18px" version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <circle fill="none" stroke="#e8797980" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
                <line fill="none" stroke-linecap="round" stroke="#e8797980" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                  <animateTransform
                      attributeName="transform"
                      dur="2s"
                      type="rotate"
                      from="0 50 50"
                      to="360 50 50"
                      repeatCount="indefinite" />
                </line>
                <line fill="none" stroke-linecap="round" stroke="#e8797980" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
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
            <butto v-else-if="process === 'concluded'" class="btn btn-desactivate loading">
              Concluído
              <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.333 6.8877L9.33209 16.8877L4.33298 11.8877" stroke="#e8797980" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </butto>
            <button v-else class="btn-desactivate loading">
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
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'

export default {
  props: ['user'],
  data: () => ({
    process: 'initial',
    showModal: false,
    loading: false,
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
    disableUser () {
      this.process = 'loading'
      this.$firebase.database().ref('users').child(this.user.uId).update({ actived: false }, err => {
        if (err) {
          console.log(err)
        }
      })
      this.user.actived = false
      setTimeout(() => {
        // Get toast interface
        const toast = useToast()

        // or with options
        toast.success('Cliente desativado com sucesso!', {
          toastClassName: 'toast-class',
          // bodyClassName: ["custom-class-1", "custom-class-2"]
          timeout: 2000
        })
        this.process = 'concluded'
      }, 2000)

      setTimeout(() => {
        this.closeModal()
      }, 4000)
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
    // color: var(--red-light);
    color: #5b5d6b;
  }
  .btn-action {
    color: var(--red-light);
    background: rgba(232, 121, 121, .13);
    border: 2px solid rgb(232, 121, 121, 0.5);
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
  left: 10%;
  margin-bottom: 180px;
  .modal-header, .modal-footer{
    border: none !important;
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
        padding: 10px 20px !important;

        svg {
          margin-bottom: 1px;
        }
      }
    }
  }
}
</style>
