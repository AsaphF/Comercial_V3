<template>
  <div>
    <div v-if="showModal" class="modal-fade"  :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog" role="dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="container-title">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 15H7C4.79086 15 3 16.7909 3 19V20" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="11" cy="7" r="4" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="17.4442" cy="16.5556" r="3.55556" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.9303 19.0698L13 21" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <h4 class="modal-title" style="font-weight: 700; margin-top: 10px; margin-left: 5px;">Atribuir Leads</h4>
            </div>
            <div class="btn-close-container" @click="closeModal()" style="cursor: pointer;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4.57445" y1="4.57544" x2="19.4237" y2="19.4247" stroke="#B3B5BD" stroke-width="3" stroke-linecap="round"/>
                <line x1="19.4238" y1="4.57493" x2="4.57458" y2="19.4242" stroke="#B3B5BD" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <div class="modal-mid">
            <div class="col-12 search-wrapper">
              <svg data-v-63aa4da2="" stroke="#9496A1" width="20px" height="20px" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 0px; margin-bottom: 3px;"><path data-v-63aa4da2="" d="M15.7138 6.8382C18.1647 9.28913 18.1647 13.2629 15.7138 15.7138C13.2629 18.1647 9.28913 18.1647 6.8382 15.7138C4.38727 13.2629 4.38727 9.28913 6.8382 6.8382C9.28913 4.38727 13.2629 4.38727 15.7138 6.8382" stroke="#9496A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-63aa4da2="" d="M19 19L15.71 15.71" stroke="#9496A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              <input v-model.lazy="searchValue" type="name" list="questions"  placeholder="Digite o que deseja buscar..." >
            </div>
          </div>
          <div class="modal-body">
            <div class="navbar-container">
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a class="nav-link" :class="[tabs.notMonitored ? 'active' : '']" href="#" @click="tabSelection('Não Atribuídas')">Não Atribuídas</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="[tabs.monitored ? 'active' : '']" href="#" @click="tabSelection('Atribuídas')">Atribuídas</a>
                </li>
                <li class="nav-item" v-for="(affiliate, index) in affiliates" :key="index">
                  <img v-if="affiliate.selected === true" class="nav-link active" :src="affiliate.logoUrl" alt="" @click="tabSelection(affiliate)">
                  <template v-else  >
                    <img v-if="affiliate.logoUrl" class="nav-link" :src="affiliate.logoUrl" alt="" @click="tabSelection(affiliate)">
                    <img v-else-if="affiliate.imageUrl" class="nav-link" :src="affiliate.imageUrl" alt="" @click="tabSelection(affiliate)">
                    <img v-else class="nav-link" src="../../assets/images/customer.jpg" alt="" @click="tabSelection(affiliate)">
                  </template>
                </li>
              </ul>
            </div>
            <div class="inner-container">
              <table v-if="filterLeads.length > 0" class="table">
                <thead >
                  <tr>
                    <th class="container-client" scope="col" style="width: 210px; padding-left: 10px !important;">
                      <span style="margin-right: 5px;">Clientes</span>
                    </th>
                    <th class="container-plans" scope="col" style="width: 25px;">
                      <span style="margin-right: 5px;">Situação</span>
                    </th>
                    <th v-for="(affiliate, index) in affiliates" :key="index" scope="col" style="width: 20px;"></th>
                  </tr>
                </thead>
                <template v-if="loading">
                  <tbody v-if="tabs.notMonitored" >
                    <tr :key="i" v-for="(lead, i) in filterLeads" >
                      <td><div class="loading-sm"></div></td>
                      <td><div class="loading-sm"></div></td>
                      <td v-for="(affiliate, index) in affiliates" :key="index" style="padding: 5px 0px 5px 5px !important;  border: 1px solid #dddddd;" @click="selectAffiliate(affiliate, lead)">
                        <div class="loading-sm"></div>
                      </td>
                    </tr>
                  </tbody>
                </template>
                <template v-else>
                  <tbody v-if="tabs.notMonitored" >
                    <tr :key="i" v-for="(lead, i) in filterLeads" >
                      <template v-if="lead && lead.name.length > 30">
                        <td @click="searchValue = lead.name" style="padding-left: 10px !important;">{{lead.name.slice(0, 30)}}...</td>
                      </template>
                      <template v-else >
                        <td @click="searchValue = lead.name" style="padding-left: 10px !important;">{{lead.name}}</td>
                      </template>
                      <td>
                        <div v-if="lead.status.info == 'Ligar'">
                          <div class="info-status status-success" style="width: 60px;">
                          {{ lead.status.info }}
                          </div>
                        </div>
                        <div v-else-if="lead.status.info == 'Assinante'" class="info-status status-pending"  style="padding: 3px 0px !important; font-size: 13px; width: 60px;">
                          {{ lead.status.info }}
                        </div>
                        <div v-else-if="(lead.status.info == 'Retornar' && lead.dtReturn)" class="info-status status-danger"  style="padding: 3px 0px !important; font-size: 13px; width: 60px;">
                          {{ moment(lead.dtReturn).format('DD/MM/YYYY') }}
                        </div>
                        <div v-else-if="(lead.status.info == 'Cadastrado')" class="info-status status-warning"  style="padding: 3px 0px !important; font-size: 13px; width: 60px;">
                          {{ lead.status.info }}
                        </div>
                        <div v-else class="info-status status-inactivate" style="padding: 3px 0px !important; font-size: 12px; width: 60px;">
                          {{ lead.status.info }}
                        </div>
                      </td>
                      <td v-for="(affiliate, index) in affiliates" :key="index" style="padding: 5px 0px 5px 5px !important;  border: 1px solid #dddddd;" @click.capture="selectAffiliate(affiliate, lead)">
                          <img v-if="affiliate.logoUrl" :src="affiliate.logoUrl" alt="" style="opacity: 0.4;">
                          <img v-else-if="affiliate.imageUrl"  :src="affiliate.imageUrl" alt="" style="opacity: 0.4;">
                          <img v-else src="../../assets/images/customer.jpg" alt="" style="opacity: 0.4;">
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="tabs.monitored">
                    <tr :key="i" v-for="(lead, i) in filterLeads" >
                      <template v-if="lead && lead.name.length > 30">
                        <td @click="searchValue = lead.name" style="padding-left: 10px !important;">{{lead.name.slice(0, 30)}}...</td>
                      </template>
                      <template v-else >
                        <td @click="searchValue = lead.name" style="padding-left: 10px !important;">{{lead.name}}</td>
                      </template>
                      <td>
                        <div v-if="lead.status.info == 'Ligar'">
                          <div class="info-status status-success" style="width: 60px;">
                          {{ lead.status.info }}
                          </div>
                        </div>
                        <div v-else-if="lead.status.info == 'Assinante'" class="info-status status-pending"  style="padding: 3px 0px !important; font-size: 13px; width: 60px;">
                          {{ lead.status.info }}
                        </div>
                        <div v-else-if="(lead.status.info == 'Retornar' && lead.dtReturn)" class="info-status status-danger"  style="padding: 3px 0px !important; font-size: 13px; width: 60px;">
                          {{ moment(lead.dtReturn).format('DD/MM/YYYY') }}
                        </div>
                        <div v-else-if="(lead.status.info == 'Cadastrado')" class="info-status status-warning"  style="padding: 3px 0px !important; font-size: 13px; width: 60px;">
                          {{ lead.status.info }}
                        </div>
                        <div v-else class="info-status status-inactivate" style="padding: 3px 0px !important; font-size: 12px; width: 60px;">
                          {{ lead.status.info }}
                        </div>
                      </td>
                      <td v-for="(affiliate, index) in affiliates" :key="index" style="padding: 5px 0px 5px 5px !important;  border: 1px solid #dddddd;" @click="selectAffiliate(affiliate, lead)">
                        <template v-if="lead.affiliateId === affiliate.affiliateId">
                          <img v-if="affiliate.logoUrl" :src="affiliate.logoUrl" alt="" >
                          <img v-else-if="affiliate.imageUrl"  :src="affiliate.imageUrl" alt="" >
                          <img v-else src="../../assets/images/customer.jpg" alt="" >
                        </template>
                        <template v-else>
                          <img v-if="affiliate.logoUrl" :src="affiliate.logoUrl" alt="" style="opacity: 0.4;">
                          <img v-else-if="affiliate.imageUrl"  :src="affiliate.imageUrl" alt=""  style="opacity: 0.4;">
                          <img v-else src="../../assets/images/customer.jpg" alt="" style="opacity: 0.4;">
                        </template>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr :key="i" v-for="(lead, i) in filterLeads" >
                      <template v-if="lead && 30">
                        <td @click="searchValue = lead.name" style="padding-left: 10px !important;">{{lead.name.slice(0, 30)}}...</td>
                      </template>
                      <template v-else >
                        <td @click="searchValue = lead.name" style="padding-left: 10px !important;">{{lead.name}}</td>
                      </template>
                      <td>
                        <div v-if="lead.status.info == 'Ligar'">
                          <div class="info-status status-success" style="width: 60px;">
                          {{ lead.status.info }}
                          </div>
                        </div>
                        <div v-else-if="lead.status.info == 'Assinante'" class="info-status status-pending"  style="padding: 3px 0px !important; font-size: 13px; width: 60px;">
                          {{ lead.status.info }}
                        </div>
                        <div v-else-if="(lead.status.info == 'Retornar' && lead.dtReturn)" class="info-status status-danger"  style="padding: 3px 0px !important; font-size: 13px; width: 60px;">
                          {{ moment(lead.dtReturn).format('DD/MM/YYYY') }}
                        </div>
                        <div v-else-if="(lead.status.info == 'Cadastrado')" class="info-status status-warning"  style="padding: 3px 0px !important; font-size: 13px; width: 60px;">
                          {{ lead.status.info }}
                        </div>
                        <div v-else class="info-status status-inactivate" style="padding: 3px 0px !important; font-size: 12px; width: 60px;">
                          {{ lead.status.info }}
                        </div>
                      </td>
                      <td v-for="(affiliate, index) in affiliates" :key="index" style="padding: 5px 0px 5px 5px !important;  border: 1px solid #dddddd;" @click="selectAffiliate(affiliate, lead)">
                        <template v-if="lead.affiliateId === affiliate.affiliateId">
                          <img v-if="affiliate.logoUrl" :src="affiliate.logoUrl" alt="" >
                          <img v-else-if="affiliate.imageUrl"  :src="affiliate.imageUrl" alt="" >
                          <img v-else src="../../assets/images/customer.jpg" alt="" >
                        </template>
                        <template v-else>
                          <img v-if="affiliate.logoUrl" :src="affiliate.logoUrl" alt="" style="opacity: 0.4;">
                          <img v-else-if="affiliate.imageUrl"  :src="affiliate.imageUrl" alt=""  style="opacity: 0.4;">
                          <img v-else src="../../assets/images/customer.jpg" alt="" style="opacity: 0.4;">
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </table>
              <div v-else class="list-content" style="margin-left: 200px;">
                <img class="img-alternative" src="../../assets/images/empty-list2.png" alt="">
              </div>
            </div>
            <div class="search-results">
              <small v-if="loading" >Carregando...</small>
              <small v-else >{{ filterLeads.length }} resultados</small>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{ display: showModal ? 'block' : 'none' }"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MonitorModal',
  props: ['leads'],
  data: () => ({
    assignedLeads: [],
    monitoredLeads: [],
    affiliates: [],
    localLeads: [],
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
    filterLeads () {
      let tempUsers = []
      if (this.tabs.notMonitored) {
        tempUsers = this.localLeads.filter(lead => !lead.affiliateId)
      } else if (this.tabs.monitored) {
        tempUsers = this.localLeads.filter(lead => lead.affiliateId)
      } else {
        tempUsers = this.affiliateMonitoringList
      }
      if (this.searchValue !== '' && this.searchValue) {
        tempUsers = tempUsers.filter((lead) => {
          if (this.searchValue.toLowerCase() === 'ligar') {
            return lead.status.info === 'Ligar'
          } else if (this.searchValue.toLowerCase() === 'retornar') {
            return lead.status.info === 'Retornar'
          } else if (this.searchValue.toLowerCase() === 'testando') {
            return lead.status.info === 'Testando'
          } else if ((this.searchValue.toLowerCase() === 'não quer') || (this.searchValue.toLowerCase() === 'não')) {
            return lead.status.info === 'Não Quer'
          } else if ((this.searchValue.toLowerCase() === 'assinante')) {
            return lead.status.info === 'Assinante'
          } else if ((this.searchValue.toLowerCase() === 'cadastrado')) {
            return lead.status.info === 'Cadastrado'
          } else if ((this.searchValue === lead.phone) || (this.searchValue === this.firstFormat(lead.phone)) || (this.searchValue === this.secondFormat(lead.phone))) {
            return lead.phone
          } else {
            let result
            switch (true) {
              case lead.name.toUpperCase().includes(this.searchValue.toUpperCase()):
                result = lead.name
                break
              case lead.phone && lead.phone.toUpperCase().includes(this.searchValue.toUpperCase()):
                result = lead.phone
                break
              case lead.email && lead.email.toUpperCase().includes(this.searchValue.toUpperCase()):
                result = lead.email
                break
              case lead.clients && lead.clients.toUpperCase().includes(this.searchValue.toUpperCase()):
                result = lead.clients
                break
              case lead.originData && lead.originData.origin && lead.originData.origin.toUpperCase().includes(this.searchValue.toUpperCase()):
                result = lead.originData.origin
                break
              case lead.date && moment(lead.date).format('DD/MM/YYYY').toUpperCase().includes(this.searchValue.toUpperCase()):
                result = lead.date
                break
            }
            return result
            // return (
            //   (lead.name && lead.name.toUpperCase().includes(this.searchValue.toUpperCase())) +
            //   (lead.phone && lead.phone.toUpperCase().includes(this.searchValue.toUpperCase())) +
            //   (lead.email && lead.email.toUpperCase().includes(this.searchValue.toUpperCase())) +
            //   (lead.clients && lead.clients.toUpperCase().includes(this.searchValue.toUpperCase())) +
            //   (lead.originData && lead.originData.origin && lead.originData.origin.toUpperCase().includes(this.searchValue.toUpperCase()))
            // )
          }
        })
      }
      return tempUsers
    }
  },
  methods: {
    async openModal () {
      const firsts = this.leads.filter(lead => lead.status.info === 'Ligar')
      const seconds = this.leads.filter(lead => lead.status.info == 'Retornar')
      const thirds = this.leads.filter(lead => lead.status.infor === 'Cadastrado')
      // const tempArray = [...firsts, ...seconds]
      this.localLeads = [...firsts, ...seconds, ...thirds]
      await this.$firebase.database().ref('affiliates').once('value', snapshot => {
        const values = snapshot.val()
        if (values) {
          let tempArray = Object.keys(values).map(i => values[i])
          tempArray = tempArray.filter(affiliate => affiliate.actived === true && affiliate.occupation === 'affiliate')

          for (let index = 0; index < tempArray.length; index++) {
            tempArray[index].selected = false
            if (tempArray[index].affiliateId === window.uid) {
              this.loggedAffiliate = tempArray[index]
            }
          }
          this.affiliates = tempArray
        } else {
          this.affiliates = []
        }
      })
      if (this.loggedAffiliate.adm) {
        this.showModal = true
        this.assignedLeads = Object.assign({}, this.localLeads)
        this.monitoredLeads = Object.assign({}, this.localLeads)
        this.assignedLeads = Object.keys(this.assignedLeads).map(i => this.assignedLeads[i])
        this.monitoredLeads = Object.keys(this.monitoredLeads).map(i => this.monitoredLeads[i])
        setTimeout(() => {
          this.loading = false
        }, 1500)
      }

    },
    closeModal () {
      for (let index = 0; index < this.affiliates.length; index++) {
        this.affiliates[index].selected = false
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
      if (selected === 'Não Atribuídas') {
        this.tabs.notMonitored = true
        this.tabs.monitored = false
        this.affiliates.forEach(affiliate => {
          affiliate.selected = false
        })
      } else if (selected === 'Atribuídas') {
        this.tabs.monitored = true
        this.tabs.notMonitored = false
        this.affiliates.forEach(affiliate => {
          affiliate.selected = false
        })
      } else {
        this.tabs.notMonitored = false
        this.tabs.monitored = false
        this.affiliates.forEach(affiliate => {
          affiliate.selected = false
        })
        selected.selected = true
        let tempArray = Object.assign({}, this.monitoredLeads)
        tempArray = Object.keys(this.monitoredLeads).map(i => this.monitoredLeads[i])
        for (let index = 0; index < tempArray.length; index++) {
          if (tempArray[index].affiliateId === selected.affiliateId) {
            this.affiliateMonitoringList.push(tempArray[index])
          }
        }
      }
    },
    firstFormat (phoneNumber) {
      const numericPhoneNumber = phoneNumber.replace(/\D/g, '')
      return numericPhoneNumber
    },
    secondFormat (phoneNumber) {
      if (phoneNumber.length === 14) {
        const formattedPhoneNumber = phoneNumber.replace(/\(|\)|-/g, '')
        const areaCode = formattedPhoneNumber.substring(0, 2)
        const remainingDigits = formattedPhoneNumber.substring(2)
        const finalFormattedPhoneNumber = `${areaCode}${remainingDigits.slice(0, 5)}-${remainingDigits.slice(5)}`
        return finalFormattedPhoneNumber
      } else {
        const formattedPhoneNumber = phoneNumber.replace(/\(|\)|-/g, '')
        const areaCode = formattedPhoneNumber.substring(0, 2)
        const remainingDigits = formattedPhoneNumber.substring(2)
        const finalFormattedPhoneNumber = `${areaCode}${remainingDigits.slice(0, 6)}-${remainingDigits.slice(6)}`
        return finalFormattedPhoneNumber
      }
    },
    async selectAffiliate (affiliate, lead) {
      if (!lead.affiliateId || lead.affiliateId !== affiliate.affiliateId) {
        lead.affiliateId = affiliate.affiliateId
        this.searchValue = ' '
        this.searchValue = ''
        console.log('saved')
        await this.$firebase.database().ref(`hotLeads/${lead.key}`).update({ affiliateId: lead.affiliateId })
        this.$toast('Afiliado atribuído com sucesso', {
          timeout: 2000,
        })
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
.monitoring {
  display: flex;
  gap: 5px;
  background: rgba(6, 128, 109, 0.15)!important;
  margin-right: 0px !important;
  border: 2px solid rgb(6, 131, 115, 0.30)!important;
  border-top: none !important;
  border-bottom: none !important;
  border-radius: 0px 0px 5px 5px !important;
  padding: 10px 20px !important;

  span {
    line-height: 21px;
    font-weight: 400;
    font-size: 13.1px;
    color: #FFFFFF !important;
  }
  &:hover{
    background: rgba(6, 128, 109, 0.40)!important;
  }
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
      background-color: white !important;
      color: var(--featured) !important;
      transform: translate(0, -2px);
      outline: none !important;
  }
}
.modal-fade{
  position: absolute;
  top: 5%;
  right: 49%;
  transition-property: right;
}
.modal-content{
  outline: 2px solid #2FB490;
  width: 50vw !important;
  border-radius: 9px  !important;
  margin-top: -50px;
  padding-top: 32px;
  padding-bottom: 32px;
  padding-right: 32px;
  padding-left: 32px;

  .modal-header{
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    width: 100%;
    border: none !important;

    .container-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      .modal-title {
        margin-top: 0px !important;
        color: #404252 !important;

      }
    }
    .btn-close-container {
      svg {
        &:hover {
          line {
            stroke: #777986;
          }
        }
      }
    }
  }
  .modal-mid {
    margin-left: 15px;
    margin-right: 15px;
    background-color: white !important;
    .search-wrapper {
      box-shadow: none;
      opacity: 0.8;
      width: 99.2%;
      font-size: 14px;
      font-weight: 400;
      border-radius: 4px;
      border: 1px solid rgba(0,0,0,.09) !important;
      box-shadow: 0 0 3px 2px rgba(0,0,0,.03) !important;
      padding: 0 5px;

      svg {
        background-color: white !important;
      }

      input {
        border: none;
        box-shadow: none;
        margin-left: 5px;
        width: calc(100% - 31px) !important;
        &::placeholder {
          opacity: 0.6;
          font-size: 14px !important;
          font-weight: 500 !important;
        }
        &:focus {
          border: none !important;
          box-shadow: none !important;
        }
      }
    }
  }
  .modal-body{
    margin: 0 auto !important;

    .navbar-container {
      border-bottom: none;
      ul {
        border-bottom: none;
        display: flex;
        margin-bottom: 0px !important;
        gap: 3px;
        li {
          cursor: pointer !important;
          a {
            padding-top: 10px;
            font-weight: 500;
          }
          .nav-link {
            height: 45px;
            color: #5B5D6B !important;
            background-color: #fafafa;
            border: 1px solid #d2d4da !important;
            border-bottom: none !important;
            border-radius: 9px 9px 0px 0px;
            &.active {
            border: 1px solid #67debe !important;
            background-color: #E9F4F2;
            border-radius: 9px 9px 0px 0px;
            border-bottom: none !important;
            color: #1BA38E !important;
            width: 100%;
            }
          }
        }
      }
    }
    .inner-container {
      width: 850px;
      height: 620px;
      border: 1px solid #d2d4da;
      border-radius: 0px 9px 9px 9px;
      background-color: #E9F4F2;
      padding: 8px;
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
        border-radius: 9px !important;
        background-color: white;
        margin: 5px auto !important;
        margin-top: 0px !important;
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

            .status-inactivate{
              background-color: #6c757d !important;
              color: white;
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
        top: 60%;
        left: 54%;
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

}
.inner-container{
  max-height: 100%;
  overflow-y: scroll;
}

// Loadings Styles
// @keyframes colorChangeAnimation {
//   0% {
//     background-color: rgba(0, 0, 0, 0.07);
//   }
//   25% {
//     background-color: rgba(40, 40, 40, 0.5); /* Darker variant 1 */
//   }
//   50% {
//     background-color: rgba(80, 80, 80, 0.5); /* Darker variant 2 */
//   }
//   75% {
//     background-color: rgba(120, 120, 120, 0.5); /* Darker variant 3 */
//   }
//   100% {
//     background-color: rgba(0, 0, 0, 0.07);
//   }
// }
.loading-sm {
  height: 27px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
  animation: colorChangeAnimation 5s ease-in infinite;
}
.loading-md{
  height: 27px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
  animation: colorChangeAnimation 5s ease-in infinite;
}
.loading-lg{
  height: 27px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
  animation: colorChangeAnimation 5s ease-in infinite;
}
.loading-btn{
  height: 47px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
  animation: colorChangeAnimation 5s ease-in infinite;
}
.loading-btn-sm{
  height: 24px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
  animation: colorChangeAnimation 5s ease-in infinite;
}
</style>
