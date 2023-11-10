<template>
  <div class="container-fluid" v-if="loggedAffiliate.actived">
    <div class="row">
      <layout-navigation/>
      <div class="col-lg-12 col-content">
       <div class="content">
          <WhatsConfigClients :affiliate="loggedAffiliate" :modelsLists="modelWhatsList"/>
          <EmailConfigClients :affiliate="loggedAffiliate" :modelsLists="modelEmailList"/>
          <ModelsUsers ref="modelsListsRef" :affiliate="loggedAffiliate" :user="user" :whatsList="modelWhatsList"  :emailList="modelEmailList" :id="type"/>
          <SavingKeyAPI :affiliate="loggedAffiliate"/>
          <ShippingClients :affiliate="loggedAffiliate" :users="selectedUsers" :modelsLists="modelEmailList"/>
          <div class="container-fluid">
            <div class="row info-container header-page-container">
              <div class="left-container">
                <h4 class="title">
                  Rejeições
                </h4>
                <p class="subtitle mt-3">
                  Através deste sistema você pode gerenciar Leads não bem-sucedidas e clientes não convertidos ou cancelados.
                </p>
              </div>
              <div class="right-container">
                <div class="btn-group dropleft">
                  <button type="button" class="btn btn-config dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="26" height="26" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5H21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 12H21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 19H21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <div class="dropdown-menu">
                    <button type="button" class="btn btn-sm btn-config-whats" @click="this.$root.$emit('WhatsConfig::show')">
                      <svg width="21" height="21" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_700_125)">
                        <path d="M2.15544 10.4119C2.15544 7.415 4.5849 4.98553 7.58181 4.98553H12.0734C15.0703 4.98553 17.4998 7.415 17.4998 10.4119C17.4998 13.4088 15.0703 15.8382 12.0734 15.8382H7.58181C4.5849 15.8382 2.15544 13.4088 2.15544 10.4119Z" fill="#13cf9a" stroke="white"/>
                        <path d="M1.66159 0.499512C2.30312 0.499512 2.82319 1.01958 2.82319 1.66111V9.91218H1.66159H0.5L0.5 1.66111C0.5 1.01958 1.02006 0.499512 1.66159 0.499512Z" fill="#13cf9a" stroke="white"/>
                        <path d="M8.91913 10.4114C8.91913 11.058 8.40198 11.573 7.77536 11.573C7.14881 11.573 6.63165 11.058 6.63165 10.4114C6.63165 9.76471 7.14881 9.24976 7.77536 9.24976C8.40198 9.24976 8.91913 9.76472 8.91913 10.4114Z" fill="#13cf9a" stroke="white"/>
                        <path d="M14.1232 10.4114C14.1232 11.058 13.606 11.573 12.9794 11.573C12.3528 11.573 11.8357 11.058 11.8357 10.4114C11.8357 9.76472 12.3528 9.24976 12.9794 9.24976C13.606 9.24976 14.1232 9.76471 14.1232 10.4114Z" fill="#13cf9a" stroke="white"/>
                        <path d="M0.5 10.4123C0.5 6.49859 3.6706 3.3244 7.58351 3.3244H8.47414C9.11566 3.3244 9.6357 3.84445 9.6357 4.48599C9.6357 5.12754 9.11566 5.64759 8.47414 5.64759H7.58351C4.95532 5.64759 2.82319 7.77997 2.82319 10.4123C2.82319 13.0447 4.95531 15.1771 7.58351 15.1771H11.8896C12.5311 15.1771 13.0512 15.6972 13.0512 16.3387C13.0512 16.9802 12.5311 17.5003 11.8896 17.5003H7.58351C3.6706 17.5003 0.5 14.3261 0.5 10.4123Z" fill="#13cf9a" stroke="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_700_125">
                        <rect width="18" height="18" fill="#13cf9a"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <span>BotConversa / WhatsApp</span>
                    </button>
                    <button type="button" class="btn btn-sm btn-config-mail" @click="this.$root.$emit('EmailConfig::show')">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.636 5.04504H19.363C20.267 5.04504 21 5.77804 21 6.68204V17.318C21 18.222 20.267 18.954 19.364 18.954H4.636C3.733 18.955 3 18.222 3 17.318V6.68204C3 5.77804 3.733 5.04504 4.636 5.04504Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.11902 6.07504L10.813 11.578C11.508 12.075 12.442 12.076 13.138 11.58L20.876 6.06104" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span>Modelos para E-mail</span>
                    </button>
                    <button type="button" class="btn btn-sm btn-bunch" @click="this.$root.$emit('SavingKeyAPI::show')">
                      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.7015 7.29999C18.8175 7.61158 18.7196 7.95898 18.4694 8.18102L17.3489 9.18741C17.0696 9.44169 16.9354 9.81416 16.9536 10.1866C16.9572 10.2905 16.9608 10.3943 16.9608 10.5018C16.9608 10.6092 16.9572 10.7131 16.9536 10.817C16.9354 11.193 17.066 11.5655 17.3489 11.8162L18.4694 12.8226C18.7196 13.0446 18.8175 13.392 18.7015 13.7036C18.5419 14.1298 18.3497 14.5381 18.1285 14.932L17.9581 15.2221C17.7187 15.6161 17.4504 15.9885 17.1567 16.3395C16.9427 16.5974 16.5873 16.6833 16.2682 16.5831L14.8285 16.1318C14.4659 16.0172 14.0742 16.0924 13.7515 16.2965C13.5738 16.4076 13.3925 16.515 13.2039 16.6081C12.8667 16.78 12.6056 17.0809 12.5221 17.4462L12.1994 18.9038C12.1269 19.2297 11.873 19.4876 11.5394 19.5413C11.039 19.6237 10.524 19.6667 9.99819 19.6667C9.47236 19.6667 8.95742 19.6237 8.45698 19.5413C8.12335 19.4876 7.8695 19.2297 7.79698 18.9038L7.47423 17.4462C7.39445 17.0809 7.12972 16.78 6.79247 16.6081C6.6039 16.5114 6.42258 16.4076 6.24489 16.2965C5.92577 16.0924 5.53049 16.0172 5.16785 16.1318L3.73181 16.5866C3.41269 16.6869 3.0573 16.5974 2.84335 16.3431C2.54961 15.9921 2.28126 15.6197 2.04192 15.2257L1.87148 14.9356C1.65027 14.5416 1.45807 14.1334 1.29851 13.7072C1.18247 13.3956 1.28038 13.0482 1.5306 12.8261L2.65115 11.8198C2.93038 11.5655 3.06456 11.193 3.04643 10.8205C3.0428 10.7167 3.03917 10.6128 3.03917 10.5054C3.03917 10.3979 3.0428 10.2941 3.04643 10.1902C3.06456 9.81416 2.93401 9.44169 2.65115 9.19099L1.5306 8.18102C1.28038 7.95898 1.18247 7.61158 1.29851 7.29999C1.45807 6.8738 1.65027 6.46552 1.87148 6.07156L2.04192 5.78147C2.28126 5.38751 2.54961 5.01504 2.84335 4.66406C3.0573 4.4062 3.41269 4.32024 3.73181 4.42052L5.17148 4.87178C5.53412 4.98639 5.92577 4.91118 6.24851 4.70704C6.42621 4.59601 6.60753 4.48857 6.7961 4.39545C7.13335 4.22355 7.39445 3.92271 7.47786 3.5574L7.8006 2.09976C7.87313 1.77385 8.12698 1.51599 8.4606 1.46226C8.96104 1.37631 9.47599 1.33333 10.0018 1.33333C10.5276 1.33333 11.0426 1.37631 11.543 1.45868C11.8767 1.5124 12.1305 1.77027 12.203 2.09618L12.5258 3.55382C12.6056 3.91912 12.8667 4.21996 13.2075 4.39187C13.3961 4.48857 13.5774 4.59243 13.7551 4.70346C14.0742 4.9076 14.4695 4.97923 14.8321 4.8682L16.2718 4.41694C16.5909 4.31666 16.9463 4.4062 17.1603 4.66048C17.454 5.01146 17.7224 5.38393 17.9617 5.77789L18.1321 6.06798C18.3534 6.46194 18.5456 6.87022 18.7051 7.29641L18.7015 7.29999ZM10.0018 13.3669C10.7712 13.3669 11.5091 13.0651 12.0532 12.5278C12.5973 11.9904 12.9029 11.2617 12.9029 10.5018C12.9029 9.74191 12.5973 9.01315 12.0532 8.47583C11.5091 7.93851 10.7712 7.63665 10.0018 7.63665C9.23239 7.63665 8.49449 7.93851 7.95043 8.47583C7.40636 9.01315 7.10071 9.74191 7.10071 10.5018C7.10071 11.2617 7.40636 11.9904 7.95043 12.5278C8.49449 13.0651 9.23239 13.3669 10.0018 13.3669Z" fill="white"/>
                      </svg>
                      <span>Integração BotConversa</span>
                    </button>
                    <button v-if="loggedAffiliate.adm" class="monitoring" @click="this.$refs.MonitoringRef.openModal()">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.0037 21.0037L19.159 19.159" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.1917 12C18.5068 12 20.3835 13.8767 20.3835 16.1917C20.3491 18.4924 18.4924 20.3491 16.1917 20.3835C13.8767 20.3835 12 18.5068 12 16.1917C12 13.8767 13.8767 12 16.1917 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2.99625 16.0017V18.0025C2.99625 19.1075 3.89205 20.0033 4.99708 20.0033H8.99875" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.0038 9.99916V4.99708C21.0038 3.89205 20.108 2.99625 19.0029 2.99625H13.0004" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.6173 15.4584L15.8356 17.2392L14.7651 16.1717" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99916 11.4998H3.49645C3.2202 11.4998 2.99625 11.2758 2.99625 10.9996V10.5934C2.99954 9.43781 3.93552 8.50183 5.09112 8.49854H8.4045C9.5601 8.50183 10.4961 9.43781 10.4994 10.5934V10.9996C10.4994 11.2758 10.2754 11.4998 9.99916 11.4998Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.7478 5.99749C5.64381 5.99749 4.74845 5.1033 4.74698 3.99932C4.74552 2.89533 5.6385 1.99877 6.74248 1.99583C7.84647 1.99289 8.74422 2.88468 8.74865 3.98866C8.75076 4.5207 8.5409 5.03167 8.16544 5.40864C7.78998 5.7856 7.27984 5.99749 6.7478 5.99749Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span>Atribuir Leads</span>
                    </button>
                    <button v-if="loggedAffiliate.adm"  class="btn btn-sm btn-register" @click="this.$root.$emit('NewAffiliate::show')">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.0033 15.1286V6.99825C20.0033 4.78833 18.2116 2.99658 16.0017 2.99658H6.99791C4.78799 2.99658 2.99625 4.78833 2.99625 6.99825V16.002C2.99625 18.2119 4.78799 20.0037 6.99791 20.0037H15.1283" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.7573 7.68247C13.6367 8.56184 13.6367 9.98643 12.7573 10.8658C11.8779 11.7452 10.4534 11.7452 9.57398 10.8658C8.69462 9.98643 8.69462 8.56184 9.57398 7.68247C10.4534 6.80311 11.8779 6.80311 12.7573 7.68247" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.0008 14.4714C13.5907 14.2473 13.1235 14.1143 12.6223 14.1143H9.70905C8.46354 14.1143 7.4121 14.9016 6.99792 16.002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.2534 19.0671H17.7524" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.0029 17.8169V20.3179" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.0029 15.0015C21.2128 15.0015 23.0046 16.7932 23.0046 19.0031C23.0046 21.2131 21.2128 23.0048 19.0029 23.0048C16.793 23.0048 15.0013 21.2131 15.0013 19.0031C15.0013 16.7932 16.793 15.0015 19.0029 15.0015" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span>Cadastrar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid">
            <div class="row search-container pr-0 pl-0 g-0">
              <div class="col-11">
                <input
                    type="name"
                    v-model.lazy="searchValue"
                    class="form-control"
                    placeholder="Digite quem deseja buscar..."
                    required
                >
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupPrepend2" @click="filterUsers()">
                    <template v-if="infoLoading">
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </template>
                    <template v-else>
                      <i class="fa fa-search"></i>
                    </template>
                  </span>
                </div>
              </div>
              <div class="col-1" style="padding: 0px;">
                <div class="toogle-buttons">
                  <div class="inner-container">
                    <div v-if="!loading && changeTable === false" class="current" :class="{ active: changeTable}" @click="switchTable()">
                      <p>Leads</p>
                    </div>
                    <div v-else class="current" :class="{ active: changeTable}">
                      <p>Leads</p>
                    </div>
                    <div v-if="!loading && changeTable === true" class="old" :class="{ active: !changeTable}" @click="switchTable()">
                      <p>Clientes</p>
                    </div>
                    <div v-else class="old" :class="{ active: !changeTable}">
                      <p>Clientes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table v-if="!changeTable" class="table">
            <thead v-if="!loading">
              <tr>
                <th v-if="checkTable" scope="col" style="width: 20px; padding: 0px !important; padding-left: 10px !important; padding-bottom: 5px !important;">
                  <input type="checkbox" class="send" name="send" @click="selectAll()"/>
                </th>
                <th scope="col" style="width: 130px; padding-left: 15px !important">
                  <span style="margin-right: 5px;">Situação</span>
                </th>
                <th scope="col" style="width: 320px;">
                  <span style="margin-right: 10px;">Nome</span>
                </th>
                <th scope="col" style="width: 190px; padding-left: 2px !important">
                  <span style="margin-right: 5px;">Telefone</span>
                </th>
                <th scope="col" style="width: 300px; padding-left: 1px !important">
                  <span style="margin-right: 5px;">E-mail</span>
                </th>
                <th scope="col" style="width: 140px; padding-left: 10px !important">
                  <span style="margin-right: 5px;">Clientes</span>
                </th>
                <th scope="col" style="width: 160px;">
                  <span style="margin-left: 5px;">Incrição</span>
                </th>
                <th scope="col" style="width: 160px;">
                  <span style="margin-left: 5px;">Último Contato</span>
                </th>
                <th scope="col" style="width: 0px;">
                  <span style="margin-left: 4px;">Contatar</span>
                </th>
                <th v-if="!checkTable" scope="col" style="width: 180px; padding-right: 15px !important;">
                  <div class="search-results" >
                    <small > {{ filteredLeads.length }} resultados</small>
                  </div>
                </th>
                <th v-else scope="col" style="display: flex; justify-content: flex-end; margin-right: 36px;">
                  <div class="btn-container">
                    <button class="btn-config-send" @click="sendSelected()">
                      Enviar
                    </button>
                    <button class="btn-cancel-send" @click="changeTable()">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8L16 16" stroke="#DE6767" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 8L8 16" stroke="#DE6767" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <thead v-else>
              <tr>
                <td style="padding-left: 15px !important;"><div class="loading-sm" style="width: 100px;"></div></td>
                <td><div class="loading-md" style="width: 200px; margin-left: -15px;"></div></td>
                <td><div class="loading-sm" style="width: 140px; margin-left: -15px;"></div></td>
                <td><div class="loading-md" style="width: 320px; padding-left: 1px !important"></div></td>
                <td><div class="loading-md" style="width: 160px; padding-left: 8px !important"></div></td>
                <td><div class="loading-sm" style="width: 100px; margin-left: 5px;"></div></td>
                <td><div class="loading-sm" style="width: 100px; margin-left: 4px;"></div></td>
                <td><div class="loading-sm" style="width: 100px; padding-left: 15px !important;"></div></td>
                <td><div class="loading-sm" style="width: 100px; padding-left: 15px !important;"></div></td>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr :key="i" v-for="(lead, i) in filteredLeads">
                <template v-if="(scrollPosition + 40*60)+150 > i*60 && (scrollPosition - 40*60)-16*60 < i*60">
                  <td v-if="checkTable" class="td-checkbox" style="padding-top: 15px !important; padding-right: 0px !important;">
                    <input v-model="lead.selected" type="checkbox" class="send" name="send" @click="lead.selected =  !lead.selected, lead.checked =  !lead.checked"/>
                  </td>
                  <td style="padding-right: 30px !important;" :class="{unfocus: lead.checked}">
                    <template v-if="lead.status.info == 'Ligar'">
                      <div class="info-status status-success" style="padding: 3px 0px !important;">
                      {{ lead.status.info }}
                      </div>
                    </template>
                    <div v-else-if="lead.status.info == 'Assinante'" class="info-status status-subscripted"  style="padding: 3px 0px !important; font-size: 13px;">
                      {{ lead.status.info }}
                    </div>
                    <div v-else-if="(lead.status.info == 'Retornar' && lead.dtReturn)" class="info-status" :class="lead.status.color" style="padding: 3px 0px !important; font-size: 13px;">
                      {{ moment(lead.dtReturn).format('DD/MM/YYYY') }}
                    </div>
                    <div v-else class="info-status" :class="lead.status.color" style="padding: 3px 0px !important; font-size: 12px;">
                      {{ lead.status.info }}
                    </div>
                  </td>
                  <td v-if="lead && lead.name.length > 30" :class="{unfocus: lead.checked}" @click="searchValue = lead.name" style="padding-right: 0px !important; padding-left: 0px !important;">{{ lead.name.toUpperCase().slice(0, 50) }}...</td>
                  <td v-else :class="{unfocus: lead.checked}" @click="searchValue = lead.name" style="padding-right: 0px !important; padding-left: 0px !important;">{{ lead.name.toUpperCase() }}</td>
                  <td :class="{unfocus: lead.checked}" @click="searchValue = lead.phone" style="padding-right: 15px !important; padding-left: 0px !important;">{{ lead.phone }}</td>
                  <td :class="{unfocus: lead.checked}" @click="searchValue = lead.email" style="padding-right: 0px !important; padding-left: 0px !important;">{{ lead.email }}</td>
                  <td :class="{unfocus: lead.checked}" @click="searchValue = lead.clients">
                    <template v-if="lead.clients">
                      <div>
                        <span style="font-size: 13px !important;" class="clients-button">{{lead.clients}}</span>
                      </div>
                    </template>
                    <template v-else>
                      <div style="margin-left: 20px; font-weight: 600;">
                        --
                      </div>
                    </template>
                  </td>
                  <td :class="{unfocus: lead.checked}" style="padding-right: 10px !important; padding-left: 0px !important;">
                    <div class="info-status status-date" style="font-size: 12px; width: 50px;">
                      {{ moment(lead.date).format('DD/MM/YYYY') }}
                    </div>
                  </td>
                  <td :class="{unfocus: lead.checked}" style="padding-right: 10px !important; padding-left: 0px !important;">
                    <div v-if="lead.lastSendDate" class="info-status status-warning" style="font-size: 12px; width: 50px">
                      {{ moment(lead.lastSendDate).format('DD/MM/YYYY') }}
                    </div>
                    <div v-else class="info-status status-warning" style="font-size: 12px !important; width: 50px;">
                      --
                    </div>
                  </td>
                  <!-- <td :class="{unfocus: lead.checked}">
                    <div class="row" style="display: flex; gap: 5px; padding: 0 8px 0px 8px !important;">
                      <div class="button-whats-container">
                        <template v-if="modelsWhatsList.length > 0">
                          <ModelsLeads :lead="lead" :modelsWhatsList="modelsWhatsList" :id="'whats'"/>
                          </template>
                        <template v-else>
                          <button class="btn btn-sm btn-send" @click="$root.$emit('WhatsConfig::show')">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="18px" height="18px" fill-rule="nonzero"><g transform="translate(-21.33333,-21.33333) scale(1.16667,1.16667)"><g fill-opacity="0.23922" fill="#1ba38e" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M117.02857,138.97143v-21.94286h21.94286v21.94286z" id="shape"></path></g><g fill="none" fill-rule="none" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M4.868,43.303l2.694,-9.835c-1.662,-2.878 -2.536,-6.144 -2.535,-9.489c0.005,-10.465 8.521,-18.979 18.987,-18.979c5.079,0.002 9.845,1.979 13.43,5.566c3.584,3.588 5.558,8.356 5.556,13.428c-0.004,10.465 -8.522,18.98 -18.986,18.98c-0.001,0 0,0 0,0h-0.008c-3.177,-0.001 -6.3,-0.798 -9.073,-2.311z" fill="#ffffff" fill-rule="nonzero"></path><path d="M4.868,43.803c-0.132,0 -0.26,-0.052 -0.355,-0.148c-0.125,-0.127 -0.174,-0.312 -0.127,-0.483l2.639,-9.636c-1.636,-2.906 -2.499,-6.206 -2.497,-9.556c0.004,-10.742 8.745,-19.48 19.486,-19.48c5.21,0.002 10.105,2.031 13.784,5.713c3.679,3.683 5.704,8.577 5.702,13.781c-0.004,10.741 -8.746,19.48 -19.486,19.48c-3.189,-0.001 -6.344,-0.788 -9.144,-2.277l-9.875,2.589c-0.042,0.012 -0.084,0.017 -0.127,0.017z" fill="#ffffff" fill-rule="nonzero"></path><path d="M24.014,5c5.079,0.002 9.845,1.979 13.43,5.566c3.584,3.588 5.558,8.356 5.556,13.428c-0.004,10.465 -8.522,18.98 -18.986,18.98h-0.008c-3.177,-0.001 -6.3,-0.798 -9.073,-2.311l-10.065,2.64l2.694,-9.835c-1.662,-2.878 -2.536,-6.144 -2.535,-9.489c0.005,-10.465 8.521,-18.979 18.987,-18.979M24.014,42.974v0v0M24.014,42.974v0v0M24.014,4v0c-11.016,0 -19.982,8.962 -19.987,19.979c-0.001,3.367 0.849,6.685 2.461,9.622l-2.585,9.439c-0.094,0.345 0.002,0.713 0.254,0.967c0.19,0.192 0.447,0.297 0.711,0.297c0.085,0 0.17,-0.011 0.254,-0.033l9.687,-2.54c2.828,1.468 5.998,2.243 9.197,2.244c11.024,0 19.99,-8.963 19.995,-19.98c0.002,-5.339 -2.075,-10.359 -5.848,-14.135c-3.775,-3.777 -8.796,-5.858 -14.139,-5.86z" fill="#cfd8dc" fill-rule="nonzero"></path><path d="M35.176,12.832c-2.98,-2.982 -6.941,-4.625 -11.157,-4.626c-8.704,0 -15.783,7.076 -15.787,15.774c-0.001,2.981 0.833,5.883 2.413,8.396l0.376,0.597l-1.595,5.821l5.973,-1.566l0.577,0.342c2.422,1.438 5.2,2.198 8.032,2.199h0.006c8.698,0 15.777,-7.077 15.78,-15.776c0.001,-4.215 -1.638,-8.179 -4.618,-11.161z" fill="#40c351" fill-rule="nonzero"></path><path d="M19.268,16.045c-0.355,-0.79 -0.729,-0.806 -1.068,-0.82c-0.277,-0.012 -0.593,-0.011 -0.909,-0.011c-0.316,0 -0.83,0.119 -1.265,0.594c-0.435,0.475 -1.661,1.622 -1.661,3.956c0,2.334 1.7,4.59 1.937,4.906c0.237,0.316 3.282,5.259 8.104,7.161c4.007,1.58 4.823,1.266 5.693,1.187c0.87,-0.079 2.807,-1.147 3.202,-2.255c0.395,-1.108 0.395,-2.057 0.277,-2.255c-0.119,-0.198 -0.435,-0.316 -0.909,-0.554c-0.474,-0.238 -2.807,-1.385 -3.242,-1.543c-0.435,-0.158 -0.751,-0.237 -1.068,0.238c-0.316,0.474 -1.225,1.543 -1.502,1.859c-0.277,0.317 -0.554,0.357 -1.028,0.119c-0.474,-0.238 -2.002,-0.738 -3.815,-2.354c-1.41,-1.257 -2.362,-2.81 -2.639,-3.285c-0.277,-0.474 -0.03,-0.731 0.208,-0.968c0.213,-0.213 0.474,-0.554 0.712,-0.831c0.237,-0.277 0.316,-0.475 0.474,-0.791c0.158,-0.317 0.079,-0.594 -0.04,-0.831c-0.117,-0.238 -1.039,-2.584 -1.461,-3.522z" fill="#ffffff" fill-rule="evenodd"></path></g></g></g></svg>
                          </button>
                        </template>
                      </div>
                      <div class="button-email-container">
                        <template v-if="modelEmailList.length > 0">
                          <ModelsLeads :affiliate="loggedAffiliate" :lead="lead" :modelsWhatsList="modelEmailList" :id="'email'"/>
                        </template>
                        <template v-else>
                          <button class="btn btn-sm btn-send-mail" @click="this.$root.$emit('EmailConfig::show')">
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="18px" height="18px"><path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"/><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/></svg>
                          </button>
                        </template>
                      </div>
                    </div>
                  </td> -->
                  <td :class="{unfocus: lead.checked}">
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-comment-dots"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <div class="button-call-container">
                            <a :href="`tel:+55${firstFormat(lead.phone)}`" class="btn btn-sm btn-caller">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.965 16.61L17.792 15.437C17.206 14.851 16.256 14.851 15.671 15.437L14.749 16.359C14.543 16.565 14.231 16.634 13.965 16.517C12.629 15.932 11.309 15.045 10.132 13.868C8.96 12.696 8.076 11.382 7.49 10.051C7.368 9.776 7.439 9.453 7.652 9.24L8.478 8.414C9.149 7.743 9.149 6.794 8.563 6.208L7.39 5.035C6.609 4.254 5.343 4.254 4.562 5.035L3.91 5.686C3.169 6.427 2.86 7.496 3.06 8.556C3.554 11.169 5.072 14.03 7.521 16.479C9.97 18.928 12.831 20.446 15.444 20.94C16.504 21.14 17.573 20.831 18.314 20.09L18.965 19.439C19.746 18.658 19.746 17.392 18.965 16.61V16.61Z" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13 6.991C14.031 6.977 15.067 7.359 15.854 8.146" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.682 5.318C17.113 3.749 15.056 2.964 13 2.964" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.009 11C17.023 9.969 16.641 8.933 15.854 8.146" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.682 5.318C20.251 6.887 21.036 8.944 21.036 11" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </a>
                          </div>
                          <div class="button-whats-container">
                            <template v-if="modelsWhatsList.length > 0">
                              <button v-if="changeButton !== true" type="button" class="btn btn-sm btn-contact" @click="openModalModels(lead, 'botConversa', modelsWhatsList)" @click.middle="changeButton = !changeButton">
                                <svg width="18" height="18" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.12695 19.6669C3.12695 13.4845 8.13877 8.47266 14.3212 8.47266H22.8054C28.9878 8.47266 33.9996 13.4845 33.9996 19.6669C33.9996 25.8493 28.9878 30.8611 22.8054 30.8611H14.3212C8.13878 30.8611 3.12695 25.8493 3.12695 19.6669Z" fill="#3868C7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.13856 -0.0009767C4.87194 -0.000976775 6.27713 1.40421 6.27713 3.13759L6.27713 19.6674L3.13856 19.6674L8.5973e-07 19.6674L1.67678e-07 3.13759C9.19094e-08 1.40421 1.40518 -0.000976624 3.13856 -0.0009767Z" fill="#76C451"></path><path d="M17.7917 19.6659C17.7917 21.3993 16.4016 22.8045 14.6868 22.8045C12.9721 22.8045 11.582 21.3993 11.582 19.6659C11.582 17.9325 12.9721 16.5273 14.6868 16.5273C16.4016 16.5273 17.7917 17.9325 17.7917 19.6659Z" fill="white"></path><path d="M27.6215 19.6659C27.6215 21.3993 26.2314 22.8045 24.5167 22.8045C22.8019 22.8045 21.4118 21.3993 21.4118 19.6659C21.4118 17.9325 22.8019 16.5273 24.5167 16.5273C26.2314 16.5273 27.6215 17.9325 27.6215 19.6659Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 19.6677C0 11.7542 6.41105 5.33496 14.3244 5.33496H16.0067C17.7401 5.33496 19.1452 6.74014 19.1452 8.47352C19.1452 10.2069 17.7401 11.6121 16.0067 11.6121H14.3244C9.88223 11.6121 6.27713 15.2165 6.27713 19.6677C6.27713 24.119 9.88223 27.7234 14.3244 27.7234H22.4581C24.1915 27.7234 25.5967 29.1286 25.5967 30.8619C25.5967 32.5953 24.1915 34.0005 22.4581 34.0005H14.3244C6.41105 34.0005 0 27.5813 0 19.6677Z" fill="#76C451"></path></svg>
                              </button>
                              <button v-else type="button" class="btn btn-sm btn-contact" @click="openModalModels(lead, 'whats', modelsWhatsList)" @click.middle="changeButton = !changeButton">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="18px" height="18px" fill-rule="nonzero"><g transform="translate(-21.33333,-21.33333) scale(1.16667,1.16667)"><g fill-opacity="0.23922" fill="#1ba38e" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M117.02857,138.97143v-21.94286h21.94286v21.94286z" id="shape"></path></g><g fill="none" fill-rule="none" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M4.868,43.303l2.694,-9.835c-1.662,-2.878 -2.536,-6.144 -2.535,-9.489c0.005,-10.465 8.521,-18.979 18.987,-18.979c5.079,0.002 9.845,1.979 13.43,5.566c3.584,3.588 5.558,8.356 5.556,13.428c-0.004,10.465 -8.522,18.98 -18.986,18.98c-0.001,0 0,0 0,0h-0.008c-3.177,-0.001 -6.3,-0.798 -9.073,-2.311z" fill="#ffffff" fill-rule="nonzero"></path><path d="M4.868,43.803c-0.132,0 -0.26,-0.052 -0.355,-0.148c-0.125,-0.127 -0.174,-0.312 -0.127,-0.483l2.639,-9.636c-1.636,-2.906 -2.499,-6.206 -2.497,-9.556c0.004,-10.742 8.745,-19.48 19.486,-19.48c5.21,0.002 10.105,2.031 13.784,5.713c3.679,3.683 5.704,8.577 5.702,13.781c-0.004,10.741 -8.746,19.48 -19.486,19.48c-3.189,-0.001 -6.344,-0.788 -9.144,-2.277l-9.875,2.589c-0.042,0.012 -0.084,0.017 -0.127,0.017z" fill="#ffffff" fill-rule="nonzero"></path><path d="M24.014,5c5.079,0.002 9.845,1.979 13.43,5.566c3.584,3.588 5.558,8.356 5.556,13.428c-0.004,10.465 -8.522,18.98 -18.986,18.98h-0.008c-3.177,-0.001 -6.3,-0.798 -9.073,-2.311l-10.065,2.64l2.694,-9.835c-1.662,-2.878 -2.536,-6.144 -2.535,-9.489c0.005,-10.465 8.521,-18.979 18.987,-18.979M24.014,42.974v0v0M24.014,42.974v0v0M24.014,4v0c-11.016,0 -19.982,8.962 -19.987,19.979c-0.001,3.367 0.849,6.685 2.461,9.622l-2.585,9.439c-0.094,0.345 0.002,0.713 0.254,0.967c0.19,0.192 0.447,0.297 0.711,0.297c0.085,0 0.17,-0.011 0.254,-0.033l9.687,-2.54c2.828,1.468 5.998,2.243 9.197,2.244c11.024,0 19.99,-8.963 19.995,-19.98c0.002,-5.339 -2.075,-10.359 -5.848,-14.135c-3.775,-3.777 -8.796,-5.858 -14.139,-5.86z" fill="#cfd8dc" fill-rule="nonzero"></path><path d="M35.176,12.832c-2.98,-2.982 -6.941,-4.625 -11.157,-4.626c-8.704,0 -15.783,7.076 -15.787,15.774c-0.001,2.981 0.833,5.883 2.413,8.396l0.376,0.597l-1.595,5.821l5.973,-1.566l0.577,0.342c2.422,1.438 5.2,2.198 8.032,2.199h0.006c8.698,0 15.777,-7.077 15.78,-15.776c0.001,-4.215 -1.638,-8.179 -4.618,-11.161z" fill="#40c351" fill-rule="nonzero"></path><path d="M19.268,16.045c-0.355,-0.79 -0.729,-0.806 -1.068,-0.82c-0.277,-0.012 -0.593,-0.011 -0.909,-0.011c-0.316,0 -0.83,0.119 -1.265,0.594c-0.435,0.475 -1.661,1.622 -1.661,3.956c0,2.334 1.7,4.59 1.937,4.906c0.237,0.316 3.282,5.259 8.104,7.161c4.007,1.58 4.823,1.266 5.693,1.187c0.87,-0.079 2.807,-1.147 3.202,-2.255c0.395,-1.108 0.395,-2.057 0.277,-2.255c-0.119,-0.198 -0.435,-0.316 -0.909,-0.554c-0.474,-0.238 -2.807,-1.385 -3.242,-1.543c-0.435,-0.158 -0.751,-0.237 -1.068,0.238c-0.316,0.474 -1.225,1.543 -1.502,1.859c-0.277,0.317 -0.554,0.357 -1.028,0.119c-0.474,-0.238 -2.002,-0.738 -3.815,-2.354c-1.41,-1.257 -2.362,-2.81 -2.639,-3.285c-0.277,-0.474 -0.03,-0.731 0.208,-0.968c0.213,-0.213 0.474,-0.554 0.712,-0.831c0.237,-0.277 0.316,-0.475 0.474,-0.791c0.158,-0.317 0.079,-0.594 -0.04,-0.831c-0.117,-0.238 -1.039,-2.584 -1.461,-3.522z" fill="#ffffff" fill-rule="evenodd"></path></g></g></g></svg>
                              </button>
                            </template>
                            <template v-else>
                              <button class="btn btn-sm btn-send" @click="$root.$emit('WhatsConfig::show')">
                                <svg width="18" height="18" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.12695 19.6669C3.12695 13.4845 8.13877 8.47266 14.3212 8.47266H22.8054C28.9878 8.47266 33.9996 13.4845 33.9996 19.6669C33.9996 25.8493 28.9878 30.8611 22.8054 30.8611H14.3212C8.13878 30.8611 3.12695 25.8493 3.12695 19.6669Z" fill="#3868C7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.13856 -0.0009767C4.87194 -0.000976775 6.27713 1.40421 6.27713 3.13759L6.27713 19.6674L3.13856 19.6674L8.5973e-07 19.6674L1.67678e-07 3.13759C9.19094e-08 1.40421 1.40518 -0.000976624 3.13856 -0.0009767Z" fill="#76C451"></path><path d="M17.7917 19.6659C17.7917 21.3993 16.4016 22.8045 14.6868 22.8045C12.9721 22.8045 11.582 21.3993 11.582 19.6659C11.582 17.9325 12.9721 16.5273 14.6868 16.5273C16.4016 16.5273 17.7917 17.9325 17.7917 19.6659Z" fill="white"></path><path d="M27.6215 19.6659C27.6215 21.3993 26.2314 22.8045 24.5167 22.8045C22.8019 22.8045 21.4118 21.3993 21.4118 19.6659C21.4118 17.9325 22.8019 16.5273 24.5167 16.5273C26.2314 16.5273 27.6215 17.9325 27.6215 19.6659Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 19.6677C0 11.7542 6.41105 5.33496 14.3244 5.33496H16.0067C17.7401 5.33496 19.1452 6.74014 19.1452 8.47352C19.1452 10.2069 17.7401 11.6121 16.0067 11.6121H14.3244C9.88223 11.6121 6.27713 15.2165 6.27713 19.6677C6.27713 24.119 9.88223 27.7234 14.3244 27.7234H22.4581C24.1915 27.7234 25.5967 29.1286 25.5967 30.8619C25.5967 32.5953 24.1915 34.0005 22.4581 34.0005H14.3244C6.41105 34.0005 0 27.5813 0 19.6677Z" fill="#76C451"></path></svg>
                              </button>
                            </template>
                          </div>
                          <div class="button-email-container">
                            <template v-if="modelEmailList.length > 0">
                              <button type="button" class="btn btn-sm btn-contact-mail" @click="openModalModels(lead, 'email', modelEmailList)">
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="18px" height="18px"><path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"/><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/></svg>
                              </button>
                            </template>
                            <template v-else>
                              <button class="btn btn-sm btn-contact-mail" @click="$root.$emit('EmailConfig::show')">
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="18px" height="18px"><path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"/><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/></svg>
                              </button>
                            </template>
                          </div>
                        </div>
                      </div>
                    </td>
                  <td :class="{unfocus: lead.checked}" style="padding: 5px 0px 5px 0px !important;text-align: center !important;"><MonitorLead :lead="lead" :loggedAffiliate="loggedAffiliate"/></td>
                </template>
                <template v-else>
                  <div class="loading-sm" style="width: 130px !important; margin-left: 5px;"></div>
                  <td><div class="loading-md" style="width: 240px"></div></td>
                  <td><div class="loading-sm" style="width: 120px"></div></td>
                  <td><div class="loading-md" style="width: 50px"></div></td>
                  <td><div class="loading-md" style="width: 130px"></div></td>
                  <td><div class="loading-sm" style="width: 100px"></div></td>
                  <td><div class="loading-sm" style="width: 145px"></div></td>
                  <td style="width: 130px !important"><div style="width: 130px !important" class="loading-btn"></div></td>
                  <td style="width: 130px !important"><div style="width: 130px !important" class="loading-btn"></div></td>
                  <td style="width: 130px !important"><div style="width: 130px !important" class="loading-btn"></div></td>
                </template>
              </tr>
            </tbody>
            <tbody v-else>
              <tr
              :key="i"
              v-for="(installment, i) in 15"
              >
                <td><div class="loading-sm"></div></td>
                <td><div class="loading-md"></div></td>
                <td><div class="loading-sm"></div></td>
                <td><div class="loading-md"></div></td>
                <td><div class="loading-md"></div></td>
                <td><div class="loading-sm"></div></td>
                <td><div class="loading-sm"></div></td>
                <td><div class="loading-btn"></div></td>
                <td><div class="loading-btn"></div></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <table v-else class="table">
            <thead>
              <tr>
                <th v-if="checkTable" scope="col" style="width: 20px; padding: 0px !important; padding-left: 10px !important; padding-bottom: 5px !important;">
                  <input type="checkbox" class="send" name="send" @click="selectAll()"/>
                </th>
                <th scope="col" style="padding-left: 10px !important; width: 130px !important;">
                  <spa  n style="margin-left: 5px;">Situação</spa>
                </th>
                <th scope="col" style="padding-left: 10px !important; width: 140px;">Prazo de Teste</th>
                <th scope="col" style="padding-left: 9px !important; width: 230px;">Razão Social | Nome</th>
                <th scope="col" style="padding-left: 9px !important; width: 180px;">CNPJ | CPF</th>
                <th scope="col" style="padding-left: 9px !important; width: 130px;">Plano</th>
                <th scope="col" style="padding-left: 9px !important; width: 150px;;">Assinatura</th>
                <th scope="col" style="padding-left: 9px !important; width: 145px;">Telefone</th>
                <th scope="col" style="padding-left: 9px !important; width: 140px;">Criado</th>
                <th scope="col" style="padding-left: 8px !important; width: 80px;">Contatar</th>
                <th scope="col">Monitorar</th>
                <th v-if="!checkTable" scope="col" style="padding-left: 9px !important;">Acessar</th>
                <th v-else scope="col" style="display: flex; justify-content: center;">
                  <div class="btn-container">
                    <button class="btn-cancel-send" @click="updateTable()">
                      Cancelar
                    </button>
                    <button class="btn-config-send" @click="sendSelected()">
                      Enviar
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <template>
              <tbody v-if="!loading">
                <tr
                  :key="i"
                  v-for="(user, i) in filterUsers"
                >
                  <template v-if="scrollPosition + 40*80 > i*60 && scrollPosition - 40*80 < i*60">
                    <td v-if="checkTable" class="td-checkbox" :class="{unfocus: user.checked}" style="padding-top: 15px !important; padding-right: 0px !important;">
                      <input v-if="!user.sended" v-model="user.selected" type="checkbox" class="send" name="send" @click="user.selected =  !user.selected, user.checked =  !user.checked"/>
                      <i v-else-if="user.sended === true" class="fas fa-check" style="margin-bottom: 10px !important; color: #1BA38E;"></i>
                      <i v-else class="fas fa-times" style="margin-bottom: 10px !important; color: #de6767;"></i>
                    </td>
                    <td :class="{unfocus: user.checked}">
                      <template v-if="user.actived">
                        <button v-if="user.status && user.status.info" class="info-status status-success" style="font-size: 12px; font-weight: 700; width: 100px !important;">
                          <span v-if="user.status.info === 'Em Negociação'">Negociação</span>
                          <span v-else>{{ user.status.info }}</span>
                        </button>
                        <button v-else class="info-status status-success" style="font-size: 12px; font-weight: 700; width: 100px !important;">
                          Ativo
                        </button>
                      </template>
                      <template v-else>
                        <button v-if="user.status && user.status.info" class="info-status status-danger" style="font-size: 12px; font-weight: 700; width: 100px !important;">
                          <span v-if="user.status.info === 'Em Negociação'">Negociação</span>
                          <span v-else>{{ user.status.info }}</span>
                        </button>
                        <button v-else class="info-status status-danger" style="font-size: 12px; font-weight: 700; width: 100px !important;">
                          Desativado
                        </button>
                      </template>
                    </td>
                    <td :class="{unfocus: user.checked}">
                      <div v-if="user.status && user.status.dtCallback" class="info-status status-warning" style="font-size: 12px; width: 50px">
                        {{ moment(user.status.dtCallback).format('DD/MM/YYYY') }}
                      </div>
                      <div v-else class="info-status status-warning" style="font-size: 12px !important; width: 50px;">
                        --
                      </div>
                    </td>
                    <template v-if="user && user.name.length > 30">
                      <td :class="{unfocus: user.checked}">{{user.name.substring(0, 30)}}...</td>
                    </template>
                    <template v-else>
                      <td :class="{unfocus: user.checked}">{{user.name}}</td>
                    </template>
                    <td :class="{unfocus: user.checked}">{{user.documentNumber}}</td>
                    <td :class="{unfocus: user.checked}">{{user.pagarmePlan.name.toUpperCase()}}</td>
                    <td :class="{unfocus: user.checked}">
                      <div v-if="user.pagarmePaymentStatus === 'Pago'" class="info-status status-success" style="font-size: 12px !important;">
                        <span>Pago</span>
                      </div>
                      <div v-else-if="user.pagarmePaymentStatus === 'Inadimplente'" class="info-status status-warning">
                        <span>Inadimplente</span>
                      </div>
                      <div v-else class="info-status status-inactive" style="background-color: #d2d4da !important; color: #5b5d6b !important;">
                        <span>Não Assinante</span>
                      </div>
                    </td>
                    <td :class="{unfocus: user.checked}">{{user.phone}}</td>
                    <template v-if="user.createdAt">
                      <td :class="{unfocus: user.checked}">
                        <div class="info-status status-date" style="font-size: 12px; width: 50px;">
                          {{ moment(user.createdAt).format('DD/MM/YYYY') }}
                        </div>
                      </td>
                    </template>
                    <template v-else>
                      <td :class="{unfocus: user.checked}">-</td>
                    </template>
                    <td :class="{unfocus: user.checked}">
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-comment-dots"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <div class="button-call-container">
                            <a :href="`tel:+55${firstFormat(user.phone)}`" class="btn btn-sm btn-caller">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.965 16.61L17.792 15.437C17.206 14.851 16.256 14.851 15.671 15.437L14.749 16.359C14.543 16.565 14.231 16.634 13.965 16.517C12.629 15.932 11.309 15.045 10.132 13.868C8.96 12.696 8.076 11.382 7.49 10.051C7.368 9.776 7.439 9.453 7.652 9.24L8.478 8.414C9.149 7.743 9.149 6.794 8.563 6.208L7.39 5.035C6.609 4.254 5.343 4.254 4.562 5.035L3.91 5.686C3.169 6.427 2.86 7.496 3.06 8.556C3.554 11.169 5.072 14.03 7.521 16.479C9.97 18.928 12.831 20.446 15.444 20.94C16.504 21.14 17.573 20.831 18.314 20.09L18.965 19.439C19.746 18.658 19.746 17.392 18.965 16.61V16.61Z" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13 6.991C14.031 6.977 15.067 7.359 15.854 8.146" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.682 5.318C17.113 3.749 15.056 2.964 13 2.964" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.009 11C17.023 9.969 16.641 8.933 15.854 8.146" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.682 5.318C20.251 6.887 21.036 8.944 21.036 11" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </a>
                          </div>
                          <div class="button-whats-container">
                            <template v-if="modelWhatsList.length > 0">
                              <button v-if="changeButton === false" type="button" class="btn btn-sm btn-send" @click="openModalModels(user, 'botConversa',)" @click.middle="changeButton = !changeButton">
                                <svg width="18" height="18" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.12695 19.6669C3.12695 13.4845 8.13877 8.47266 14.3212 8.47266H22.8054C28.9878 8.47266 33.9996 13.4845 33.9996 19.6669C33.9996 25.8493 28.9878 30.8611 22.8054 30.8611H14.3212C8.13878 30.8611 3.12695 25.8493 3.12695 19.6669Z" fill="#3868C7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.13856 -0.0009767C4.87194 -0.000976775 6.27713 1.40421 6.27713 3.13759L6.27713 19.6674L3.13856 19.6674L8.5973e-07 19.6674L1.67678e-07 3.13759C9.19094e-08 1.40421 1.40518 -0.000976624 3.13856 -0.0009767Z" fill="#76C451"></path><path d="M17.7917 19.6659C17.7917 21.3993 16.4016 22.8045 14.6868 22.8045C12.9721 22.8045 11.582 21.3993 11.582 19.6659C11.582 17.9325 12.9721 16.5273 14.6868 16.5273C16.4016 16.5273 17.7917 17.9325 17.7917 19.6659Z" fill="white"></path><path d="M27.6215 19.6659C27.6215 21.3993 26.2314 22.8045 24.5167 22.8045C22.8019 22.8045 21.4118 21.3993 21.4118 19.6659C21.4118 17.9325 22.8019 16.5273 24.5167 16.5273C26.2314 16.5273 27.6215 17.9325 27.6215 19.6659Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 19.6677C0 11.7542 6.41105 5.33496 14.3244 5.33496H16.0067C17.7401 5.33496 19.1452 6.74014 19.1452 8.47352C19.1452 10.2069 17.7401 11.6121 16.0067 11.6121H14.3244C9.88223 11.6121 6.27713 15.2165 6.27713 19.6677C6.27713 24.119 9.88223 27.7234 14.3244 27.7234H22.4581C24.1915 27.7234 25.5967 29.1286 25.5967 30.8619C25.5967 32.5953 24.1915 34.0005 22.4581 34.0005H14.3244C6.41105 34.0005 0 27.5813 0 19.6677Z" fill="#76C451"></path></svg>
                              </button>
                              <button v-else type="button" class="btn btn-sm btn-send" @click="openModalModels(user, 'whats')" @click.middle="changeButton = !changeButton">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="18px" height="18px" fill-rule="nonzero"><g transform="translate(-21.33333,-21.33333) scale(1.16667,1.16667)"><g fill-opacity="0.23922" fill="#1ba38e" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M117.02857,138.97143v-21.94286h21.94286v21.94286z" id="shape"></path></g><g fill="none" fill-rule="none" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M4.868,43.303l2.694,-9.835c-1.662,-2.878 -2.536,-6.144 -2.535,-9.489c0.005,-10.465 8.521,-18.979 18.987,-18.979c5.079,0.002 9.845,1.979 13.43,5.566c3.584,3.588 5.558,8.356 5.556,13.428c-0.004,10.465 -8.522,18.98 -18.986,18.98c-0.001,0 0,0 0,0h-0.008c-3.177,-0.001 -6.3,-0.798 -9.073,-2.311z" fill="#ffffff" fill-rule="nonzero"></path><path d="M4.868,43.803c-0.132,0 -0.26,-0.052 -0.355,-0.148c-0.125,-0.127 -0.174,-0.312 -0.127,-0.483l2.639,-9.636c-1.636,-2.906 -2.499,-6.206 -2.497,-9.556c0.004,-10.742 8.745,-19.48 19.486,-19.48c5.21,0.002 10.105,2.031 13.784,5.713c3.679,3.683 5.704,8.577 5.702,13.781c-0.004,10.741 -8.746,19.48 -19.486,19.48c-3.189,-0.001 -6.344,-0.788 -9.144,-2.277l-9.875,2.589c-0.042,0.012 -0.084,0.017 -0.127,0.017z" fill="#ffffff" fill-rule="nonzero"></path><path d="M24.014,5c5.079,0.002 9.845,1.979 13.43,5.566c3.584,3.588 5.558,8.356 5.556,13.428c-0.004,10.465 -8.522,18.98 -18.986,18.98h-0.008c-3.177,-0.001 -6.3,-0.798 -9.073,-2.311l-10.065,2.64l2.694,-9.835c-1.662,-2.878 -2.536,-6.144 -2.535,-9.489c0.005,-10.465 8.521,-18.979 18.987,-18.979M24.014,42.974v0v0M24.014,42.974v0v0M24.014,4v0c-11.016,0 -19.982,8.962 -19.987,19.979c-0.001,3.367 0.849,6.685 2.461,9.622l-2.585,9.439c-0.094,0.345 0.002,0.713 0.254,0.967c0.19,0.192 0.447,0.297 0.711,0.297c0.085,0 0.17,-0.011 0.254,-0.033l9.687,-2.54c2.828,1.468 5.998,2.243 9.197,2.244c11.024,0 19.99,-8.963 19.995,-19.98c0.002,-5.339 -2.075,-10.359 -5.848,-14.135c-3.775,-3.777 -8.796,-5.858 -14.139,-5.86z" fill="#cfd8dc" fill-rule="nonzero"></path><path d="M35.176,12.832c-2.98,-2.982 -6.941,-4.625 -11.157,-4.626c-8.704,0 -15.783,7.076 -15.787,15.774c-0.001,2.981 0.833,5.883 2.413,8.396l0.376,0.597l-1.595,5.821l5.973,-1.566l0.577,0.342c2.422,1.438 5.2,2.198 8.032,2.199h0.006c8.698,0 15.777,-7.077 15.78,-15.776c0.001,-4.215 -1.638,-8.179 -4.618,-11.161z" fill="#40c351" fill-rule="nonzero"></path><path d="M19.268,16.045c-0.355,-0.79 -0.729,-0.806 -1.068,-0.82c-0.277,-0.012 -0.593,-0.011 -0.909,-0.011c-0.316,0 -0.83,0.119 -1.265,0.594c-0.435,0.475 -1.661,1.622 -1.661,3.956c0,2.334 1.7,4.59 1.937,4.906c0.237,0.316 3.282,5.259 8.104,7.161c4.007,1.58 4.823,1.266 5.693,1.187c0.87,-0.079 2.807,-1.147 3.202,-2.255c0.395,-1.108 0.395,-2.057 0.277,-2.255c-0.119,-0.198 -0.435,-0.316 -0.909,-0.554c-0.474,-0.238 -2.807,-1.385 -3.242,-1.543c-0.435,-0.158 -0.751,-0.237 -1.068,0.238c-0.316,0.474 -1.225,1.543 -1.502,1.859c-0.277,0.317 -0.554,0.357 -1.028,0.119c-0.474,-0.238 -2.002,-0.738 -3.815,-2.354c-1.41,-1.257 -2.362,-2.81 -2.639,-3.285c-0.277,-0.474 -0.03,-0.731 0.208,-0.968c0.213,-0.213 0.474,-0.554 0.712,-0.831c0.237,-0.277 0.316,-0.475 0.474,-0.791c0.158,-0.317 0.079,-0.594 -0.04,-0.831c-0.117,-0.238 -1.039,-2.584 -1.461,-3.522z" fill="#ffffff" fill-rule="evenodd"></path></g></g></g></svg>
                              </button>
                            </template>
                            <template v-else>
                              <button class="btn btn-sm btn-send" @click="$root.$emit('WhatsConfigClients::show')">
                                <svg width="18" height="18" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.12695 19.6669C3.12695 13.4845 8.13877 8.47266 14.3212 8.47266H22.8054C28.9878 8.47266 33.9996 13.4845 33.9996 19.6669C33.9996 25.8493 28.9878 30.8611 22.8054 30.8611H14.3212C8.13878 30.8611 3.12695 25.8493 3.12695 19.6669Z" fill="#3868C7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.13856 -0.0009767C4.87194 -0.000976775 6.27713 1.40421 6.27713 3.13759L6.27713 19.6674L3.13856 19.6674L8.5973e-07 19.6674L1.67678e-07 3.13759C9.19094e-08 1.40421 1.40518 -0.000976624 3.13856 -0.0009767Z" fill="#76C451"></path><path d="M17.7917 19.6659C17.7917 21.3993 16.4016 22.8045 14.6868 22.8045C12.9721 22.8045 11.582 21.3993 11.582 19.6659C11.582 17.9325 12.9721 16.5273 14.6868 16.5273C16.4016 16.5273 17.7917 17.9325 17.7917 19.6659Z" fill="white"></path><path d="M27.6215 19.6659C27.6215 21.3993 26.2314 22.8045 24.5167 22.8045C22.8019 22.8045 21.4118 21.3993 21.4118 19.6659C21.4118 17.9325 22.8019 16.5273 24.5167 16.5273C26.2314 16.5273 27.6215 17.9325 27.6215 19.6659Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 19.6677C0 11.7542 6.41105 5.33496 14.3244 5.33496H16.0067C17.7401 5.33496 19.1452 6.74014 19.1452 8.47352C19.1452 10.2069 17.7401 11.6121 16.0067 11.6121H14.3244C9.88223 11.6121 6.27713 15.2165 6.27713 19.6677C6.27713 24.119 9.88223 27.7234 14.3244 27.7234H22.4581C24.1915 27.7234 25.5967 29.1286 25.5967 30.8619C25.5967 32.5953 24.1915 34.0005 22.4581 34.0005H14.3244C6.41105 34.0005 0 27.5813 0 19.6677Z" fill="#76C451"></path></svg>
                              </button>
                            </template>
                          </div>
                          <div class="button-email-container">
                            <template v-if="modelEmailList.length > 0">
                              <button type="button" class="btn btn-sm btn-send-mail" @click="openModalModels(user, 'email')">
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="18px" height="18px"><path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"/><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/></svg>
                              </button>
                            </template>
                            <template v-else>
                              <button class="btn btn-sm btn-send-mail" @click="$root.$emit('ModelsListClients::show')">
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="18px" height="18px"><path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"/><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/></svg>
                              </button>
                            </template>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td :class="{unfocus: user.checked}">
                      <div class="row" style="padding: 0 12px !important;">
                        <MonitorUsers :user="user" :loggedAffiliate="loggedAffiliate" @update="handleUpdate" />
                      </div>
                    </td>
                    <td :class="{unfocus: user.checked}" style="width: 150px !important"><a class="btn btn-sm btn-access" @click="accessAccount(user.email, user.password)">Acessar</a></td>
                  </template>
                  <template v-else>
                    <td><div class="loading-sm" style="width: 100%"></div></td>
                    <td><div class="loading-md" style="width: 150px"></div></td>
                    <td><div class="loading-sm" style="width: 160px"></div></td>
                    <td><div class="loading-md" style="width: 90px"></div></td>
                    <td><div class="loading-md" style="width: 120px"></div></td>
                    <td><div class="loading-sm" style="width: 120px"></div></td>
                    <td><div class="loading-sm" style="width: 120px"></div></td>
                    <td><div class="loading-sm" style="width: 60px"></div></td>
                    <td><div class="loading-md" style="width: 90px"></div></td>
                    <td style="width: 150px !important"><div style="width: 150px !important" class="loading-btn"></div></td>
                  </template>
                </tr>
              </tbody>
              <tbody v-else>
                <tr
                  :key="i"
                  v-for="(installment, i) in 10"
                >
                  <td><div class="loading-sm" style="width: 100px !important;"></div></td>
                  <td><div class="loading-md" style="width: 100px;"></div></td>
                  <td><div class="loading-sm" style="width: 200px;"></div></td>
                  <td><div class="loading-md" style="width: 150px;"></div></td>
                  <td><div class="loading-md" style="width: 100px"></div></td>
                  <td><div class="loading-sm" style="width: 120px"></div></td>
                  <td><div class="loading-sm" style="width: 150px;"></div></td>
                  <td><div class="loading-sm" style="width: 150px;"></div></td>
                  <td><div class="loading-sm" style="width: 55px;"></div></td>
                  <td><div style="width: 120px !important;" class="loading-btn"></div></td>
                  <td><div style="width: 120px !important" class="loading-btn"></div></td>
                </tr>
              </tbody>
            </template>
          </table>
       </div>
      </div>
    </div>
    <div class="modal fade" :class="{show: showTutorial}" :style="{display: showTutorial ? 'block' : 'none'}">
      <div class=" modal-dialog modal-dialog-centered modal-lg" role="dialog" style="transform: translate(0, -40px); z-index: 9999;">
        <div class="modal-content">
          <div class="modal-header pb-3">
            <button type="button" class="close" @click="showTutorial = false; pauseVideo()" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times" style="color: white;"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade" :class="{show: showTutorial}" @click="showTutorial = false; pauseVideo()" :style="{display: showTutorial ? 'block' : 'none'}"></div>
    </div>
  </div>
</template>

<script>
import ModelsUsers from './ModelsUsers.vue'
import MonitorUsers from './MonitorUsers.vue'
import LayoutNavigation from '../../components/layout/LayoutNavigation'
import moment from 'moment'
import WhatsConfigClients from './WhatsConfigClients'
import EmailConfigClients from './EmailConfigClients'
import SavingKeyAPI from '../../components/global/SavingKeyAPI.vue'
import { useToast } from 'vue-toastification'
import ShippingClients from './ShippingClients.vue'
// import MonitorLead from '../../components/global/MonitorLeads.vue'

export default {
  name: 'Home',
  components: {
    LayoutNavigation,
    WhatsConfigClients,
    EmailConfigClients,
    ModelsUsers,
    MonitorUsers,
    SavingKeyAPI,
    ShippingClients,
  },
  data: () => ({
    changeButton: false,
    changeTable: false,
    checkTable: false,
    type: '',
    allUsers: [],
    leads: [],
    users: [],
    selectedUsers: [],
    user: {},
    oldPlansUsers: [],
    searchValue: '',
    loggedAffiliate: {},
    loading: true,
    showTutorial: false,
    plans: [],
    subscriptions: [],
    newSubscriptions: {},
    usersStatus: {},
    transations: {},
    filteredUsers: [],
    modelWhatsList: [],
    modelEmailList: [],
    notifications: [],
    infoLoading: false,
    showingAll: true,
    scrollPosition: 0
  }),
  async mounted () {
    this.loading = true
    await this.getInfoLeads()
    window.addEventListener('scroll', this.onScroll, true)
  },
  beforeDestroy () {
    window.scrollTo(0, 0)
    window.removeEventListener('scroll', this.onScroll)
    this.$firebase.database().ref(`users/${window.uid}`).off()
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
            const toast = useToast()
            toast(`Parabéns! O cliente ${this.users[index].name.substring(0, 20)} contratou o plano ${this.users[index].pagarmePlan.name}!`)
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
  computed: {
    filteredLeads () {
      let tempUsers = []
      tempUsers = this.leads
      if (this.searchValue !== '' && this.searchValue) {
        tempUsers = tempUsers.filter((lead) => {
          if (this.searchValue.toLowerCase() === 'ligar') {
            return lead.status.info === 'Ligar'
          } else if (this.searchValue.toLowerCase() === 'retornar') {
            return lead.status.info === 'Retornar'
          } else if (this.searchValue.toLowerCase() === 'testando') {
            return lead.status.info === 'Testando'
          } else if ((this.searchValue.toLowerCase() === 'não quer') || (this.searchValue.toLowerCase() === 'não')) {
            return lead.status.info === 'Não quer'
          } else if ((this.searchValue.toLowerCase() === 'assinante')) {
            return lead.status.info === 'Assinante'
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
    },
    filterUsers () {
      let tempUsers = []
      if (this.changeTable === true) {
        tempUsers = this.users
        if (this.searchValue !== '' && this.searchValue) {
          tempUsers = tempUsers.filter((user) => {
            if (this.searchValue.toUpperCase() === 'ATIVO') {
              return user.actived.toString().toUpperCase().includes('TRUE')
            } else if (this.searchValue.toUpperCase() === 'DESATIVADO') {
              return user.actived.toString().toUpperCase().includes('FALSE')
            } else if (this.searchValue.toLowerCase() === 'testando') {
              return user.status.info === 'Testando'
            } else if ((this.searchValue.toLowerCase() === 'não quer') || (this.searchValue.toLowerCase() === 'não')) {
              return user.status.info === 'Não quer'
            } else if ((this.searchValue.toLowerCase() === 'assinante')) {
              return user.status.info === 'Assinante'
            } else if ((this.searchValue === user.phone) || (this.searchValue === this.firstFormat(user.phone)) || (this.searchValue === this.secondFormat(user.phone))) {
              return user.phone
            } else {
              let result
              switch (true) {
                case user.name.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.name
                  break
                case user.documentNumber.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.documentNumber
                  break
                case user.phone && user.phone.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.phone
                  break
                case user.pagarmePlan.name && user.pagarmePlan.name.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.pagarmePlan.name
                  break
                case user.pagarmePaymentStatus && user.pagarmePaymentStatus.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.pagarmePaymentStatus
                  break
                case user.pagarmeSubscription && user.pagarmeSubscription.benefits.customer && String(user.pagarmeSubscription.benefits.customer).includes(this.searchValue):
                  result = user.pagarmeSubscription.benefits.customer
                  break
                case user.createdAt && moment(user.createdAt).format('DD/MM/YYYY').toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.createdAt
                  break
              }
              return result
            }
          })
        }
        let haveStatus = tempUsers.filter(user => user.status && user.status.dtCallback)
        const notHave = tempUsers.filter(user => !user.status)
        haveStatus = haveStatus.sort(function (a, b) {
          const dateA = new Date(a.status.dtCallback)
          const dateB = new Date(b.status.dtCallback)

          return dateA - dateB
        })
        tempUsers = [...haveStatus, ...notHave]
        return tempUsers
      } else {
        tempUsers = this.oldPlansUsers
        if (this.searchValue !== '' && this.searchValue) {
          tempUsers = tempUsers.filter((user) => {
            if (this.searchValue.toUpperCase() === 'ATIVO') {
              return user.actived.toString().toUpperCase().includes('TRUE')
            } else if (this.searchValue.toUpperCase() === 'DESATIVADO') {
              return user.actived.toString().toUpperCase().includes('FALSE')
            } else if (this.searchValue.toLowerCase() === 'testando') {
              return user.status.info === 'Testando'
            } else if ((this.searchValue.toLowerCase() === 'não quer') || (this.searchValue.toLowerCase() === 'não')) {
              return user.status.info === 'Não quer'
            } else if ((this.searchValue.toLowerCase() === 'assinante')) {
              return user.status.info === 'Assinante'
            } else if ((this.searchValue === user.phone) || (this.searchValue === this.firstFormat(user.phone)) || (this.searchValue === this.secondFormat(user.phone))) {
              return user.phone
            } else {
              let result
              switch (true) {
                case user.name.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.name
                  break
                case user.documentNumber.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.documentNumber
                  break
                case user.phone && user.phone.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.phone
                  break
                case user.pagarmePlan.name && user.pagarmePlan.name.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.pagarmePlan.name
                  break
                case user.pagarmePaymentStatus && user.pagarmePaymentStatus.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.pagarmePaymentStatus
                  break
                case user.pagarmeSubscription && user.pagarmeSubscription.benefits.customer && String(user.pagarmeSubscription.benefits.customer).includes(this.searchValue):
                  result = user.pagarmeSubscription.benefits.customer
                  break
                case user.createdAt && moment(user.createdAt).format('DD/MM/YYYY').toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.createdAt
                  break
              }
              return result
            }
          })
        }
        let first = tempUsers.filter(user => user.status && user.status.info === 'Em Negociação')
        first = first.sort(function (a, b) {
          return new Date(a.status.dtCallback) - new Date(b.status.dtCallback)
        })
        let second = tempUsers.filter(user => user.status && user.status.info === 'Testando')
        second = second.sort(function (a, b) {
          return new Date(b.status.dtCallback) - new Date(a.status.dtCallback)
        })
        let third = tempUsers.filter(user => user.status && user.status.info !== 'Testando' && user.status.info !== 'Em Negociação')
        third = third.sort(function (a, b) {
          return new Date(b.status.dtCallback) - new Date(a.status.dtCallback)
        })
        const others = tempUsers.filter(user => !user.status)
        tempUsers = [...first, ...second, ...third, ...others]
        return tempUsers
      }
    }
  },
  methods: {
    // Manipulação da Lista referente a Leads
    async getInfoLeads () {
      await this.$firebase.database().ref(`affiliates/${window.uid}`).on('value', snapshot => {
        const values = snapshot.val()
        if (values) {
          this.loggedAffiliate = values
        }
      })
      await this.$firebase.database().ref('hotLeads').on('value', snapshot => {
        let values = snapshot.val()
        const tempArray = []
        for (const v in values) {
          values[v].key = v
          tempArray.push(values[v])
        }
        values = tempArray
        if (values) {
          let tempArray = values
          // this.allLeads = values
          tempArray = tempArray.filter(lead => lead.affiliateId && lead.affiliateId === this.loggedAffiliate.affiliateId)
          this.leads = tempArray.filter(lead => lead.status.info === 'Não Quer')
          for (let index = 0; index < this.leads.length; index++) {
            this.leads[index].selected = false
            this.leads[index].checked = false
          }
        }
      })
      await this.$firebase.database().ref(`support/textsModel/${window.uid}/whatsMessage`).on('value', snapshot => {
        let values = snapshot.val()
        if (values) {
          values = Object.keys(values).map(i => values[i])
          this.modelsWhatsList = values
          let favoritesList = []
          let unfavoritesList = []
          let notHave = []
          if (this.modelsWhatsList.length > 0) {
            this.listSaved = true
            this.modelsWhatsList = this.modelsWhatsList.filter(m => m.origin === 'leads')
            favoritesList = this.modelsWhatsList.filter(m => m && m.favorite && m.favorite === true)
            unfavoritesList = this.modelsWhatsList.filter(m => m.favorite && m.favorite === false)
            notHave = this.modelsWhatsList.filter(m => !m.favorite)
            this.modelsWhatsList = [...favoritesList, ...unfavoritesList, ...notHave]
          }
        }
      })
      await this.$firebase.database().ref(`support/textsModel/${window.uid}/mailMessage`).on('value', snapshot => {
        let values = snapshot.val()
        if (values) {
          values = Object.keys(values).map(i => values[i])
          this.modelEmailList = values
          let favoritesList = []
          let unfavoritesList = []
          let notHave = []
          if (this.modelEmailList.length > 0) {
            this.listSaved = true
            this.modelEmailList = this.modelEmailList.filter(m => m.origin === 'leads')
            favoritesList = this.modelEmailList.filter(m => m && m.favorite && m.favorite === true)
            unfavoritesList = this.modelEmailList.filter(m => m.favorite && m.favorite === false)
            notHave = this.modelEmailList.filter(m => !m.favorite)
            this.modelEmailList = [...favoritesList, ...unfavoritesList, ...notHave]
          }
        }
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },

    // Primary
    async getModels () {
      await this.$firebase.database().ref(`support/textsModel/${window.uid}/whatsMessage`).on('value', snapshot => {
        let values = snapshot.val()
        if (values) {
          values = Object.keys(values).map(i => values[i])
          this.modelWhatsList = values
          let favoritesList = []
          let unfavoritesList = []
          let notHave = []
          if (this.modelWhatsList.length > 0) {
            this.listSaved = true
            this.modelWhatsList = this.modelWhatsList.filter(m => m.origin === 'users')
            favoritesList = this.modelWhatsList.filter(m => m && m.favorite && m.favorite === true)
            unfavoritesList = this.modelWhatsList.filter(m => m.favorite && m.favorite === false)
            notHave = this.modelWhatsList.filter(m => !m.favorite)
            this.modelWhatsList = [...favoritesList, ...unfavoritesList, ...notHave]
          }
        }
      })
      await this.$firebase.database().ref(`support/textsModel/${window.uid}/mailMessage`).on('value', snapshot => {
        let values = snapshot.val()
        if (values) {
          values = Object.keys(values).map(i => values[i])
          this.modelEmailList = values
          let favoritesList = []
          let unfavoritesList = []
          let notHave = []
          if (this.modelEmailList.length > 0) {
            this.listSaved = true
            this.modelEmailList = this.modelEmailList.filter(m => m.origin === 'users')
            favoritesList = this.modelEmailList.filter(m => m && m.favorite && m.favorite === true)
            unfavoritesList = this.modelEmailList.filter(m => m.favorite && m.favorite === false)
            notHave = this.modelEmailList.filter(m => !m.favorite)
            this.modelEmailList = [...favoritesList, ...unfavoritesList, ...notHave]
          }
        }
      })
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
    getUsersFrequency (user, date) {
      if (user.emissionsHistoric && user.emissionsHistoric[date] && user.pagarmePlan.amount) {
        if (user.emissionsHistoric[date].totalEmissions) {
          const result = Math.round((parseInt(user.emissionsHistoric[date].totalEmissions) / user.pagarmePlan.amount) * 100)
          if (result <= 100) {
            user.frequencyPorcentage.push(result)
            return result
          } else {
            return 100
          }
        } else {
          const historicLenght = Object.keys(user.emissionsHistoric[date].emissions).map(i => user.emissionsHistoric[date].emissions[i]).length
          const result = (historicLenght / user.pagarmePlan.amount) * 100
          if (result <= 100) {
            user.frequencyPorcentage.push(result)
            return result
          } else {
            return 100
          }
        }
      } else {
        if (user.emissionsHistoric && user.emissionsHistoric[date] && user.emissionsHistoric[date].emissions && !user.pagarmePlan.amount) {
          const historicLenght = Object.keys(user.emissionsHistoric[date].emissions).map(i => user.emissionsHistoric[date].emissions[i]).length
          const result = (historicLenght / 50) * 100
          if (result <= 100) {
            user.frequencyPorcentage.push(result)
            return result
          } else {
            return 100
          }
        }
      }
      return 1
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async getAffiliate () {
      // Pega e filtrar o afiliado logado
      await this.$firebase.database().ref(`affiliates/${window.uid}`).on('value', snapshot => {
        const values = snapshot.val()
        if (values) {
          this.loggedAffiliate = values
        }
      })
    },
    async getMonitorInfo () {
      // Pega e filtrar o afiliado logado
      await this.$firebase.database().ref('support/monitoringComercial').on('value', snapshot => {
        const values = snapshot.val()
        if (values) {
          this.usersStatus = values
        }
      })
    },
    async getUsers () {
      this.searchValue = this.$router.history.current.params.searchValue ? this.$router.history.current.params.searchValue : ''
      await this.$firebase.database().ref('users').on('value', snapshot => {
        let values = snapshot.val()
        values = Object.keys(values).map(i => values[i])
        this.users = []
        this.oldPlansUsers = []
        this.allUsers = values
        if (values.length) {
          for (let i = 0; i < values.length; i++) {
            if (values[i].affiliateId === window.uid) {
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
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    async getNotifications () {
      await this.$firebase.database().ref('support/notifications').once('value', snapshot => {
        const values = snapshot.val()
        if (values) {
          this.notifications = values
          this.notifications = Object.keys(values).map(i => values[i])
        }
      })
    },
    async accessAccount (email, password) {
      let afiliate
      await this.$root.$emit('verifyActived')
      await this.$firebase.database().ref(`affiliates/${window.uid}`).once('value', snapshot => {
        afiliate = snapshot.val()
      })
      if (afiliate.actived) {
        await window.open(`https://emissaosimples.com.br/login/${this.$CryptoJS.AES.encrypt(email, 'Secret Passphrase').toString().replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l')}/${this.$CryptoJS.AES.encrypt(password, 'Secret Passphrase').toString().replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l')}/` + this.$CryptoJS.AES.encrypt(JSON.stringify({
          name: afiliate.name,
          office: 'Comercial',
          profileId: window.uid,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/emissaosimplestestes.appspot.com/o/usersProfilesImage%2FMnb5gJEzUAPYzplonKlQuRz3BTY2%2F1664894088572.png?alt=media&token=e0add296-2fda-42b8-987f-3a9efd9ef747',
          permissions: {
            simples: true,
            installments: true,
            certificates: true,
            mei: true,
            dctfweb: true,
            myteam: true,
            myaccount: true,
            mailboxes: true
          }
        }), 'Secret Passphrase').toString().replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l'), '_blank')
      }
    },
    async switchTable () {
      if (this.changeTable === true) {
        this.changeTable = false
        const result = this.oldPlansUsers.find((user) => user.pagarmePlan)
        if (result === undefined) {
          this.loading = true
          await this.processPlans()
          const tempArray = []
          for (let i = 0; i < this.oldPlansUsers.length; i++) {
            this.oldPlansUsers[i].pagarmePlan = this.getPagarmePlan(this.oldPlansUsers, this.oldPlansUsers[i].currentPlanId)
            this.oldPlansUsers[i].pagarmePaymentStatus = this.getPagarmeSubscription(this.oldPlansUsers, this.oldPlansUsers[i].currentSubscriptionId)
            if (this.usersStatus[this.oldPlansUsers[i].uId]) {
              this.oldPlansUsers[i].status = this.usersStatus[this.oldPlansUsers[i].uId]
            }
            tempArray.push(this.oldPlansUsers[i])
          }
          this.oldPlansUsers = tempArray
        }
        this.loading = false
      } else {
        this.changeTable = true
      }
    },
    async processPlans () {
      try {
        // Requisição dos palnos do pagarme
        this.$root.$emit('verifyActived')
        let allPlanIds = []
        for (let i = 1; i < 3; i++) {
          allPlanIds = [...allPlanIds, ...await this.$pagarme.client.connect({ api_key: process.env.VUE_APP_PAGARME_API_KEY }).then(client => client.subscriptions.all({ count: 1000, page: i }))]
        }
        const subscriptionsQueries = []
        for (let i = 1; i < allPlanIds.length / 3 + 1; i++) {
          subscriptionsQueries.push(this.$pagarme.client.connect({ api_key: process.env.VUE_APP_PAGARME_API_KEY }).then(client => client.subscriptions.all({ count: 10, page: i })).then(subscription => subscription))
          await this.sleep(500)
        }
        var allSubscriptions = []
        const subscriptionsQueriesResponses = await Promise.all(subscriptionsQueries)
        for (const subscriptionArray of subscriptionsQueriesResponses) {
          for (const subscription of subscriptionArray) {
            allSubscriptions.push(subscription)
          }
        }
        this.subscriptions = allSubscriptions
      } catch (error) {
        await this.sleep(100)
        this.processPlans()
      }
    },
    getPagarmePlan (user, currentPlanId) {
      const emptyPlan = { name: 'Grátis' }
      for (let i = 0; i < this.plans.length; i++) {
        if (this.plans[i].pagarmeId === currentPlanId) {
          return this.plans[i]
        }
      }
      user.pagarmePlan = emptyPlan
      return emptyPlan
    },
    getPagarmeSubscription (user, currentSubscriptionId) {
      if (currentSubscriptionId !== '') {
        for (let i = 0; i < this.subscriptions.length; i++) {
          if (this.subscriptions[i].id === currentSubscriptionId) {
            if (this.subscriptions[i].status === 'paid') {
              return 'Pago'
            } else if (this.subscriptions[i].status === 'canceled') {
              return 'Cancelado'
            } else {
              return 'Inadimplente'
            }
          }
        }
        return 'Não Assinante'
      } else {
        return 'Não Assinante'
      }
    },
    openModalModels (user, type) {
      this.user = {}
      this.type = ''
      this.user = user
      this.type = type
      this.$refs.modelsListsRef.openModal()
      // this.$root.$emit('ModelsListClients::show')
    },
    saveBotconversaAPI () {
      this.$root.$emit('SavingKeyAPI::show')
    },
    updateTable () {
      if (this.checkTable) {
        for (let index = 0; index < this.filterUsers.length; index++) {
          this.filterUsers[index].checked = false
          this.filterUsers[index].selected = false
          this.selectedAll = false
        }
        this.checkTable = false
      } else {
        for (let index = 0; index < this.filterUsers.length; index++) {
          this.filterUsers[index].checked = true
        }
        this.checkTable = true
      }
    },
    selectAll () {
      if (this.selectedAll) {
        for (let index = 0; index < this.filterUsers.length; index++) {
          this.filterUsers[index].selected = false
          this.filterUsers[index].checked = true
        }
        this.selectedAll = false
      } else {
        for (let index = 0; index < this.filterUsers.length; index++) {
          this.filterUsers[index].selected = true
          this.filterUsers[index].checked = false
        }
        this.selectedAll = true
      }
    },
    sendSelected () {
      const selected = this.filterUsers.filter(user => user && user.selected === true)
      if (selected.length > 0) {
        this.selectedUsers = selected
        this.$root.$emit('ShippingClients::show')
      }
    },
    // Secondary
    onScroll () {
      setTimeout(() => {
        this.scrollPosition = window.scrollY
      }, 500)
    },
    toTimestamp (strDate) {
      var datum = Date.parse(strDate)
      return datum / 100
    },
    capitalize (data) {
      var capitalized = []
      var dataTemp = data + ''
      dataTemp.split(' ').forEach(word => {
        capitalized.push(
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
        )
      })
      return capitalized.join(' ')
    },
    firstFormat (phoneNumber) {
      const numericPhoneNumber = phoneNumber.replace(/\D/g, '')
      return numericPhoneNumber
    },
    secondFormat (phoneNumber) {
      if (phoneNumber.length === 15) {
        const formattedPhoneNumber = phoneNumber.replace(/\(|\)|-/g, '')
        const areaCode = formattedPhoneNumber.substring(0, 2)
        const remainingDigits = formattedPhoneNumber.substring(2)
        const finalFormattedPhoneNumber = `${areaCode}${remainingDigits.slice(0, 6)}-${remainingDigits.slice(6)}`
        return finalFormattedPhoneNumber
      }
      if (phoneNumber.length === 14) {
        const formattedPhoneNumber = phoneNumber.replace(/\(|\)|-/g, '')
        const areaCode = formattedPhoneNumber.substring(0, 2)
        const remainingDigits = formattedPhoneNumber.substring(2)
        const finalFormattedPhoneNumber = `${areaCode}${remainingDigits.slice(0, 5)}-${remainingDigits.slice(5)}`
        return finalFormattedPhoneNumber
      }
    },
    async handleUpdate () {
      this.getUsers()
    }
  }
}
</script>

<style lang="scss" scoped>
.info-container {
  padding: 10px 20px 60px 20px !important;
}
.header-page-container {
  border-radius: 9px;
  display: flex;
  flex-direction: row;
  border: 1px solid #D2D4DA !important;
  color: #fafafa;
  .left-container {
    align-self: start;
    padding-top: 10px;
    .first-inner-container {
      margin-bottom: 5px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .second-inner-container {
      height: 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .subhead {
        color: #fafafa;
        align-self: flex-start;
        font-size: 15px;
        font-weight: 500;
      }

    }
  }

  .right-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0px !important;
    margin-top: -20px;

    .dropleft .dropdown-toggle::before {
      content: none !important
    }

    .btn-config {
      display: flex;
      align-items: center;
      letter-spacing: 0.5px;
      font-size: 12.5px;
      padding: 8px 16px 10px 14px !important;
      color: #fafafa;
      border: 2px solid rgb(6, 131, 115, 0.30)!important;
      border-radius: 9px !important;
      transition: all .3s !important;
      margin-top: -3px;
      margin-left: -10px;

      &:hover{
        background: rgba(6, 128, 109, 0.15)!important;
      }

      &:focus {
        box-shadow: none !important;
        border-bottom: 2px solid rgb(6, 131, 115, 0.30)!important;;
      }
    }
    .dropdown-menu {
      margin-left: 30px !important;
      border-radius: 9px;
      background: #13cf9a !important;
      padding: 0px !important;
      width: 252px !important;

      .btn-config-whats {
        display: flex;
        gap: 10px;
        color: #fafafa;
        border: 1px solid rgb(6, 131, 115, 0.30)!important;
        border-bottom: 1px !important;
        border-right: 0px;
        border-radius: 9px 9px 0px 0px !important;
        transition: all .3s !important;
        background: rgba(6, 128,  109, 0.15)!important;
        width: 100%;
        font-size: 14px;
        padding: 12px 20px !important;

        &:hover{
          background: rgba(6, 128, 109, 0.40)!important;
        }

        &:focus {
          box-shadow: none;
        }

        &:last-child {
          border-radius: 0px 0px 0px 0px !important;
        }
      }
      .btn-config-mail {
        display: flex;
        gap: 10px;
        color: #fafafa;
        border: 1px solid rgb(6, 131, 115, 0.30)!important;
        border-radius: 0px !important;
        transition: all .3s !important;
        background: rgba(6, 128,  109, 0.15)!important;
        width: 100%;
        padding: 12px 20px !important;
        font-size: 14px;

        span {
          margin-top: 1px !important;
          margin-left: -1px;
        }

        &:hover{
          background: rgba(6, 128, 109, 0.40)!important;
        }

        &:focus {
          box-shadow: none;
        }

        &:last-child {
          border-radius: 0px 0px 0px 0px !important;
        }
      }
      .btn-config-bot {
        display: flex;
        gap: 10px;
        color: #fafafa;
        border: 1px solid rgb(6, 131, 115, 0.30)!important;
        border-radius: 0px !important;
        background: rgba(6, 128,  109, 0.15)!important;
        width: 100%;
        padding: 12px 20px !important;
        font-size: 14px;
        transition: all .3s !important;

        span {
          margin-left: 5px !important;
        }
        &:hover{
          background: rgba(6, 128, 109, 0.40)!important;
        }

        &:focus {
          box-shadow: none;
        }

        &:last-child {
          border-radius: 0px 0px 0px 0px !important;
        }
      }
      .btn-bunch {
        display: flex;
        gap: 5px;
        color: #fafafa;
        border: 1px solid rgb(6, 131, 115, 0.30)!important;
        border-top: none !important;
        border-radius: 0px 0px !important;
        background: rgba(6, 128, 109, 0.15)!important;
        transition: all .3s !important;
        padding: 12px 20px !important;
        width: 100%;
        span {
          line-height: 21px;
          font-weight: 400;
          font-size: 14.3px;
          color: #FFFFFF !important;
          margin-left: 8px !important;

        }

        &:hover{
          background: rgba(6, 128, 109, 0.40)!important;
        }

        &:focus {
          box-shadow: none;
        }
      }
      .monitoring {
        display: flex;
        gap: 5px;
        background: rgba(6, 128, 109, 0.15)!important;
        margin-right: 0px !important;
        border: 2px solid rgb(6, 131, 115, 0.30)!important;
        border-top: none !important;
        border-bottom: none !important;
        border-radius: 0px !important;
        padding: 12px 20px !important;
        width: 100%;

        span {
          line-height: 21px;
          font-weight: 400;
          font-size: 14.1px;
          color: #FFFFFF !important;
          margin-left: 7px !important;

        }
        &:hover{
          background: rgba(6, 128, 109, 0.40)!important;
        }
      }
      .btn-register{
        display: flex;
        gap: 5px;
        background: rgba(6, 128, 109, 0.15)!important;
        margin-right: 0px !important;
        border: 1px solid rgb(6, 131, 115, 0.30)!important;
        border-bottom: none !important;
        border-radius: 0px !important;
        padding: 12px 20px !important;
        width: 100%;
        span {
          line-height: 21px;
          font-weight: 400;
          font-size: 14px;
          color: #FFFFFF !important;
          margin-left: 7px !important;
        }
        &:hover{
          background: rgba(6, 128, 109, 0.40)!important;
        }
      }
    }

  }
}
.search-container{
  outline: 1px solid #D2D4DA;
  background-color: white;
  box-shadow: none;
  padding: 15px 15px 15px 0px !important;
  justify-content: space-between;
  align-items: center;
  border-radius: 9px;

  .toogle-buttons {
    .inner-container {
      display: flex;
      background-color: #DDF1EE;
      border-radius: 9px;
      height: 50px;
      width: 140px;
      .current {
        margin: auto 1px auto 2px;
        height: 45px;
        width: 120px;
        transition: all .2s;
        border-radius: 9px 0px 0px 9px !important;
        cursor: pointer;

        p {
          margin: 13px 10px !important;
          color: #777986;
          font-size: 14px;
          font-weight: 500;
          word-spacing: 1.5px;
        }
        &.active {
          background-color: #45CDAA;
          border-radius: 3px;
          cursor: default;
          p {
            margin: 13px 12px !important;
            color: #FFFFFF !important;
            font-weight: bold;
          }

        }
      }
      .old {
        cursor: pointer;
        margin: auto 2px auto 0px !important;
        border-radius: 0px 9px 9px 0px !important;
        height: 45px;
        width: 135px;
        transition: all .2s;

        p {
          margin: 13px 5px !important;
          color: #777986;
          font-size: 14px;
          font-weight: 500;
          word-spacing: 1px;
        }

        &.active {
          background-color: #32CDA5;
          border-radius: 9px;
          cursor: default;

          p {
            margin: 13px 5px !important;
            color: #FFFFFF !important;
            font-weight: bold;
          }
        }
      }
    }

    ::selection {
      background:transparent;
    }
  }
}
.search-results{
  font-size: 14px;
  font-weight: 400;
  color: #9496A1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  small {
    padding-top: 5px;
    padding-right: 2px;
  }
}
.table{
  cursor: default !important;
  outline: 1px solid #D2D4DA;
  border-radius: 7px !important;
  background-color: white;
  margin-top: 10px;
  box-shadow: 0px 0px 6px 6px rgba(0,0,0,0.1) !important;

  tr {
    line-height: 1.7;
    cursor: default !important;
  }
  th {
    border-collapse: collapse;
    padding: 10px 0px 10px 0px !important;
    color: #404252;
    cursor: default !important;

    .send {
      height: 20px !important;
      border: none !important;
      box-shadow: none;
      transition: all .3s !important;
      &:focus{
          background-color: white;
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
      }
      &:active {
        background-color: var(--featured-light) !important;
      }
      &:disabled{
          background-color: var(--green-light) !important;
      }
      &:checked {
        background-color: var(--featured-light) !important;
      }
    }
    input[type="checkbox"]:checked {
      background-color: #66ff66 !important; /* Change this to the desired background color */
    }
    .btn-container {
      display: flex;
      gap: 5px;
      font-weight: 400;
      color: #9496A1;

      .btn-config-send {
        color: #2fb490;
        border: 2px solid #bef1e3 !important;
        border-radius: 9px;
        background-color: #bef1e3 !important;
        padding: 0px 10px !important;
        font-size: 12px;
        font-weight: 500 !important;
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

      .btn-cancel-send{
        // margin-right: -15px;
        color: #de6767 !important;
        border: 2px solid #fbe6e6 !important;
        border-radius: 9px;
        background-color: #fbe6e6 !important;
        padding: 0px 9px !important;
        font-size: 12px;
        font-weight: 500 !important;
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
  th::selection {
      color: none;
      background: none;
  }
  th::-moz-selection {
      color: none;
      background: none;
  }
  td{
    opacity: 1;
    font-size: 13.5px !important;
    font-weight: 400;
    color: rgb(64, 66, 82, 0.9);
    padding: 7px 9px;
    vertical-align: middle;
    cursor: default !important;

    .send {
      height: 20px !important;
      border: none !important;
      box-shadow: none;
      transition: all .3s !important;
      &:focus{
          background-color: white;
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
      }
      &:active {
        background-color: var(--featured-light) !important;
      }
      &:disabled{
          background-color: var(--green-light) !important;
      }
      &:checked {
        background-color: var(--featured-light) !important;
      }
    }
    input[type="checkbox"]:checked {
      background-color: #66ff66; /* Change this to the desired background color */
    }
    .clients-button {
      padding: 4px 12px;
      background-color: #eaeaea;
      border-radius: 16px;
      color: #282a3a;
      font-weight: 500;
      font-size: 14px;
      transition: all 0.3s ease-out;
      border: none;
      user-select: none;
      color: white;
      border: none;
    }
    .status-inactivate{
      background-color: #6c757d !important;
      color: white;
    }
    .status-subscripted {
      background-color: #13cf9a !important;
      color: white;
    }
    .info-status {
      font-size: 12px !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &.unfocus {
      opacity: 0.7 !important;
    }
    .btn-access {
      color: #fafafa;
      width: 140px !important;
      margin-right: 5px;
      border: 2px solid #13cf9a;
      background-color: #13cf9a;
      font-weight: 600;
      font-size: 15px;
      padding: 9px 9px !important;
      transition: all .3s !important;

      &:hover {
        transform: translate(0, -5px) !important;
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

    .dropdown .dropdown-toggle::after {
      content: none !important
    }

    .dropdown {
      padding-left: 1px;
      .dropdown-toggle {
        background-color: #0dce9a;
        border: 2px solid rgb(6, 131, 115, 0.30) !important;
        border-radius: 9px 9px 9px 9px !important;
        width: auto !important;
        height: auto !important;
        padding: 6px 0px 6px 13px !important;
        transition: all .3s !important;

        &:hover {
          transform: translate(0, -5px) !important;
        }
      }
      .dropdown-menu {
        margin-top: -6px;
        background: white !important;
        border: 2px solid rgb(27, 163, 142, 0.8) !important;
        border-radius: 0px;
        padding: 0px !important;
        width: 49px !important;
        min-width: auto !important;

        .button-whats-container {
          .btn-send {
            display: flex;
            align-items: center;
            background: rgba(6, 128,  109, 0.15)!important;
            padding: 11px 14px !important;
            border-radius: 0px !important;

            &:hover {
              background: rgba(6, 128, 109, 0.30)!important;
              // transform: translate(0, -3px);
            }
          }
        }
        .button-email-container {
          .btn-send-mail {
            margin-right: -8px;
            display: flex;
            align-items: center;
            padding: 11px 13.5px !important;
            border-radius: 0px !important;
            background: rgba(6, 128,  109, 0.15)!important;
            &:hover{
              background: rgba(6, 128, 109, 0.30)!important;
              // transform: translate(0, -3px);
            }
          }
        }
        .button-call-container {
          .btn-caller {
            padding: 10px 13px !important;
            border-radius: 0px !important;
            background: rgba(6, 128,  109, 0.15)!important;
            color: white;
            width: 45px;

            &:hover{
              background: rgba(6, 128, 109, 0.30)!important;
            }
          }
        }
        .btn-notify {
          display: flex;
          gap: 10px;
          color: #fafafa;
          border: 1px solid rgb(6, 131, 115, 0.30)!important;
          border-bottom: 1px !important;
          border-radius: 5px 5px 0px 0px !important;
          transition: all .3s !important;
          background: rgba(6, 128,  109, 0.15)!important;
          padding: 10px 19px !important;
          width: 100%;
          font-size: 14px;

          &:hover{
            background: rgba(6, 128, 109, 0.40)!important;
          }

          &:focus {
            box-shadow: none;
          }

          &:last-child {
            border-radius: 0px 0px 0px 0px !important;
          }
        }
        .btn-config-whats {
          display: flex;
          gap: 10px;
          color: #fafafa;
          border: 1px solid rgb(6, 131, 115, 0.30)!important;
          border-bottom: 1px !important;
          border-radius: 0px !important;
          transition: all .3s !important;
          background: rgba(6, 128,  109, 0.15)!important;
          padding: 10px 19px !important;
          width: 100%;
          font-size: 14px;

          &:hover{
            background: rgba(6, 128, 109, 0.40)!important;
          }

          &:focus {
            box-shadow: none;
          }

          &:last-child {
            border-radius: 0px 0px 0px 0px !important;
          }
        }
        .btn-config-mail {
          display: flex;
          gap: 10px;
          color: #fafafa;
          border: 2px solid rgb(6, 131, 115, 0.30)!important;
          border-radius: 0px !important;
          transition: all .3s !important;
          background: rgba(6, 128,  109, 0.15)!important;
          padding: 10px 19px !important;
          width: 100%;
          font-size: 14px;

          &:hover{
            background: rgba(6, 128, 109, 0.40)!important;
          }

          &:focus {
            box-shadow: none;
          }

          &:last-child {
            border-radius: 0px 0px 0px 0px !important;
          }
        }
        .btn-bunch {
          display: flex;
          gap: 5px;
          padding: 10px 19px !important;
          color: #fafafa;
          border: 2px solid rgb(6, 131, 115, 0.30)!important;
          border-top: none !important;
          border-radius: 0px 0px !important;
          transition: all .3s !important;
          background: rgba(6, 128, 109, 0.15)!important;

          span {
            line-height: 21px;
            font-weight: 400;
            font-size: 14.3px;
            color: #FFFFFF !important;
          }

          &:hover{
            background: rgba(6, 128, 109, 0.40)!important;
          }

          &:focus {
            box-shadow: none;
          }
        }
        .monitoring {
          display: flex;
          gap: 5px;
          background: rgba(6, 128, 109, 0.15)!important;
          margin-right: 0px !important;
          border: 2px solid rgb(6, 131, 115, 0.30)!important;
          border-top: none !important;
          border-bottom: none !important;
          border-radius: 0px !important;
          padding: 10px 20px !important;

          span {
            line-height: 21px;
            font-weight: 400;
            font-size: 14.1px;
            color: #FFFFFF !important;
          }
          &:hover{
            background: rgba(6, 128, 109, 0.40)!important;
          }
        }
        .btn-register{
          display: flex;
          gap: 5px;
          background: rgba(6, 128, 109, 0.15)!important;
          margin-right: 0px !important;
          border: 2px solid rgb(6, 131, 115, 0.30)!important;
          border-radius: 0px !important;
          padding: 10px 20px !important;
          width: 100%;
          span {
            line-height: 21px;
            font-weight: 400;
            font-size: 14px;
            color: #FFFFFF !important;
          }
          &:hover{
            background: rgba(6, 128, 109, 0.40)!important;
          }
        }
      }
    }
  }
  .btn-finalize{
    color: white !important;
    border: 3px solid var(--featured-light) !important;
    background-color: var(--featured-light) !important;
    width: 90px !important;
    padding: 6px 9px !important;
    font-weight: 500 !important;
    letter-spacing: 0.5px;
    transition: all .3s !important;
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
  }

}

@keyframes colorChangeAnimation {
  0% {
    background-color: rgba(0, 0, 0, 0.07);
  }
  25% {
    background-color: rgba(40, 40, 40, 0.5); /* Darker variant 1 */
  }
  50% {
    background-color: rgba(80, 80, 80, 0.5); /* Darker variant 2 */
  }
  75% {
    background-color: rgba(120, 120, 120, 0.5); /* Darker variant 3 */
  }
  100% {
    background-color: rgba(0, 0, 0, 0.07);
  }
}
// Antigo ainda para organizar
.input-group-text{
  position: absolute;
  background-color: var(--featured) !important;
  color: white;
  right: 20px;
  bottom: 3px;
  top: 3px;
  border: none;
  cursor: pointer;
  border-radius: 9px;
  z-index: 999;
}
.status-info{
    min-width: 85px;
}
.loading-sm{
  width: 85px;
  height: 27px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
  animation: colorChangeAnimation 5s ease-in infinite;
}
.loading-md{
  width: 120px;
  height: 27px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
  animation: colorChangeAnimation 5s ease-in infinite;
}
.loading-lg{
  width: 180px;
  height: 27px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
  animation: colorChangeAnimation 5s ease-in infinite;
}
.loading-btn{
  width: 148px;
  height: 37px;
  background: gray;
  border-radius: 9px;
  animation: colorChangeAnimation 5s ease-in infinite;
}
.modal-header{
  border-bottom: none !important;
  button{
    opacity: 1 !important;
    padding-right: 0 !important;
  }
}
.modal-content{
  background-color: transparent !important;
  .row{
    padding: 0 !important;
  }
}
.player {
    border-radius: 9px;
    overflow: hidden;
    z-index: 1;
    height: 450px;
    width: 800px;
    transform: translate(18px, 0);
}
</style>
