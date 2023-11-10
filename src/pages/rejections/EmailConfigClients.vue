<template>
  <div>
    <transition name="fade">
      <div v-if="showModal" class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="upward-header">
                <h4 style="font-weight: 700; margin-top: 10px; margin-left: 5px;">Configuração do E-mail</h4>
                <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="menu-list-container">
                <div class="tags-box">
                  <div class="inner-tag" :class="{'selected': !tabsSelected}" @click="switchTabs()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.062 12.505C19.734 11.833 20.824 11.832 21.496 12.505V12.505C22.168 13.177 22.168 14.267 21.495 14.939L15.721 20.708C15.534 20.895 15.28 21 15.015 21H13V18.985C13 18.72 13.105 18.466 13.293 18.278L19.062 12.505V12.505Z" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M7 9H15" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M7 13H12" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M7 17H10" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M20.22 16.22L17.78 13.78" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M19 9V6C19 4.895 18.105 4 17 4H5C3.895 4 3 4.895 3 6V19C3 20.105 3.895 21 5 21H9" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15 3V5" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11 3V5" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M7 3V5" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Ver Modelos</p>
                  </div>
                </div>
                <div class="tags-box">
                  <div class="inner-tag" :class="{'selected': tabsSelected}" @click="switchTabs()">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.94019 9.38998V5.30078" stroke="#777986" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.4462 11.379L8.94019 9.39062" stroke="#777986" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9 2.24707C5.27053 2.24707 2.24719 5.27041 2.24719 8.99988C2.24719 12.7294 5.27053 15.7527 9 15.7527C12.7295 15.7527 15.7528 12.7294 15.7528 8.99988" stroke="#777986" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14.2522 0.746094C15.9097 0.746094 17.2534 2.0898 17.2534 3.74734C17.2534 5.40489 15.9097 6.74859 14.2522 6.74859C12.5947 6.74859 11.2509 5.40489 11.2509 3.74734C11.2509 2.0898 12.5947 0.746094 14.2522 0.746094" stroke="#777986" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.1036 3.7482C15.1036 3.76892 15.0868 3.78572 15.0661 3.78572C15.0454 3.78572 15.0286 3.76892 15.0286 3.7482C15.0286 3.72748 15.0454 3.71069 15.0661 3.71069" stroke="#777986" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.0661 3.70991C15.0761 3.70991 15.0856 3.71387 15.0926 3.7209C15.0997 3.72794 15.1036 3.73748 15.1036 3.74743" stroke="#777986" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M13.4758 3.7482C13.4758 3.76892 13.459 3.78572 13.4382 3.78572C13.4175 3.78572 13.4007 3.76892 13.4007 3.7482C13.4007 3.72748 13.4175 3.71069 13.4382 3.71069" stroke="#777986" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M13.4382 3.70991C13.459 3.70991 13.4758 3.72671 13.4758 3.74743" stroke="#777986" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Ver Histórico de envio</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-body">
              <template v-if="historicOn">
                <Historic :historic="historic" :origin="'mail'"/>
              </template>
              <template v-else>
                <template v-if="listSaved">
                  <div class="container-list">
                    <div class="inner-container">
                      <div class="title-container">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.5 6H20.5" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M3.5 6H4.5" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M3.5 12H4.5" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M3.5 18H4.5" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8.5 12H20.5" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8.5 18H20.5" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h5>Lista de modelos</h5>
                      </div>
                      <div v-if="warningAlert" class="warning">
                        <i style="margin-right: 8px; color: var(--success);" class="fas fa-exclamation-triangle"></i>Modelo de texto excluido com sucesso
                      </div>
                      <button class="btn-action btn-add" @click="addModel()">
                        Novo Modelo
                        <i class="fas fa-plus-circle" style="color: #ffffff;"></i>
                      </button>
                    </div>
                    <div class="models-container">
                      <div class="model-container" v-for="(model, index) in list" :key="index">
                        <div class="template-type">
                          <span>{{ model.type }}</span>
                          <svg v-if="model.favorite && model.favorite === true" width="21" height="21" viewBox="0 0 24 24" fill="#F2C335" xmlns="http://www.w3.org/2000/svg" @click="toFavorite(model)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z" stroke="#e6ac00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg v-else width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="toFavorite(model)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z" stroke="#e6ac00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </div>
                        <h6 v-if="model.templateTitle && model.templateTitle.length > 80"><strong>{{ model.templateTitle.slice(0, 80) }}</strong></h6>
                        <h6 v-else><strong>{{ model.templateTitle.slice(0, 80) }}...</strong></h6>
                        <p v-if="model.text.length > 235" class="text-model"><strong></strong><span class="text-container">{{ model.title.slice(0, 20) + ' ' + model.text.slice(0, 220) }}...</span></p>
                        <p v-else class="text-model"><strong>Texto: </strong><span class="text-container">{{ model.title + model.text }}</span></p>
                        <div class="buttons-container">
                          <DeleteModel :model="model" @updateListMail="handleExclusion"/>
                          <button class="btn-finalize" @click="editModel(model)">Editar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div v-if="initial" class="initial-container">
                    <div class="inner-initial-container">
                      <svg width="458" height="368" viewBox="0 0 458 368" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1302_1304)">
                        <path d="M451.527 32.8664H2.08615C1.09906 32.8446 0.316534 32.0284 0.338335 31.0432C0.359452 30.0887 1.12973 29.3199 2.08615 29.2988H451.527C452.514 29.3206 453.297 30.1369 453.275 31.122C453.254 32.0765 452.484 32.8453 451.527 32.8664Z" fill="#E6E6E6"/>
                        <path d="M81.2373 216.173H262.565C263.026 216.173 263.399 216.546 263.399 217.006V322.234C263.399 322.694 263.026 323.067 262.565 323.067H81.2373V216.173Z" fill="#E6E6E6"/>
                        <path d="M262.353 323.635L80.9995 216.979L81.4772 215.365L262.83 322.021C263.277 322.152 263.532 322.62 263.4 323.066C263.268 323.512 262.799 323.767 262.353 323.635Z" fill="white"/>
                        <path d="M81.4772 323.874L80.9995 322.26L262.353 215.604C262.799 215.472 263.268 215.727 263.4 216.173C263.532 216.619 263.277 217.087 262.83 217.218L81.4772 323.874Z" fill="white"/>
                        <path d="M241.971 110.906H102.462C100.281 110.906 98.5137 112.67 98.5137 114.847V114.847C98.5137 117.023 100.281 118.787 102.462 118.787H241.971C244.151 118.787 245.919 117.023 245.919 114.847C245.919 112.67 244.151 110.906 241.971 110.906Z" fill="#E6E6E6"/>
                        <path d="M260.726 135.505H83.708C81.5275 135.505 79.7598 137.27 79.7598 139.446V139.446C79.7598 141.622 81.5275 143.386 83.708 143.386H260.726C262.906 143.386 264.674 141.622 264.674 139.446C264.674 137.27 262.906 135.505 260.726 135.505Z" fill="#E6E6E6"/>
                        <path d="M260.726 160.106H83.708C81.5275 160.106 79.7598 161.87 79.7598 164.046C79.7598 166.222 81.5275 167.987 83.708 167.987H260.726C262.906 167.987 264.674 166.222 264.674 164.046C264.674 161.87 262.906 160.106 260.726 160.106Z" fill="#1BA38E"/>
                        <path d="M428.586 243.149C428.572 273.57 409.31 300.665 380.544 310.726C379.933 310.945 379.322 311.144 378.705 311.336C340.976 323.374 300.612 302.607 288.551 264.952C276.489 227.297 297.297 187.014 335.026 174.976C372.755 162.938 413.118 183.705 425.18 221.359C427.436 228.404 428.585 235.754 428.586 243.149Z" fill="#E6E6E6"/>
                        <path d="M260.693 169.567C260.404 172.885 262.865 175.808 266.189 176.097C266.544 176.127 266.9 176.127 267.255 176.095L276.087 195.627L282.05 186.215L272.749 169.11C272.227 165.803 269.118 163.543 265.804 164.064C263.03 164.5 260.918 166.775 260.693 169.567Z" fill="#EAC6C6"/>
                        <path d="M347.729 243.123C347.6 242.546 347.436 241.977 347.238 241.42C345.972 237.83 343.394 234.85 340.02 233.076C339.94 233.03 339.854 232.984 339.774 232.944L299.428 212.512L295.849 205.547L281.387 177.428L277.841 178.482L269.461 180.967L269.269 181.02L283.16 227.675L286.347 230.114L322.45 257.67L323.625 258.571C329.623 263.14 338.067 262.644 343.486 257.405C344.026 256.887 344.526 256.329 344.98 255.735C347.733 252.149 348.741 247.526 347.729 243.123Z" fill="#1BA38E"/>
                        <path d="M370.158 294.364L369.945 286.677L369.334 264.383C371.545 250.115 373.112 248.531 362.448 238.776C361.624 238.599 360.913 238.084 360.489 237.357C359.52 235.383 361.851 232.029 359.839 226.867L343.962 227.775L340.018 233.076L324.148 254.416C323.526 255.471 322.958 256.557 322.448 257.67C315.655 272.395 324.865 280.222 325.582 281.567L329.978 295.385L332.401 308.785L333.185 310.647L335.396 311.455C349.502 315.852 364.622 315.81 378.704 311.336C376.334 305.451 373.475 299.774 370.158 294.364Z" fill="#1BA38E"/>
                        <path d="M400.911 348.558C402.269 345.516 400.899 341.952 397.851 340.596C397.526 340.451 397.189 340.336 396.844 340.25L394.886 318.911L386.17 325.864L389.366 345.062C388.777 348.358 390.977 351.507 394.28 352.095C397.043 352.587 399.785 351.125 400.911 348.558Z" fill="#EAC6C6"/>
                        <path d="M370.545 243.925C368.242 240.448 364.606 238.072 360.492 237.358C359.611 237.198 358.717 237.118 357.822 237.119C354.839 237.119 351.922 237.998 349.436 239.644C348.647 240.163 347.911 240.758 347.238 241.42C341.203 247.253 341.049 256.864 346.894 262.886L346.899 262.892L369.947 286.677L378.347 295.345L380.545 310.727L383.925 334.392L387.617 334.551L396.355 334.935L396.555 334.942L398.009 301.78L398.686 286.319L370.545 243.925Z" fill="#1BA38E"/>
                        <path d="M339.049 190.49C333.436 201.531 337.103 214.321 347.519 221.047C358.782 228.32 373.406 226.727 378.136 212.594C383.404 196.855 379.076 190.103 369.667 182.036C358.639 172.584 345.114 178.559 339.049 190.49Z" fill="#5B5D6B"/>
                        <path d="M366.679 215.087C360.726 222.876 349.573 224.373 341.77 218.431C333.976 212.497 332.469 201.386 338.4 193.597L338.554 193.395C344.681 185.741 355.864 184.494 363.532 190.608C371.026 196.584 372.417 207.416 366.674 215.084L366.679 215.087Z" fill="#EAC6C6"/>
                        <path d="M333.608 188.702C336.497 191.445 340.017 193.436 343.859 194.499C344.629 193.61 345.542 192.855 346.561 192.265C346.073 193.277 345.739 194.356 345.569 195.466C347.283 199.015 354.281 201.566 360.97 204.175L369.829 188.571L358.103 181.94C348.68 175.438 337.588 178.213 333.608 188.702Z" fill="#5B5D6B"/>
                        <path d="M376.511 182.056C378.249 181.417 380.193 181.7 381.675 182.808C383.102 183.891 384.256 185.293 385.045 186.9C386.479 189.501 387.51 192.303 388.101 195.213C388.607 197.73 388.521 200.773 386.259 202.086C384.371 203.182 381.671 202.492 379.936 201.029C378.328 199.495 377.108 197.601 376.377 195.503C375.53 193.496 374.729 191.415 373.225 189.748L374.788 190.477C374.294 188.979 374.064 187.408 374.107 185.832C374.18 184.237 375.095 182.799 376.511 182.056Z" fill="#5B5D6B"/>
                        <path d="M356.23 184.101L368.81 191.215C375.894 195.221 378.382 204.2 374.369 211.27C368.55 221.516 355.879 225.666 345.109 220.853L356.605 210.725L341.01 218.655L337.681 216.772C354.406 213.737 357.632 200.643 356.23 184.101Z" fill="#5B5D6B"/>
                        <path d="M379.994 196.605C382.111 199.065 385.426 200.021 388.417 201.301C399.132 205.993 406.835 215.661 409.002 227.136C409.829 231.74 409.72 236.506 411.026 240.995C412.324 245.483 415.539 249.886 420.152 250.665C423.274 251.197 426.403 249.994 429.339 248.807C430.954 248.159 432.569 247.509 434.184 246.856C432.5 242.637 430.818 238.419 429.139 234.2C431.838 238.181 434.976 241.847 438.496 245.128C444.284 242.799 450.076 240.47 455.874 238.141C441.61 238.195 444.044 224.375 440.853 210.509C439.099 202.89 424.162 197.731 421.234 190.482C416.66 179.116 403.72 173.604 392.332 178.169C387.425 180.136 383.382 183.785 380.929 188.461C378.001 189.626 377.916 194.176 379.994 196.605Z" fill="#5B5D6B"/>
                        <path d="M51.9807 14.6528C55.8788 14.6528 59.0389 11.4286 59.0389 7.45139C59.0389 3.47417 55.8788 0.25 51.9807 0.25C48.0825 0.25 44.9224 3.47417 44.9224 7.45139C44.9224 11.4286 48.0825 14.6528 51.9807 14.6528Z" fill="#404252"/>
                        <path d="M76.3639 14.6528C80.2621 14.6528 83.4222 11.4286 83.4222 7.45139C83.4222 3.47417 80.2621 0.25 76.3639 0.25C72.4658 0.25 69.3057 3.47417 69.3057 7.45139C69.3057 11.4286 72.4658 14.6528 76.3639 14.6528Z" fill="#404252"/>
                        <path d="M100.747 14.6528C104.645 14.6528 107.805 11.4286 107.805 7.45139C107.805 3.47417 104.645 0.25 100.747 0.25C96.8486 0.25 93.6885 3.47417 93.6885 7.45139C93.6885 11.4286 96.8486 14.6528 100.747 14.6528Z" fill="#404252"/>
                        <path d="M128.55 13.1431C128.333 13.1431 128.117 13.0593 127.953 12.8925L123.191 8.03358C122.873 7.70981 122.873 7.19243 123.191 6.86867L127.953 2.01015C128.276 1.68151 128.805 1.67622 129.134 1.99714C129.463 2.31887 129.469 2.84641 129.147 3.17506L124.955 7.45112L129.147 11.7276C129.469 12.0562 129.463 12.5838 129.134 12.9055C128.971 13.0641 128.761 13.1431 128.55 13.1431Z" fill="#404252"/>
                        <path d="M136.553 13.1432C136.342 13.1432 136.132 13.0643 135.969 12.9056C135.64 12.5839 135.634 12.0568 135.956 11.7277L140.147 7.45125L135.956 3.17518C135.634 2.84654 135.64 2.31899 135.969 1.99726C136.298 1.67512 136.827 1.68123 137.15 2.01027L141.912 6.86879C142.229 7.19256 142.229 7.70994 141.912 8.0337L137.15 12.8926C136.986 13.0594 136.77 13.1432 136.553 13.1432Z" fill="#404252"/>
                        <path d="M385.703 1.08374H376.847C375.837 1.08374 375.02 1.90007 375.02 2.90802V11.7545C375.02 12.7625 375.837 13.5788 376.847 13.5788H385.703C386.713 13.5788 387.539 12.7625 387.539 11.7545V2.90802C387.539 1.90007 386.713 1.08374 385.703 1.08374Z" fill="#404252"/>
                        <path d="M364.002 1.08374H355.146C354.136 1.08374 353.318 1.90007 353.318 2.90802V11.7545C353.318 12.7625 354.136 13.5788 355.146 13.5788H364.002C365.012 13.5788 365.838 12.7625 365.838 11.7545V2.90802C365.838 1.90007 365.012 1.08374 364.002 1.08374Z" fill="#404252"/>
                        <path d="M406.152 1.50024H397.296C396.286 1.50024 395.468 2.31657 395.468 3.32453V12.171C395.468 13.179 396.286 13.9953 397.296 13.9953H406.152C407.162 13.9953 407.988 13.179 407.988 12.171V3.32453C407.988 2.31657 407.162 1.50024 406.152 1.50024Z" fill="#404252"/>
                        <path d="M272.674 4.86548H201.888C200.652 4.86548 199.659 5.86509 199.659 7.08964C199.659 8.31418 200.652 9.31374 201.888 9.31374H272.674C273.901 9.31374 274.902 8.31413 274.902 7.08964C274.902 5.86514 273.901 4.86548 272.674 4.86548Z" fill="#404252"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1302_1304">
                        <rect width="457.5" height="367.5" fill="white" transform="translate(0.25 0.25)"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <div class="inner-container">
                        <h5>Você ainda não possui nenhum modelo de e-mail criado</h5>
                        <button class="btn btn-success" @click="initial = false">Criar Modelo</button>
                      </div>
                    </div>
                  </div>
                  <div v-else class="creation-container">
                    <div v-if="!templateList" class="container-template">
                      <h4>Escolha um dos templates para criar um modelo de e-mail</h4>
                      <div class="template-list">
                        <div class="template">
                          <p class="template-title" :class="{'choosen': presentation.selected}">{{ presentation.title }}</p>
                          <div class="template-box" :class="{'choosen': presentation.selected}" @click="chooseModel(presentation.id)">
                            <img src="../../assets//images/preview-template-business.jpg" alt="">
                          </div>
                        </div>
                        <div class="template">
                          <p class="template-title" :class="{'choosen': text.selected}">{{ text.title }}</p>
                          <div class="template-box" :class="{'choosen': text.selected}" @click="chooseModel(text.id)">
                            <img src="../../assets//images/preview-template-message.jpg" alt="">
                          </div>
                        </div>
                      </div>
                      <div class="text-container">
                        <p>Escolha um modelo de mensagem para facilitar seu contato com o cliente.</p>
                        <p>Você pode personalizar o conteúdo dentro da estrutura pré-moldada do e-mail.</p>
                      </div>
                      <div class="container-template-footer">
                        <button v-if="localList.length > 0" class="btn-undo" @click="this.listSaved = true">
                          <template style="transition: all .3s !important">
                            <i class="fas fa-undo" style="color: #777986;"></i> Voltar
                          </template>
                        </button>
                        <button v-else class="btn-undo" style="color: #ffffff !important;" >
                          <template style="transition: all .3s !important">
                            <i class="fas fa-undo" style="color: #ffffff;"></i> Voltar
                          </template>
                        </button>
                        <button class="btn btn-sm btn-success btn-add" @click="showTemplate()"><span>Adicionar Template</span><i class="fas fa-hand-point-right"></i></button>
                      </div>
                    </div>
                    <div v-else class="body-container">
                      <div v-if="oneOrOther" class="form-container">
                          <form @submit.prevent="saveAndSend()">
                            <div class="inner-form-container">
                              <div class="help-container">
                                <div class="container-title">
                                  <label class="label-title" for="">Modelo:</label>
                                  <input v-model="firstTemplate.templateTitle" class="input-title" type="text" name="" id="" placeholder="Título do modelo do texto para Email" maxlength="80" required>
                                </div>
                                <div class="buttons-container">
                                  <div class="eye-icon-container" @click.stop="checkMessage(firstTemplate.textAreaMailTitle, firstTemplate.textAreaMailBody)">
                                    <template v-if="showAndHide">
                                      <small>Ver atalhos</small>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#777986" viewBox="0 0 576 512"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/></svg>
                                    </template>
                                    <template v-else>
                                      <small>Esconder</small>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#777986" viewBox="0 0 640 512"><path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/></svg>
                                    </template>
                                  </div>
                                  <!-- <div type="button" class="status-info btn-use" @click.stop="openInstructions()" data-bs-dismiss="modal" aria-label="Close">
                                    <small>Instruções</small>
                                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3 11.291C3 13.974 4.42 16.336 6.599 17.825C6.598 18.68 6.6 19.832 6.6 21.041L10.131 19.294C10.735 19.41 11.359 19.473 12 19.473C16.952 19.473 21 15.83 21 11.291C21 6.752 16.952 3.109 12 3.109C7.048 3.109 3 6.752 3 11.291Z" stroke="#0dce9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M11.899 12.328V12.121C11.899 11.443 12.318 11.076 12.738 10.794C13.148 10.518 13.559 10.158 13.559 9.494C13.559 8.577 12.816 7.835 11.9 7.835C10.984 7.835 10.24 8.576 10.24 9.493" stroke="#0dce9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M11.898 14.667C11.815 14.667 11.748 14.734 11.749 14.817C11.749 14.9 11.816 14.967 11.899 14.967C11.982 14.967 12.049 14.9 12.049 14.817C12.049 14.734 11.983 14.667 11.898 14.667" stroke="#0dce9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                  </div> -->
                                </div>
                              </div>
                              <div class="report-container">
                                <div class="inner-container-report">
                                  <div class="mail-container">
                                    <div class="logo-container">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FEmail-Marketing%2Fconfirmation%2Flogotype-75px.png?alt=media&token=73fcb281-c123-4738-ae98-b678416b9068" alt style="width: 100%; margin-top: 24px;">
                                    </div>
                                    <div class="main-container">
                                      <textarea v-if="showAndHide" v-model="firstTemplate.textAreaMailTitle" class="title-textarea" placeholder="Saudação do E-mail" maxlength="35" required></textarea>
                                      <textarea v-else v-model="textTitleCopy" class="title-textarea" placeholder="Saudação do E-mail"  maxlength="35" required></textarea>
                                      <textarea v-if="showAndHide" v-model="firstTemplate.textAreaMailBody" class="body-textarea"  placeholder="Corpo do E-mail" maxlength="596" required></textarea>
                                      <textarea v-else v-model="textBodyCopy" class="body-textarea"  placeholder="Corpo do E-mail" maxlength="596" required></textarea>
                                      <small v-if="showAndHide" >{{ firstTemplate.textAreaMailBody.length }}/ 596</small>
                                      <small v-else >{{ textBodyCopy.length }}/ 561</small>
                                    </div>
                                    <div class='affiliate-container'>
                                      <div style="width: 100px; vertical-align: middle">
                                        <img style="width: 100px" :src="affiliate.logoUrl" alt>
                                      </div>
                                      <div style="vertical-align: middle; padding-left: 10px">
                                        <p style="margin: 0; font-weight: bold; font-size: 20px; color: #2d3748">
                                          {{ affiliate.name }}
                                        </p>
                                        <p style="margin-top: 0; margin-bottom: 4px; font-size: 14px; color: #718096;">
                                          Especialista | SimplesHub
                                        </p>
                                        <div style="height: 20px; line-height: 20px; margin-right: 8px;">
                                            <img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/whatsapp-icon.png?alt=media&token=a1a7abc1-1076-4762-93e4-d5f4621e8b8f" alt style="vertical-align: middle">
                                            <a href="https://wa.me/55${affiliate.phoneFormatted}?text=Ol%C3%A1%21+Gostaria+de+te+consultar+sobre+o+SimplesHub." style="margin: 0; color: #2fb490; line-height: 20px">{{ affiliate.phone }}</a>
                                        </div>
                                        <div style="height: 20px; line-height: 20px; margin-right: 8px;">
                                          <img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/email-icon.png?alt=media&token=0d99f049-8219-472a-b499-d600f032a365" alt="Email" style="vertical-align: middle">
                                          <a href="mailto:${affiliate.email}" style="margin: 0; color: #2fb490; line-height: 20px">{{ affiliate.email }}</a>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="footer-container">
                                      <p class="m-0" style="margin: 0;">Você está recebendo este e-mail por ter se registrado no SimplesHub.</p>
                                      <div class="flex flex-row gap-8" style="display: flex; flex-direction: row; gap: 32px;"></div>
                                      <a href="https://simpleshub.com.br/" class="text-blue-500 text-decoration-none hover-text-decoration-underline" style="color: #3b82f6; text-decoration: none;">Site</a> &bull;
                                      <a href="https://www.instagram.com/simpleshub/" class="text-blue-500 text-decoration-none hover-text-decoration-underline" style="color: #3b82f6; text-decoration: none;">Instagram</a> &bull;
                                      <a href="https://www.linkedin.com/company/simpleshub/" class="text-blue-500 text-decoration-none hover-text-decoration-underline" style="color: #3b82f6; text-decoration: none;">LinkedIn</a>
                                      <p></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button class="btn-undo" @click="getBack()">
                                  <template style="transition: all .3s !important">
                                    <i class="fas fa-undo" style="color: #777986;"></i> Voltar
                                  </template>
                                </button>
                                <button class="btn-conclude">
                                  <template v-if="concluded" style="transition: all .3s !important">
                                    <i class="fas fa-check-circle"></i> Salvo
                                  </template>
                                  <template v-else>
                                    <i class="fas fa-pen"></i> Salvar
                                  </template>
                                </button>
                              </div>
                            </div>
                          </form>
                      </div>
                      <div v-else class="form-container-second">
                        <form @submit.prevent="saveAndSend()">
                          <div class="inner-second-container">
                            <div class="help-container">
                              <div class="container-title">
                                <label class="label-title" for="">Modelo:</label>
                                <input v-model="secondTemplate.templateTitle" class="input-title" type="text" name="" id="" placeholder="Título do modelo do texto para Email" maxlength="80" required>
                              </div>
                              <div class="buttons-container">
                                <div class="eye-icon-container" @click.stop="checkMessage(secondTemplate.textAreaMailTitle, secondTemplate.textAreaMailBody)">
                                  <template v-if="showAndHide">
                                    <small>Ver Atalhos</small>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#777986" viewBox="0 0 576 512"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/></svg>
                                  </template>
                                  <template v-else>
                                    <small>Esconder Atalhos</small>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#777986" viewBox="0 0 640 512"><path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/></svg>
                                  </template>
                                </div>
                                <!-- <div class="suggestions-icon-container" @click="getSuggestion()">
                                  <template v-if="showAndHideIdea">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M9 21H15" stroke="#f2c335e6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.999 17.159V18.225H8.999V17.159C8.999 16.102 8.50899 15.115 7.69399 14.441C6.28299 13.272 5.355 11.542 5.258 9.59004C5.073 5.84904 8.14799 2.56004 11.893 2.50304C15.67 2.44404 18.75 5.48704 18.75 9.25004C18.75 11.352 17.787 13.226 16.279 14.462C15.47 15.125 14.999 16.113 14.999 17.159Z" stroke="#f2c335e6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M8.54001 15.45H15.45" stroke="#f2c335e6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                  </template>
                                  <template v-else>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M15 15.1899H9" stroke="#F2C335" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.541 14.8959C6.765 13.6409 5.7 11.4499 6.075 9.03795C6.481 6.43095 8.654 4.34995 11.275 4.04295C14.913 3.61595 18 6.44795 18 9.99995C18 12.0249 16.994 13.8119 15.457 14.8979C15.181 15.0929 15 15.3949 15 15.7329V18.4999C15 19.8809 13.881 20.9999 12.5 20.9999H11.5C10.119 20.9999 9 19.8809 9 18.4999V15.7369C9 15.3959 8.818 15.0919 8.541 14.8959Z" stroke="#F2C335" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M20 5.00006L21.19 3.81006" stroke="#F2C335" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M4 15L2.81 16.19" stroke="#F2C335" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M5 4.00006L3.81 2.81006" stroke="#F2C335" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M20 15L21.19 16.19" stroke="#F2C335" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M21 10H22.69" stroke="#F2C335" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M1.31 10H3" stroke="#F2C335" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M9 18H14.87" stroke="#F2C335" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                  </template>
                                </div> -->
                                <div type="button" class="status-info btn-use" @click.stop="openInstructions()" data-bs-dismiss="modal" aria-label="Close">
                                  <small>Instruções </small>
                                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 11.291C3 13.974 4.42 16.336 6.599 17.825C6.598 18.68 6.6 19.832 6.6 21.041L10.131 19.294C10.735 19.41 11.359 19.473 12 19.473C16.952 19.473 21 15.83 21 11.291C21 6.752 16.952 3.109 12 3.109C7.048 3.109 3 6.752 3 11.291Z" stroke="#0dce9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M11.899 12.328V12.121C11.899 11.443 12.318 11.076 12.738 10.794C13.148 10.518 13.559 10.158 13.559 9.494C13.559 8.577 12.816 7.835 11.9 7.835C10.984 7.835 10.24 8.576 10.24 9.493" stroke="#0dce9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M11.898 14.667C11.815 14.667 11.748 14.734 11.749 14.817C11.749 14.9 11.816 14.967 11.899 14.967C11.982 14.967 12.049 14.9 12.049 14.817C12.049 14.734 11.983 14.667 11.898 14.667" stroke="#0dce9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div class="report-container-other">
                              <div class="inner-container-report-other">
                                <textarea v-if="showAndHide" v-model="secondTemplate.textAreaMailTitle" class="title-textarea-other" placeholder="Saudação do E-mail" maxlength="35" required></textarea>
                                <textarea v-else v-model="textTitleCopy" class="title-textarea-other" placeholder="Saudação do E-mail" :disabled="!showAndHide" maxlength="35" required></textarea>
                                <textarea v-if="showAndHide" v-model="secondTemplate.textAreaMailBody" class="body-textarea-other"  placeholder="Corpo do E-mail" maxlength="801" required></textarea>
                                <textarea v-else v-model="textBodyCopy" class="body-textarea-other"  placeholder="Corpo do E-mail" :disabled="!showAndHide" maxlength="801" required></textarea>
                                <small v-if="showAndHide" >{{ secondTemplate.textAreaMailBody.length }}/ 801</small>
                                <small v-else >{{ textBodyCopy.length }}/ 601</small>
                              </div>
                              <hr class="border-slate-200 border-solid" style="border-style: solid; border-color: #e2e8f0; border: 1px solid #AAAAAA;">
                              <div class="affiliate-container">
                                <div class="first-line">
                                  <img style="width: 100px" src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FAssinaturas-Email%2Fsig-daiana.png?alt=media&token=f756c2cc-5b8f-4e00-9bfc-fd9fbda6b66e" alt>
                                  <div class="info">
                                    <p style="margin: 0; font-weight: bold; font-size: 20px; color: #2d3748;">{{ affiliate.name}}</p>
                                    <p style="margin-top: 0; margin-bottom: 4px; font-size: 14px; color: #718096;">Especialista | SimplesHub</p>
                                    <div class="phone">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/whatsapp-icon.png?alt=media&token=a1a7abc1-1076-4762-93e4-d5f4621e8b8f" alt style="vertical-align: middle">
                                      <a href="https://wa.me/55${affiliate.phoneFormatted}?text=Ol%C3%A1%21+Gostaria+de+te+consultar+sobre+o+SimplesHub." style="margin: 0; color: #2fb490; line-height: 20px">{{ affiliate.phone }}</a>
                                    </div>
                                    <div class="email">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/email-icon.png?alt=media&token=0d99f049-8219-472a-b499-d600f032a365" alt="Email" style="vertical-align: middle">
                                      <a href="mailto:${affiliate.email}" style="margin: 0; color: #2fb490; line-height: 20px">{{ affiliate.email }}</a>
                                    </div>
                                  </div>
                                </div>
                                <div class="second-line">
                                  <a href="https://simpleshub.com.br/?origin=email-comercial"><img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/logo-sig.png?alt=media&token=dcc360af-225e-43e8-a6d1-7a6aa179fcb3" alt></a>
                                  <a href="https://simpleshub.com.br/?origin=email-comercial"><img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/acesse-link.png?alt=media&token=6f2291f4-6b54-4d98-a7b9-779a7bad14f5" alt></a>
                                </div>
                              <div class="footer-container">
                                <p class="m-0" style="margin: 0;">Você está recebendo este e-mail por ter se registrado no SimplesHub.</p>
                                <div class="flex flex-row gap-8" style="display: flex; flex-direction: row; gap: 32px;"></div>
                                <a href="https://simpleshub.com.br/" class="text-blue-500 text-decoration-none hover-text-decoration-underline" style="color: #3b82f6; text-decoration: none;">Site</a> &bull;
                                <a href="https://www.instagram.com/simpleshub/" class="text-blue-500 text-decoration-none hover-text-decoration-underline" style="color: #3b82f6; text-decoration: none;">Instagram</a> &bull;
                                <a href="https://www.linkedin.com/company/simpleshub/" class="text-blue-500 text-decoration-none hover-text-decoration-underline" style="color: #3b82f6; text-decoration: none;">LinkedIn</a>
                                <p></p>
                              </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button class="btn-undo" @click="getBack()">
                                <template style="transition: all .3s !important">
                                  <i class="fas fa-undo" style="color: #777986;"></i> Voltar
                                </template>
                              </button>
                              <button class="btn-conclude">
                                <template v-if="concluded" style="transition: all .3s !important">
                                  <i class="fas fa-check-circle"></i> Salvo
                                </template>
                                <template v-else>
                                  <i class="fas fa-pen"></i> Salvar
                                </template>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </div>
          <div v-if="instructionsOn" class="remove-confirmation">
            <div class="confirmation-header">
              <h5>Como Usar</h5>
              <p>Use nosso sistema de modelos de texto para se comunicar de forma fácil e rápida com seus clientes.</p>
              <p>Ao enviar um e-mail, insira dinamicamente informações das leads usando os seguintes atalhos:</p>
            </div>
            <div class="confirmation-body">
              <ul>
                <li>[nome]: Insere o nome da lead.</li>
                <li>[telefone]: Insere o telefone da lead.</li>
                <li>[email]: Insere o email da lead.</li>
                <li>[origem]: Insere o canal de origem da lead.</li>
              </ul>
              <p>Caso se sinta com dúvida e deseje ver o resultado final em um cadastro teste, você pode apertar o botão <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#777986" viewBox="0 0 576 512"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/></svg> e ele fará a troca pelos atalhos automaticamente.</p>
              <!-- <p>Além disso, todo o texto no primeiro quadrado é editável a seu querer, mas caso queira sugestões aperte no botão <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H15" stroke="#f2c335e6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.999 17.159V18.225H8.999V17.159C8.999 16.102 8.50899 15.115 7.69399 14.441C6.28299 13.272 5.355 11.542 5.258 9.59004C5.073 5.84904 8.14799 2.56004 11.893 2.50304C15.67 2.44404 18.75 5.48704 18.75 9.25004C18.75 11.352 17.787 13.226 16.279 14.462C15.47 15.125 14.999 16.113 14.999 17.159Z" stroke="#f2c335e6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.54001 15.45H15.45" stroke="#f2c335e6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> que automaticamente novos textos lhe serão sugeridos.</p> -->
            </div>
            <div class="confirmation-footer">
              <small>Nosso sistema elimina a necessidade de personalizar e-mails para cada lead, agilizando o contato com seus clientes.</small>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{display: showModal ? 'block' : 'none'}"></div>
      </div>
    </transition>
  </div>

</template>

<script>
import Historic from './HistoricClients.vue'
import DeleteModel from '../../components/global/DeleteModel.vue'
import { useToast } from 'vue-toastification'

export default {
  props: ['affiliate', 'modelsLists'],
  components: {
    Historic,
    DeleteModel
  },
  data: () => ({
    exampleLead: {
      name: 'João Antônio',
      email: 'joao123@gmail.com.br',
      phone: '(99) 99999-9999',
      origem: 'Instagram'
    },
    localList: [],
    suggestionsList: [
      'Olá, sou o(a) (Seu nome), membro da equipe SimplesHub. Nossa empresa se dedica a oferecer soluções que simplificam os processos fiscais burocráticos e repetitivos da contabilidade.\n\nEstou disponível para agendar uma apresentação prática das funcionalidades e benefícios que nossa ferramenta pode proporcionar. Caso seja conveniente, por favor, compartilhe sua disponibilidade conosco para um agendamento.\n\nSe preferir, fique à vontade para entrar em contato através dos detalhes fornecidos abaixo.\n\nAgradecemos pelo seu interesse e aguardamos seu retorno.\n\nAtenciosamente,',
      'Saudações! Aqui é o(a) (Seu nome), especialista na SimplesHub. Estamos empenhados em oferecer soluções que visam simplificar os processos fiscais burocráticos e repetitivos da área contábil.\n\nQueremos assegurar que você não perca a oportunidade de explorar nossas soluções em detalhes. Por isso, estou à disposição para agendar uma demonstração prática das funcionalidades e vantagens exclusivas que nossa ferramenta pode trazer para o seu negócio. Para isso, gostaríamos de saber qual é o melhor horário para você.\n\nAgradecemos pelo seu interesse e esperamos ansiosamente pelo seu retorno.\n\nAtenciosamente,',
      'Bom dia/tarde/noite! Eu sou o(a) (Seu nome), um dos especialistas da equipe SimplesHub. Nossa missão é simplificar os processos burocráticos e repetitivos relacionados à contabilidade por meio de nossas soluções inovadoras.\n\nQueremos garantir que você não perca a chance de descobrir como nossa plataforma pode beneficiar você. Por isso, estou à disposição para agendar uma demonstração prática, onde poderemos mostrar de perto as soluções e os benefícios que nossa ferramenta pode oferecer.\n\nAgradecemos muito pelo seu interesse e aguardamos sua resposta.\n\nAtenciosamente,',
      'Meu nome é (Seu nome), sou especialista do SimplesHub, uma empresa que oferece soluções para simplificar processos fiscais burocráticos e repetitivos de sua contabilidade.\n\nVerificamos que você preencheu nosso formulário para conhecer nossas soluções, no entanto, notamos que o número fornecido está inválido. \n\nVocê teria algum horário disponível em sua agenda para que possamos apresentar na prática as soluções e benefícios que minha ferramenta tem a oferecer? \n\nCaso prefira, podemos continuar nossa conversa pelo WhatsApp. Entre em contato comigo através dos contatos abiaxo.\n\nAtenciosamente'
    ],
    counter: 0,
    presentation: {
      selected: false,
      title: 'Template Apresentação',
      url: '',
      id: 0
    },
    text: {
      selected: false,
      title: 'Template Texto',
      url: '',
      id: 1
    },
    listSaved: false,
    template: {},
    oneOrOther: true,
    editingOn: false,
    instructionsOn: false,
    showAndHideIdea: true,
    showAndHide: true,
    historic: [],
    historicOn: false,
    tabsSelected: false,
    modelSelected: false,
    initial: true,
    templateList: false,
    selectValue: 'E-mail',
    isSelected: true,
    warningAlert: false,
    titleMailValue: '',
    bodyMailValue: '',
    textTitleCopy: '',
    textBodyCopy: '',
    firstTemplate: {
      templateTitle: '',
      textAreaMailTitle: 'Olá, [nome]!',
      textAreaMailBody: 'Meu nome é (Seu nome), sou especialista do SimplesHub, uma empresa que oferece soluções para simplificar processos fiscais burocráticos e repetitivos de sua contabilidade.\n\nVerificamos que você preencheu nosso formulário para conhecer nossas soluções, no entanto, notamos que o número fornecido está inválido. \n\nVocê teria algum horário disponível em sua agenda para que possamos apresentar na prática as soluções e benefícios que minha ferramenta tem a oferecer? \n\nCaso prefira, podemos continuar nossa conversa pelo WhatsApp. Entre em contato comigo através dos contatos abiaxo.\n\nAtenciosamente'
    },
    secondTemplate: {
      templateTitle: '',
      textAreaMailTitle: 'Olá, [nome]!',
      textAreaMailBody: 'Meu nome é (Seu nome), sou especialista do SimplesHub, uma empresa que oferece soluções para simplificar processos fiscais burocráticos e repetitivos de sua contabilidade.\n\nVerificamos que você preencheu nosso formulário para conhecer nossas soluções, no entanto, notamos que o número fornecido está inválido. \n\nVocê teria algum horário disponível em sua agenda para que possamos apresentar na prática as soluções e benefícios que minha ferramenta tem a oferecer? \n\nCaso prefira, podemos continuar nossa conversa pelo WhatsApp. Entre em contato comigo através dos contatos abiaxo.\n\nAtenciosamente'
    },
    templateChoosen: '',
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
    },
    list () {
      const tempUsers = this.localList
      let favoritesList = []
      let unfavoritesList = []
      let notHave = []
      let result = []
      if (tempUsers.length > 0) {
        favoritesList = tempUsers.filter(m => m && m.favorite && m.favorite === true)
        unfavoritesList = tempUsers.filter(m => m.favorite && m.favorite === false)
        notHave = tempUsers.filter(m => !m.favorite)
        result = [...favoritesList, ...unfavoritesList, ...notHave]
      }
      return result
    }
  },
  created () {
    this.$root.$on('EmailConfigClients::show', () => {
      this.showModal = true
      this.getInfo()
    })
  },
  methods: {
    async getInfo () {
      this.localList = this.modelsLists
      if (this.localList.length > 0) {
        this.listSaved = true
      }
    },
    switchTabs () {
      if (!this.historicOn) {
        this.tabsSelected = true
        this.historicOn = true
        if (this.historic.length < 1) {
          this.$firebase.database().ref(`support/messageHistoric/${window.uid}/mailMessage`).once('value', snapshot => {
            let values = snapshot.val()
            if (values) {
              values = Object.keys(values).map(i => values[i])
              const tempArray = values
              this.historic = tempArray.filter(h => h.origin === 'users')
            }
          })
        }
      } else {
        this.tabsSelected = false
        this.historicOn = false
      }
    },
    getSuggestion () {
      if (this.showAndHideIdea === true && this.counter <= this.suggestionsList.length) {
        if (this.oneOrOther) {
          this.firstTemplate.textAreaMailBody = this.suggestionsList[this.counter]
          this.textBodyCopy = this.suggestionsList[this.counter]
          this.counter = this.counter + 1
          this.showAndHideIdea = false
        } else {
          this.secondTemplate.textAreaMailBody = this.suggestionsList[this.counter]
          this.counter = this.counter + 1
          this.showAndHideIdea = false
        }
      } else {
        this.showAndHideIdea = true
        this.textAreaMailBody = 'Meu nome é (Seu nome), sou especialista do SimplesHub, uma empresa que oferece soluções para simplificar processos fiscais burocráticos e repetitivos de sua contabilidade.\n\nVerificamos que você preencheu nosso formulário para conhecer nossas soluções, no entanto, notamos que o número fornecido está inválido. \n\nVocê teria algum horário disponível em sua agenda para que possamos apresentar na prática as soluções e benefícios que minha ferramenta tem a oferecer? \n\nCaso prefira, podemos continuar nossa conversa pelo WhatsApp. Entre em contato comigo através dos contatos abiaxo.\n\nAtenciosamente'
      }
    },
    openInstructions () {
      this.instructionsOn = this.instructionsOn ? false : !this.instructionsOn
    },
    checkMessage (title, body) {
      this.textTitleCopy = ''
      this.textBodyCopy = ''
      // Formatar Título do e-mail
      if (this.showAndHide === true) {
        const regex = /\[([^\]]+)\]/g
        const matchesTitle = [...title.matchAll(regex)]
        const wordsInTitle = matchesTitle.map(match => match[1])
        this.textTitleCopy = title
        if (wordsInTitle.length > 0) {
          for (const word of wordsInTitle) {
            if (word.toLowerCase() === 'nome') {
              const regexName = /\[([^\]]*nome[^\]]*)\]/g
              const letter = this.exampleLead.name[0].toUpperCase()
              const name = this.exampleLead.name.toLowerCase().slice(1)
              const sum = letter + name
              const firstName = sum.split(' ')[0]
              this.textTitleCopy = this.textTitleCopy.replace(regexName, firstName)
            }
            if (word.toLowerCase() === 'telefone') {
              const regexPhone = /\[([^\]]*telefone[^\]]*)\]/g
              this.textTitleCopy = this.textTitleCopy.replace(regexPhone, this.exampleLead.phone)
            }
            if (word.toLowerCase() === 'email' || word.toLowerCase() === 'e-mail') {
              const regexmail1 = /\[([^\]]*email[^\]]*)\]/g
              const regexmail2 = /\[([^\]]*e-mail[^\]]*)\]/g
              this.textTitleCopy = this.textTitleCopy.replace(regexmail1, this.exampleLead.email)
              this.textTitleCopy = this.textTitleCopy.replace(regexmail2, this.exampleLead.email)
            }
            if (word.toLowerCase() === 'origem' && this.exampleLead.originData && this.exampleLead.originData.origin) {
              const regexOrigin = /\[([^\]]*origem[^\]]*)\]/g
              this.textTitleCopy = this.textTitleCopy.replace(regexOrigin, this.exampleLead.originData.origin)
            }
          }
          this.showAndHide = false
        }
        // Formatar Corpo do email
        const matches = [...body.matchAll(regex)]
        const wordsInBody = matches.map(match => match[1])
        this.textBodyCopy = body
        if (wordsInBody.length > 0) {
          for (const word of wordsInBody) {
            if (word.toLowerCase() === 'nome') {
              const regexName = /\[([^\]]*nome[^\]]*)\]/g
              const letter = this.exampleLead.name[0].toUpperCase()
              const name = this.exampleLead.name.toLowerCase().slice(1)
              const sum = letter + name
              const firstName = sum.split(' ')[0]
              this.textBodyCopy = this.textBodyCopy.replace(regexName, firstName)
            }
            if (word.toLowerCase() === 'telefone') {
              const regexPhone = /\[([^\]]*telefone[^\]]*)\]/g
              this.textBodyCopy = this.textBodyCopy.replace(regexPhone, this.exampleLead.phone)
            }
            if (word.toLowerCase() === 'email' || word.toLowerCase() === 'e-mail') {
              const regexmail1 = /\[([^\]]*email[^\]]*)\]/g
              const regexmail2 = /\[([^\]]*e-mail[^\]]*)\]/g
              this.textBodyCopy = this.textBodyCopy.replace(regexmail1, this.exampleLead.email)
              this.textBodyCopy = this.textBodyCopy.replace(regexmail2, this.exampleLead.email)
            }
            if (word.toLowerCase() === 'origem' && this.exampleLead.origem) {
              const regexOrigin = /\[([^\]]*origem[^\]]*)\]/g
              this.textBodyCopy = this.textBodyCopy.replace(regexOrigin, this.exampleLead.origem)
            }
          }
          this.showAndHide = false
        }
      } else {
        this.showAndHide = true
      }
    },
    chooseModel (id) {
      if (id === 0) {
        this.presentation.selected = true
        this.text.selected = false
      } else {
        this.presentation.selected = false
        this.text.selected = true
      }
    },
    showTemplate () {
      this.templateList = true
      if (this.presentation.selected) {
        this.oneOrOther = true
      } else {
        this.oneOrOther = false
      }
    },
    changeTextArea (btn) {
      if (btn === 'send') {
        this.isSelected = true
        this.selectValue = 'E-mail'
      } else {
        this.isSelected = false
        this.selectValue = 'WhatsApp'
      }
    },
    addModel () {
      this.templateList = false
      this.listSaved = false
      this.initial = false
      this.firstTemplate.templateTitle = ''
      this.firstTemplate.textAreaMailTitle = 'Olá, [nome]!'
      this.firstTemplate.textAreaMailBody = 'Meu nome é (Seu nome), sou especialista do SimplesHub, uma empresa que oferece soluções para simplificar processos fiscais burocráticos e repetitivos de sua contabilidade.\n\nVerificamos que você preencheu nosso formulário para conhecer nossas soluções, no entanto, notamos que o número fornecido está inválido. \n\nVocê teria algum horário disponível em sua agenda para que possamos apresentar na prática as soluções e benefícios que minha ferramenta tem a oferecer? \n\nCaso prefira, podemos continuar nossa conversa pelo WhatsApp. Entre em contato comigo através dos contatos abiaxo.\n\nAtenciosamente'
      this.secondTemplate.templateTitle = ''
      this.secondTemplate.textAreaMailTitle = 'Olá, [nome]!'
      this.secondTemplate.textAreaMailBody = 'Meu nome é (Seu nome), sou especialista do SimplesHub, uma empresa que oferece soluções para simplificar processos fiscais burocráticos e repetitivos de sua contabilidade.\n\nVerificamos que você preencheu nosso formulário para conhecer nossas soluções, no entanto, notamos que o número fornecido está inválido. \n\nVocê teria algum horário disponível em sua agenda para que possamos apresentar na prática as soluções e benefícios que minha ferramenta tem a oferecer? \n\nCaso prefira, podemos continuar nossa conversa pelo WhatsApp. Entre em contato comigo através dos contatos abiaxo.\n\nAtenciosamente'
    },
    toFavorite (model) {
      if (model.favorite) {
        model.favorite = false
        this.$firebase.database().ref(`support/textsModel/${window.uid}/mailMessage`).child(`${model.id}`).update({ favorite: false })
      } else {
        model.favorite = true
        this.$firebase.database().ref(`support/textsModel/${window.uid}/mailMessage`).child(`${model.id}`).update({ favorite: true })
      }
    },
    editModel (model) {
      this.template = {}
      this.editingOn = true
      this.template = model
      this.templateList = true
      this.listSaved = false
      this.initial = false
      if (model.type === 'Apresentação') {
        this.oneOrOther = true
        this.firstTemplate.templateTitle = this.template.templateTitle
        this.firstTemplate.textAreaMailTitle = this.template.title
        this.firstTemplate.textAreaMailBody = this.template.text
      } else {
        this.oneOrOther = false
        this.secondTemplate.templateTitle = this.template.templateTitle
        this.secondTemplate.textAreaMailTitle = this.template.title
        this.secondTemplate.textAreaMailBody = this.template.text
      }
      console.log(this.template)
    },
    handleExclusion (model) {
      this.localList = this.localList.filter((m) => m.id !== model.id)
      if (this.localList.length === 0) {
        this.listSaved = false
        this.initial = true
      }
      // Get toast interface
      const toast = useToast()

      // or with options
      toast.success('Modelo de texto excluído com sucesso!', {
        toastClassName: 'toast-class',
        // bodyClassName: ["custom-class-1", "custom-class-2"]
        timeout: 2000
      })
    },
    getBack () {
      if (this.editingOn === false) {
        this.templateList = false
      } else {
        this.listSaved = true
      }
    },
    async saveAndSend () {
      // Se for verdadeiro é o primeiro senão é o segundo
      if (this.oneOrOther === true) {
        if (this.template.id) {
          const tempObj = {
            templateTitle: this.firstTemplate.templateTitle,
            title: this.firstTemplate.textAreaMailTitle,
            text: this.firstTemplate.textAreaMailBody,
            type: 'Apresentação',
            id: this.template.id,
            origin: 'users'
          }
          this.localList.splice(this.localList.indexOf(this.template), 1, tempObj)
          await this.$firebase.database().ref(`support/textsModel/${window.uid}/mailMessage`).child(`${tempObj.id}`).update(tempObj)
          this.concluded = true
        } else {
          const tempObj = {
            templateTitle: this.firstTemplate.templateTitle,
            title: this.firstTemplate.textAreaMailTitle,
            text: this.firstTemplate.textAreaMailBody,
            id: Date.now(),
            type: 'Apresentação',
            origin: 'users'
          }
          await this.$firebase.database().ref(`support/textsModel/${window.uid}`).child(`mailMessage/${tempObj.id}`).update(tempObj)
          this.concluded = true
        }
      } else {
        if (this.template.id) {
          const tempObj = {
            templateTitle: this.secondTemplate.templateTitle,
            title: this.secondTemplate.textAreaMailTitle,
            text: this.secondTemplate.textAreaMailBody,
            id: this.template.id,
            type: 'Texto',
            origin: 'users'
          }
          tempObj.favorite = this.template.favorite ? true : null
          this.localList.splice(this.localList.indexOf(this.template), 1, tempObj)
          await this.$firebase.database().ref(`support/textsModel/${window.uid}`).child(`mailMessage/${tempObj.id}`).update(tempObj)
          this.concluded = true
        } else {
          const tempObj = {
            templateTitle: this.secondTemplate.templateTitle,
            title: this.secondTemplate.textAreaMailTitle,
            text: this.secondTemplate.textAreaMailBody,
            id: Date.now(),
            type: 'Texto',
            origin: 'users'
          }
          this.localList.push(tempObj)
          await this.$firebase.database().ref(`support/textsModel/${window.uid}`).child(`mailMessage/${tempObj.id}`).update(tempObj)
          this.concluded = true
        }
      }
      setTimeout(() => {
        this.concluded = false
        this.listSaved = true
      }, 800)
    },
    closeModal () {
      this.showModal = false
      this.concluded = false
    }
  }
}
</script>

<style lang="scss" scoped>
  ::selection {
    background:#E9F4F2 ;
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
  margin-left: 50%;
  outline: 2px solid #2FB490;
  border-radius: 9px !important;
  .modal-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 30px 30px 0px 30px !important;
    color: #404252;
    background-color: #fafafa;
    .upward-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-right: 8px;

    }
    .menu-list-container {
      display: flex;
      gap: 2px !important;
      .tags-box{
        display: flex;
        flex-direction: row-reverse !important;
        margin-left: 5px;
        .inner-tag {
          border: 1.8px solid #fafafa !important;
          border-radius: 5px 5px 0px 0px;
          border-bottom: none;
          padding: 5px 8px 2px 8px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13.5px;
          font-weight: 600;
          color: #777986;
          p {
            margin: auto 0;
          }

          &.selected {
            color: var(--success);
            background: rgba(27, 163, 142, .15) !important;
            font-weight: 600;
            border: 1.8px solid rgba(27, 163, 142, 0.1) !important;
            border-bottom: none !important;

            svg {
              stroke: var(--success);
              path {
                stroke: var(--success);
              }
              stroke: var(--success);
            }

            &:hover {
              color: var(--success);
              background: rgba(27, 163, 142, .15) !important;
              font-weight: 600;
              border: 1.8px solid rgba(27, 163, 142, 0.1) !important;
              border-bottom: none !important;
            }
          }

          &:hover {
            cursor: pointer;
            font-weight: 600;
            color: var(--success);
            background: rgba(27, 163, 142, .15) !important;
            border: 1.8px solid rgba(27, 163, 142, 0.1) !important;

            svg {
              stroke: var(--success);
              path {
                stroke: var(--success);
              }
              stroke: var(--success);
            }
          }
        }
      }
    }
  }
  .modal-body {
    display: flex;
    height: 100%;
    padding: 0px !important;

    .container-list {
      width: 100%;
      height: 100%;
      padding: 10px 0px 0px 0px;
      overflow-y: hidden;

      .inner-container {
        display: flex;
        justify-content: space-between !important;
        margin-bottom: 8px;
        padding-left: 33px;
        padding-right: 28px;
        .title-container {
            display: flex;
            align-items: center;
            gap: 5px;
            h5 {
              margin-bottom: -2px;
              font-weight: 600;
              color: #5b5d6b;
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

          i {
              margin-top: 3px !important;
          }
          &:hover {
            transform: translate(0, -3px);
            border: 3px solid #2fb490 !important;
            background-color: #2fb490 !important;
          }
        }
      }
      .models-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: auto;
        height: calc(100% - 42px);
        background-color: #E9F4F2;
        padding: 10px 19px 30px 30px !important;
        overflow-y: scroll;

        .model-container {
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          background-color: #fafafa;
          width: 100%;
          height: 145px;
          outline: 1px solid #bef1e3;
          padding: 10px !important;
          cursor: pointer !important;

          .template-type {
            display: flex;
            justify-content: space-between;

            span {
              font-style: normal;
              font-weight: 600;
              line-height: 20px;
              font-size: 13px;
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
    }
    .initial-container {
      width: 100%;
      padding-top: 20px;
      .inner-initial-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 60px;
        height: 100%;
        .inner-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 30px;
          h5 {
            margin: 0 auto;
            text-align: center;
            color: #5b5d6b;
          }
          button {
            margin: 0 auto;
            background-color: var(--success);
            align-self: center;
            transition: all .3s !important;
            border: 2px solid var(--success) !important;
            font-size: 15px;
            &:hover{
                background-color: #ffffff;
                border: 2px solid var(--success);
                color: var(--success);
            }
          }
        }
      }
    }
    .creation-container {
      height: 100%;
      width: 100%;
      .container-template {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 50px;

        h4 {
          color: #5b5d6b;
          text-align: center;
          margin-bottom: 35px;
        }
        .template-list {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          .template {
            cursor: pointer;
            transition: all .3s !important;

            .template-title {
              color: #5b5d6b;
              font-weight: 600;
              text-align: center;

              &.choosen {
                color: #13cf9a;
              }
            }
            .template-box {
              background-color: #E9F4F2;
              width: 300px;
              height: 400px;
              outline: 2px solid #2FB490;
              border-radius: 8px !important;

              &:hover {
                box-shadow: 8px 8px 8px 8px #DDF1EE;
              }
              &.choosen {
                box-shadow: 8px 8px 8px 8px #DDF1EE;
                outline: 2px solid #13cf9a;
              }
            }
          }
        }
        .text-container {
          margin-top: 45px;
          p {
            font-size: 14px;
            color: #5b5d6b;
            font-weight: 600;
            text-align: center;
          }
        }
        .container-template-footer {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 30px;
          .btn-undo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            color: #777986 !important;
            border: none;
            background-color: #ffffff;
            padding: 6px 9px !important;
            font-weight: 500 !important;
            letter-spacing: 0.5px;
            transition: all .3s !important;
            margin-right: 3px;
            &:hover{
                transform: translate(0, -3px);
            }
          }
          .btn-add {
            display: flex;
            align-items: center;
            gap: 8px;
            color: white !important;
            padding: 10px 15px !important;
            border: 3px solid var(--featured-light) !important;
            background-color: var(--featured-light) !important;
            font-weight: 600 !important;
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
      }
      .body-container {
        display: flex;
        height: 100%;

        .form-container {
          width: 100%;
          .inner-form-container {
            display: flex;
            flex-direction: column;
            color: #404252;
            background-color: #f1f5f9 !important;
            width: 100% !important;
            .help-container {
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer !important;
              padding-left: 35px;
              padding-right: 22px;

              .container-title {
                display: flex;
                align-items: start;
                margin-top: 5px;
                .label-title {
                  margin-top: 2px;
                  color: #5b5d6b;
                  font-weight: 600 !important;
                  margin-right: 5px;
                }
                .input-title {
                  color: #5b5d6b;
                  font-size: 13.5px;
                  font-weight: 500;
                  border: 1px solid rgb(179, 181, 189, 0.6) !important;
                  border-radius: 5px;
                  padding: 3px;
                  padding-left: 5px;
                  box-shadow: none !important;
                  width: 600px !important;
                  height: 100% !important;
                  resize: none;
                  overflow: auto;

                  &::placeholder {
                    font-size: 12px !important;
                    opacity: 0.6;

                  }
                }
              }

              .buttons-container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 5px;

                .btn-use {
                  margin-right: -4px;

                  small {
                    font-size: 13px;
                    color: #777986;
                  }
                  &:hover {
                    color: #068373;
                    svg {
                      path {
                        stroke: #068373 !important;
                      }
                      stroke: #068373 !important;
                    }
                  }
                }
                .eye-icon-container {
                  display: flex;
                  gap: 5px;
                  align-items: center;
                  cursor: pointer;
                  margin-right: 3px;
                  small {
                    font-size: 13px;
                    color: #777986;
                  }

                  &:hover {
                  color: #282a3a;
                    svg {
                      fill: #282a3a !important;
                    }
                    small {
                      color: #282a3a !important;
                    }
                  }
                }
                .suggestions-icon-container {
                  small {
                    font-size: 13px !important;
                    color: #777986 !important;
                  }

                  &:hover {
                    color: #cc9b0a;
                    svg {
                      path {
                        stroke: #cc9b0a !important;
                      }
                      stroke: #cc9b0a !important;
                    }
                  }
                }
              }

              &:hover {
                  stroke: var(--warning);
                  svg {
                    stroke: var(--warning);
                  }
                }
            }
            .report-container {
              display: flex;
              flex-direction: column;
              border-radius: 9px;
              .inner-container-report {
                width: 100%;
                height: 100%;
                .mail-container {
                  width: 100%;
                  background-color: #f1f5f9;
                  padding-left: 200px;
                  padding-right: 200px;

                  .logo-container {
                    height: 60px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 34px;
                    margin-top: -0px;
                    padding-top: 0px;
                    width: 192px;

                    img {
                      &::selection {
                        background:none !important ;
                      }
                    }
                  }
                  .main-container {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 28px;
                    border-radius: 16px;
                    background-color: #fff;
                    padding: 48px;
                    padding-top: 36px;
                    padding-bottom: 24px;
                    text-align: left;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

                    .title-textarea {
                      font-size: 20px;
                      font-weight: 600;
                      width: 100% !important;
                      height: 35px !important;
                      max-height: 35px;
                      color: #404252;
                      resize: none;
                      box-shadow: none;
                      border: none !important;
                      overflow: hidden;
                      &:focus {
                        resize: none !important;
                        box-shadow: none !important;
                        border: none !important;
                      }
                    }
                    .body-textarea {
                      text-align: justify;
                      font-size: 14px;
                      height: 360px !important;
                      border: none !important;
                      width: 100% !important;
                      color: #777986;
                      box-shadow: none;
                      resize: none;
                      overflow: hidden;

                      &:focus {
                        resize: none !important;
                        box-shadow: none !important;
                        border: none !important;
                      }
                    }

                    small {
                      align-self: flex-end;
                    }
                  }
                  .affiliate-container {
                    display: flex;
                    border-radius: 16px;
                    margin-bottom: 24px;
                    background-color: #fff;
                    padding: 48px;
                    text-align: left;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
                  }
                  .footer-container {
                    padding: 32px;
                    text-align: center;
                    font-size: 12px;
                    color: #4b5563;

                  }
                }
              }
            }
          }
          .modal-footer {
            display: flex;
            justify-content: space-between;
            border-top: 0px;
            background-color: #f1f5f9;
            height: 60px;
            padding-left: 35px;
            padding-right: 22px;
            .btn-undo {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              color: #777986 !important;
              border: none;
              background-color: #f1f5f9;
              padding: 6px 9px !important;
              font-weight: 500 !important;
              letter-spacing: 0.5px;
              transition: all .3s !important;
              margin-right: 3px;
              margin-top: -5px;
              &:hover{
                  transform: translate(0, -3px);
              }
            }
            .btn-conclude {
              background-color: #f1f5f9;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              color: white !important;
              border: 3px solid var(--featured-light) !important;
              border-radius: 7px;
              background-color: var(--featured-light) !important;
              width: 150px !important;
              padding: 6px 9px !important;
              font-weight: 500 !important;
              letter-spacing: 0.5px;
              transition: all .3s !important;
              margin-right: 3px;
              margin-top: -18px;
              &:hover{
                  transform: translate(0, -3px);
              }
            }
          }
        }
        .form-container-second {
          width: 100%;
          margin: 0px 15px 0px 20px !important;

          .inner-second-container {
            display: flex;
            flex-direction: column;
            color: #404252;
            background-color: #ffffff !important;
            width: 100% !important;
            padding: 0px;

            .help-container {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 10px 15px 0px 15px;
              height: fit-content;
              margin-top: 1px;
              cursor: pointer !important;

              .container-title {
                display: flex;
                align-items: start;
                margin-top: -5px;
                .label-title {
                  color: #5b5d6b;
                  font-weight: 600 !important;
                  margin-right: 5px;
                }
                .input-title {
                  color: #5b5d6b;
                  font-size: 13.5px;
                  font-weight: 500;
                  border: 1px solid rgb(179, 181, 189, 0.6) !important;
                  border-radius: 5px;
                  padding: 3px;
                  padding-left: 5px;
                  box-shadow: none !important;
                  width: 600px !important;
                  height: 100% !important;
                  resize: none;
                  overflow: auto;

                  &::placeholder {
                    font-size: 12px !important;
                    opacity: 0.6;
                  }
                }
              }

              .buttons-container {
                display: flex;
                flex-direction: column;
                gap: 5px;

                .btn-use {
                  margin-right: -12px;

                  small {
                    font-size: 13px;
                    color: #777986;

                    &:hover {
                    color: #282a3a;
                    }
                  }
                  &:hover {
                    color: #068373;
                    svg {
                      path {
                        stroke: #068373 !important;
                      }
                      stroke: #068373 !important;
                    }
                  }
                }
                .eye-icon-container {
                  display: flex;
                  gap: 5px;
                  align-items: center;
                  cursor: pointer;
                  margin-right: -4px;
                  small {
                    font-size: 13px;
                    color: #777986;
                  }

                  &:hover {
                  color: #282a3a;
                    svg {
                      fill: #282a3a !important;
                    }
                    small {
                      color: #282a3a !important;
                    }
                  }
                }
                .suggestions-icon-container {

                  &:hover {
                    color: #cc9b0a;
                    svg {
                      path {
                        stroke: #cc9b0a !important;
                      }
                      stroke: #cc9b0a !important;
                    }
                  }
                }
              }

              &:hover {
                  stroke: var(--warning);
                  svg {
                    stroke: var(--warning);
                  }
                }
            }
            .report-container-other {
              display: flex;
              flex-direction: column;
              border-radius: 7px;
              padding: 10px;
              margin-top: 5px;
              margin: 15px;
              border: 1px solid rgb(179, 181, 189, 0.6);
              height: 610px;
              .inner-container-report-other {
                display: flex;
                flex-direction: column;
                padding: 10px;
                padding-top: 0px;
                padding-bottom: 0px !important;
                border-radius: 5px;

                .title-textarea-other {
                  font-size: 20px;
                  font-weight: 600;
                  width: 100% !important;
                  color: #404252;
                  resize: none;
                  box-shadow: none;
                  border: none !important;

                  &:focus {
                    resize: none !important;
                    box-shadow: none !important;
                    border: none !important;
                  }

                  &::selection {
                    background-color: none !important;
                  }
                }
                .body-textarea-other {
                  text-align: justify;
                  font-size: 14px;
                  height: 260px !important;
                  border: none !important;
                  width: 865px !important;
                  color: #777986;
                  box-shadow: none;
                  resize: none;
                  overflow-y: scroll;
                  padding-right: 10px;
                  &:focus {
                    resize: none !important;
                    box-shadow: none !important;
                    border: none !important;
                  }

                  &::selection {
                    background-color: none !important;
                  }
                }

                small {
                  align-self: flex-end;
                }
              }
              .affiliate-container {
                display: flex;
                flex-direction: column;
                padding-left: 15px;
                padding-top: 5px;
                height: 180px;
                .first-line {
                  display: flex;
                  gap: 15px;

                  .info {
                    display: flex;
                    flex-direction: column;

                    a {
                      margin-left: 5px !important;
                    }
                  }
                }
                .second-line {
                  display: flex;
                  gap: 120px;
                  padding-top: 5px;
                  padding-left: 12px;
                }
              }
              .footer-container {
                margin-top: 15px;
                padding: 32px;
                text-align: center;
                font-size: 12px;
                color: #4b5563;
                height: 100px !important;
              }
            }
          }
          .modal-footer {
            display: flex;
            justify-content: space-between;
            border-top: 0px;
            height: 60px;

            .btn-undo {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              color: #777986 !important;
              border: none;
              background-color: #ffffff;
              padding: 6px 9px !important;
              font-weight: 500 !important;
              letter-spacing: 0.5px;
              transition: all .3s !important;
              margin-right: 3px;
              margin-top: -5px;
              &:hover{
                  transform: translate(0, -3px);
              }
            }
            .btn-conclude {
              background-color: #f1f5f9;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              color: white !important;
              border: 3px solid var(--featured-light) !important;
              border-radius: 7px;
              background-color: var(--featured-light) !important;
              width: 150px !important;
              padding: 6px 9px !important;
              font-weight: 500 !important;
              letter-spacing: 0.5px;
              transition: all .3s !important;
              margin-right: 3px;
              margin-top: -18px;
              &:hover{
                  transform: translate(0, -3px);
              }
            }
          }
        }
      }
    }
  }
}
.remove-confirmation{
  position: absolute !important;
  background-color: #fafafa;
  border-radius: 9px;
  border: 2px solid #2FB490;
  top: -18px;
  left: 858px;
  width: 335px;
  height: 510px;
  text-align: start;
  padding: 20px;
  .confirmation-header {
    h5 {
    font-size: 20px;
    font-weight: 700;
    color: #282A3A;
    }
    p{
      font-size: 13px;
      font-weight: 400;
      color: #404252;
      text-align: justify;
    }
  }
  .confirmation-body {
    ul {
      padding-left: 10px;
      li {
        padding-top: 1px;
        padding-bottom: 1px;
        font-size: 13px;
        font-weight: 400;
        color: #404252;
      }
    }
    p {
      font-size: 13px;
      font-weight: 400;
      color: #404252;
      text-align: justify;
    }
  }
  .confirmation-footer {
    small {
    font-size: 11px;
    font-weight: 500;
    color: #777986;
    text-align: justify;
    }
  }
}
</style>
