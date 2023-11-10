<template>
  <div>
    <div class="modal-fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
          <div v-if="!showConcluded" class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Agende o seu treinamento</h5>
              <div class="modal-header-buttons">
                <svg @click="$root.$emit('AddTrainingModal::show'), closeModal()" style="cursor:pointer;" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="19.5" cy="19.5" r="18.5" stroke="#B3B5BD" stroke-width="2"/>
                  <path d="M16.576 15.4V13.336H20.432V25H18.128V15.4H16.576Z" fill="#404252"/>
                </svg>
                <svg class="circle" width="60" height="1" viewBox="0 0 60 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line y1="0.5" x2="60" y2="0.5" stroke="#D2D4DA"/>
                </svg>
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="19.5" cy="19.5" r="18.5" stroke="#2FB490" stroke-width="2"/>
                  <path d="M15.9583 22.472C16.9823 21.6187 17.7983 20.9093 18.4062 20.344C19.0143 19.768 19.5209 19.1707 19.9263 18.552C20.3316 17.9333 20.5343 17.3253 20.5343 16.728C20.5343 16.184 20.4063 15.7573 20.1503 15.448C19.8943 15.1387 19.4996 14.984 18.9663 14.984C18.4329 14.984 18.0223 15.1653 17.7343 15.528C17.4463 15.88 17.2969 16.3653 17.2863 16.984H15.1103C15.1529 15.704 15.5316 14.7333 16.2463 14.072C16.9716 13.4107 17.8889 13.08 18.9983 13.08C20.2143 13.08 21.1476 13.4053 21.7983 14.056C22.4489 14.696 22.7743 15.544 22.7743 16.6C22.7743 17.432 22.5503 18.2267 22.1023 18.984C21.6543 19.7413 21.1423 20.4027 20.5663 20.968C19.9903 21.5227 19.2383 22.1947 18.3103 22.984H23.0303V24.84H15.1263V23.176L15.9583 22.472Z" fill="#404252"/>
                </svg>
              </div>
            </div>
            <div class="modal-body">
              <div class="datepicker-container">
              <!-- <DatePicker is-expanded is-required v-model="trainingDate" :disabled-dates='training.disabledDates' :min-date='new Date()' @dayclick='getAvailablesTimes' title-position="left"/> -->
              </div>
              <div class="button-container">
                <button class="date-confirmed">{{ date }}</button>
              </div>
              <div class="times-container" v-if="this.trainingForm.numberParticipants <= 10">
                <div class="inner-container" v-for="time in this.filteredAvailableTimesLow" :key="time.id">
                  <div class="btn btn-sm btn-sucess-border w-100" :style="time.styleConfirm" @click="choosingHour(time)">{{ time.hour }}</div>
                </div>
              </div>
              <div class="times-container" v-else-if="this.trainingForm.numberParticipants >= 10 && this.trainingForm.numberParticipants <= 15">
                <div class="inner-container" v-for="time in this.filteredAvailableTimesMiddle" :key="time.id">
                  <div class="btn btn-sm btn-sucess-border w-100" :style="time.styleConfirm" @click="choosingHour(time)">{{ time.hour }}</div>
                </div>
              </div>
              <div v-else class="times-container">
                <div class="inner-container" v-for="time in this.filteredAvailableTimesHigh" :key="time.id">
                  <div class="btn btn-sm btn-sucess-border w-100" :style="time.styleConfirm" @click="choosingHour(time)">{{ time.hour }}</div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="date-display">
                <div class="message" v-if="this.training.chosenHour.length < 1" disabled="disabled">{{date}}</div>
                <div class="message" v-else disabled="disabled">{{ date + ' - ' +  displayChosenHour.hour }}</div>
              </div>
              <button class="btn btn-sm btn-confirm w-100" @click="getTrainingInfo()">Confirmar</button>
              <div v-if="showAlert" class="alert-container mt-1" >
                <small>É preciso escolher um horário</small>
                <i class="fas fa-exclamation"></i>
              </div>
            </div>
          </div>
          <div v-else class="modal-content">
              <div v-if="showLoading" class="conclusion-container">
                <!-- <img src="../../../assets/images/Done-Check.svg" alt="Done" style="margin: 10px auto"> -->
                <h4 class="conclusion-title">Treinamento Agendado</h4>
                  <p class="conclusion-text_1">Teremos o prazer de lhe oferecer toda atenção, através do nosso treinamento humanizado. Nossos especialistas entrarão em contato com você.</p>
                  <div class="affirmation-container">
                    <p>Data e horário:</p>
                    <p>{{ date + ' - ' +  displayChosenHour.hour }}</p>
                  </div>
              </div>
              <div v-else class="container-fluid page-spinner-modal">
                <!-- <img class="base-spinner-modal" src="../../../assets/images/es-loading-100x100-transparente.gif"> -->
              </div>
          </div>
      </div>
      <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{ display: showModal ? 'block' : 'none' }"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
// import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  props: ['trainingForm'],
  name: 'AddDateTraining',
  components: {
    // DatePicker
  },
  data: () => ({
    showModal: false,
    showConcluded: false,
    showLoading: true,
    showAlert: false,
    trainingDate: new Date(),
    training: {
      seletcted: false,
      disabledDates: [
        {
          weekdays: [7, 1]
        },
        {
          start: new Date('2023, 04, 07'),
          end: new Date('2023, 04, 07')
        },
        {
          start: new Date('2023, 04, 21'),
          end: new Date('2023, 04, 21')
        },
        {
          start: new Date('2023, 06, 08'),
          end: new Date('2023, 06, 08')
        },
        {
          start: new Date('2023, 09, 07'),
          end: new Date('2023, 09, 07')
        },
        {
          start: new Date('2023, 10, 12'),
          end: new Date('2023, 10, 12')
        },
        {
          start: new Date('2023, 11, 02'),
          end: new Date('2023, 11, 02')
        },
        {
          start: new Date('2023, 11, 15'),
          end: new Date('2023, 11, 15')
        },
        {
          start: new Date('2023, 12, 25'),
          end: new Date('2023, 12, 25')
        }
      ],
      chosenHour: []
    },
    supporteAffiliates: [],
    duplicateTrainings: [],
    realTimeHistoric: [],
    availableTimes: [],
    filteredAvailableTimesLow: [],
    filteredAvailableTimesMiddle: [],
    filteredAvailableTimesHigh: [],
    displayChosenHour: ''
  }),
  // Inicializa o modal e recebe os dados do formulário anterior
  created () {
    // this.testeAPI()
    this.$root.$on('AddCalendarModal::show', () => { this.showModal = true })
    this.$root.$on('AddDateTraining::show', () => this.getAvailablesTimes(new Date()))
  },
  computed: {
    date: function () {
      const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Augusto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
      const dayofWeek = weekdays[moment(this.trainingDate).weekday()]
      const dayAndMonth = months[moment(this.trainingDate).month()]
      const day = moment(this.trainingDate).format('DD')
      if (this.trainingDate === null) {
        return 'Selecione uma data'
      } else {
        return `${dayofWeek}, ${day} de ${dayAndMonth}`
      }
    }
  },
  methods: {
    // Pega os horários "padrão"
    getAvailablesTimes (day) {
      if (day && day.date) {
        day = day.date
      }
      this.availableTimes = []
      if (this.trainingForm.numberParticipants <= 10) {
        const times = [{ hour: '08:00', id: 1 }, { hour: '09:00', id: 2 }, { hour: '10:00', id: 3 }, { hour: '11:00', id: 4 }, { hour: '12:30', id: 5 }, { hour: '13:30', id: 6 }, { hour: '14:30', id: 7 }, { hour: '15:30', id: 8 }, { hour: '16:30', id: 9 }]
        for (let i = 0; i < times.length; i++) {
          if ((day.date && day.date.getDate() === new Date().getDate()) || (day.getDate() === new Date().getDate())) {
            if (new Date().getHours() < Number(times[i].hour.slice(0, 2))) {
              const tempObj = {
                id: 0,
                activate: false,
                hour: '',
                styleConfirm: {
                  color: 'var(--featured) !important',
                  border: '2px solid var(--success) !important',
                  backgroundColor: 'white !important'
                }
              }
              tempObj.id = times[i].id
              tempObj.hour = times[i].hour
              this.availableTimes.push(tempObj)
            }
          } else {
            const tempObj = {
              id: 0,
              activate: false,
              hour: '',
              styleConfirm: {
                color: 'var(--featured) !important',
                border: '2px solid var(--success) !important',
                backgroundColor: 'white !important'
              }
            }
            tempObj.id = times[i].id
            tempObj.hour = times[i].hour
            this.availableTimes.push(tempObj)
          }
        }
      } else if (this.trainingForm.numberParticipants >= 10 && this.trainingForm.numberParticipants <= 15) {
        const times = [{ hour: '08:00', id: 1 }, { hour: '10:00', id: 2 }, { hour: '12:30', id: 3 }, { hour: '14:30', id: 4 }, { hour: '16:30', id: 5 }]
        for (let i = 0; i < times.length; i++) {
          if ((day.date && day.date.getDate() === new Date().getDate()) || (day.getDate() === new Date().getDate())) {
            if (new Date().getHours() < Number(times[i].hour.slice(0, 2))) {
              const tempObj = {
                id: 0,
                activate: false,
                hour: '',
                styleConfirm: {
                  color: 'var(--featured) !important',
                  border: '2px solid var(--success) !important',
                  backgroundColor: 'white !important'
                }
              }
              tempObj.id = times[i].id
              tempObj.hour = times[i].hour
              this.availableTimes.push(tempObj)
            }
          } else {
            const tempObj = {
              id: 0,
              activate: false,
              hour: '',
              styleConfirm: {
                color: 'var(--featured) !important',
                border: '2px solid var(--success) !important',
                backgroundColor: 'white !important'
              }
            }
            tempObj.id = times[i].id
            tempObj.hour = times[i].hour
            this.availableTimes.push(tempObj)
          }
        }
      } else {
        const times = [{ hour: '08:00', id: 1 }, { hour: '12:30', id: 2 }, { hour: '15:30', id: 3 }]
        for (let i = 0; i < times.length; i++) {
          if ((day.date && day.date.getDate() === new Date().getDate()) || (day.getDate() === new Date().getDate())) {
            if (new Date().getHours() < Number(times[i].hour.slice(0, 2))) {
              const tempObj = {
                id: 0,
                activate: false,
                hour: '',
                styleConfirm: {
                  color: 'var(--featured) !important',
                  border: '2px solid var(--success) !important',
                  backgroundColor: 'white !important'
                }
              }
              tempObj.id = times[i].id
              tempObj.hour = times[i].hour
              this.availableTimes.push(tempObj)
            }
          } else {
            const tempObj = {
              id: 0,
              activate: false,
              hour: '',
              styleConfirm: {
                color: 'var(--featured) !important',
                border: '2px solid var(--success) !important',
                backgroundColor: 'white !important'
              }
            }
            tempObj.id = times[i].id
            tempObj.hour = times[i].hour
            this.availableTimes.push(tempObj)
          }
        }
      }
      this.getAppointment(day)
    },
    async getAppointment (day) {
      this.duplicateTrainings = []

      if (!day.isDisabled) {
        this.filteredAvailableTimesLow = []
        this.filteredAvailableTimesMiddle = []
        this.filteredAvailableTimesHigh = []
        this.training.selectdDay = moment(day).format('YYYYMMDD')
        // Puxa os afiliados do suporte
        await this.$firebase.database().ref('support/supportAffiliates').on('value', snapshot => {
          const values = snapshot.val()
          if (values) {
            this.supporteAffiliates = Object.keys(values).map(i => values[i])
            this.supporteAffiliates = this.supporteAffiliates.filter(affiliate => affiliate.activatedTraining === true)
            // console.log(this.supporteAffiliates)
          } else {
            console.log('err')
          }
        })
        // Acessa o banco de dados para verificar os dias disponíveis
        await this.$firebase.database().ref('support/trainings').orderByChild('dayReference').equalTo(this.training.selectdDay).on('value', snapshot => {
          const values = snapshot.val()
          if (values) {
            this.realTimeHistoric = Object.keys(values).map(i => values[i])
            // Loop sobre o dados de Bd
            const arr = [...this.availableTimes]
            const arr2 = [...this.availableTimes]
            const arr3 = [...this.availableTimes]
            for (const timeHistoric of this.realTimeHistoric) {
              // Condição verificando se o dia cliquado e a quantidade de participantes são os mesmos do DB
              if (timeHistoric.dayReference && this.training.selectdDay && timeHistoric.dayReference.slice(4, 9) === this.training.selectdDay.slice(4, 9) && timeHistoric.numberParticipants && this.trainingForm.numberParticipants <= 10) {
                for (const time of this.availableTimes) {
                  if (time.hour === timeHistoric.hour && this.supporteAffiliates.length === 1) {
                    arr.splice(arr.indexOf(time), 1)
                  } else if (time.hour === timeHistoric.hour) {
                    console.log(timeHistoric.counter)
                    if (timeHistoric.counter >= this.supporteAffiliates.length) {
                      arr.splice(arr.indexOf(time), 1)
                    }
                  }
                }
                // for (let i = 0; i < arr.length; i++) {
                //   for (let j = i + 1; j < arr.length; j++) {
                //     if (arr[i] === arr[j]) {
                //       return true
                //     }
                //   }
                // }
              } else {
                this.filteredAvailableTimesLow = arr
              }
              if (timeHistoric.dayReference && this.training.selectdDay && timeHistoric.dayReference.slice(4, 9) === this.training.selectdDay.slice(4, 9) && timeHistoric.numberParticipants && this.trainingForm.numberParticipants >= 10 && this.trainingForm.numberParticipants <= 15) {
                for (const time of this.availableTimes) {
                  if (time.hour === timeHistoric.hour) {
                    this.duplicateTrainings.push(timeHistoric)
                    if (this.duplicateTrainings.length >= this.supporteAffiliates.length) {
                      arr2.splice(arr2.indexOf(time), 1)
                    }
                  }
                }
              } else {
                this.filteredAvailableTimesMiddle = arr2
              }
              if (timeHistoric.dayReference && this.training.selectdDay && timeHistoric.dayReference.slice(4, 9) === this.training.selectdDay.slice(4, 9) && timeHistoric.numberParticipants && this.trainingForm.numberParticipants > 15) {
                for (const time of this.availableTimes) {
                  if (time.hour === timeHistoric.hour) {
                    this.duplicateTrainings.push(timeHistoric)
                    if (this.duplicateTrainings.length >= this.supporteAffiliates.length) {
                      arr3.splice(arr3.indexOf(time), 1)
                    }
                  }
                }
              } else {
                this.filteredAvailableTimesHigh = arr3
              }
            }
            this.filteredAvailableTimesLow = arr
            this.filteredAvailableTimesMiddle = arr2
            this.filteredAvailableTimesHigh = arr3
          } else {
            this.filteredAvailableTimesLow = [...this.availableTimes]
            this.filteredAvailableTimesMiddle = [...this.availableTimes]
            this.filteredAvailableTimesHigh = [...this.availableTimes]
          }
        })
      } else {
        this.filteredAvailableTimesLow = []
        this.filteredAvailableTimesMiddle = []
        this.filteredAvailableTimesHigh = []
      }
    },
    choosingHour (time) {
      if (this.trainingForm.numberParticipants <= 10 || (this.trainingForm.numberParticipants >= 10 && this.trainingForm.numberParticipants <= 15) || this.trainingForm.numberParticipants > 15) {
        for (let index = 0; index < this.availableTimes.length; index++) {
          if (this.availableTimes[index].id === time.id) {
            if (!this.availableTimes[index].activate) {
              this.availableTimes[index].activate = true
              this.availableTimes[index].styleConfirm.backgroundColor = '#1BA38E !important'
              this.availableTimes[index].styleConfirm.color = 'white !important'
            } else {
              this.availableTimes[index].activate = false
              this.availableTimes[index].styleConfirm.backgroundColor = 'white !important'
              this.availableTimes[index].styleConfirm.color = 'var(--featured) !important'
            }
            this.training.chosenHour.push(this.availableTimes[index].activate === true ? this.availableTimes[index] : '')
            this.displayChosenHour = this.training.chosenHour[this.training.chosenHour.length - 1]
          } else {
            this.availableTimes[index].styleConfirm.backgroundColor = 'white !important'
            this.availableTimes[index].styleConfirm.color = 'var(--featured) !important'
          }
        }
      }
    },
    // Escolhe quem vai ficar responsável pelo treinamento e o salva.
    // async testeAPI () {
    //   try {
    //     const data = {
    //       dateTimeStart: '2023-03-31T18:30:00.000-03:00',
    //       dateTimeEnd: '2023-03-31T18:30:00.000-03:00',
    //       attendees: [
    //         { email: 'lucasmarques430@gmail.com' },
    //         { email: 'lucas.marques@emissaosimples.com.br' }
    //       ],
    //       description: 'Apresentação SimplesAcademy com participação da contabilidade:',
    //       title: 'Treinamento - SimplesAcademy'
    //     }
    //     const headers = {
    //       headers: {
    //         'Content-Type': 'text/plan',
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    //       }
    //     }
    //     const response = await this.$http.post('https://us-central1-emissaosimplestestes.cloudfunctions.net/api/create-google-meet-event', JSON.stringify(data), headers)
    //     console.log(response.date)
    //   } catch (error) {
    //     console.error(error)
    //     return false
    //   }
    // },
    async getTrainingInfo () {
      // Caso nenhum horário seja escolhido um alerta é acionado
      if (this.training.chosenHour.length < 1) {
        this.showAlert = !this.showAlerts
      } else {
        const eventDate = moment(this.training.selectdDay + '' + this.training.chosenHour[this.training.chosenHour.length - 1].hour, 'YYYYMMDDHH:mm').unix()
        const chosenAffiliates = this.supporteAffiliates[Math.floor(Math.random() * (this.supporteAffiliates.length))].id
        const trainingObj = {
          accountingName: this.trainingForm.accountingName,
          name: this.trainingForm.name,
          dayReference: String(this.training.selectdDay),
          hour: this.training.chosenHour[this.training.chosenHour.length - 1].hour,
          id: this.trainingForm.id,
          clientId: this.trainingForm.clientId,
          emailRegistered: this.trainingForm.emailRegistered,
          emailParticipant: this.trainingForm.emailParticipant,
          plan: this.trainingForm.plan,
          maxTime: this.trainingForm.maxTime,
          numberParticipants: this.trainingForm.numberParticipants,
          subjects: this.trainingForm.subjects.filter((subj) => subj.checked === true),
          affiliateResponsableId: chosenAffiliates,
          counter: 1,
          eventId: '',
          eventLink: ''
        }
        let tempCounter = 1
        for (let i = 0; i < this.realTimeHistoric.length; i++) {
          if (this.realTimeHistoric[i].hour === trainingObj.hour) {
            tempCounter = tempCounter + 1
          }
          trainingObj.counter = tempCounter
        }
        const dateTimeForCalander = () => {
          const slicedYear = trainingObj.dayReference.slice(0, 4)
          const slicedMonth = trainingObj.dayReference.slice(4, 6)
          const slicedDay = trainingObj.dayReference.slice(6, 8)
          const slicedHour = trainingObj.hour.slice(0, 2)
          const slicedMin = trainingObj.hour.slice(3, 5)
          const TIMEOFFSET = '-03:00'
          const newDateTime = `${slicedYear}-${slicedMonth}-${slicedDay}T${slicedHour}:${slicedMin}:00.000${TIMEOFFSET}`
          const event = new Date(Date.parse(newDateTime))

          const startDate = event
          // Delay in end time is 1
          const endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1))
          return {
            start: startDate,
            end: endDate
          }
        }
        const dateTime = dateTimeForCalander()
        try {
          const data = {
            dateTimeStart: dateTime.start,
            dateTimeEnd: dateTime.end,
            attendees: [
              { email: this.trainingForm.emailRegistered },
              { email: this.trainingForm.emailParticipant }
            ],
            description: `Apresentação SimplesAcademy com participação da contabilidade: ${trainingObj.accountingName}`,
            title: 'Treinamento - SimplesAcademy'
          }
          const headers = {
            headers: {
              'Content-Type': 'text/plan',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
            }
          }
          this.showConcluded = true
          this.showLoading = false
          const response = await this.$http.post('https://us-central1-emissaosimplestestes.cloudfunctions.net/api/create-google-meet-event', JSON.stringify(data), headers)
          trainingObj.eventId = response.data.eventId
          trainingObj.eventLink = response.data.googleMeetUrl
        } catch (error) {
          console.error(error)
          return false
        }
        await this.$firebase.database().ref('support').child('trainings').child(trainingObj.id).set(trainingObj)
        await this.$firebase.database().ref(`users/${window.uid}`).child('lastTrainingId').set(trainingObj.id)
        await this.$firebase.database().ref(`users/${window.uid}`).child('lastTrainingDate').set(eventDate)
        this.$root.$emit('User::refresh')
        this.showLoading = true
      }
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
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

::placeholder {
  color:#B3B5BD;
}
.modal-fade{
  position: absolute;
  top: 20;
  right: 0px;
  transition-property: right;
}
.modal-dialog{
  margin: 7px 0 !important;
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
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    border: none !important;
    padding-bottom: 10px;
    .modal-title {
      color: #068373 !important;
      margin: -5px auto 15px auto !important;
      font-weight: 700 !important;
    }
    .modal-header-buttons {
      display: flex;
      margin: 0 auto;

      .circle {
        margin: 20px auto 10px auto !important;
      }
    }
  }
  .date-display {
    .message {
      text-align: center !important;
      color: #505050 !important;
      font-weight: 400 !important;
      font-size: 16px !important;
    }
  }
  .modal-footer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 0px;
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

  .modal-body, .modal-footer {
    overflow-x: hidden !important;
    overflow-y: scroll !important;
    margin-top: 0px !important;
    .datepicker-container {
      display: flex !important;
      justify-content: center !important;
    }
    .button-container{
      margin-bottom: 10px !important;
      .date-confirmed {
        color: #ffff;
        padding: 16px 0;
        background-color: #1BA38E !important;
        margin: 0 -16px;
        width: 430px;
        border: none;
        font-weight: 600 !important;
      }
    }
    .times-container{
      height: 100%;
      overflow-y: auto !important;
      .inner-container {
        display: flex;
        justify-content: center;
        .btn-sucess-border {
          width: 250px !important;
          margin-top: 5px !important;
          margin-right: 5px !important;
          border-color: #1BA38E !important;
          padding: 10px 20px !important;
          font-weight: 400 !important;
          transition: all .3s !important;

          &:hover{
              background-color: var(--featured) !important;
              color:  white !important;
              transform: translate(0, -2px);
          }
          &:focus {
              background-color: white !important;
              color: var(--featured) !important;
              transform: translate(0, -2px);
              outline: none !important;
              box-shadow: none !important;
          }
        }
      }
    }

    .btn-confirm {
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
          background-color: white !important;
          color: var(--featured) !important;
          transform: translate(0, -2px);
          outline: none !important;
      }
    }
    .btn-confirmed {
      color: #ffff !important;
      background-color: red !important;
      border-bottom: 2px solid #046E60 !important;
      background-color: var(--featured) !important;
      padding: 10px 20px !important;
      font-weight: 400 !important;
      transition: all .3s !important;

      &:hover{
          background-color: var(--featured) !important;
          color:  white !important;
          transform: translate(0, -2px);
      }
      &:focus {
          background-color: white !important;
          color: var(--featured) !important;
          transform: translate(0, -2px);
          outline: none !important;
      }
    }
  }

  .modal-header, .modal-footer{
    border: none !important;
    overflow-y: hidden !important;
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
.modal-content {
  background-color: #ffff;
  .conclusion-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto 0;
    padding-bottom: 150px;
    .conclusion-text_1 {
      text-align: center !important;
      color: #5B5D6B !important;
      padding-top: 5px !important;
      font-weight: 400 !important;
      padding: 5px 45px !important;
    }
    .conclusion-text_2 {
      text-align: center !important;
      color: #5B5D6B !important;
      padding: 5px 60px !important;
      font-size: 14px !important;
      font-weight: 400 !important;
    }
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
  .page-spinner-modal {
      background: var(--background-gray) !important;
      z-index: 9999 !important;
      position: fixed;
  }
  .base-spinner-modal {
    position: fixed;
    top: 45%;
    right: 7%;
    height: 70px;
    transform: translate(-50%, -50%);
    z-index: 9999 !important;
  }
}
.alert-container {
  text-align: center;
  color: #f64d4d;
  small {
    margin-right: 5px;
  }
}
.fc{
    .fc-list-day-text{
        color: var(--featured) !important;
    }
    .fc-list-day-side-text{
        color: var(--featured) !important;
    }
    .fc-next-button.fc-button.fc-button-primary:hover{
        background-color: var(--featured-light) !important;
        color: white !important;
        border: 1px solid var(--featured-light) !important;
    }
    .fc-prev-button.fc-button.fc-button-primary:hover{
        background-color: var(--featured-light) !important;
        color: white !important;
        border: 1px solid var(--featured-light) !important;
    }
    .fc-next-button.fc-button.fc-button-primary {
        border-radius: 0;
    }
    .fc-button-primary {
        background-color: var(--featured-light) !important;
        border: none !important;
        &:focus{
            outline: none !important;
            box-shadow: none !important;
        }
        &:active{
            outline: none !important;
            box-shadow: none !important;
        }
    }
    .fc-toolbar-chunk{
        .fc-button-group{
            .fc-button-primary {
                background-color: white !important;
                color: var(--featured-light) !important;
                border: 1px solid var(--featured-light) !important ;
            }
            .fc-button-active{
                background-color: var(--featured-light) !important;
                color: white !important;
            }
        }
    }
    .fc-col-header-cell-cushion {
        color: var(--featured) !important;
    }

    th:first-child {
        padding: 0 !important;
    }

    .fc-daygrid-day.fc-day-today {
        background-color: var(--green-light) !important;
        font-weight: 700;
    }

    .fc-daygrid-day-number {
        color: #505050 !important;
        margin: 5px auto;
    }

    .fc-toolbar-title{
        font-size: 18px !important;
        font-weight: 700;
        margin-left: 100px !important ;
        color: #505050 !important;
    }

    .fc-toolbar-ltr {
        margin-bottom: 10px !important;
    }
    .fc-timegrid-axis-cushion.fc-scrollgrid-shrink-cushion.fc-scrollgrid-sync-inner{
        content: '' !important;
        font-size: 0px;
    }

    .fc-timegrid-divider.fc-cell-shaded{
        display: none;
    }

    .fc-timegrid-axis-cushion.fc-scrollgrid-shrink-cushion.fc-scrollgrid-sync-inner:after{
        content: 'Hoje' !important;
        font-size: 14px;
        text-align: left;
    }
    .fc-highlight .fc-daygrid-bg-harness .fc-daygrid-day{
        max-height: 150px !important;
        height: 150px !important;

    }
    tr .fc-daygrid-day {
        max-height: 150px !important;
        height: 120px !important;
    }
    .fc-daygrid-event.fc-daygrid-dot-event.fc-event.fc-event-start.fc-event-end.fc-event-past{
        .fc-event-time {
            color: #505050 !important;
            font-size: small;
        }
        .fc-event-title {
            color: #505050 !important;
            font-size: small;
        }
    }
    .fc-daygrid-event-harness{
        color: var(--featured-light) !important;
    }
    .fc-daygrid-event.fc-daygrid-dot-event.fc-event.fc-event-start.fc-event-end{
        .fc-event-time {
            color: #505050 !important;
            font-size: small;
        }
        .fc-event-title {
            color: #505050 !important;
            font-size: small;
        }
    }
    .fc-daygrid-event.fc-daygrid-dot-event.fc-event.fc-event-start.fc-event-end.fc-event-future{
        .fc-event-time {
            color: #505050 !important;
            font-size: small;
        }
        .fc-event-title {
            color: #505050 !important;
            font-size: small;
        }
    }
    .fc-daygrid-event.fc-daygrid-dot-event.fc-event.fc-event-start.fc-event-end.fc-event-today {
        .fc-event-time {
            color: #505050 !important;
            font-size: small;
        }
        .fc-event-title {
            color: #505050 !important;
            font-size: small;
        }
    }
}
.vc-container.vc-blue{
    border: none !important;
}
.vc-pane {
    .vc-header {
        margin-bottom: 28px !important;
        .vc-title{
            color: #5B5D6B;
        }
    }
}
.vc-weeks {
    .vc-weekday {
        color: #068373 !important;
    }
}
.vc-day-content {
    .vc-day-layer .vc-day-box-center-center {
        background-color: #068373 !important;
    }
    .vc-focusable {
        color: #068373 !important;
    }
}
.vc-highlights .vc-day-layer {
    .vc-highlight {
        background-color: #068373 !important;
    }
  }
.vc-highlight{
  background-color: #068373 !important;
}
</style>
