<template>
  <div class="">
    <div class="navigation-sidebar">
      <ul class="nav flex-column" >
        <img class="img-fluid" src="../../assets/images/SH-Verde-Horiz@2x.7ce60d99.png" style="width: 153px;">
        <div class="row user-info" style="display: flex;">
          <template v-if="!affiliate">
            <div class="icon-loading">
                <i class="fas fa-circle-notch fa-spin"></i>
            </div>
            <div>
              <div class="name-loading"></div>
              <div class="emissions-loading"></div>
            </div>
          </template>
          <template v-else>
            <div class="icon-user">
              <img v-if="affiliate.imageUrl" class="affiliate-photo" :src="affiliate.logoUrl" alt="">
              <img v-else-if="affiliate.logoUrl" class="affiliate-photo" :src="affiliate.logoUrl" alt="">
              <i v-else class="fas fa-user"></i>
            </div>
            <div class="user-container">
              <template v-if="affiliate && affiliate.name">
                <div class="affiliate-info">
                  <p class="name-user">{{ this.capitalize(affiliate.name) }}</p>
                  <p class="emissions-user">Afiliado</p>
                </div>
                <button type="button" class="btn btn-sm btn-notify">
                  <div v-if="notifications.length > 0" class="notifications-counter">
                    {{ this.notifications.length }}
                  </div>
                  <div v-else class="notifications-counter" style="background-color: #5b5d6b;">
                    {{ this.notifications.length }}
                  </div>
                  <svg width="12" height="16" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99999 18C9.24171 18 10.2489 16.9928 10.2489 15.75H5.75105C5.75105 16.9928 6.75827 18 7.99999 18ZM15.5723 12.7368C14.8931 12.0069 13.6222 10.909 13.6222 7.3125C13.6222 4.58086 11.7069 2.39414 9.12429 1.85766V1.125C9.12429 0.503789 8.62085 0 7.99999 0C7.37913 0 6.8757 0.503789 6.8757 1.125V1.85766C4.29312 2.39414 2.37781 4.58086 2.37781 7.3125C2.37781 10.909 1.10691 12.0069 0.427689 12.7368C0.216752 12.9635 0.123236 13.2346 0.124994 13.5C0.128861 14.0766 0.581322 14.625 1.25351 14.625H14.7465C15.4187 14.625 15.8715 14.0766 15.875 13.5C15.8768 13.2346 15.7832 12.9632 15.5723 12.7368Z" fill="#2FB490"/>
                  </svg>
                </button>
              </template>
            </div>
          </template>
        </div>
        <li class="nav-item">
          <router-link
            exact
            class="nav-link"
            exact-active-class="active"
            :to="{ name: 'home' }"
          ><i class="fas fa-chart-pie"></i>Resumo</router-link>
        </li>
        <li class="nav-item">
          <router-link
            exact
            class="nav-link"
            exact-active-class="active"
            :to="{ name: 'users' }"
          ><i class="fas fa-building"></i>Clientes</router-link>
        </li>
        <li class="nav-item">
          <router-link
            exact
            class="nav-link"
            exact-active-class="active"
            :to="{ name: 'hotleads' }"
          ><i class="fas fa-fire-alt"></i>Hot Leads</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-item nav-link" @click="doLogout()" href="#" style="color: var(--red-light)"><i class="fas fa-sign-out-alt"></i>Sair</a>
        </li>
      </ul>
    </div>
    <Notifications :notifications="notifications" @newSize="notifications = $event"/>
  </div>
</template>

<script>
import Notifications from './Notifications'
import moment from 'moment'
import Vue from 'vue'

export default {
  components: {
    Notifications
  },
  data: () => ({
    affiliate: {},
    users: [],
    oldPlansUsers: [],
    plans: [],
    newSubscriptions: [],
    transations: [],
    notifications: []
  }),
  async mounted () {
    await this.getAffiliate()
    await this.getInfo()
    await this.$root.$on('verifyActived', this.verifyActived)
  },
  watch: {
    async newSubscriptions (newSub) {
      for (let index = 0; index < this.users.length; index++) {
        if (newSub[this.users[index].uId] && this.users[index].pagarmePlan.name !== newSub[this.users[index].uId].name) {
          if (this.users[index].pagarmePlan.name === 'Grátis') {
            this.users[index].pagarmePlan.name = newSub[this.users[index].uId].name
            const notification = {
              date: Date.now(),
              category: 'Novo Plano Contratado',
              color: 'status-success',
              origin: 'users',
              message: `Parabéns ${this.loggedAffiliate.name}, você conseguir fechar mais um contrato. O cliente ${this.users[index].name} contratou o plano ${newSub[this.users[index].uId].name}.`
            }
            await this.$firebase.database().ref(`support/notifications/${window.uid}`).child(notification.date).update(notification)
            this.$toast(`Parabéns! O cliente ${this.users[index].name.substring(0, 20)} contratou o plano ${this.users[index].pagarmePlan.name}!`, {
              icon: {
                iconClass: 'fas fa-dollar-sign'
              },
              timeout: 2000,
              containerClassName: 'my-toast',
              maxToasts: 2,
              position: 'bottom-center',
              newestOnTop: true,
              draggable: false,
              closeButton: false,
              pauseOnFocusLoss: false,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              pauseOnHover: false,
              closeOnClick: false,
              toastClassName: 'my-custom-toast-class',
              bodyClassName: ['custom-class-1', 'custom-class-2']
            })
          } else {
            this.users[index].pagarmePlan.name = newSub[this.users[index].uId].name
          }
        }
      }
    },
    async users () {
      for (let i = 0; i < this.users.length; i++) {
        const tempArray = Object.keys(this.notifications).map(i => this.notifications[i])
        if (tempArray.length > 0) {
          if (this.usersStatus[this.users[i].uId] && this.notifications[this.users[i].uId]) {
            if (moment(new Date()).format('DD') === moment(this.users[i].status.dtCallback).format('DD') && moment(new Date()).format('DD') !== moment(this.notifications[this.users[i].uId].lastDate).format('DD')) {
              const notification = {
                date: Date.now(),
                category: 'Período de Teste Esgotado.',
                color: 'status-warning',
                origin: 'users',
                client: this.users[i].uId,
                message: `${this.loggedAffiliate.name}, o cliente ${this.users[i].name} encerrou o período de teste. Agora é hora de contatá-lo e fornecer a nossa melhor proposta.`
              }
              this.notifications[notification.date] = notification
              await this.$firebase.database().ref(`support/notifications/${window.uid}`).child(notification.date).update(notification)
              await this.$firebase.database().ref(`support/notifications/${window.uid}`).update({ lastDate: notification.date })
              if (this.notifications.length > 0) {
                for (let j = 0; j < this.notifications.length; j++) {
                  if (this.usersStatus[this.users[i].uId] && this.users[i].uId === this.notifications[j].client) {
                    if ((moment(new Date()).format('DD') === moment(this.users[i].status.dtCallback).format('DD'))) {
                      const notification = {
                        date: Date.now(),
                        category: 'Período de Teste Esgotado.',
                        color: 'status-warning',
                        origin: 'users',
                        client: this.users[i].uId,
                        message: `${this.loggedAffiliate.name}, o cliente ${this.users[i].name} encerrou o período de teste. Agora é hora de contatá-lo e fornecer a nossa melhor proposta.`
                      }
                      await this.$firebase.database().ref(`support/notifications/${window.uid}`).child(notification.date).update(notification)
                    }
                  }
                }
              } else {
                if (this.usersStatus[this.users[i].uId]) {
                  if ((moment(new Date()).format('DD') === moment(this.users[i].status.dtCallback).format('DD'))) {
                    const notification = {
                      date: Date.now(),
                      category: 'Período de Teste Esgotado.',
                      color: 'status-warning',
                      origin: 'users',
                      client: this.users[i].uId,
                      message: `${this.loggedAffiliate.name}, o cliente ${this.users[i].name} encerrou o período de teste. Agora é hora de contatá-lo e fornecer a nossa melhor proposta.`
                    }
                    await this.$firebase.database().ref(`support/notifications/${window.uid}`).child(notification.date).update(notification)
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    capitalize (data) {
      var capitalized = []
      var dataTemp = data + ''
      dataTemp.split(' ').forEach(word => {
        capitalized.push(
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
        )
      })
      return capitalized[0] + ' ' + capitalized[1]
    },
    openNotifications() {
      this.$root.$emit('Notifications::show')
    },
    async doLogout () {
      this.$root.$emit('Spinner::show')
      await this.$firebase.auth().signOut()
      this.$router.push({ name: 'login' })
      this.$root.$emit('Spinner::hide')
    },
    async getPlans () {
      await this.$firebase.database().ref('plans').on('value', snapshot => {
        this.plans = snapshot.val()
      })
      await this.$firebase.database().ref('subscriptions').on('value', snapshot => {
        const values = snapshot.val()
        this.newSubscriptions = values.data
        this.transations = values.transations
        let listTransitions = []
        const tempObject = {}
        for (const i in this.newSubscriptions) {
          if (this.transations[i]) {
            listTransitions = Object.keys(this.transations[i]).map(j => this.transations[i][j])
            for (let i = 0; i < listTransitions.length; i++) {
              tempObject[listTransitions[i].expirationDate] = listTransitions[i]
            }
            this.newSubscriptions[i].lastTransations = tempObject
          }
        }
      })
    },
    getNewPlan (user) {
      const emptyPlan = { name: 'Grátis' }
      if (this.newSubscriptions[user.uId]) {
        return { name: this.newSubscriptions[user.uId].name }
      } else {
        return emptyPlan
      }
    },
    getNewSubscription (user) {
      if (this.newSubscriptions[user.uId]) {
        if (this.newSubscriptions[user.uId].status === 'paid') {
          user.pagarmeSubscription = this.newSubscriptions[user.uId]
          return 'Pago'
        } else if (this.newSubscriptions[user.uId].status === 'canceled') {
          user.pagarmeSubscription = this.newSubscriptions[user.uId]
          return 'Cancelado'
        } else {
          user.pagarmeSubscription = this.newSubscriptions[user.uId]
          return 'Inadimplente'
        }
      } else {
        return 'Não Assinante'
      }
    },
    async getAffiliate () {
      await this.$firebase.database().ref(`affiliates/${window.uid}`).on('value', snapshot => {
        this.affiliate = snapshot.val()
      })
      // this.$root.$emit('verifyActived')
    },
    async getUsers () {
      // this.searchValue = this.$router.history.current.params.searchValue ? this.$router.history.current.params.searchValue : ''
      await this.$firebase.database().ref('users').on('value', snapshot => {
        let values = snapshot.val()
        values = Object.keys(values).map(i => values[i])
        this.users = []
        this.oldPlansUsers = []
        if (values.length) {
          for (let i = 0; i < values.length; i++) {
            if (values[i].affiliateId !== window.uid) {
              if (values[i].currentPlanId === '') {
                values[i].pagarmePlan = this.getNewPlan(values[i], values[i].currentPlanId)
                values[i].pagarmePaymentStatus = this.getNewSubscription(values[i])
                if (this.usersStatus[values[i].uId]) {
                  values[i].status = this.usersStatus[values[i].uId]
                }
                this.users.push(values[i])
              } else {
                this.oldPlansUsers.push(values[i])
              }
            }
          }
        }
      })
      // Usar caso a tabela estiver com o bug no carregamento
      // this.users = this.users.sort((a, b) => Number(a.status.dtCallback) - Number(b.status.dtCallback))
    },
    async getInfo () {
      await this.$firebase.database().ref(`support/notifications/${window.uid}`).on('value', snapshot => {
        const values = snapshot.val()
        if (values) {
          this.notifications = Object.keys(values).map(j => values[j])
          this.notifications.pop()
          // this.notifications = this.notifications.filter(n => new Date(Date.now()).getDate() === new Date(n.date).getDate())
        }
      })
    },
    verifyActived () {
      if (this.user.actived === false) {
        this.doLogout()
        Vue.prototype.$actived = false
      }
      Vue.prototype.$actived = true
    }
  }
}
</script>

<style lang="scss" scoped>
.col-lg-2{
  padding: 0;
  margin: 0;
}
.left-icon{
  position: absolute;
  transform: rotateX(180deg) rotateY(180deg) rotate(270deg) translate(3px, 27px);
}
.dropdown-box{
  margin: 0 2px 0px 28px;
  padding-bottom: 15px;
  background-color: #fafafa;
  border-radius: 5px;
  font-size: 13.7px !important;
  font-weight: 400 !important;
  // &:not(.actived) li a{
  //   transform: translate(-200px, 0) !important;
  //   transition: all .3s !important;
  // }
  &.actived li a{
    transform: translate(21px, 0) !important;
    transition: all .3s !important;
    border-left: 1px solid #e1e1e1;
    border-radius: 0px !important;
    padding-left: 32px !important;
  }
}
.navigation-sidebar{
  position: fixed;
  top: 0;
  float: right;
  height: calc(100% - 10px) !important;
  // height: 100vh;
  overflow: hidden auto;
  width: 245px;
  border-radius: 9px;
  padding: 10px 5px;
  margin: 5px 0 5px 5px;
  box-shadow: 0px 0px 6px 4px rgba(0,0,0,0.1);
  background-color: white;
  z-index: 100;
  &::-webkit-scrollbar {
    display: none !important;
  }
  .nav-link{
    display: flex;
    cursor: pointer;
    color: #505050;
    //color: var(--featured) !important;
    padding: .70rem 0 .70rem 1rem !important;
    border-radius: 7px;
    transition: all .3s;
    font-size: 14px;
    font-weight: 400;
    &.active{
      //background-color: var(--featured) !important;
      //color: white;
      background-color: #e9f4f2;
      color: #046e60 !important;
      transition: all .3s;
      margin-right: -25px !important;
      z-index: 999;
      .new-box{
        font-size: 9px;
        font-weight: 500;
        //color: var(--featured);
        //background-color: white;
        background-color: #046e60;
        color: white;
        border-radius: 2px;
        padding: 1.9px 5px 1px 5px;
        transform: translate(7px, -1px);
        position: absolute
      }
      svg{
        fill:#046e60 !important;
      }
    }
    &:hover{
      background-color: #e9f4f2;
      color: #046e60 !important;
      //box-shadow: 0px 0px 4px 3px rgba(0,0,0,0.05) !important;
      .new-box{
        background-color: #046e60 !important;
      }
      svg{
        fill:#046e60 !important;
      }
    }
    &.logout{
      &:hover{
        background-color: rgba(232, 121, 121, .09) !important;
        color: var(--red-light) !important;
      }
    }
    &.disabled{
      color: #c1c1c1 !important;
      svg{
        fill:#c1c1c1 !important;
      }
      // color: white;
      .new-box{
        font-size: 9px;
        font-weight: 500;
        //color: var(--featured);
        //background-color: white;
        background-color: #c1c1c1 !important;
        color: white;
        border-radius: 2px;
        padding: 2px 5px 1px 5px;
        transform: translate(7px, -1px);
        position: absolute
      }

    }

    .new-box{
      font-size: 9px;
      font-weight: 500;
      color: white;
      background-color: #505050;
      border-radius: 2px;
      padding: 1.9px 5px 1px 5px;
      transform: translate(7px, -1px);
      position: absolute
    }
  }
  i, svg{
    height: 21px !important;
    width: 21px !important;
    font-size: 20px;
    margin-right: 13px;
    fill:#505050;
  }
  svg{
    transform: translate(0, -3px);
  }
  .icon-ajust{
    margin-left: 2px;
    margin-right: 10px;
  }
  img{
    display: flex;
    width: 56%;
    justify-content: center;
    margin: 27px auto;
  }
  li{
    margin: 3.5px 5px;
    letter-spacing: .25px;
  }
  .nav-link:focus {
      outline:none !important;
      box-shadow: none !important;
  }
  .nav-link::selection {
      color: none;
      background: none;
  }
  .nav-link::-moz-selection {
      color: none;
      background: none;
  }
}
.user-info{
  background: var(--green-light);
  padding: 10px 10px;
  border-radius: 9px;
  margin: 0 -15px 5px 5px !important;
  .btn-logout-profile{
    background: #fff;
    border: none;
    padding: 1px 4px !important;
    border-radius: 50% !important;
    position:absolute;
    height: 28px;
    width: 28px;
    transform: translate(25px, 24px);
    i{
      font-size: 13px !important;
      margin: 0;
      transform: translate(0, 1px);
      color: var(--red-light)
    }
  }
  .photo{
    background-size: cover;
    background-position: center center;
    height: 45px;
    width: 45px;
    text-align: center;
    border-radius: 7px;
    margin-right: 10px;
    border: solid 1.5px white;
  }
  .name-user{
    font-size: 11px;
    font-weight: 700;
    margin: 4px 0;
  }
  .emissions-user{
    font-size: 11px;
    font-weight: 600;
    margin: 3px 0;
    color: var(--dark)
  }
  .name-loading{
    background-color: #dbdbdb !important;
    height: 19px;
    width: 105px;
    border-radius: 3px;
    margin: 3px 0;
  }
  .emissions-loading{
    background-color: #dbdbdb !important;
    height: 18px;
    width: 100px;
    border-radius: 3px;
    margin: 3px 0;
  }
  .icon-user{
    background-color: var(--featured) !important;
    background: #ffc0c0;
    height: 45px;
    width: 45px;
    border-radius: 7px;
    text-align: center;
    margin-right: 10px;
    i{
      color: white;
      height: 45px;
      width: 45px !important;
      vertical-align: middle;
      item-align: center;
      line-height: 40px;
    }

    .affiliate-photo {
      height: 45px;
      width: 45px;
      border-radius: 7px;
      margin-top: 0px;
    }
  }
  .icon-loading{
    background-color: var(--featured) !important;
    background: #ffc0c0;
    height: 45px;
    width: 45px;
    border-radius: 7px;
    text-align: center;
    margin-right: 10px;
    i{
      margin: 0 !important;
      color: white;
      height: 45px !important;
      width: 45px !important;
      vertical-align: middle;
      item-align: center;
      line-height: 45px;
      font-size: 15px
    }
  }
  .user-container {
    display: flex;
    gap: 25px;
    align-items: center;
    .btn-notify {
      height: 35px !important;
      width: 40px !important;
      padding: 12px 10px 11px 10px !important;
      background-color: #fff;
      box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.10);
      margin-top: 5px;
      .notifications-counter {
        background-color: #de6767;
        padding-top: 2px;
        width: 20px;
        height: 19px;
        border-radius: 5px;
        margin-top: -20px;
        margin-left: 15px;
        color: #FFFFFF;
        font-size: 10px;
      }
      svg {
      }
    }
  }
}
.questionsIcon {
  width: 50px;
  height: 50px;
}
</style>
