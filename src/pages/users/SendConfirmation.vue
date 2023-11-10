<template>
  <div>
    <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}" >
      <div class="modal-dialog" role="dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="confirmation-header">
              <h5>Confimação de envio</h5>
              <p>Antes de enviar, verifique os dados preenchidos se estão todos corretos abaixo:</p>
            </div>
            <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li v-if="user.name.length > 10" ><strong>Cliente: </strong>{{ user.name.substring(0, 27) }}</li>
              <li v-else ><strong>Cliente: </strong>{{ user.name }}</li>
              <li v-if="amountClient === ''"><strong>Quantidade de clientes:</strong><span style="color: #de6767; font-weight: 400;"> Falta informar</span></li>
              <li v-else><strong>Quantidade de clientes:</strong>  {{ amountClient }}</li>
              <li v-if="monthlyPrice === ''"><strong>Preço mensal:</strong><span style="color: #de6767; font-weight: 400;"> Falta informar</span></li>
              <li v-else><strong>Preço mensal:</strong> R$  {{ monthlyPrice }}</li>
              <li v-if="priceClient === ''"><strong>Preço por cliente:</strong><span style="color: #de6767; font-weight: 400;"> Falta informar</span></li>
              <li v-else><strong>Preço por cliente:</strong> R$  {{ priceClient }}</li>
              <li v-if="hoursSaved === ''"><strong>Economia de tempo:</strong><span style="color: #de6767; font-weight: 400;"> Falta informar</span></li>
              <li v-else><strong>Economia de tempo:</strong> {{ hoursSaved }} horas</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button v-if="process === 'initial'" class="btn btn-activate" @click="sendEmail()">
              Confirmar Envio
            </button>
            <button v-else-if="process === 'loading'" class="btn btn-activate loding">
                Carregando
                <svg width="18px" height="18px" version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                  <circle fill="none" stroke="#068373" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
                  <line fill="none" stroke-linecap="round" stroke="#068373" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                    <animateTransform
                        attributeName="transform"
                        dur="2s"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite" />
                  </line>
                  <line fill="none" stroke-linecap="round" stroke="#068373" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
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
  </div>
</template>

<script>
import sendProposalPro from '../../plugins/sendProposalPro'
import sendProposalEnterprise from '../../plugins/sendProposalEnterprise'

export default {
  props: ['user', 'loggedAffiliate', 'amountClient', 'priceClient', 'monthlyPrice', 'hoursSaved'],
  data: () => ({
    showModal: true,
    loading: false,
    process: 'initial',
    contacts: [],
    status: {
      info: '',
      color: ''
    }
  }),

  methods: {
    async sendEmail () {
      if (this.showModal) {
        // const regexPattern = /^(?=.*[a-zA-Z])[a-zA-Z#$%&0-9]+$/
        const regexPattern = /[a-zA-Z]|[#$%&]/
        const testAmount = regexPattern.test(this.amountClient)
        const testPriceClient = regexPattern.test(this.priceClient)
        const testMonthPrice = regexPattern.test(this.monthlyPrice)
        const testHours = regexPattern.test(this.hoursSaved)

        if (testPriceClient || testAmount || testMonthPrice || testHours) {
          this.status = {
            info: 'Proposta enviada com sucesso!',
            color: 'alert-warning'
          }
          setTimeout(() => {
            this.status = {
              info: '',
              color: ''
            }
          }, 5000)
          return false
        }
        if (this.amountClient.trim() === '' || this.priceClient.trim() === '' || this.monthlyPrice.trim() === '' || this.hoursSaved.trim() === '') {
          this.status = {
            info: 'Valores fornecidos são inválidos. Revise e tente novamente.',
            color: 'alert-warning'
          }
          setTimeout(() => {
            this.status = {
              info: '',
              color: ''
            }
          }, 5000)
          return false
        }

        try {
          this.process = 'loading'
          this.openConfirmation = false
          if (this.changePlan === true) {
            const tempObj = {
              client: this.user.name,
              plan: 'Pro',
              amountClient: this.amountClient.trim(),
              priceClient: this.priceClient.trim(),
              monthlyPrice: this.monthlyPrice.trim(),
              hoursSaved: this.hoursSaved.trim(),
              date: Date.now()
            }
            const result = await sendProposalPro(this.loggedAffiliate, this.amountClient, this.priceClient, this.monthlyPrice, this.hoursSaved, this.user.email)
            if (result === 200) {
              await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`comercialPropose/${tempObj.date}`).update(tempObj)
            } else {
              console.log('Envio não efetivado')
              this.senderEmailStatus = 'error'
            }
          } else {
            const tempObj = {
              client: this.user.name,
              plan: 'Enterprise',
              amountClient: this.amountClient.trim(),
              priceClient: this.priceClient.trim(),
              monthlyPrice: this.monthlyPrice.trim(),
              hoursSaved: this.hoursSaved.trim(),
              date: Date.now()
            }

            const result = await sendProposalEnterprise(this.loggedAffiliate, this.amountClient, this.priceClient, this.monthlyPrice, this.hoursSaved, this.user.email)
            if (result === 200) {
              await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`comercialPropose/${tempObj.date}`).update(tempObj)
            } else {
              console.log('Envio não efetivado')
              this.senderEmailStatus = 'error'
            }
          }
          this.process = 'concluded'
          this.$toast("Enviado com sucesso!", {
          timeout: 2000
          })
          setTimeout(() => {
            this.$emit('checkSend')
            this.$emit('cancelConfirmation')
            this.showModal = false
          }, 1500)
        } catch (error) {
          console.log(error)
          this.process = 'error'
        }
      } else {
        this.showModal = true
      }
    },
    closeModal () {
      this.$emit('cancelConfirmation')
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
  padding: 18px;
  margin-top: 32%;
  margin-left: 15%;
  text-align: start;
  .modal-header, .modal-footer{
    border: none !important;
  }
  .modal-header {
    height: 90px;
  }
  .modal-body {
    height: 130px;
    ul {
      margin-left: 17px;
      margin-bottom: 10px;

      li {
        padding-bottom: 1px;
      }
    }

  }
  .modal-footer {
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
