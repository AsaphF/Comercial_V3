<template>
  <div>
    <transition name="fade">
      <div v-if="showModal" class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
          <div class="modal-content">
            <div class="body-container">
              <div class="body-content">
                <div v-if="id === 'email'" class="container-list-email">
                  <div class="inner-container">
                    <div class="title-container">
                      <h5>Lista de Modelos</h5>
                    </div>
                  </div>
                  <div class="lead-info-container">
                    <h6><strong>Destinatário:</strong> {{ user.name }}</h6>
                    <div class="tip-container">
                      <span><strong>Selecione </strong>o modelo de email que deseja enviar para o seu cliente </span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.706 13V8.5C12.706 7.672 12.034 7 11.206 7C10.378 7 9.706 7.672 9.706 8.5V16L7.674 15.323C7.081 15.125 6.427 15.28 5.984 15.722C5.297 16.409 5.349 17.536 6.094 18.158L10.149 21.537C10.51 21.836 10.963 22 11.43 22H15.94C16.949 22 17.799 21.249 17.925 20.248L18.468 15.905C18.601 14.84 17.87 13.861 16.812 13.684L12.706 13Z" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.21 8H6.21" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.21 8H16.21" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.45 3.76L14.74 4.46" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.96 3.76L7.67 4.46" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.21 2V3" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div class="models-container">
                    <div class="model-container" :class="{'activated': model.selected}" v-for="(model, index) in emailList" :key="index" @click="selectModel(model)">
                      <div class="template-type">
                        <span>Template de {{ model.type }}</span>
                        <svg v-if="model.favorite && model.favorite === true" width="21" height="21" viewBox="0 0 24 24" fill="#F2C335" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z" stroke="#e6ac00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-else width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z" stroke="#e6ac00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <h6 v-if="model.templateTitle && model.templateTitle.length > 80"><strong>Título do Modelo:</strong> {{ model.templateTitle.slice(0, 80) }}...</h6>
                      <h6 v-else><strong>Título do Modelo:</strong> {{ model.templateTitle }}</h6>
                      <p v-if="model.text.length > 235" class="text-model"><strong>Texto: </strong><span class="text-container">{{ model.title.slice(0, 20) + ' ' + model.text.slice(0, 220) }}...</span></p>
                      <p v-else class="text-model"><strong>Texto: </strong><span class="text-container">{{ model.title + model.text }}</span></p>
                    </div>
                  </div>
                  <div class="buttons-container">
                    <button class="btn-undo" @click=closeModal()>
                      <template style="transition: all .3s !important">
                        <i class="fas fa-undo" style="color: #777986;"></i> Voltar
                      </template>
                    </button>
                    <button v-if="process === 'initial'" class="btn btn-sm btn-send-mail" @click.left="sendEmail(this.user)">
                      Enviar
                    </button>
                    <button v-else-if="process === 'loading'" class="btn btn-sm btn-send-mail">
                      Carregando
                       <svg class="loading-clock" version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                        <circle fill="none" stroke="#fff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
                        <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                          <animateTransform
                              attributeName="transform"
                              dur="2s"
                              type="rotate"
                              from="0 50 50"
                              to="360 50 50"
                              repeatCount="indefinite" />
                        </line>
                        <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
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
                    <button v-else-if="process === 'error'" class="btn btn-sm btn-send-mail">
                      <span style="color: #E53935" >Erro </span>
                      <svg style="margin-top: -3px" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.7727 14.0008C19.8797 17.9187 16.4986 20.7705 12.4863 20.9902C8.47401 21.2099 4.80182 18.7443 3.4864 14.9473C2.17098 11.1504 3.5308 6.94148 6.81909 4.63193C10.1074 2.32238 14.528 2.47136 17.6534 4.99708" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.0038 8.00034L18.0025 10.9976" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.0045 7.99832L21.0017 10.9996" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 11.6689V8.3985" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15.2794C11.9572 15.2793 11.9162 15.2965 11.8861 15.3269C11.856 15.3574 11.8394 15.3986 11.8399 15.4414C11.8415 15.5291 11.9123 15.5999 12 15.6015C12.0895 15.6015 12.1621 15.5289 12.1621 15.4394C12.1621 15.3499 12.0895 15.2773 12 15.2773" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <button v-else class="btn btn-sm btn-send-mail" @click.left="sendEmail(this.user)" disabled>
                      Concluído <i class="fas fa-check"></i>
                    </button>
                  </div>
                </div>
                <div v-else class="container-list">
                  <div class="inner-container">
                    <div class="title-container">
                      <h5>Lista de Modelos</h5>
                    </div>
                  </div>
                  <div class="lead-info-container">
                    <h6><strong>Destinatário:</strong> {{ user.name }}</h6>
                    <div class="tip-container">
                      <span><strong>Selecione </strong>o modelo de mensagem que deseja enviar para o seu cliente </span>
                      <strong>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.706 13V8.5C12.706 7.672 12.034 7 11.206 7C10.378 7 9.706 7.672 9.706 8.5V16L7.674 15.323C7.081 15.125 6.427 15.28 5.984 15.722C5.297 16.409 5.349 17.536 6.094 18.158L10.149 21.537C10.51 21.836 10.963 22 11.43 22H15.94C16.949 22 17.799 21.249 17.925 20.248L18.468 15.905C18.601 14.84 17.87 13.861 16.812 13.684L12.706 13Z" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M5.21 8H6.21" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M17.21 8H16.21" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15.45 3.76L14.74 4.46" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.96 3.76L7.67 4.46" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M11.21 2V3" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </strong>
                    </div>
                  </div>
                  <div class="models-container">
                    <div class="model-container" :class="{'activated': model.selected}" v-for="(model, index) in whatsList" :key="index" @click="selectModel(model)">
                      <div class="first-line-container">
                        <h6 v-if="model.title.length > 80"><strong>Título do Modelo:</strong> {{ model.title.slice(0, 80) }}...</h6>
                        <h6 v-else><strong>Título do Modelo:</strong> {{ model.title }}</h6>
                        <template>
                          <svg v-if="model.favorite && model.favorite === true" class="star-icon" width="21" height="21" viewBox="0 0 24 24" fill="#F2C335" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z" stroke="#e6ac00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg v-else class="star-icon" width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z" stroke="#e6ac00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </template>
                      </div>
                      <p v-if="model.text.length > 235" class="text-model"><strong>Texto: </strong><span class="text-container">{{ model.text.slice(0, 235) }}...</span></p>
                      <p v-else class="text-model"><strong>Texto: </strong><span class="text-container">{{ model.text }}</span></p>
                    </div>
                  </div>
                  <div class="buttons-container">
                    <button class="btn-undo" @click=closeModal()>
                      <template style="transition: all .3s !important">
                        <i class="fas fa-undo" style="color: #777986;"></i> Voltar
                      </template>
                    </button>
                    <button v-if="process === 'initial'" class="btn btn-sm btn-send-whats" @click.left="sendMessage(this.user)">Enviar</button>
                    <button v-else-if="process === 'loading'" class="btn btn-sm btn-send-whats">
                      Carregando
                      <svg class="loading-clock" version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                        <circle fill="none" stroke="#fff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
                        <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                          <animateTransform
                              attributeName="transform"
                              dur="2s"
                              type="rotate"
                              from="0 50 50"
                              to="360 50 50"
                              repeatCount="indefinite" />
                        </line>
                        <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
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
                    <button v-else-if="process === 'error'" class="btn btn-sm btn-send-whats">
                      <span style="color: #E53935" >Erro </span>
                      <svg style="margin-top: -3px" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.7727 14.0008C19.8797 17.9187 16.4986 20.7705 12.4863 20.9902C8.47401 21.2099 4.80182 18.7443 3.4864 14.9473C2.17098 11.1504 3.5308 6.94148 6.81909 4.63193C10.1074 2.32238 14.528 2.47136 17.6534 4.99708" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.0038 8.00034L18.0025 10.9976" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.0045 7.99832L21.0017 10.9996" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 11.6689V8.3985" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15.2794C11.9572 15.2793 11.9162 15.2965 11.8861 15.3269C11.856 15.3574 11.8394 15.3986 11.8399 15.4414C11.8415 15.5291 11.9123 15.5999 12 15.6015C12.0895 15.6015 12.1621 15.5289 12.1621 15.4394C12.1621 15.3499 12.0895 15.2773 12 15.2773" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <button v-else class="btn btn-sm btn-send-whats" @click.left="sendMessage(this.user)" disabled>
                      Concluído <i class="fas fa-check"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="status.info" class="alert-container alert text-center" :class="status.color" role="alert">
          {{status.info}}
        </div>
        <div class="modal-backdrop fade" @click="closeModal()" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import sendSalesBusiness from '../../plugins/sendSalesBusiness'
import sendSalesMessage from '../../plugins/sendSalesMessage'

export default {
  props: ['affiliate', 'user', 'whatsList', 'emailList', 'id'],
  data: () => ({
    warning: false,
    process: 'initial',
    changeButton: false,
    botConversaOn: false,
    model: {},
    edit: false,
    selected: false,
    selectionOn: false,
    sended: false,
    removeConfirmation: false,
    mailTitle: '',
    mailBody: '',
    showModal: false,
    concluded: false,
    status: {
      info: '',
      color: ''
    }
  }),
  computed: {
    phoneFormated () {
      const numericPhoneNumber = this.lead.phone.replace(/\D/g, '')
      return numericPhoneNumber
    },
    affiliateEmail () {
      return `mailto:${this.affiliate.email}`
    },
    affiliatePhone () {
      let url = ''
      if (this.affiliate && this.affiliate.phone) {
        const numericPhoneNumber = this.affiliate.phone.replace(/\D/g, '')
        url = `https://wa.me/${numericPhoneNumber}?text=Ol%C3%A1%21+Gostaria+de+te+consultar+sobre+o+SimplesHub.`
      }
      return url
    }
  },
  async mounted () {
    // this.$root.$on('ModelsListClients::show', () => this.openModal())
  },
  methods: {
    async openModal () {
      this.showModal = true
      if (!this.affiliate.botConversaAPI) {
        this.$root.$emit('SavingKeyAPI::show')
        this.showModal = false
      }
      if (this.whatsList.length > 0) {
        for (let index = 0; index < this.whatsList.length; index++) {
          this.whatsList[index].selected = false
        }
      }
      if (this.emailList.length > 0) {
        for (let index = 0; index < this.emailList.length; index++) {
          this.emailList[index].selected = false
        }
      }
    },

    // Envio de mensagem para whatsApp / BotConversa

    async sendMessage (user) {
      if (this.id === 'botConversa') {
        if (this.affiliate.botConversaAPI) {
          const selectedModel = this.whatsList.filter(model => model.selected && model.selected === true)
          if (selectedModel.length > 0) {
            // Formatar o nome para o formato BOTCONVERSA

            const nameArray = user.name.split(' ')
            let firstName = ''
            let lastName = ''
            if (nameArray.length > 1) {
              firstName = nameArray[0]
              lastName = nameArray[nameArray.length - 1]
            } else {
              firstName = nameArray[0]
              lastName = '.'
            }

            // Selecionar o texto escolhido para envio

            this.process = 'loading'
            let message = selectedModel[0].text
            const title = selectedModel[0].title
            message = this.checkMessage(message, user)
            const fomartedPhone = this.formatedPhone(user.phone)

            // Envio dos dados através da API

            if (user.botConversaId) {
              const id = user.botConversaId
              const response = await this.sendMessageAPi(this.affiliate.botConversaAPI, id, message)
              if (response.status === 200) {
                console.log('Mensagem enviado com sucesso')

                const tempObj = {
                  userName: user.name,
                  userPhone: user.phone,
                  modelTitle: title,
                  date: Date.now(),
                  origin: 'users'
                }

                await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`whatsMessage/${Date.now()}`).update(tempObj)

                this.process = 'concluded'
                this.status = {
                  info: 'Mensagem enviada com sucesso para o cliente.',
                  color: 'alert-success'
                }
                setTimeout(() => {
                  this.status = {
                    info: '',
                    color: ''
                  }
                }, 3000)
                console.log(response)
              } else if (response.status === 400) {
                await this.createAndSend(user, firstName, lastName, fomartedPhone, message, title)
              } else {
                this.process = 'error'
                console.log('Erro no Envio da mensagem')
                console.log(response)
              }
            } else {
              this.createAndSend(user, firstName, lastName, fomartedPhone, message)
            }
          } else {
            this.status.color = 'alert-warning'
            this.status.info = 'É necessário escolher um modelo de mensagem'
            setTimeout(() => {
              this.status.color = ''
              this.status.info = ''
            }, 2000)
          }
        } else {
          this.$root.$emit('SavingKeyAPI::show')
          this.showModal = false
        }
      } else {
        const tempObj = {
          userName: user.name,
          userPhone: user.phone,
          modelTitle: '',
          date: Date.now(),
          origin: 'users'
        }

        const selectedModel = this.whatsList.filter(model => model.selected && model.selected === true)
        if (selectedModel.length) {
          let message = selectedModel[0].text
          message = this.checkMessage(message, user)
          const phoneNumber = user.phone.replace(/[^a-zA-Z0-9]/g, '')
          tempObj.modelTitle = selectedModel[0].title
          await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`whatsMessage/${Date.now()}`).update(tempObj)
          window.open(`https://wa.me//55${phoneNumber}?text=${message}`, '_blank')
        } else {
          this.$toast('My toast content', {
            timeout: 2000
          })
        }
      }
    },
    async createContact (apiKey, firstName, lastName, userPhone) {
      const apiUrl = 'http://localhost:5001/emissaosimplestestes/us-central1/api/create-subscriber'
      // const apiKey = '077f1900-55c4-42f9-af88-9d67961063bc' // Replace this with your actual API key

      const dataToSend = {
        apiKey: apiKey,
        user: {
          first_name: firstName,
          last_name: lastName,
          phone: `+55${userPhone}`
        }
      }
      try {
        // Chamar API para enviar o email e esperar resposta
        const response = await this.$http.post(apiUrl, dataToSend)
        console.log(response.data)
        console.log('Contado criado com sucesso:')
        return response.data
      } catch (error) {
        console.error('Falha na criação do contato:', error)
        return 'false'
      }
    },
    async createAndSend (user, firstName, lastName, fomartedPhone, message, title) {
      const result = await this.createContact(this.affiliate.botConversaAPI, firstName, lastName, fomartedPhone)
      if (result.status !== 200) {
        console.log(result)
      } else {
        const id = result.info.id
        await this.$firebase.database().ref(`users/${this.user.uId}`).update({ botConversaId: id })
        user.botConversaId = id
        const response = await this.sendMessageAPi(this.affiliate.botConversaAPI, id, message)
        if (response.status !== 200) {
          this.status = {
            info: response.data,
            color: 'alert-danger'
          }
          setTimeout(() => {
            this.status = {
              info: '',
              color: ''
            }
            this.process = 'initial'
          }, 3000)
          console.log('Erro no Envio da mensagem(Pós Criação)')
          console.log(response)
        } else {
          this.process = 'concluded'
          const tempObj = {
            userName: user.name,
            userPhone: user.phone,
            modelTitle: title,
            date: Date.now(),
            origin: 'users'
          }

          await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`whatsMessage/${Date.now()}`).update(tempObj)

          this.status = {
            info: 'Mensagem enviada com sucesso para o cliente.',
            color: 'alert-success'
          }
          setTimeout(() => {
            this.status = {
              info: '',
              color: ''
            }
          }, 3000)
          console.log('Mensagem enviado com sucesso')
          console.log(response)
        }
      }
    },
    async sendMessageAPi (apiKey, userId, message) {
      const apiUrl = 'http://localhost:5001/emissaosimplestestes/us-central1/api/sendMessage'

      const dataToSend = {
        apiKey: apiKey,
        message: message,
        userId: userId
      }

      try {
        // Chamar API para enviar o email e esperar resposta
        const response = await this.$http.post(apiUrl, dataToSend)
        return response.data
      } catch (error) {
        return error
      }
    },

    // Envio de email

    async sendEmail (user) {
      this.sended = true
      const selectedModel = this.emailList.filter(model => model.selected && model.selected === true)
      if (selectedModel.length > 0) {
        try {
          this.process = 'loading'
          this.model = selectedModel[0]
          this.mailTitle = selectedModel[0].title
          this.mailBody = selectedModel[0].text
          if (this.model.type === 'Apresentação') {
            const tempObj = {
              userName: user.name,
              userMail: user.email,
              mailBody: selectedModel[0].text,
              template: this.model.templateTitle,
              templateTitle: this.model.type,
              date: Date.now(),
              origin: 'users'
            }
            const result = await sendSalesBusiness(this.affiliate, user.name, user.email, this.mailTitle, this.mailBody)
            if (result === 200) {
              const date = new Date()
              await this.$firebase.database().ref(`users/${user.uId}`).update({ lastSendDate: date })
              await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`mailMessage/${tempObj.date}`).update(tempObj)
            } else {
              console.log('Essa usuário não deu certo:' + user)
              this.process = 'error'
            }
          } else {
            const tempObj = {
              userName: user.name,
              userMail: user.email,
              mailBody: selectedModel[0].text,
              template: this.model.templateTitle,
              templateTitle: this.model.type,
              date: Date.now(),
              origin: 'users'
            }
            const result = await sendSalesMessage(this.affiliate, user.name, user.email, this.mailTitle, this.mailBody)
            if (result === 200) {
              const date = new Date()
              await this.$firebase.database().ref(`users/${user.uId}`).update({ lastSendDate: date })
              await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`mailMessage/${tempObj.date}`).update(tempObj)
              this.process = 'concluded'
            } else {
              console.log('Esse usuário não deu certo:' + user)
              this.process = 'error'
            }
          }
          this.process = 'concluded'
          setTimeout(() => {
            this.showModal = false
          }, 500)
        } catch (error) {
          this.process = 'error'
          console.log(error)
        }
      } else {
        this.warning = true
      }
    },

    // Funções de manipulação de dados

    checkMessage (message, user) {
      // Formatar Título do e-mail
      const regex = /\[([^\]]+)\]/g
      const matchesTitle = [...message.matchAll(regex)]
      const wordsInTitle = matchesTitle.map(match => match[1])
      for (const word of wordsInTitle) {
        if (word.toLowerCase() === 'nome') {
          const regexName = /\[([^\]]*nome[^\]]*)\]/g
          const letter = user.name[0].toUpperCase()
          const name = user.name.toLowerCase().slice(1)
          const sum = letter + name
          const firstName = sum.split(' ')[0]
          message = message.replace(regexName, firstName)
        }
        if (word.toLowerCase() === 'telefone') {
          const regexPhone = /\[([^\]]*telefone[^\]]*)\]/g
          message = message.replace(regexPhone, user.phone)
        }
        if (word.toLowerCase() === 'email' || word.toLowerCase() === 'e-mail') {
          const regexmail1 = /\[([^\]]*email[^\]]*)\]/g
          const regexmail2 = /\[([^\]]*e-mail[^\]]*)\]/g
          message = message.replace(regexmail1, user.email)
          message = message.replace(regexmail2, user.email)
        }
        if (word.toLowerCase() === 'origem' && user.originData && user.originData.origin) {
          const regexOrigin = /\[([^\]]*origem[^\]]*)\]/g
          message = message.replace(regexOrigin, user.originData.origin)
        }
      }
      message = message.replaceAll('\n', '%0a')
      return message
    },
    checkEmail () {
      const regex = /\[([^\]]+)\]/g
      const matchesTitle = [...this.mailTitle.matchAll(regex)]
      const wordsInTitle = matchesTitle.map(match => match[1])
      if (wordsInTitle.length > 0) {
        for (const word of wordsInTitle) {
          if (word.toLowerCase() === 'nome') {
            const regexName = /\[([^\]]*nome[^\]]*)\]/g
            const letter = this.lead.name[0].toUpperCase()
            const name = this.lead.name.toLowerCase().slice(1)
            const sum = letter + name
            const firstName = sum.split(' ')[0]
            this.mailTitle = this.mailTitle.replace(regexName, firstName)
          }
          if (word.toLowerCase() === 'telefone') {
            const regexPhone = /\[([^\]]*telefone[^\]]*)\]/g
            this.mailTitle = this.mailTitle.replace(regexPhone, this.lead.phone)
          }
          if (word.toLowerCase() === 'email' || word.toLowerCase() === 'e-mail') {
            const regexmail1 = /\[([^\]]*email[^\]]*)\]/g
            const regexmail2 = /\[([^\]]*e-mail[^\]]*)\]/g
            this.mailTitle = this.mailTitle.replace(regexmail1, this.lead.email)
            this.mailTitle = this.mailTitle.replace(regexmail2, this.lead.email)
          }
          if (word.toLowerCase() === 'origem' && this.lead.originData && this.lead.originData.origin) {
            const regexOrigin = /\[([^\]]*origem[^\]]*)\]/g
            this.mailTitle = this.mailTitle.replace(regexOrigin, this.lead.originData.origin)
          }
        }
      }
      // Formatar Corpo do email
      const matches = [...this.mailBody.matchAll(regex)]
      const wordsInBody = matches.map(match => match[1])
      if (wordsInBody.length > 0) {
        for (const word of wordsInBody) {
          if (word.toLowerCase() === 'nome') {
            const regexName = /\[([^\]]*nome[^\]]*)\]/g
            const letter = this.lead.name[0].toUpperCase()
            const name = this.lead.name.toLowerCase().slice(1)
            const sum = letter + name
            const firstName = sum.split(' ')[0]
            this.mailBody = this.mailBody.replace(regexName, firstName)
          }
          if (word.toLowerCase() === 'telefone') {
            console.log('teste')
            const regexPhone = /\[([^\]]*telefone[^\]]*)\]/g
            this.mailBody = this.mailBody.replace(regexPhone, this.lead.phone)
          }
          if (word.toLowerCase() === 'email' || word.toLowerCase() === 'e-mail') {
            const regexmail1 = /\[([^\]]*email[^\]]*)\]/g
            const regexmail2 = /\[([^\]]*e-mail[^\]]*)\]/g
            this.mailBody = this.mailBody.replace(regexmail1, this.lead.email)
            this.mailBody = this.mailBody.replace(regexmail2, this.lead.email)
          }
          if (word.toLowerCase() === 'origem' && this.lead.origem) {
            const regexOrigin = /\[([^\]]*origem[^\]]*)\]/g
            this.mailBody = this.mailBody.replace(regexOrigin, this.lead.origem)
          }
        }
      }
      this.mailTitle = this.mailTitle.replaceAll('\n', '<br>')
      this.mailBody = this.mailBody.replaceAll('\n', '<br>')
    },
    toFavorite (model) {
      if (model.favorite) {
        model.favorite = false
        this.$firebase.database().ref(`support/textsModel/${window.uid}`).child(`whatsMessage/${model.id}`).update({ favorite: false })
      } else {
        model.favorite = true
        this.$firebase.database().ref(`support/textsModel/${window.uid}`).child(`whatsMessage/${model.id}`).update({ favorite: true })
      }
    },
    selectModel (model) {
      if (this.id === 'email') {
        for (let i = 0; i < this.emailList.length; i++) {
          if (this.emailList[i].selected === true) {
            this.emailList[i].selected = false
          }
        }
      } else {
        for (let i = 0; i < this.whatsList.length; i++) {
          if (this.whatsList[i].selected === true) {
            this.whatsList[i].selected = false
          }
        }
      }
      if (model.selected) {
        model.selected = false
        this.selectionOn = false
      } else {
        model.selected = true
        this.selectionOn = true
      }
      this.model = model
    },
    closeModal () {
      this.showModal = false
      this.concluded = false
      this.process = 'initial'
      this.removeConfirmation = false
    },
    formatEmail () {
      return this.lead.email.replace(/[^a-zA-Z0-9]/g, '')
    },
    formatedPhone (phoneNumber) {
      const numericPhoneNumber = phoneNumber.replace(/\D/g, '')
      return numericPhoneNumber
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-send {
  display: flex;
  align-items: center;
  background: rgba(27, 163, 142, .15) !important;
  padding: 11px 12px !important;
  transition: all .3s !important;

  &:hover {
    background: rgba(6, 128, 109, 0.15)!important;
    transform: translate(0, -3px);
  }
}
.btn-send-mail {
    margin-right: -8px;
    display: flex;
    align-items: center;
    background-color: rgba(245, 245, 245, 1);
    padding: 11px 12px !important;
    transition: all .3s !important;

    &:hover{
      background-color: #e9e6e6;
      transform: translate(0, -3px);
    }
}
.btn-send-mail-checked {
    margin-right: -8px;
    display: flex;
    align-items: center;
    background-color: rgba(245, 245, 245, 1);
    padding: 11px 12px !important;
    transition: all .3s !important;
}
::selection {
  background:#E9F4F2 !important;
}
::-webkit-scrollbar {
  width: 8px !important;
}
.btn-config {
  display: flex;
  align-items: center;
  gap: 5px;
  letter-spacing: 0.5px;
  font-size: 12.5px;
  padding: 10px 16px !important;
  color: #fafafa;
  border: 2px solid rgb(6, 131, 115, 0.30)!important;
  transition: all .3s !important;

  &:hover{
    background: rgba(6, 128, 109, 0.15)!important;
    transform: translate(0, -3px);
  }

  &:focus {
    box-shadow: 0 0 0 0.1rem rgba(6, 128, 109, 0.5);
  }
}
.custom-dropdown {
  width: 216px;
  letter-spacing: 0.5px;
  font-size: 12.5px;
  padding: 10px 16px !important;
  color: #fafafa;
  background: #2fb490 !important;
  border: 2px solid rgba(6, 128, 109, 0.15)!important;

  transition: all .3s !important;

  .dropdown-divider {
    color: rgba(6, 128, 109, 0.15)!important;
    background-color: rgba(6, 128, 109, 0.15)!important;
    border: 1px solid rgba(6, 128, 109, 0.15)!important;

  }
  .dropdown-item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fafafa;
    font-size: 12.5px;
    font-weight: 400;
    padding: 0;
    margin: 0 !important;
    height: 30px !important;
    svg {
      margin-right: 8px;
    }
    &:hover {
      background-color: #0dce9a;
      font-size: 13px;
      transform: translate(0, -2px);
      cursor: pointer;
    }
  }

  .btn-choose {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    letter-spacing: 0.5px;
    font-size: 12.5px;
    padding: 10px 16px !important;
    color: #fafafa;
    width: 100%;
    border: none!important;
    transition: all .3s !important;

    &:hover{
      background: rgba(6, 128, 109, 0.15)!important;
      transform: translate(0, -3px);
    }

    &:focus {
      box-shadow: 0 0 0 0.1rem rgba(6, 128, 109, 0.5);
    }
  }
}
.modal-content {
  width: 50vw;
  height: 95vh;
  margin-top: -20px;
  margin-left: 250px;
  outline: 2px solid #2FB490;
  border-radius: 8px !important;

  .body-container {
    display: flex;
    height: 100%;
    .body-content {
      display: flex;
      width: 100%;
      .container-list {
        width: 100%;
        padding: 0px;
        .inner-container {
          display: flex;
          justify-content: space-between;
          padding: 30px 30px 0px 30px !important;

          .title-container {
            display: flex;
            align-items: center;
            gap: 5px;
            h5 {
              margin-bottom: 2px;
              font-size: 22px;
              font-weight: 600;
              color: #5b5d6b;
            }
          }
        }
        .lead-info-container {
          padding: 0px 30px 0px 30px !important;

          h6 {
              font-size: 15px;
              font-weight: 600;
              color: #5b5d6b;
              margin-bottom: 3px;

            }

          .tip-container {
            margin-bottom: 6px;
            span {
              font-size: 13px;
              font-weight: 500;
              color: #5b5d6b;
            }
          }
        }
        .models-container{
          display: flex;
          flex-direction: column;
          align-items: center;
          width: auto;
          gap: 10px;
          height: 715px;
          background-color: #E9F4F2;
          padding: 10px;
          overflow-y: scroll;
          padding: 30px 30px 0px 30px !important;

          .model-container {
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            background-color: #ffffff ;
            width: 100%;
            height: 100px;
            outline: 1px solid #bef1e3;
            padding: 10px;
            .first-line-container {
              display: flex;
              justify-content: space-between;
              height: 15px;
              margin-bottom: 10px;
              h6 {
                color: #5b5d6b;
              }
              .icon-container {
                display: flex;
                gap: 2px;

                .eye-icon {
                  margin-top: -3px;
                  cursor: pointer;

                  &:hover {
                    fill: #404252;
                  }
                }
                svg {
                  margin-top: -5px;

                }
              }
            }
            .text-model {
              cursor: pointer;
              color: #5b5d6b;
              margin: 0;
              height: 80px !important;

              strong {
                font-size: 16px;
              }
              .text-container {
                cursor: pointer;
                color: #5b5d6b;
                font-size: 13px;
                font-weight: 500;
                text-align: justify;
                width: 100%;
                &:disabled {
                  background-color: #ffffff !important;
                }

                &::-webkit-scrollbar {
                  width: 5px !important;
                }
              }
            }

            &:hover {
              box-shadow: 5px 5px 5px 5px rgba(165, 165, 165, 0.1);
              outline: 2px solid #67debe;
            }
            &.activated {
              box-shadow: 5px 5px 5px 5px rgba(165, 165, 165, 0.1);
              outline: 2px solid rgb(13, 206, 154, 0.5);
              background-color: #DDF1EE;
            }
          }
        }
        .buttons-container {
          display: flex;
          justify-content: space-between;
          background-color: #E9F4F2;
          padding-right: 15px;
          height: 60px;
          padding: 0px 30px 0px 30px !important;

          .warning-selection {
            color: var(--warning);
            font-weight: 00 !important;
            font-size: 14px !important;
            margin-top: 5px;
            margin-right: 15px;
            width: 410px;
            padding-bottom: 3px !important;
          }
          .btn-send-whats {
            margin-right: 0px !important;
            margin-bottom: 20px !important;
            color: white !important;
            border: 3px solid var(--featured-light) !important;
            background-color: var(--featured-light);
            padding: 6px 14px !important;
            font-weight: 600 !important;
            font-size: 16px;
            letter-spacing: 0.7px;
            transition: all .5s !important;

            .loading-clock {
              width: 20px;
            }

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
            .activated {
              background-color: white !important;
            }
          }
          .btn-undo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            color: #777986 !important;
            border: none;
            background-color: #E9F4F2;
            padding: 6px 9px !important;
            font-weight: 500 !important;
            font-size: 17px;
            letter-spacing: 0.5px;
            margin-left: 5px !important;
            margin-bottom: 10px !important;
            transition: all .3s !important;
            &:hover{
                transform: translate(0, -3px);
            }
          }
        }
      }
      .container-list-email {
        width: 100%;
        height: 100%;
        padding: 0px;
        .inner-container {
          display: flex;
          padding: 30px 30px 0px 30px !important;
          .title-container {
            display: flex;
            align-items: center;
            gap: 5px;
            h5 {
              margin-bottom: 2px;
              font-size: 22px;
              font-weight: 600;
              color: #5b5d6b;
            }
          }
          .config-container {
            &:hover {
              cursor: pointer;
              background-color: red;
              svg {
                fill: red
              }
            }
          }
          .warning {
            color: var(--success);
            font-size: 12px;
            margin-top: 5px;
            margin-left: 450px;
          }
          .btn-add {
            margin: 0 !important;
            align-self: flex-end;
            display: flex;
            gap: 5px;
            height: auto;
            padding: 2px;
            color: white !important;
            border: 3px solid var(--featured-light) !important;
            border-radius: 3px;
            background-color: var(--featured-light) !important;
            transition: all .3s !important;
            &:hover {
              transform: translate(0, -3px);
              border: 3px solid #2fb490 !important;
              background-color: #2fb490 !important;
            }
          }
        }
        .lead-info-container {
          padding: 0px 30px 0px 30px !important;

          h6 {
              font-size: 15px;
              font-weight: 600;
              color: #5b5d6b;
              margin-bottom: 3px;

            }

          .tip-container {
            margin-bottom: 6px;
            span {
              font-size: 13px;
              font-weight: 500;
              color: #5b5d6b;
            }
          }
        }
        .models-container{
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: auto;
          height: 715px;
          background-color: #E9F4F2;
          padding: 10px;
          overflow-y: scroll;
          padding: 30px 30px 0px 30px !important;

          .model-container {
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            background-color: #fafafa;
            width: 100%;
            height: 140px;
            outline: 1px solid #bef1e3;
            padding: 10px;
            cursor: pointer !important;

            &.activated {
              box-shadow: 5px 5px 5px 5px rgba(165, 165, 165, 0.1);
              outline: 2px solid rgb(13, 206, 154, 0.5);
              background-color: #DDF1EE;
            }

            .template-type {
              display: flex;
              justify-content: space-between;

              span {
                font-style: normal;
                font-weight: 700;
                line-height: 20px;
                font-size: 14px;
                background: rgba(19, 207, 154, .7);
                border-radius: 4px;
                color: #ffffff;
                padding: 3px 9px;
                margin-bottom: 5px;
              }
            }
            h6 {
              color: #5b5d6b;
            }
            .text-model {
              cursor: pointer;
              color: #5b5d6b;
              margin: 0;
              margin-top: 1px;
              height: 80px !important;

              strong {
                font-size: 16px;
              }
              .text-container {
                cursor: pointer;
                color: #5b5d6b;
                font-size: 13px;
                font-weight: 500;
                text-align: justify;
                width: 100%;
                &:disabled {
                  background-color: #ffffff !important;
                }

                &::-webkit-scrollbar {
                  width: 5px !important;
                }
              }
            }
            &:hover {
              box-shadow: 5px 5px 5px 5px rgba(165, 165, 165, 0.1);
            }
            .buttons-container {
              display: flex;
              justify-content: flex-end;
              gap: 5px;
              // margin-top: 8px;
              .btn-finalize{
                color: #2fb490;
                border: 2px solid #bef1e3 !important;
                border-radius: 3px;
                background-color: #bef1e3 !important;
                padding: 0px 9px !important;
                font-size: 12px;
                font-weight: 700 !important;
                letter-spacing: 0.5px;
                transition: all .3s !important;
                cursor: pointer;
                &:hover{
                    transform: translate(0, -3px);
                    border: 2px solid #67debe !important;
                    background-color: #67debe !important;
                }
                &:focus {
                    background-color: white !important;
                    color: var(--featured) !important;
                    transform: translate(0, -3px);
                    outline: none !important;
                    box-shadow: none !important;
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
          }
        }
        .buttons-container {
          display: flex;
          justify-content: space-between;
          background-color: #E9F4F2;
          padding: 10px 40px 10px 30px;
          height: 60px;
          .warning-selection {
            color: var(--warning);
            font-weight: 00 !important;
            font-size: 14px !important;
            margin-right: 15px;
            width: 410px;
            padding-bottom: 3px !important;
          }
          .btn-send-mail {
            color: white !important;
            border: 3px solid var(--featured-light) !important;
            background-color: var(--featured-light);
            padding: 6px 14px !important;
            font-weight: 600 !important;
            font-size: 16px;
            letter-spacing: 0.7px;
            transition: all .5s !important;

            .loading-clock {
              width: 20px;
              margin-left: 5px;
            }

            i {
              margin-left: 5px;
            }

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
            .activated {
              background-color: white !important;
            }
          }
          .btn-undo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            color: #777986 !important;
            border: none;
            background-color: #E9F4F2;
            padding: 6px 9px !important;
            font-weight: 500 !important;
            font-size: 17px;
            letter-spacing: 0.5px;
            margin-left: 5px !important;
            margin-bottom: 10px !important;
            transition: all .3s !important;
            &:hover{
                transform: translate(0, -3px);
            }
          }
        }
      }
    }
  }
}
.alert-container {
    left: 41.1% !important;
    right: 28.2% !important;
    top: 2px !important;
  }
</style>
