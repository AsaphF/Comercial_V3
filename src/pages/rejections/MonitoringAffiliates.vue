<template>
  <div class="modal-fade"  :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
    <div class="modal-dialog modal-dialog-centered" role="dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="container-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 15H7C4.79086 15 3 16.7909 3 19V20" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="11" cy="7" r="4" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="17.4442" cy="16.5556" r="3.55556" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.9303 19.0698L13 21" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h5 class="modal-title">Atribuir Monitoriamentos</h5>
          </div>
          <div class="btn-close-container" @click="closeModal()" style="cursor: pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4.57445" y1="4.57544" x2="19.4237" y2="19.4247" stroke="#B3B5BD" stroke-width="3" stroke-linecap="round"/>
              <line x1="19.4238" y1="4.57493" x2="4.57458" y2="19.4242" stroke="#B3B5BD" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div class="modal-mid">
          <button class="btn-search">
            <i class="fas fa-search" style="color: #777986;"></i>
            <input v-model.lazy="searchValue" type="name" list="questions"  class="input-search" placeholder="Digite o que deseja buscar..." >
          </button>
          <!-- <div class="container-search pr-0" >
            <div class="col-12 pl-0">
              <input
                type="name"
                v-model.lazy="searchValue"
                class="form-control"
                placeholder="Digite o que deseja buscar..."
                required
              >
              <div class="input-group-prepend" >
              </div>
            </div>
          </div> -->
        </div>
        <div class="modal-body">
          <div class="navbar-container">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link" :class="[tabs.notMonitored ? 'active' : '']" href="#" @click="tabSelection('Não Atribuidos')">Não Atribuidos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="[tabs.monitored ? 'active' : '']" href="#" @click="tabSelection('Monitorados')">Monitorados</a>
              </li>
              <li class="nav-item" v-for="(affiliate, index) in supportAffiliates" :key="index">
                <img v-if="affiliate.selected === true" class="nav-link active" :src="affiliate.url" alt="" @click="tabSelection(affiliate)">
                <img v-else class="nav-link" :src="affiliate.url" alt="" @click="tabSelection(affiliate)">
              </li>
            </ul>
          </div>
          <div v-if="loading" class="inner-container">
            <div class="container-fluid page-spinner-modal">
              <img class="base-spinner-modal" src="../../assets/images/es-loading-100x100-transparente.gif">
            </div>
          </div>
          <div v-else class="inner-container">
            <table v-if="filterUsers.length > 0" class="table">
              <thead >
                <tr>
                  <th class="container-client" scope="col" style="width: 168px; padding-left: 10px !important;">
                    <span style="margin-right: 5px;">Clientes</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 320 512"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/></svg>
                  </th>
                  <th class="container-plans" scope="col" style="width: 25px;">
                    <span style="margin-right: 5px;">Planos</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 320 512"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/></svg>
                  </th>
                  <th v-for="(affiliate, index) in supportAffiliates" :key="index" scope="col" style="width: 20px;"></th>
                </tr>
              </thead>
              <tbody v-if="tabs.notMonitored" >
                <tr :key="i" v-for="(user, i) in filterUsers" >
                  <template v-if="user && user.name.length > 25">
                    <td @click="searchValue = user.name" style="padding-left: 10px !important;">{{user.name.slice(0, 25)}}...</td>
                  </template>
                  <template v-else >
                    <td @click="searchValue = user.name" style="padding-left: 10px !important;">{{user.name}}</td>
                  </template>
                  <td @click="searchValue = user.pagarmePlan.name">{{user.pagarmePlan.name}}</td>
                  <td  v-for="(affiliate, index) in supportAffiliates" :key="index" style="padding: 5px 0px 5px 5px !important;  border: 1px solid #dddddd;" @click="selectAffiliate(affiliate, user)">
                    <img v-if="user.monitorAffiliateId === affiliate.id" :src="affiliate.url" alt="">
                    <img v-else :src="affiliate.url" alt="" style="opacity: 0.4;" >
                  </td>
                </tr>
              </tbody>
              <tbody v-else-if="tabs.monitored">
                <tr :key="i" v-for="(user, i) in filterUsers" >
                  <template v-if="(scrollPosition + 40*60)+150 > i*60 && (scrollPosition - 40*60)-16*60 < i*60">
                    <template v-if="user && user.name.length > 25">
                      <td @click="searchValue = user.name" style="padding-left: 10px !important;">{{user.name.slice(0, 25)}}...</td>
                    </template>
                    <template v-else >
                      <td @click="searchValue = user.name" style="padding-left: 10px !important;">{{user.name}}</td>
                    </template>
                    <td @click="searchValue = user.pagarmePlan.name">{{user.pagarmePlan.name}}</td>
                    <td  v-for="(affiliate, index) in supportAffiliates" :key="index" style="padding: 5px 0px 5px 5px !important;  border: 1px solid #dddddd;" @click="selectAffiliate(affiliate, user)">
                      <img v-if="user.monitorAffiliateId === affiliate.id" :src="affiliate.url" alt="">
                      <img v-else :src="affiliate.url" alt="" style="opacity: 0.4;" >
                    </td>
                  </template>
                </tr>
              </tbody>
              <tbody v-else>
                <tr :key="i" v-for="(user, i) in filterUsers" >
                  <template v-if="(scrollPosition + 40*60)+150 > i*60 && (scrollPosition - 40*60)-16*60 < i*60">
                    <template v-if="user && user.name.length > 25">
                      <td @click="searchValue = user.name" style="padding-left: 10px !important;">{{user.name.slice(0, 25)}}...</td>
                    </template>
                    <template v-else >
                      <td @click="searchValue = user.name" style="padding-left: 10px !important;">{{user.name}}</td>
                    </template>
                    <td @click="searchValue = user.pagarmePlan.name">{{user.pagarmePlan.name}}</td>
                    <td  v-for="(affiliate, index) in supportAffiliates" :key="index" style="padding: 5px 0px 5px 5px !important;  border: 1px solid #dddddd;" @click="selectAffiliate(affiliate, user)">
                      <img v-if="user.monitorAffiliateId === affiliate.id" :src="affiliate.url" alt="">
                      <img v-else :src="affiliate.url" alt="" style="opacity: 0.4;" >
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
            <div v-else class="list-content">
              <img class="img-alternative" src="../../assets/images/empty-list2.png" alt="">
            </div>
          </div>
          <div class="search-results">
            <small v-if="loading" >Carregando...</small>
            <small v-else >{{ filterUsers.length }} resultados</small>
          </div>
        </div>
        <div class="modal-footer" style="border-top: none !important;">
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{ display: showModal ? 'block' : 'none' }"></div>
  </div>
</template>

<script>
export default {
  props: ['users'],
  name: 'MonitorModal',
  data: () => ({
    subscribedUsers: [],
    monitoredUsers: [],
    supportAffiliates: [],
    loggedAffiliate: [],
    affiliateMonitoringList: [],
    showModal: false,
    loading: true,
    searchValue: '',
    scrollPosition: 0,
    tabs: {
      notMonitored: true,
      monitored: false
    }
  }),
  // Pega a lista de assuntos e as manipula
  async mounted () {
    this.$root.$on('MonitoringAffiliates::show', () => this.openModal())
  },
  computed: {
    filterUsers () {
      let tempUsers = []
      if (this.tabs.notMonitored) {
        tempUsers = Object.keys(this.subscribedUsers).map(i => this.subscribedUsers[i])
      } else if (this.tabs.monitored) {
        tempUsers = Object.keys(this.monitoredUsers).map(i => this.monitoredUsers[i])
      } else {
        tempUsers = this.affiliateMonitoringList
      }
      // let tempUsers = this.subscribedUsers
      if (this.searchValue !== '' && this.searchValue) {
        tempUsers = tempUsers.filter((user) => {
          if (this.searchValue.toLowerCase() === 'frequente') {
            return user.frequencyStatus === 2
          } else if (this.searchValue.toLowerCase() === 'comum') {
            return user.frequencyStatus === 1
          } else if (this.searchValue.toLowerCase() === 'escasso') {
            return user.frequencyStatus === 0
          } else if ((this.searchValue.toLowerCase() === 'a vencer') || (this.searchValue.toLowerCase() === 'à vencer') || (this.searchValue.toLowerCase() === 'vencer')) {
            return user.digitalCertificate.expired === 2
          } else if (this.searchValue.toLowerCase() === 'vencido') {
            return user.digitalCertificate.expired === 1
          } else if ((this.searchValue.toLowerCase() === 'não possui') || (this.searchValue.toLowerCase() === 'nao possui')) {
            return user.digitalCertificate.expired === 0
          } else {
            if (user.uId) {
              return user.uId.toUpperCase().includes(this.searchValue.toUpperCase()) + user.name
                .toUpperCase()
                .includes(this.searchValue.toUpperCase()) + user.documentNumber
                .toUpperCase()
                .includes(this.searchValue.toUpperCase()) + user.email
                .toUpperCase()
                .includes(this.searchValue.toUpperCase()) + user.uId
                .toUpperCase()
                .includes(this.searchValue.toUpperCase()) + user.pagarmePaymentStatus
                .toUpperCase()
                .includes(this.searchValue.toUpperCase()) + user.pagarmePlan.name
                .toUpperCase()
                .includes(this.searchValue.toUpperCase())
            } else if (user.uid) {
              return user.uid.toUpperCase().includes(this.searchValue.toUpperCase() + user.name
                .toUpperCase()
                .includes(this.searchValue.toUpperCase()) + user.documentNumber
                .toUpperCase()
                .includes(this.searchValue.toUpperCase()) + user.email
                .toUpperCase()
                .includes(this.searchValue.toUpperCase()) + user.uid
                .toUpperCase()
                .includes(this.searchValue.toUpperCase()) + user.pagarmePaymentStatus
                .toUpperCase()
                .includes(this.searchValue.toUpperCase()) + user.pagarmePlan.name
                .toUpperCase()
                .includes(this.searchValue.toUpperCase())
              )
            }
          }
        })
      }
      tempUsers = tempUsers.sort((a, b) => {
        let fb
        let fa
        if (a.createdAt) {
          fa = this.toTimestamp(a.createdAt)
        } else {
          fa = 0
        }
        if (b.createdAt) {
          fb = this.toTimestamp(b.createdAt)
        } else {
          fb = 0
        }
        if (fa > fb) {
          return -1
        }
        if (fa < fb) {
          return 1
        }
        return 0
      })
      tempUsers = tempUsers.sort((a, b) => {
        if (!b.createdAt) {
          return -1
        }
        return 0
      })
      return tempUsers
    }
  },
  methods: {
    async openModal () {
      await this.$firebase.database().ref('support/supportAffiliates').once('value', snapshot => {
        const values = snapshot.val()
        if (values) {
          const tempArray = Object.keys(values).map(i => values[i])
          for (let index = 0; index < tempArray.length; index++) {
            tempArray[index].selected = false
            if (tempArray[index].id === window.uid) {
              this.loggedAffiliate = tempArray[index]
            }
          }
          this.supportAffiliates = tempArray
        } else {
          this.supportAffiliates = []
        }
      })
      if (this.loggedAffiliate.adm) {
        this.showModal = true
        this.subscribedUsers = Object.assign({}, this.users)
        this.monitoredUsers = Object.assign({}, this.users)
        let tempArray = Object.keys(this.subscribedUsers).map(i => this.subscribedUsers[i])
        let transArray = Object.keys(this.monitoredUsers).map(i => this.monitoredUsers[i])
        tempArray = tempArray.filter(user => user.pagarmePaymentStatus !== 'Cancelado' && user.pagarmePlan.name !== 'Grátis' && !user.monitorAffiliateId)
        transArray = transArray.filter(user => user.monitorAffiliateId)
        this.subscribedUsers = tempArray
        this.monitoredUsers = transArray
        setTimeout(() => {
          this.loading = false
        }, 1500)
      }
    },
    closeModal () {
      for (let index = 0; index < this.supportAffiliates.length; index++) {
        this.supportAffiliates[index].selected = false
      }
      this.tabs.notMonitored = true
      this.tabs.monitored = false
      this.showModal = false
    },
    toTimestamp (strDate) {
      var datum = Date.parse(strDate)
      return datum / 100
    },
    tabSelection (selected) {
      this.affiliateMonitoringList = []
      if (selected === 'Não Atribuidos') {
        this.tabs.notMonitored = true
        this.tabs.monitored = false
        this.supportAffiliates.forEach(affiliate => {
          affiliate.selected = false
        })
      } else if (selected === 'Monitorados') {
        this.tabs.monitored = true
        this.tabs.notMonitored = false
        this.supportAffiliates.forEach(affiliate => {
          affiliate.selected = false
        })
      } else {
        this.tabs.notMonitored = false
        this.tabs.monitored = false
        this.supportAffiliates.forEach(affiliate => {
          affiliate.selected = false
        })
        selected.selected = true
        let tempArray = Object.assign({}, this.monitoredUsers)
        tempArray = Object.keys(this.monitoredUsers).map(i => this.monitoredUsers[i])
        for (let index = 0; index < tempArray.length; index++) {
          if (tempArray[index].monitorAffiliateId === selected.id) {
            this.affiliateMonitoringList.push(tempArray[index])
          }
        }
      }
    },
    async selectAffiliate (affiliate, user) {
      user.monitorAffiliateId = affiliate.id
      console.log(user)
      this.searchValue = ' '
      this.searchValue = ''
      // await this.$firebase.database().ref('users').child(user.uId).update({ monitorAffiliateId: affiliate.id })
    }
  }
}
</script>

<style lang="scss" scoped>
// Padrão
::-webkit-scrollbar {
  width: 5px !important;
}
::-webkit-scrollbar-track {
background: #D9D9D9;
border-radius: 5px !important;
}

/* Handle */
::-webkit-scrollbar-thumb {
background:  #777986 !important;
border-radius: 5px !important;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
background: var(--featured-dark);
}
// Body
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
    background-color: white !important;
    color: var(--featured) !important;
    transform: translate(0, -2px);
    outline: none !important;
}
}
.modal-fade{
position: absolute;
top: 5%;
right: 35%;
transition-property: right;
}
.modal-content{
  width: 580px !important;
  height: 810px;
  border-radius: 5px  !important;
  .modal-header{
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    width: 97%;
    margin: 0 10px;
    border: none !important;
    padding-left: 0px !important;

    .container-title {
      display: flex;
      align-items: center;
      gap: 5px;
      .modal-title {
        align-self: flex-end !important;
        color: #404252 !important;
        font-size: 22px;
        font-weight: 600 !important;
      }
    }
  }
  .modal-mid {
    .btn-search {
      width: 97%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      border: 1px solid #b3b5bd;
      border-radius: 5px;
      background-color: #FAFDFD;
      height: 50px;
      i {
          margin-left: 15px;
          margin-right: 5px;
      }
      .input-search {
        width: 100%;
        background-color: #FAFDFD;
        box-shadow: none !important;
      }

    }
  }
  .modal-body{
    margin: 0 auto !important;
    .navbar-container {
      width: auto;
      ul {
        width: 549px !important;
        margin-bottom: 0px !important;
        display: flex;
        gap: 3px;
        li {
          height: 100%;
          cursor: pointer !important;
          .nav-link {
            // padding-top: 12px;
            height: 45px;
            color: #5B5D6B !important;
            background-color: #fafafa;
            border: 1px solid #eaeaea !important;
            border-bottom: none !important;
            &.active {
            border: 1px solid #eaeaea !important;
            background-color: #E9F4F2;
            border-radius: 5px 5px 5px 5px !important;
            border-bottom: none !important;
            color: #1BA38E !important;
            width: 100%;
            }
          }
          // .nav-link {
          //   height: 100%;
          //   border: 1px solid #eaeaea !important;
          //   border-bottom: none !important;
          //   color: #5B5D6B !important;
          //   &.active {
          //     border: 1px solid #eaeaea !important;
          //     background-color: #E9F4F2;
          //     border-bottom: none !important;
          //     color: #1BA38E !important;
          //     width: 100%
          //   }
          // }
        }
      }
    }
    .inner-container {
      width: 550px;
      height: 600px;
      background-color: #E9F4F2;
      padding: 15px;
      margin-top: 0px !important;
      .scroll-container {
        margin-right: -10px;
        padding-right: 10px;
        overflow-y: scroll;
        width: auto;
        height: 585px;
        margin-top: -5px !important;
      }
      .table{
        cursor: pointer !important;
        outline: 1px solid #D2D4DA;
        border-radius: 3px !important;
        background-color: white;
        // width: 520px;
        margin: 5px auto !important;
        box-shadow: none;
        tr {
          height: 45px !important;
          line-height: 1.7;
          cursor: pointer !important;
          .container-client {
            svg {
              align-items: center;
              margin-bottom: 2px;
              transition: transform 0.4s ease !important;
              transform: rotate(0deg);
            }
            .rotated {
            transition: transform 0.4s ease !important;
            transform: rotate(-180deg) !important;
            }
          }
          .container-plans {
            svg {
              align-items: center;
              margin-bottom: 2px;
              transition: transform 0.4s ease !important;
              transform: rotate(0deg);
            }
            .rotated {
                transition: transform 0.4s ease !important;
                transform: rotate(-180deg) !important;
          }  }
        }
        th {
          color: #404252;
          .inner-container-plans {
            border-radius: 5px;
            padding: 8px 0px;
            width: 90px !important;
            a {
              margin-left: -5px;
              border-top: none !important;
              border-bottom: none;
              padding: 2px 8px 2px 5px;
              line-height: 0px;
              font-weight: 00;
              font-size: 3px;
              color: #404252;
            }
            span {
              margin-top: -5px !important;
            }
            .dropdown-menu {
              top: 10px !important;
              min-width: 5rem !important;
              a {
                border-top: none !important;
                border-bottom: none;
                padding: 15px !important;
                line-height: 0px;
                font-weight: 700;
                font-size: 13px;
              }
            }
          }
          .inner-container-signatures {
            text-align: center;
            border-radius: 5px;
            padding: 8px 0px;
            margin-left: 0px !important;
            width: 105px !important;
            a {
              border-top: none !important;
              border-bottom: none;
              padding: 2px 5px;
              line-height: 0px;
              font-weight: 700;
              font-size: 13px;
              color: #404252;
            }
            span {
              margin-top: -5px !important;
            }
            .dropdown-menu {
              top: 10px !important;
              min-width: 5rem !important;
              a {
                border-top: none !important;
                border-bottom: none;
                padding: 15px !important;
                line-height: 0px;
                font-weight: 700;
                font-size: 13px;
              }
            }
          }
        }
        th:focus {
            outline:none !important;
            box-shadow: none !important;
        }
        th::selection {
            color: none;
            background: none;
        }
        th::-moz-selection {
            color: none;
            background: none;
        }
        td{
            font-size: 13px;
            font-weight: 400;
            padding: 7px 9px !important;
            vertical-align: middle;
            img {
              width: 30px;
              height: 30px;
              object-fit: fill;
            }
        }
        .modal-content td{
            padding: 7px 9px !important;
        }
        .change-billing{
            margin: 0;
            padding: 9px 0px;
            border-radius: 8px;
            background-color: var(--warning);
            color: white;
            animation: zoom-in-zoom-out .5s ease infinite;
            cursor: pointer;
            p{
                margin: 0 !important;
                min-width: 105px;
            }
            @keyframes zoom-in-zoom-out {
                0% {
                    transform: scale(.97, .97);
                    box-shadow: 0px 0px 6px 4px rgba(0,0,0,0.13);
                }
                50% {
                    transform: scale(1, 1);
                    box-shadow: 0px 0px 6px 4px rgba(0,0,0,0.13);
                }
                100% {
                    transform: scale(.97, .97);
                    box-shadow: 0px 0px 6px 4px rgba(0,0,0,0.13);
                }
            }

        }
        .change-billing:hover{
            transform: scale(1.02, 1.02) !important;
            box-shadow: 0px 0px 6px 4px rgba(0,0,0,0.13);
            animation: none;
        }
      }
      .base-spinner-modal {
        position: fixed;
        top: 55%;
        left: 55%;
        height: 70px;
        transform: translate(-50%, -50%);
        z-index: 9999 !important;
      }
      .img-alternative {
        width: 400px;
        margin: 80px 0px;
      }
    }
    .search-results{
      font-size: 14px;
      font-weight: 400;
      color: #9496A1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-bottom: -8px;

      small {
        padding-top: 5px;
        padding-right: 2px;
      }
    }
  }
  .modal-footer {
    border-top: none !important;
    padding: 0px;
    margin-top: -5px !important;
    .btn-save {
        margin-right: 5px;
        color: #ffff !important;
        width: 140px !important;
        height: 32px;
        border: #DDF1EE;
        border-radius: 5px;
        background-color: #0DCE9A !important;
        font-weight: 600 !important;
        font-size: 14px;
        transition: all .3s !important;

        &:hover{
            background-color: var(--featured) !important;
            color:  white !important;
            transform: translate(0, -2px);
        }
    }
  }
  .custom-checkbox{
      margin: 7px 0px 0px 0px;
  }
  .custom-control-label::before{
      height: 1.3rem !important;
      width: 1.3rem !important;
      top: .15rem;
      left: -1.65rem;
      box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.15) !important;
      // border-color: white !important;
      border-radius: 3px;
  }
  .custom-control-label::after{
      border-color: var(--featured) !important;
      cursor: pointer;
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
.modal-content2 {
padding-top: 10px !important;
padding-bottom: 490px !important;
border-radius: 7px 0 0 7px  !important;
width: 800px;
background-color: #ffff;
.conclusion-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;

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
        color: #ffff !important;
        width: 190px !important;
        border-radius: 5px !important;
        background-color: var(--danger) !important;
        padding: 10px 5px !important;
        font-weight: 600 !important;
        font-size: 15px;
        transition: all .3s !important;
        cursor: pointer !important;
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
.inner-container{
  max-height: 100%;
  overflow-y: scroll;
}
</style>
