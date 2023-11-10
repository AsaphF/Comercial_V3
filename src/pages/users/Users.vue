<template>
  <div class="container-fluid">
    <div class="row">
      <layout-navigation/>
      <WhatsConfigClients :affiliate="loggedAffiliate" :modelsLists="modelWhatsList"/>
      <EmailConfigClients :affiliate="loggedAffiliate" :modelsLists="modelEmailList"/>
      <ModelsUsers ref="modelsListsRef" :affiliate="loggedAffiliate" :user="user" :whatsList="modelWhatsList"  :emailList="modelEmailList" :id="type" />
      <SavingKeyAPI :affiliate="loggedAffiliate"/>
      <ShippingClients :affiliate="loggedAffiliate" :users="selectedUsers" :modelsLists="modelEmailList"/>
      <MonitorUsers ref="monitorRef" :loggedAffiliate="loggedAffiliate" @update="handleUpdate" @checkUsers="updateUsers" />
      <div class="col-lg-12 col-content">
       <div class="content main-container">
          <div class="container-fluid" style="border-radius: 7px !important;">
            <div class="row info-container header-page-container" style="border-radius: 9px !important;">
              <div class="left-container">
                <h4 class="title">
                  Clientes
                </h4>
                <p class="subtitle mt-3">
                  Através deste sistema você pode criar, gerenciar e conquistar clientes de forma integrada.
                </p>
                <div class="container">
                  <div class="row">
                    <NewUser :allUsers="allUsers"/>
                    <button class="btn btn-white-border btn-sm ml-2" @click="$router.push({ name: 'home' })">
                        Ir Para Home
                    </button>
                  </div>
                </div>
              </div>
              <div class="right-container">
                <div class="btn-group dropleft">
                  <button type="button" class="btn btn-config dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5H21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 12H21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 19H21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <div class="dropdown-menu">
                    <button type="button" class="btn btn-sm btn-config-whats" @click="openWhatsConfig()">
                      <svg width="21" height="21" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_700_125)">
                        <path d="M2.15544 10.4119C2.15544 7.415 4.5849 4.98553 7.58181 4.98553H12.0734C15.0703 4.98553 17.4998 7.415 17.4998 10.4119C17.4998 13.4088 15.0703 15.8382 12.0734 15.8382H7.58181C4.5849 15.8382 2.15544 13.4088 2.15544 10.4119Z" fill="#068373" stroke="white"/>
                        <path d="M1.66159 0.499512C2.30312 0.499512 2.82319 1.01958 2.82319 1.66111V9.91218H1.66159H0.5L0.5 1.66111C0.5 1.01958 1.02006 0.499512 1.66159 0.499512Z" fill="#068373" stroke="white"/>
                        <path d="M8.91913 10.4114C8.91913 11.058 8.40198 11.573 7.77536 11.573C7.14881 11.573 6.63165 11.058 6.63165 10.4114C6.63165 9.76471 7.14881 9.24976 7.77536 9.24976C8.40198 9.24976 8.91913 9.76472 8.91913 10.4114Z" fill="#068373" stroke="white"/>
                        <path d="M14.1232 10.4114C14.1232 11.058 13.606 11.573 12.9794 11.573C12.3528 11.573 11.8357 11.058 11.8357 10.4114C11.8357 9.76472 12.3528 9.24976 12.9794 9.24976C13.606 9.24976 14.1232 9.76471 14.1232 10.4114Z" fill="#068373" stroke="white"/>
                        <path d="M0.5 10.4123C0.5 6.49859 3.6706 3.3244 7.58351 3.3244H8.47414C9.11566 3.3244 9.6357 3.84445 9.6357 4.48599C9.6357 5.12754 9.11566 5.64759 8.47414 5.64759H7.58351C4.95532 5.64759 2.82319 7.77997 2.82319 10.4123C2.82319 13.0447 4.95531 15.1771 7.58351 15.1771H11.8896C12.5311 15.1771 13.0512 15.6972 13.0512 16.3387C13.0512 16.9802 12.5311 17.5003 11.8896 17.5003H7.58351C3.6706 17.5003 0.5 14.3261 0.5 10.4123Z" fill="#068373" stroke="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_700_125">
                        <rect width="18" height="18" fill="#068373"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <span>BotConversa / WhatsApp</span>
                    </button>
                    <button type="button" class="btn btn-sm btn-config-mail" @click="openEmailConfig()">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.636 5.04504H19.363C20.267 5.04504 21 5.77804 21 6.68204V17.318C21 18.222 20.267 18.954 19.364 18.954H4.636C3.733 18.955 3 18.222 3 17.318V6.68204C3 5.77804 3.733 5.04504 4.636 5.04504Z" stroke="#068373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.11902 6.07504L10.813 11.578C11.508 12.075 12.442 12.076 13.138 11.58L20.876 6.06104" stroke="#068373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span>Modelos para E-mail</span>
                    </button>
                    <button type="button" class="btn btn-sm btn-config-bot" @click="saveBotconversaAPI()">
                      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.7015 7.29999C18.8175 7.61158 18.7196 7.95898 18.4694 8.18102L17.3489 9.18741C17.0696 9.44169 16.9354 9.81416 16.9536 10.1866C16.9572 10.2905 16.9608 10.3943 16.9608 10.5018C16.9608 10.6092 16.9572 10.7131 16.9536 10.817C16.9354 11.193 17.066 11.5655 17.3489 11.8162L18.4694 12.8226C18.7196 13.0446 18.8175 13.392 18.7015 13.7036C18.5419 14.1298 18.3497 14.5381 18.1285 14.932L17.9581 15.2221C17.7187 15.6161 17.4504 15.9885 17.1567 16.3395C16.9427 16.5974 16.5873 16.6833 16.2682 16.5831L14.8285 16.1318C14.4659 16.0172 14.0742 16.0924 13.7515 16.2965C13.5738 16.4076 13.3925 16.515 13.2039 16.6081C12.8667 16.78 12.6056 17.0809 12.5221 17.4462L12.1994 18.9038C12.1269 19.2297 11.873 19.4876 11.5394 19.5413C11.039 19.6237 10.524 19.6667 9.99819 19.6667C9.47236 19.6667 8.95742 19.6237 8.45698 19.5413C8.12335 19.4876 7.8695 19.2297 7.79698 18.9038L7.47423 17.4462C7.39445 17.0809 7.12972 16.78 6.79247 16.6081C6.6039 16.5114 6.42258 16.4076 6.24489 16.2965C5.92577 16.0924 5.53049 16.0172 5.16785 16.1318L3.73181 16.5866C3.41269 16.6869 3.0573 16.5974 2.84335 16.3431C2.54961 15.9921 2.28126 15.6197 2.04192 15.2257L1.87148 14.9356C1.65027 14.5416 1.45807 14.1334 1.29851 13.7072C1.18247 13.3956 1.28038 13.0482 1.5306 12.8261L2.65115 11.8198C2.93038 11.5655 3.06456 11.193 3.04643 10.8205C3.0428 10.7167 3.03917 10.6128 3.03917 10.5054C3.03917 10.3979 3.0428 10.2941 3.04643 10.1902C3.06456 9.81416 2.93401 9.44169 2.65115 9.19099L1.5306 8.18102C1.28038 7.95898 1.18247 7.61158 1.29851 7.29999C1.45807 6.8738 1.65027 6.46552 1.87148 6.07156L2.04192 5.78147C2.28126 5.38751 2.54961 5.01504 2.84335 4.66406C3.0573 4.4062 3.41269 4.32024 3.73181 4.42052L5.17148 4.87178C5.53412 4.98639 5.92577 4.91118 6.24851 4.70704C6.42621 4.59601 6.60753 4.48857 6.7961 4.39545C7.13335 4.22355 7.39445 3.92271 7.47786 3.5574L7.8006 2.09976C7.87313 1.77385 8.12698 1.51599 8.4606 1.46226C8.96104 1.37631 9.47599 1.33333 10.0018 1.33333C10.5276 1.33333 11.0426 1.37631 11.543 1.45868C11.8767 1.5124 12.1305 1.77027 12.203 2.09618L12.5258 3.55382C12.6056 3.91912 12.8667 4.21996 13.2075 4.39187C13.3961 4.48857 13.5774 4.59243 13.7551 4.70346C14.0742 4.9076 14.4695 4.97923 14.8321 4.8682L16.2718 4.41694C16.5909 4.31666 16.9463 4.4062 17.1603 4.66048C17.454 5.01146 17.7224 5.38393 17.9617 5.77789L18.1321 6.06798C18.3534 6.46194 18.5456 6.87022 18.7051 7.29641L18.7015 7.29999ZM10.0018 13.3669C10.7712 13.3669 11.5091 13.0651 12.0532 12.5278C12.5973 11.9904 12.9029 11.2617 12.9029 10.5018C12.9029 9.74191 12.5973 9.01315 12.0532 8.47583C11.5091 7.93851 10.7712 7.63665 10.0018 7.63665C9.23239 7.63665 8.49449 7.93851 7.95043 8.47583C7.40636 9.01315 7.10071 9.74191 7.10071 10.5018C7.10071 11.2617 7.40636 11.9904 7.95043 12.5278C8.49449 13.0651 9.23239 13.3669 10.0018 13.3669Z" fill="#068373"/>
                      </svg>
                      <span>Integração BotConversa</span>
                    </button>
                    <!-- <button v-if="loggedAffiliate.adm" type="button" class="btn btn-sm btn-bunch" @click="updateTable('whats')">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 8H19.2C20.2 8 21 8.8 21 9.8V9.8C21 10.4 20.7 10.9 20.2 11.3L14.2 15.3C12.8 16.2 11.1 16.2 9.7 15.3L3.7 11.2C3.3 10.9 3 10.4 3 9.8V9.8C3 8.8 3.8 8 4.8 8H7.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 9.6V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9.6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.10001 14.9L3.60001 20.4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.9 14.9L20.4 20.4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 12C9.5 12 7.5 10 7.5 7.5C7.5 5 9.5 3 12 3C14.5 3 16.5 5 16.5 7.5C16.5 10 14.5 12 12 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.2 6.8L12 6V9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.2 9H12.7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span>Envio em Lote</span>
                    </button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid">
            <div class="row search-container pr-0 pl-0">
              <div class="col-10 search-wrapper">
                <svg data-v-63aa4da2="" stroke="#9496A1" width="1.5em" height="2.8em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 3px; margin-bottom: 3px;"><path data-v-63aa4da2="" d="M15.7138 6.8382C18.1647 9.28913 18.1647 13.2629 15.7138 15.7138C13.2629 18.1647 9.28913 18.1647 6.8382 15.7138C4.38727 13.2629 4.38727 9.28913 6.8382 6.8382C9.28913 4.38727 13.2629 4.38727 15.7138 6.8382" stroke="#9496A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-63aa4da2="" d="M19 19L15.71 15.71" stroke="#9496A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <input
                    type="name"
                    v-model.lazy="searchValue"
                    placeholder="Digite quem deseja buscar..."
                    required
                >
              </div>
              <div class="col-2">
                <div class="toogle-buttons">
                  <div class="inner-container">
                    <div v-if="!loading && changeTable === false" class="current" :class="{ active: changeTable}" @click="switchTable()">
                      <p>Planos Atuais</p>
                    </div>
                    <div v-else class="current" :class="{ active: changeTable}">
                      <p>Planos Atuais</p>
                    </div>
                    <div v-if="!loading && changeTable === true" class="old" :class="{ active: !changeTable}" @click="switchTable()">
                      <p>Planos Antigos</p>
                    </div>
                    <div v-else class="old" :class="{ active: !changeTable}">
                      <p>Planos Antigos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th v-if="checkTable" scope="col" style="width: 20px; padding: 0px !important; padding-left: 10px !important; padding-bottom: 5px !important;">
                  <input type="checkbox" class="send" name="send" @click="selectAll()"/>
                </th>
                <th scope="col" style="padding-left: 10px !important; width: 130px !important;">
                  <span style="margin-left: 5px;">Situação</span>
                </th>
                <th scope="col" style="padding-left: 10px !important;">Prazo de Teste</th>
                <th scope="col" style="padding-left: 9px !important;">Razão Social | Nome</th>
                <th scope="col" style="padding-left: 9px !important;">CNPJ | CPF</th>
                <th scope="col" style="padding-left: 9px !important;">Plano</th>
                <th scope="col" style="padding-left: 9px !important;">Assinatura</th>
                <th scope="col" style="padding-left: 9px !important;">Telefone</th>
                <th scope="col" style="padding-left: 9px !important;">Criado</th>
                <th scope="col" style="padding-left: 8px !important; width: 95px;">Contatar</th>
                <th scope="col">Monitorar</th>
                <!-- <th v-if="!checkTable" scope="col" style="padding-left: 9px !important;">Acessar</th> -->
                <th v-if="!checkTable" scope="col" style="padding-left: 9px !important;">
                  <div class="search-results" style="padding-right: 12px;">
                    <small>{{ filterUsers.length }} resultados</small>
                  </div>
                </th>
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
                  <template v-if="scrollPosition + 40*80 > i*59 && scrollPosition - 40*80 < i*59">
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
                      <div v-if="user.status && user.status.dtCallback" class="info-status status-warning" style="font-size: 12px; width: 50px; color: #d8a200 !important;">
                        {{ moment(user.status.dtCallback).format('DD/MM/YYYY') }}
                      </div>
                      <div v-else class="info-status status-warning" style="font-size: 12px !important; width: 50px; color: #d8a200 !important;">
                        --
                      </div>
                    </td>
                    <template v-if="user && user.name.length > 22">
                      <td :class="{unfocus: user.checked}">{{user.name.substring(0, 23)}}...</td>
                    </template>
                    <template v-else>
                      <td :class="{unfocus: user.checked}">{{user.name}}</td>
                    </template>
                    <td :class="{unfocus: user.checked}">{{user.documentNumber}}</td>
                    <td :class="{unfocus: user.checked}">{{user.pagarmePlan.name.toUpperCase()}}</td>
                    <td :class="{unfocus: user.checked}">
                      <div v-if="user.pagarmePaymentStatus === 'Pago'" class="info-status status-success" style="font-size: 12px !important; width: 125px;">
                        <span>Pago</span>
                      </div>
                      <div v-else-if="user.pagarmePaymentStatus === 'Inadimplente'" class="info-status status-warning" style="font-size: 12px !important; width: 125px;">
                        <span>Inadimplente</span>
                      </div>
                      <div v-else class="info-status status-inactive" style="background-color: #d2d4da !important; color: #5b5d6b !important; font-size: 12px !important; width: 125px;" >
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
                          <!-- <svg data-v-34ad99b2="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path data-v-34ad99b2="" d="M11.996 16.239C11.356 16.389 10.69 16.48 10 16.48C9.431 16.48 8.876 16.424 8.339 16.321L5.2 17.867C5.2 16.797 5.198 15.778 5.199 15.022C3.262 13.704 2 11.614 2 9.24C2 5.223 5.598 2 10 2C14.402 2 18 5.223 18 9.24C18 10.221 17.782 11.153 17.394 12.004" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-34ad99b2="" d="M10.177 9.21002C10.275 9.30802 10.275 9.46602 10.177 9.56402C10.079 9.66202 9.921 9.66202 9.823 9.56402C9.725 9.46602 9.725 9.30802 9.823 9.21002C9.921 9.11302 10.079 9.11302 10.177 9.21002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path data-v-34ad99b2="" d="M13.732 9.21002C13.83 9.30802 13.83 9.46602 13.732 9.56402C13.634 9.66202 13.476 9.66202 13.378 9.56402C13.28 9.46602 13.28 9.30802 13.378 9.21002C13.476 9.11302 13.635 9.11302 13.732 9.21002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-34ad99b2="" d="M6.621 9.21002C6.719 9.30802 6.719 9.46602 6.621 9.56402C6.523 9.66202 6.365 9.66202 6.267 9.56402C6.169 9.46602 6.169 9.30802 6.267 9.21002C6.365 9.11302 6.524 9.11302 6.621 9.21002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-34ad99b2="" fill-rule="evenodd" clip-rule="evenodd" d="M20 22H14C12.895 22 12 21.105 12 20V14C12 12.895 12.895 12 14 12H20C21.105 12 22 12.895 22 14V20C22 21.105 21.105 22 20 22Z" fill="#2FB490"></path>
                            <path data-v-34ad99b2="" d="M19.222 15.889L16.444 18.667L14.778 17" stroke="white" stroke-width="1.5294" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg> -->
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 11.291C21 15.83 16.952 19.473 12 19.473C11.359 19.473 10.735 19.41 10.131 19.294" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.599 17.826C4.42 16.336 3 13.974 3 11.291" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.59901 17.8259C6.59801 18.6799 6.60001 19.8319 6.60001 21.0409" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3 11.291C3 6.75199 7.048 3.10999 12 3.10999C16.952 3.10999 21 6.75299 21 11.292" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.13 19.29L6.59998 21.04" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.1768 11.3232C12.2744 11.4209 12.2744 11.5791 12.1768 11.6768C12.0791 11.7744 11.9209 11.7744 11.8232 11.6768C11.7256 11.5791 11.7256 11.4209 11.8232 11.3232C11.9209 11.2256 12.0791 11.2256 12.1768 11.3232" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16.1768 11.3232C16.2744 11.4209 16.2744 11.5791 16.1768 11.6768C16.0791 11.7744 15.9209 11.7744 15.8232 11.6768C15.7256 11.5791 15.7256 11.4209 15.8232 11.3232C15.9209 11.2256 16.0791 11.2256 16.1768 11.3232" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.17678 11.3232C8.27441 11.4209 8.27441 11.5791 8.17678 11.6768C8.07915 11.7744 7.92085 11.7744 7.82322 11.6768C7.72559 11.5791 7.72559 11.4209 7.82322 11.3232C7.92085 11.2256 8.07915 11.2256 8.17678 11.3232" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
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
                        <div class="btn  btn-sm btn-primary-border" style="" @click="openMonitor(user)">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 1px;">
                            <path d="M4 20C4 17.5 6 15.5 8.5 15.5H11.1" stroke="#068373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15 5.2C16.7 6.9 16.7 9.6 15 11.2C13.3 12.8 10.6 12.9 8.99999 11.2C7.39999 9.5 7.29999 6.8 8.99999 5.2C10.7 3.6 13.3 3.6 15 5.2" stroke="#068373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.4 15.8C19.4 16.8 19.4 18.4 18.4 19.4C17.4 20.4 15.8 20.4 14.8 19.4C13.8 18.4 13.8 16.8 14.8 15.8C15.8 14.8 17.4 14.8 18.4 15.8" stroke="#068373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 21L18.4 19.4" stroke="#068373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <p>Monitorar</p>
                        </div>
                      </div>
                    </td>
                    <td :class="{unfocus: user.checked}" style="width: 150px !important">
                      <a class="btn btn-sm btn-access" @click="accessAccount(user.email, user.password)">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 12H3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M3.947 16C5.42 18.961 8.468 21 12 21C16.971 21 21 16.971 21 12C21 7.029 16.971 3 12 3C8.468 3 5.42 5.039 3.947 8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12 9L15 12L12 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Acessar
                      </a>
                    </td>
                  </template>
                  <template v-else>
                    <td style="width: 134px !important;"><div class="loading-md"></div></td>
                    <td style="width: 149.33px;"><div class="loading-md"></div></td>
                    <td style="width: 231.41px;"><div class="loading-md"></div></td>
                    <td style="width: 163.66px;"><div class="loading-md"></div></td>
                    <td style="width: 101.47px;"><div class="loading-md"></div></td>
                    <td style="width: 166.05px;"><div class="loading-md"></div></td>
                    <td style="width: 141.02px;"><div class="loading-md"></div></td>
                    <td style="width: 149.33px;"><div class="loading-md"></div></td>
                    <td style="width: 95.62px;"><div class="loading-md"></div></td>
                    <td style="width: 152.75px;"><div class="loading-btn"></div></td>
                    <td style="width: 163px;"><div class="loading-btn"></div></td>
                  </template>
                </tr>
              </tbody>
              <tbody v-else>
                <tr
                  :key="i"
                  v-for="(installment, i) in 15"
                >
                  <td style="width: 134px !important;"><div class="loading-md"></div></td>
                  <td style="width: 149.33px;"><div class="loading-md"></div></td>
                  <td style="width: 231.41px;"><div class="loading-md"></div></td>
                  <td style="width: 163.66px;"><div class="loading-md"></div></td>
                  <td style="width: 101.47px;"><div class="loading-md"></div></td>
                  <td style="width: 166.05px;"><div class="loading-md"></div></td>
                  <td style="width: 141.02px;"><div class="loading-md"></div></td>
                  <td style="width: 149.33px;"><div class="loading-md"></div></td>
                  <td style="width: 95.62px;"><div class="loading-md"></div></td>
                  <td style="width: 152.75px;"><div class="loading-btn"></div></td>
                  <td style="width: 163px;"><div class="loading-btn"></div></td>
                </tr>
              </tbody>
            </template>
          </table>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModelsUsers from './ModelsUsers.vue'
import MonitorUsers from './MonitorUsers.vue'
import LayoutNavigation from '../../components/layout/LayoutNavigation'
import NewUser from './NewUser'
import moment from 'moment'
import WhatsConfigClients from './WhatsConfigClients'
import EmailConfigClients from './EmailConfigClients'
import SavingKeyAPI from '../../components/global/SavingKeyAPI.vue'
import ShippingClients from './ShippingClients.vue'

export default {
  name: 'Users',
  components: {
    LayoutNavigation,
    NewUser,
    WhatsConfigClients,
    EmailConfigClients,
    ModelsUsers,
    MonitorUsers,
    SavingKeyAPI,
    ShippingClients,
  },
  data: () => ({
    changeButton: false,
    changeTable: true,
    checkTable: false,
    type: '',
    allUsers: [],
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
    this.searchValue = this.$router.history.current.params.searchValue ? this.$router.history.current.params.searchValue : ''
    this.loading = true
    await this.getModels()
    await this.getPlans()
    await this.getAffiliate()
    await this.getMonitorInfo()
    await this.getNotifications()
    await this.getUsers()
    window.addEventListener('scroll', this.onScroll, true)
    setTimeout(() => {
      this.loading = false
    }, 3200)
  },
  beforeDestroy () {
    window.scrollTo(0, 0)
    window.removeEventListener('scroll', this.onScroll)
    this.$firebase.database().ref(`users/${window.uid}`).off()
  },
  computed: {
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
                case user.email && user.email.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.email
                  break
                case user.pagarmePlan.name && user.pagarmePlan.name.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.pagarmePlan.name
                  break
                case user.pagarmePaymentStatus && user.pagarmePaymentStatus.toUpperCase().includes(this.searchValue.toUpperCase()):
                  result = user.pagarmePaymentStatus
                  break
                case user.createdAt && moment(user.createdAt).format('DD/MM/YYYY') === (this.searchValue.toUpperCase()):
                  result = user.createdAt
                  break
              }
              return result
            }
          })
        }
        tempUsers = tempUsers.sort(function (a, b) {
          if (a.status && a.status.dtCallback &&  b.status && b.status.dtCallback) {
            const dateA = new Date(a.status.dtCallback)
            const dateB = new Date(b.status.dtCallback)
            return dateA - dateB
          }
        })
        console.log(tempUsers)

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
        console.log(tempUsers)
        return tempUsers
      }
    }
  },
  methods: {
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
      await this.$firebase.database().ref('users').on('value', snapshot => {
        let values = snapshot.val()
        values = Object.keys(values).map(i => values[i])
        this.users = []
        this.oldPlansUsers = []
        this.allUsers = values
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
          try {
            this.loading = true
            await this.processPlans()
            const tempArray = []
            for (let i = 0; i < this.oldPlansUsers.length; i++) {
              this.oldPlansUsers[i].pagarmePlan = this.getPagarmePlan(this.oldPlansUsers[i], this.oldPlansUsers[i].currentPlanId)
              this.oldPlansUsers[i].pagarmePaymentStatus = this.getPagarmeSubscription(this.oldPlansUsers[i], this.oldPlansUsers[i].currentSubscriptionId)
              if (this.usersStatus[this.oldPlansUsers[i].uId]) {
                this.oldPlansUsers[i].status = this.usersStatus[this.oldPlansUsers[i].uId]
              }
              tempArray.push(this.oldPlansUsers[i])
            }
            this.oldPlansUsers = tempArray
            this.$toast.success(`Tabela carregada com sucesso, obrigado pela espera.`)

          } catch (error) {
            console.log(error)
            this.$toast.danger(`Erro ao carregar os planos, recarrege a página por gentileza.`)
          }
        }
        this.loading = false
      } else {
        this.changeTable = true
      }
    },
    async processPlans () {
      try {
        // Requisição dos palnos do pagarme
        // let allPlanIds = []
        // for (let i = 1; i < 3; i++) {
        //   allPlanIds = [...allPlanIds, ...await this.$pagarme.client.connect({ api_key: process.env.VUE_APP_PAGARME_API_KEY }).then(client => client.subscriptions.all({ count: 1000, page: i }))]
        // }
        // console.log(allPlanIds)
        // const subscriptionsQueries = []
        // for (let i = 1; i < allPlanIds.length / 3 + 1; i++) {
        //   subscriptionsQueries.push(this.$pagarme.client.connect({ api_key: process.env.VUE_APP_PAGARME_API_KEY }).then(client => client.subscriptions.all({ count: 10, page: i })).then(subscription => console.log(subscription)))
        //   await this.sleep(500)
        //   console.log('loading')
        // }
        // var allSubscriptions = []
        // const subscriptionsQueriesResponses = await Promise.all(subscriptionsQueries)
        // for (const subscriptionArray of subscriptionsQueriesResponses) {
        //   for (const subscription of subscriptionArray) {
        //     allSubscriptions.push(subscription)
        //   }
        // }
        let allPlanIds = []
        for (let i = 1; i < 3; i++) {
          await this.$pagarme.client.connect({ api_key: process.env.VUE_APP_PAGARME_API_KEY }).then(client => client.subscriptions.all({ count: 1000, page: i })).then(subscription => {
            allPlanIds.push(...subscription)
            this.sleep(100)
          })
        }
        this.subscriptions = allPlanIds
      } catch (error) {
        console.log('error')
        await this.sleep(200)
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
    openMonitor (user) {
      this.user = user
      this.$refs.monitorRef.initialChanges(this.user)
    },
    openModalModels (user, type) {
      this.user = {}
      this.type = ''
      this.user = user
      this.type = type
      this.$refs.modelsListsRef.openModal(this.type)
      // this.$root.$emit('ModelsListClients::show')
    },
    openEmailConfig () {
      this.$root.$emit('EmailConfigClients::show')
    },
    openWhatsConfig () {
      this.$root.$emit('WhatsConfigClients::show')
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
      await this.getUsers()
    },
    updateUsers (user) {
      this.loading = true
      for (let index = 0; index < this.users.length; index++) {
        if (this.users[index].uId === user.uId) {
          this.users[index] = user
        }
      }
      this.loading = false
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
.main-container {
  padding-top: 8px;
  padding-left: 15px;
  padding-right: 5px;
}
.info-container {
  padding: 10px 20px 60px 20px !important;
}
.header-page-container {
  border-radius: 9px;
  display: flex;
  flex-direction: row;
  border: 1px solid #D2D4DA !important;
  color: #fafafa;
  box-shadow: none;
  .left-container {
    align-self: start;
    padding-top: 10px;
    .btn-white-border {
      border: 2px solid #FFFFFF !important;
      border-radius: 9px !important;
      transition: all .4s !important;
      padding: 10px 20px !important;
      font-weight: 400 !important;
      font-size: .875rem !important;
      line-height: 1.5 !important;
      &:hover {
        transform: translate(0, -2px) !important;
      }
    }
  }

  .right-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0px !important;
    margin-top: -65px;

    .dropleft .dropdown-toggle::before {
      content: none !important
    }

    .btn-config {
      display: flex;
      align-items: center;
      letter-spacing: 0.5px;
      font-size: 12.5px;
      padding: 8px 14px 10px 12px !important;
      // padding: 8px 12px 10px 10px !important;
      color: #fafafa;
      border: 2px solid white !important;
      border-radius: 9px !important;
      transition: all .3s !important;

      &:hover{
        background: white;

        svg {
          path {
            stroke: #068373;
          }
        }
      }

      &:focus {
        background: white;
        box-shadow: none;
        svg {
          path {
            stroke: #068373;
          }
        }
      }
    }
    .dropdown-menu {
      margin-top: -1px !important;
      border-radius: 9px;
      background: #DDF1EE !important;
      padding: 0px !important;
      width: 252px !important;
      color: #068373;
      .btn-config-whats {
        display: flex;
        gap: 10px;
        color: #068373;
        border-right: 0px;
        border-radius: 9px 9px 0px 0px !important;
        transition: all .3s !important;
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
        color: #068373;
        border-radius: 0px !important;
        transition: all .3s !important;
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
        color: #068373;
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
        color: #068373;
        border: 1px solid rgb(6, 131, 115, 0.30)!important;
        border-top: none !important;
        border-radius: 0px 0px !important;
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
.search-container{
  // outline: 1px solid #D2D4DA;
  background-color: white;
  box-shadow: none;
  padding: 15px 15px 15px 15px !important;
  justify-content: space-between;
  align-items: center;
  border-radius: 7px;
  .search-wrapper {
    box-shadow: none;
    opacity: 0.8;
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,.09) !important;
    box-shadow: 0 0 3px 2px rgba(0,0,0,.03) !important;
    padding: 0 5px;

    svg {

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
  .toogle-buttons {
    .inner-container {
      display: flex;
      // background-color: #DDF1EE;
      outline: 2px solid #13cf9a;
      border-radius: 9px !important;
      height: 46px;
      width: 252px;
      .current {
        margin: auto 3px auto 0px;
        // height: 46px;
        width: 120px;
        transition: all .2s;
        border-radius: 9px 0px 0px 9px !important;
        cursor: pointer;

        p {
          border-radius: 3px 0px 0px 3px !important;
          margin: 12.5px 10px !important;
          color: #13cf9a;
          font-size: 14px;
          font-weight: 600;
          word-spacing: 1px;
        }
        &.active {
          background-color: #13cf9a;
          border-radius: 7px;
          cursor: default;
          p {
            margin: 7px;
            color: #FFFFFF !important;
            font-weight: bold;
          }

        }
      }
      .old {
        cursor: pointer;
        margin: auto 0px auto 0px;
        border-radius: 0px 9px 9px 0px !important;
        height: 46px;
        width: 130px;
        transition: all .2s;

        p {
          border-radius: 3px 0px 0px 3px !important;
          margin: 12px 11px;
          color: #13cf9a;
          font-size: 14px;
          font-weight: 600;
          word-spacing: 1px;
        }

        &.active {
          background-color: #13cf9a;
          border-radius: 9px;
          cursor: default;

          p {
            margin: 12px 10px !important;
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
  // outline: 1px solid #D2D4DA;
  border-radius: 7px !important;
  background-color: white;
  margin-top: 10px;
  // box-shadow: 0px 0px 6px 6px rgba(0,0,0,0.1) !important;
  box-shadow: none;
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
            transform: translate(0, -1px);
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
      border-radius: 6px;
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
      height: 47px;
      margin-right: 5px;
      border: 2px solid #13cf9a;
      border-radius: 9px !important;
      background-color: #13cf9a;
      font-weight: 600;
      font-size: 15px;
      padding: 12px 9px !important;
      transition: all .4s !important;

      &:hover {
        transform: translate(0, -2px) !important;
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
        padding: 7px 12px 9px 12px !important;
        transition: all .4s !important;

        &:hover {
          transform: translate(0, -2px) !important;
        }
      }
      .dropdown-menu {
        margin-top: -5px;
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
            border: 1px solid rgb(6, 131, 115, 0.30)!important;
            background: rgba(6, 128,  109, 0.15)!important;

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

    .btn-primary-border {
      display: flex;
      justify-content: center;
      gap: 2.5px;
      height: 47px;
      border-radius: 9px !important;
      transition: all .4s !important;
      width: 140px;
      padding: 8px 20px !important;
      margin-right: -10px;
      margin-left: -5px;

      p {
        margin-top: 3px;
        font-weight: 500;
        font-size: 13.5px;
      }

      &:hover {
        transform: translate(0, -2px) !important;
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
  height: 17px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
}
.loading-md{
  height: 27px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
}
.loading-lg{
  height: 37px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
}
.loading-btn{
  height: 37px;
  background: gray;
  border-radius: 9px;
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
