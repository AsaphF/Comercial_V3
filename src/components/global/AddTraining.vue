<template>
  <div>
    <div class="modal-fade"  :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
        <form @submit.prevent="getModalInfo()" v-if="!trainingConcluded" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Agende o seu treinamento</h5>
            <div class="modal-header-buttons">
              <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="19.5" cy="19.5" r="18.5" stroke="#2FB490" stroke-width="2"/>
                <path d="M16.576 15.4V13.336H20.432V25H18.128V15.4H16.576Z" fill="#404252"/>
              </svg>
              <svg class="circle" width="60" height="1" viewBox="0 0 60 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.5" x2="60" y2="0.5" stroke="#D2D4DA"/>
              </svg>
              <button type="submit" style="padding: 0 !important;">
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="19.5" cy="19.5" r="18.5" stroke="#B3B5BD" stroke-width="2"/>
                  <path d="M15.9583 22.472C16.9823 21.6187 17.7983 20.9093 18.4062 20.344C19.0143 19.768 19.5209 19.1707 19.9263 18.552C20.3316 17.9333 20.5343 17.3253 20.5343 16.728C20.5343 16.184 20.4063 15.7573 20.1503 15.448C19.8943 15.1387 19.4996 14.984 18.9663 14.984C18.4329 14.984 18.0223 15.1653 17.7343 15.528C17.4463 15.88 17.2969 16.3653 17.2863 16.984H15.1103C15.1529 15.704 15.5316 14.7333 16.2463 14.072C16.9716 13.4107 17.8889 13.08 18.9983 13.08C20.2143 13.08 21.1476 13.4053 21.7983 14.056C22.4489 14.696 22.7743 15.544 22.7743 16.6C22.7743 17.432 22.5503 18.2267 22.1023 18.984C21.6543 19.7413 21.1423 20.4027 20.5663 20.968C19.9903 21.5227 19.2383 22.1947 18.3103 22.984H23.0303V24.84H15.1263V23.176L15.9583 22.472Z" fill="#404252"/>
                </svg>
              </button>
            </div>
          </div>
            <div class="modal-body pr-3 pl-3">
              <div class="row form-group">
                <label class="form-label">Nome</label>
                <input v-model="trainingData.name" type="text" class="form-control" disabled>
              </div>
              <div class="row form-group">
                <label class="form-label" style="margin-right: -20px;">Nome da Contabilidade</label>
                <input v-model="trainingData.accountingName" type="text" class="form-control" disabled>
              </div>
              <div class="row form-group">
                <label class="form-label" style="margin-right: -20px;">Quantas pessoas irão participar ?</label>
                <input v-model="trainingData.numberParticipants" type="number" class="form-control" min="1" max="50" placeholder="0" required>
              </div>
              <div class="row form-group">
                <label class="form-label" style="margin-right: -20px;">Qual o email do participante principal ?</label>
                <input v-model="trainingData.emailParticipant" type="email" class="form-control" placeholder="seu@email.com.br" required>
              </div>
              <div class="row form-group">
                <label class="form-label" style="margin-right: -30px;">Tempo disponível para treinamento ?</label>
                <select class="form-control" type="time" list="popularHours" max="03:00" placeholder="Horário Máximo" style="color: #404252 !important;" required>
                  <option value="00:30">00:30</option>
                  <option value="00:30">01:00</option>
                  <option value="00:30">01:30</option>
                  <option value="00:30">02:00</option>
                  <option value="00:30">02:30</option>
                  <option value="00:30">03:00</option>
                </select>
              </div>
              <div class="row form-group">
                <div class="form-label">Quais assuntos está com dúvida ?</div>
                <div class="grid-container w-100" style="margin-left: -10px; margin-top: -10px;">
                  <div class="grid-item" v-for="subject in this.trainingData.subjects" :key="subject.id">
                    <div :for="subject.title">
                      <label class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" v-model="subject.checked">
                        <span v-if="subject.title.length > 5" class="custom-control-label" style="font-size: 14px !important;">{{subject.title}}</span>
                        <span v-else class="custom-control-label" style="font-size: 14px !important;">{{subject.title}}</span>
                      </label>
                    </div>
                </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-sm btn-confirm w-100">
                <template v-if="showModal" style="transition: all .3s !important">
                  Continuar
                </template>
              </button>
              <div v-if="showAlert" class="alert-container" >
                <small>É preciso escolher pelo menos um assunto.</small>
                <i class="fas fa-exclamation"></i>
              </div>
            </div>
        </form>
        <div v-else class="modal-content">
          <div class="conclusion-container">
            <h4 class="conclusion-title">Treinamento Agendado</h4>
            <p class="conclusion-text_1">Teremos o prazer de lhe oferecer toda atenção, através do nosso treinamento humanizado.
                                          Nossos especialistas entrarão em contato com você.</p>
            <div class="affirmation-container">
              <p>Data e horário:</p>
              <p>{{ date }}</p>
            </div>
            <!--<div class="button-container" @click="removeTrainig()">
              <button class="btn-danger" @click="removeTrainig()">Remarcar Treinamento</button>
            </div>-->
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{ display: showModal ? 'block' : 'none' }"></div>
    </div>
    <AddDateTraining :trainingForm="trainingData"/>
  </div>
</template>

<script>
import AddDateTraining from './AddDateTraining.vue'
import moment from 'moment'

export default {
  props: ['propsUser', 'propsPlan'],
  name: 'AddTraining',
  components: {
    AddDateTraining
  },
  data: () => ({
    showModal: false,
    showAlert: false,
    trainingConcluded: false,
    user: '',
    trainingData: {
      id: moment().unix(),
      clientId: window.uid,
      name: '',
      accountingName: '',
      plan: 'fafaf',
      numberParticipants: 0,
      subjects: [],
      maxTime: '00:30',
      emailRegistered: '',
      emailParticipant: ''
    },
    errorCheck: false
  }),
  // Pega a lista de assuntos e as manipula
  async created () {
    await this.$firebase.database().ref('support/subjects').on('value', snapshot => {
      const values = snapshot.val()
      if (values) {
        this.trainingData.subjects = Object.keys(values).map(i => values[i])
        const tempSubj = this.trainingData.subjects.map(subj => { return { ...subj, checked: false } })
        this.trainingData.subjects = tempSubj
      }
    })
    await this.$firebase.database().ref('users/Mnb5gJEzUAPYzplonKlQuRz3BTY2').on('value', snapshot => {
      const values = snapshot.val()
      if (values) {
        this.user = values
        console.log(this.user)
      }
    })
    this.$root.$on('AddTrainingModal::show', () => this.openModal())
  },
  computed: {
    // Assegura que os assuntos sejam sempre manipulados
    subjects () {
      const tempSubj = this.trainingData.subjects.map(subj => { return { ...subj, checked: false } })
      return tempSubj
    },
    date () {
      const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
      const lastTrainingDate = moment.unix(new Date(this.user.lastTrainingDate))
      const dayofWeek = weekdays[lastTrainingDate.weekday()]
      const dayAndMonth = months[lastTrainingDate.month()]
      const day = lastTrainingDate.format('DD')
      return `${dayofWeek}, ${day} de ${dayAndMonth}` + ' - ' + lastTrainingDate.format('HH:mm')
    }
  },
  methods: {
    // Pega as informação do formulário para passar para próxima etapa
    getModalInfo () {
      if (this.trainingData.subjects.every((subj) => subj.checked !== true)) {
        this.showAlert = true
      } else {
        for (const data in this.trainingData) {
          if (this.trainingData[data] === undefined | this.trainingData[data] === null) {
            this.errorCheck = true
          }
        }
        if (!this.errorCheck) {
          this.showModal = false
          this.$root.$emit('AddCalendarModal::show')
          this.$root.$emit('AddDateTraining::show')
        }
      }
    },
    closeModal () {
      this.showModal = false
    },
    openModal () {
      if (!this.user.lastTrainingId) {
        this.trainingConcluded = true
        this.showModal = true
      } else {
        this.trainingData.name = this.user.name
        this.trainingData.accountingName = this.user.fantasia
        this.trainingData.plan = this.propsPlan
        this.trainingData.emailRegistered = this.user.email
        this.trainingConcluded = false
        this.showModal = true
      }
    },
    async removeTrainig () {
      if (this.propsUser.lastTraining) {
        await this.$firebase.database().ref('support').child('trainings').child(this.propsUser.lastTraining).remove()
        await this.$firebase.database().ref(`propsUsers/${window.uid}`).child('lastTrainingId').remove()
      }
      this.trainingConcluded = false
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
::placeholder {
  color:#B3B5BD;
  border-radius: 0 !important;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 0px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #d1d1d1;
  border-radius: 5px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:#c1c1c1;
}
.btn-confirm {
  margin-top: -10px;
  color: #ffff !important;
  background-color: #0DCE9A !important;
  padding: 10px 20px !important;
  font-weight: 600 !important;
  font-size: 15px;
  transition: all .3s !important;

  &:hover{
      background-color: var(--featured) !important;
      color:  white !important;
      transform: translate(0, -2px);
  }
  &:focus {
      background-color: var(--featured) !important;
      color:  white !important;
      transform: translate(0, -2px);
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
  }
}
.modal-fade{
  position: absolute;
  top: 20;
  right: 0px;
  transition-property: right;
}
.modal-dialog{
  margin: 7px 0 !important;
  overflow-y: hidden !important;
}
.modal-content{
  overflow-y: hidden !important;
  margin: auto 0;
  border-radius: 7px 0 0 7px  !important;
  width: 430px;
  padding-top: 15px !important;
  max-height: 95vh !important;
  min-height: 95vh !important;
  .modal-header{
    margin: 0 auto;
    display: flex !important;
    flex-direction: column !important;
    padding-bottom: 10px;
    .modal-title {
      color: #068373 !important;
      margin: -5px auto 15px auto !important;
      font-weight: 700 !important;
    }
    .modal-header-buttons {
      display: flex !important;
      margin: 0 auto !important;
      .circle {
        margin: 20px auto 10px auto !important;
      }
      button {
        border: none !important;
        background-color: white !important;

        img {
          margin: 10px auto 10px auto;
          cursor: pointer;
        }
      }
    }
  }
  .modal-body{
    overflow-x: hidden !important;
    overflow-y: auto !important;
    height: 100%;
    margin-top: 0;
    margin-bottom: -8px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 50%;
    .form-group{
      margin: 5px 0;
      .form-label{
        margin: 0;
        color: #404252;
        font-weight: 600;
        font-size: 15px;
      }
    }
    .grid-container{
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 10px;

      .grid-item {
        padding: 6px;
        text-align: start !important;
      }
    }
  }
  .modal-footer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 20px;
    padding-right: 25px;
    .alert-container {
      text-align: center;
      color: #f64d4d;
      margin: 0 auto;
      small {
        margin-right: 5px;
      }
    }
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
.modal-content {
  background-color: #ffff;
  .conclusion-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto 0;
    padding-bottom: 150px;
    .conclusion-title {
      text-align: center !important;
      color: #068373 !important;
      font-weight: 800 !important;
    }
    .conclusion-text_1 {
      text-align: center !important;
      color: #5B5D6B !important;
      padding-top: 5px !important;
      font-weight: 400 !important;
      padding: 8px 45px !important;
    }
    .conclusion-text_2 {
      text-align: center !important;
      color: #5B5D6B !important;
      padding: 5px 60px !important;
      font-size: 14px !important;
      font-weight: 400 !important;
    }
    .affirmation-container {
    border-radius: 5px;
    margin: 0 auto;
    padding-top: 10px;
    text-align: center;
    width: 300px;
    height: 80px;
    background-color: #1BA38E;
    color: #FFFFFF;

    p:first-child {
      font-size: 14px !important;
      font-weight: 400 !important;
    }
    p:last-child {
      font-size: 17px !important;
      font-weight: 700 !important;
      margin-top: -10px !important;
    }
    }
    .button-container {
      .btn-danger {
        margin-top: 20px;
        color: var(--danger) !important;
        width: 190px !important;
        border-radius: 5px !important;
        background-color: #FFFFFF !important;
        padding: 10px 5px !important;
        font-weight: 400 !important;
        font-size: 12px;
        transition: all .3s !important;
        cursor: pointer !important;

        &:hover {
          border: 1px solid var(--danger) !important;
        }
      }
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
.input-time {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  width: 60px !important;
  height: 30px !important;
  background-color: transparent;
  border: none;
  cursor: pointer;
  box-shadow: none !important;
}
.input-time::-webkit-color-swatch {
  border-radius: 7px !important;
  border: none !important;
}
.input-time::-moz-color-swatch {
  border-radius: 7px !important;
  border: none !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
</style>
