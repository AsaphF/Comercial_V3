<template>
  <div>
  <transition name="fade" mode="out-in">
    <div v-if="showModal" class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
        <div class="modal-content">
          <div class="modal-header pb-1">
            <h4 class="modal-title">Notificações</h4>
            <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body" v-if="notifications">
            <div
              class="row"
              :key="i"
              v-for="(notification, key, i) in this.notifications.slice().reverse()">
              <div class="container">
                <div class="notification" :class="[notification.color]">
                  <div class="container">
                    <div class="row justfy-content-between">
                      <template v-if="notification.color == 'status-danger'">
                        <p class="category mr-auto">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13.1199V9.37988" stroke="var(--danger)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.999 16.125C11.861 16.125 11.749 16.237 11.75 16.375C11.75 16.513 11.862 16.625 12 16.625C12.138 16.625 12.25 16.513 12.25 16.375C12.25 16.237 12.138 16.125 11.999 16.125" stroke="var(--danger)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.029 4.13919L21.688 17.5432C22.578 19.1012 21.453 21.0402 19.659 21.0402H4.34101C2.54601 21.0402 1.42101 19.1012 2.31201 17.5432L9.97101 4.13919C10.868 2.56819 13.132 2.56819 14.029 4.13919Z" stroke="var(--danger)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        {{notification.category}}</p>
                        <a class="icon" style="color: var(--danger)" @click="deleteNotification(notification.date)"><i class="fas fa-times"></i></a>
                      </template>
                      <template v-if="notification.color == 'status-warning'">
                        <p class="category mr-auto">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13.1199V9.37988" stroke="var(--warning)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.999 16.125C11.861 16.125 11.749 16.237 11.75 16.375C11.75 16.513 11.862 16.625 12 16.625C12.138 16.625 12.25 16.513 12.25 16.375C12.25 16.237 12.138 16.125 11.999 16.125" stroke="var(--warning)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.029 4.13919L21.688 17.5432C22.578 19.1012 21.453 21.0402 19.659 21.0402H4.34101C2.54601 21.0402 1.42101 19.1012 2.31201 17.5432L9.97101 4.13919C10.868 2.56819 13.132 2.56819 14.029 4.13919Z" stroke="var(--warning)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        {{notification.category}}</p>
                        <a class="icon" style="color: var(--warning)" @click="deleteNotification(notification.date)"><i class="fas fa-times"></i></a>
                      </template>
                      <template v-if="notification.color == 'status-success'">
                        <p class="category mr-auto">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21V21C7.029 21 3 16.971 3 12V12C3 7.029 7.029 3 12 3V3C16.971 3 21 7.029 21 12V12C21 16.971 16.971 21 12 21Z" stroke="var(--featured)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 10L11 15L8 12" stroke="var(--featured)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        {{notification.category}}</p>
                        <a class="icon" style="color: var(--success)" @click="deleteNotification(notification.date)"><i class="fas fa-times"></i></a>
                      </template>
                    </div>
                  </div>
                  <p class="info">{{notification.message}}</p>
                  <p class="date">
                  <svg v-if="notification.color === 'status-danger'" class="mr-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17.5" cy="16.5" r="4.5" stroke="var(--red-light)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 10H11" stroke-width="1.5" stroke="var(--red-light)" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 2V5" stroke-width="1.5" stroke="var(--red-light)" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 2V5" stroke-width="1.5" stroke="var(--red-light)" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 20H6C4.34315 20 3 18.6569 3 17V6.5C3 4.84315 4.34315 3.5 6 3.5H18C19.6569 3.5 21 4.84315 21 6.5V9" stroke="var(--red-light)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 14H8" stroke="var(--red-light)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.393 14.9833V16.7369L18.7752 17.58" stroke="var(--red-light)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg v-if="notification.color === 'status-warning'" class="mr-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17.5" cy="16.5" r="4.5" stroke="var(--warning)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 10H11" stroke-width="1.5" stroke="var(--warning)" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 2V5" stroke-width="1.5" stroke="var(--warning)" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 2V5" stroke-width="1.5" stroke="var(--warning" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 20H6C4.34315 20 3 18.6569 3 17V6.5C3 4.84315 4.34315 3.5 6 3.5H18C19.6569 3.5 21 4.84315 21 6.5V9" stroke="var(--warning)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 14H8" stroke="var(--warning)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.393 14.9833V16.7369L18.7752 17.58" stroke="var(--warning)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg v-if="notification.color === 'status-success'" class="mr-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17.5" cy="16.5" r="4.5" stroke="var(--featured)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 10H11" stroke-width="1.5" stroke="var(--featured)" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 2V5" stroke-width="1.5" stroke="var(--featured)" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 2V5" stroke-width="1.5" stroke="var(--featured)" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 20H6C4.34315 20 3 18.6569 3 17V6.5C3 4.84315 4.34315 3.5 6 3.5H18C19.6569 3.5 21 4.84315 21 6.5V9" stroke="var(--featured)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 14H8" stroke="var(--featured)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.393 14.9833V16.7369L18.7752 17.58" stroke="var(--featured)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{moment(notification.date).format('DD/MM/YYYY')}}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{display: showModal ? 'block' : 'none'}"></div>
    </div>
  </transition>
  </div>

</template>

<script>
export default {
  props: ['notifications'],
  data: () => ({
    showModal: false
  }),

  created () {
    this.$root.$on('NotificationsList::show', () => { this.showModal = true })
  },

  methods: {
    closeModal () {
      this.showModal = false
    },
    deleteNotification (id) {
      if (this.notifications.length === 1) {
        this.$emit('newSize', [])
        this.$firebase.database().ref(`support/notifications/${window.uid}`).child(id).remove()
      } else {
        const tempArray = this.notifications
        this.$emit('newSize', tempArray.splice(this.notifications.indexOf(id), 1))
        this.$firebase.database().ref(`support/notifications/${window.uid}`).child(id).remove()
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.notification{
  border: solid 1px #e9e9e9;
  margin-top: 20px;
  display: block;
  width: 100%;
  //color: white;
  border-radius: 12px;
  margin-bottom: 10px;
  padding: 12px;
  .icon{
    background: rgba(255,255,255, .7) !important;
    color: #e09d9d;
    padding: 3px 9px;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 300 !important;
    margin: 0;
    transform: translate(8px, -8px) !important;
    transition: all .2s;
    i{
      transform: translate(0, 1px) !important;
    }
    &:hover{
      background: rgba(255,255,255, 1) !important;
      color: #e09090;
    }
  }
  .category{
    font-size: 13px;
    font-weight: 600 !important;
    margin: 0;
    background: rgba(255,255,255, 1);
    padding: 7px 20px;
    border-radius: 10px;
    margin-top: -35px;
    margin-left: -13px;
    height: 41px;
    border: solid 1px #d6d6d6;
    i{
      font-size: 14px;
      margin-right: 7px;
    }
    svg{
      margin-right: 6px;
      path{
        stroke-width: 2;
      }
    }
  }
  .info{
    font-size: 13px;
    font-weight: 600;
    min-height: 45px;
    margin: 0 0 7px;
  }
  .date{
    font-size: 11px;
    margin: 0;
    margin-top: 4px;
    letter-spacing: .7px;
    opacity: .8;
    font-weight: 500;
  }
}
.info-status.status-success, .info-transmission.status-success, .notification.status-success, .historic.status-success{
    color: var(--featured);
    background: rgba(27, 163, 142, .15) !important;
}
.modal-content{
  border: var(--featured-light) 2px solid !important;
  min-height: 90% !important;
  max-height: 90% !important;
  height: 90% !important;
  min-width: 720px;
  padding: 40px 40px 0px 40px;
  border-radius: 14px !important;
  .modal-header, .modal-footer{
    border: none !important;
  }
  .modal-footer{
    padding-top: 0px !important;
    padding-bottom: 40px !important;
  }

  .subtitle {
    font-size: 16px;
  }

  h5{
    font-size: 14px;
    margin-left: 0 !important;
  }
  h4{
    font-weight: 700;
    font-size: 32px;
  }
  .form-group{
    margin: 7px 0;
  }
}
</style>
