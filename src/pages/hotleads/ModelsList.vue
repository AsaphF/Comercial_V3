<template>
  <div>
    <template v-if="id === 'email'">
      <button v-if="senderEmailStatus === 'loading'" class="btn btn-sm btn-send-mail">
        <svg width="18px" height="18px" version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
          <circle fill="none" stroke="#2C9230" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
          <line fill="none" stroke-linecap="round" stroke="#2C9230" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
            <animateTransform
                attributeName="transform"
                dur="2s"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite" />
          </line>
          <line fill="none" stroke-linecap="round" stroke="#2C9230" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
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
      <button v-else-if="senderEmailStatus === 'concluded'" class="btn btn-sm btn-send-mail-checked">
        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.333 6.8877L9.33209 16.8877L4.33298 11.8877" stroke="#2C9230" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button v-else-if="senderEmailStatus === 'time'" class="btn btn-sm btn-send-mail-checked" style="padding: 10px 11px !important;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2H14" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.343 7.343C9.467 4.219 14.533 4.219 17.657 7.343C20.781 10.467 20.781 15.533 17.657 18.657C14.533 21.781 9.467 21.781 6.343 18.657C3.219 15.533 3.219 10.467 6.343 7.343" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.002 12.5C11.724 12.5 11.5 12.724 11.5 13C11.5 13.276 11.724 13.5 12 13.5C12.276 13.5 12.5 13.276 12.5 13C12.502 12.724 12.278 12.5 12.002 12.5" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.905 12.095C16.964 12.388 17 12.689 17 13" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.35 12.65L15.54 9.45999" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 5L17.66 7.34" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19 4L21 6" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 13C7 10.239 9.239 8 12 8C12.311 8 12.612 8.036 12.905 8.095" stroke="#777986" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button v-else-if="senderEmailStatus === 'error'" class="btn btn-sm btn-send-mail" style="padding: 10px 11px !important;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.7727 14.0008C19.8797 17.9187 16.4986 20.7705 12.4863 20.9902C8.47401 21.2099 4.80182 18.7443 3.4864 14.9473C2.17098 11.1504 3.5308 6.94148 6.81909 4.63193C10.1074 2.32238 14.528 2.47136 17.6534 4.99708" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21.0038 8.00034L18.0025 10.9976" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.0045 7.99832L21.0017 10.9996" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 11.6689V8.3985" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 15.2794C11.9572 15.2793 11.9162 15.2965 11.8861 15.3269C11.856 15.3574 11.8394 15.3986 11.8399 15.4414C11.8415 15.5291 11.9123 15.5999 12 15.6015C12.0895 15.6015 12.1621 15.5289 12.1621 15.4394C12.1621 15.3499 12.0895 15.2773 12 15.2773" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button v-else class="btn btn-sm btn-send-mail" @click="openModal()" @click.right="sendEmail(this.lead, 'right')">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="18px" height="18px"><path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"/><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/></svg>
      </button>
    </template>
    <button v-else type="button" class="btn btn-sm btn-send" @click="openModal()" @click.right="sendWhats(this.lead, 'right')">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="18px" height="18px" fill-rule="nonzero"><g transform="translate(-21.33333,-21.33333) scale(1.16667,1.16667)"><g fill-opacity="0.23922" fill="#1ba38e" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M117.02857,138.97143v-21.94286h21.94286v21.94286z" id="shape"></path></g><g fill="none" fill-rule="none" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M4.868,43.303l2.694,-9.835c-1.662,-2.878 -2.536,-6.144 -2.535,-9.489c0.005,-10.465 8.521,-18.979 18.987,-18.979c5.079,0.002 9.845,1.979 13.43,5.566c3.584,3.588 5.558,8.356 5.556,13.428c-0.004,10.465 -8.522,18.98 -18.986,18.98c-0.001,0 0,0 0,0h-0.008c-3.177,-0.001 -6.3,-0.798 -9.073,-2.311z" fill="#ffffff" fill-rule="nonzero"></path><path d="M4.868,43.803c-0.132,0 -0.26,-0.052 -0.355,-0.148c-0.125,-0.127 -0.174,-0.312 -0.127,-0.483l2.639,-9.636c-1.636,-2.906 -2.499,-6.206 -2.497,-9.556c0.004,-10.742 8.745,-19.48 19.486,-19.48c5.21,0.002 10.105,2.031 13.784,5.713c3.679,3.683 5.704,8.577 5.702,13.781c-0.004,10.741 -8.746,19.48 -19.486,19.48c-3.189,-0.001 -6.344,-0.788 -9.144,-2.277l-9.875,2.589c-0.042,0.012 -0.084,0.017 -0.127,0.017z" fill="#ffffff" fill-rule="nonzero"></path><path d="M24.014,5c5.079,0.002 9.845,1.979 13.43,5.566c3.584,3.588 5.558,8.356 5.556,13.428c-0.004,10.465 -8.522,18.98 -18.986,18.98h-0.008c-3.177,-0.001 -6.3,-0.798 -9.073,-2.311l-10.065,2.64l2.694,-9.835c-1.662,-2.878 -2.536,-6.144 -2.535,-9.489c0.005,-10.465 8.521,-18.979 18.987,-18.979M24.014,42.974v0v0M24.014,42.974v0v0M24.014,4v0c-11.016,0 -19.982,8.962 -19.987,19.979c-0.001,3.367 0.849,6.685 2.461,9.622l-2.585,9.439c-0.094,0.345 0.002,0.713 0.254,0.967c0.19,0.192 0.447,0.297 0.711,0.297c0.085,0 0.17,-0.011 0.254,-0.033l9.687,-2.54c2.828,1.468 5.998,2.243 9.197,2.244c11.024,0 19.99,-8.963 19.995,-19.98c0.002,-5.339 -2.075,-10.359 -5.848,-14.135c-3.775,-3.777 -8.796,-5.858 -14.139,-5.86z" fill="#cfd8dc" fill-rule="nonzero"></path><path d="M35.176,12.832c-2.98,-2.982 -6.941,-4.625 -11.157,-4.626c-8.704,0 -15.783,7.076 -15.787,15.774c-0.001,2.981 0.833,5.883 2.413,8.396l0.376,0.597l-1.595,5.821l5.973,-1.566l0.577,0.342c2.422,1.438 5.2,2.198 8.032,2.199h0.006c8.698,0 15.777,-7.077 15.78,-15.776c0.001,-4.215 -1.638,-8.179 -4.618,-11.161z" fill="#40c351" fill-rule="nonzero"></path><path d="M19.268,16.045c-0.355,-0.79 -0.729,-0.806 -1.068,-0.82c-0.277,-0.012 -0.593,-0.011 -0.909,-0.011c-0.316,0 -0.83,0.119 -1.265,0.594c-0.435,0.475 -1.661,1.622 -1.661,3.956c0,2.334 1.7,4.59 1.937,4.906c0.237,0.316 3.282,5.259 8.104,7.161c4.007,1.58 4.823,1.266 5.693,1.187c0.87,-0.079 2.807,-1.147 3.202,-2.255c0.395,-1.108 0.395,-2.057 0.277,-2.255c-0.119,-0.198 -0.435,-0.316 -0.909,-0.554c-0.474,-0.238 -2.807,-1.385 -3.242,-1.543c-0.435,-0.158 -0.751,-0.237 -1.068,0.238c-0.316,0.474 -1.225,1.543 -1.502,1.859c-0.277,0.317 -0.554,0.357 -1.028,0.119c-0.474,-0.238 -2.002,-0.738 -3.815,-2.354c-1.41,-1.257 -2.362,-2.81 -2.639,-3.285c-0.277,-0.474 -0.03,-0.731 0.208,-0.968c0.213,-0.213 0.474,-0.554 0.712,-0.831c0.237,-0.277 0.316,-0.475 0.474,-0.791c0.158,-0.317 0.079,-0.594 -0.04,-0.831c-0.117,-0.238 -1.039,-2.584 -1.461,-3.522z" fill="#ffffff" fill-rule="evenodd"></path></g></g></g></svg>
    </button>
    <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
        <div class="modal-content">
          <div class="body-container">
            <div class="body-content">
              <div v-if="id === 'email'" class="container-list-email">
                <div class="inner-container">
                  <div class="title-container">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.99875 6.43673H20.0033" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M20.0033 12.0002H8.99875" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8.99875 17.5637H20.0033" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.49687 5.93652C4.22062 5.93652 3.99667 6.16047 3.99667 6.43673C3.99667 6.71299 4.22062 6.93694 4.49687 6.93694C4.77313 6.93694 4.99708 6.71299 4.99708 6.43673C4.99708 6.16047 4.77313 5.93652 4.49687 5.93652" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.49687 11.5C4.22062 11.5 3.99667 11.724 3.99667 12.0002C3.99667 12.2765 4.22062 12.5004 4.49687 12.5004C4.77313 12.5004 4.99708 12.2765 4.99708 12.0002C4.99708 11.724 4.77313 11.5 4.49687 11.5" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.49687 17.0635C4.22062 17.0635 3.99667 17.2874 3.99667 17.5637C3.99667 17.8399 4.22062 18.0639 4.49687 18.0639C4.77313 18.0639 4.99708 17.8399 4.99708 17.5637C4.99708 17.2874 4.77313 17.0635 4.49687 17.0635" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Lista de modelos</p>
                  </div>
                </div>
                <div class="lead-info-container">
                  <h6><strong>Destinatário:</strong> {{ lead.name }}</h6>
                  <div class="tip-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.706 13V8.5C12.706 7.672 12.034 7 11.206 7C10.378 7 9.706 7.672 9.706 8.5V16L7.674 15.323C7.081 15.125 6.427 15.28 5.984 15.722C5.297 16.409 5.349 17.536 6.094 18.158L10.149 21.537C10.51 21.836 10.963 22 11.43 22H15.94C16.949 22 17.799 21.249 17.925 20.248L18.468 15.905C18.601 14.84 17.87 13.861 16.812 13.684L12.706 13Z" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5.21 8H6.21" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17.21 8H16.21" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.45 3.76L14.74 4.46" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.96 3.76L7.67 4.46" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.21 2V3" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span> Selecione o modelo de email que deseja enviar para o seu cliente</span>
                  </div>
                </div>
                <div class="models-container">
                  <div class="model-container" :class="{'activated': model.selected}" v-for="(model, index) in modelsList" :key="index" @click="selectModel(model)">
                    <div class="template-type">
                      <span>Template de {{ model.type }}</span>
                      <svg v-if="model.favorite && model.favorite === true" width="21" height="21" viewBox="0 0 24 24" fill="#F2C335" xmlns="http://www.w3.org/2000/svg" @click="toFavorite(model)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z" stroke="#e6ac00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <svg v-else width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="toFavorite(model)">
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
                  <div v-if="warning" class="warning">
                    <i style="margin-right: 8px; color: var(--success);" class="fas fa-exclamation-triangle"></i>Modelo de texto excluido com sucesso
                  </div>
                  <button v-if="!sended" class="btn btn-sm btn-send-whats" @click.left="sendEmail(this.lead, 'left')">Enviar</button>
                  <button v-else class="btn btn-sm btn-send-whats activated">
                    <svg width="18px" height="18px" version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                      <circle fill="none" stroke="#2C9230" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
                      <line fill="none" stroke-linecap="round" stroke="#2C9230" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                        <animateTransform
                            attributeName="transform"
                            dur="2s"
                            type="rotate"
                            from="0 50 50"
                            to="360 50 50"
                            repeatCount="indefinite" />
                      </line>
                      <line fill="none" stroke-linecap="round" stroke="#2C9230" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
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
                </div>
              </div>
              <div v-else class="container-list">
                <div class="inner-container">
                  <div class="title-container">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.99875 6.43673H20.0033" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M20.0033 12.0002H8.99875" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8.99875 17.5637H20.0033" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.49687 5.93652C4.22062 5.93652 3.99667 6.16047 3.99667 6.43673C3.99667 6.71299 4.22062 6.93694 4.49687 6.93694C4.77313 6.93694 4.99708 6.71299 4.99708 6.43673C4.99708 6.16047 4.77313 5.93652 4.49687 5.93652" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.49687 11.5C4.22062 11.5 3.99667 11.724 3.99667 12.0002C3.99667 12.2765 4.22062 12.5004 4.49687 12.5004C4.77313 12.5004 4.99708 12.2765 4.99708 12.0002C4.99708 11.724 4.77313 11.5 4.49687 11.5" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.49687 17.0635C4.22062 17.0635 3.99667 17.2874 3.99667 17.5637C3.99667 17.8399 4.22062 18.0639 4.49687 18.0639C4.77313 18.0639 4.99708 17.8399 4.99708 17.5637C4.99708 17.2874 4.77313 17.0635 4.49687 17.0635" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Lista de modelos</p>
                  </div>
                </div>
                <div class="lead-info-container">
                  <h6><strong>Destinatário:</strong> {{ lead.name }}</h6>
                  <div class="tip-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.706 13V8.5C12.706 7.672 12.034 7 11.206 7C10.378 7 9.706 7.672 9.706 8.5V16L7.674 15.323C7.081 15.125 6.427 15.28 5.984 15.722C5.297 16.409 5.349 17.536 6.094 18.158L10.149 21.537C10.51 21.836 10.963 22 11.43 22H15.94C16.949 22 17.799 21.249 17.925 20.248L18.468 15.905C18.601 14.84 17.87 13.861 16.812 13.684L12.706 13Z" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5.21 8H6.21" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17.21 8H16.21" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.45 3.76L14.74 4.46" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.96 3.76L7.67 4.46" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.21 2V3" stroke="#5B5D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span> Selecione o modelo de email que deseja enviar para o seu cliente</span>
                  </div>
                </div>
                <div class="models-container">
                  <div class="model-container" :class="{'activated': model.selected}" v-for="(model, index) in modelsList" :key="index" @click="selectModel(model)">
                    <div class="first-line-container">
                      <h6 v-if="model.title.length > 80"><strong>Título do Modelo:</strong> {{ model.title.slice(0, 80) }}...</h6>
                      <h6 v-else><strong>Título do Modelo:</strong> {{ model.title }}</h6>
                      <template>
                          <svg v-if="model.favorite && model.favorite === true" class="star-icon" width="21" height="21" viewBox="0 0 24 24" fill="#F2C335" xmlns="http://www.w3.org/2000/svg" @click.stop="toFavorite(model)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z" stroke="#e6ac00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg v-else class="star-icon" width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click.stop="toFavorite(model)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z" stroke="#e6ac00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </template>
                    </div>
                    <p v-if="model.text.length > 235" class="text-model"><strong>Texto: </strong><span class="text-container">{{ model.text.slice(0, 235) }}...</span></p>
                    <p v-else class="text-model"><strong>Texto: </strong><span class="text-container">{{ model.text }}</span></p>
                  </div>
                </div>
                <div class="buttons-container">
                  <button v-if="senderEmailStatus != 'loading'" class="btn btn-sm btn-send-whats" @click.left="sendWhats(this.lead, 'left')">Enviar</button>
                  <button v-else class="btn btn-sm btn-send-whats" @click.left="sendWhats(this.lead, 'left')" disabled>Enviado</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade" @click="closeModal()" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}"></div>
    </div>
  </div>

</template>

<script>
import sendSalesBusiness from '../../plugins/sendSalesBusiness'
import sendSalesMessage from '../../plugins/sendSalesMessage'
export default {
  props: ['affiliate', 'lead', 'modelsList', 'id'],
  data: () => ({
    localModels: [],
    favoritesList: [],
    warning: false,
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
    this.$root.$on('ModelsList::show', () => this.openModal())
  },
  methods: {
    async openModal () {
      this.showModal = true
      for (let index = 0; index < this.showModal.length; index++) {
        this.showModal[index].selected = false
      }
    },
    async sendWhats (lead, key) {
      const tempObj = {
        leadName: lead.name,
        leadPhone: lead.phone,
        modelTitle: '',
        date: Date.now(),
        origin: 'lead'
      }
      if (key === 'right') {
        const modelsFavorites = this.modelsList.filter(model => model.favorite === true)
        if (modelsFavorites.length > 0) {
          let message = modelsFavorites[0].text
          message = this.checkMessage(message, lead)
          const phoneNumber = lead.phone.replace(/[^a-zA-Z0-9]/g, '')
          // const encodedMessage = window.encodeURIComponent(message)
          window.open(`https://wa.me//55${phoneNumber}?text=${message}`, '_blank')
          tempObj.modelTitle = modelsFavorites[0].title
          await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`whatsMessage/${tempObj.date}`).update(tempObj)
        }
      } else {
        const selectedModel = this.modelsList.filter(model => model.selected && model.selected === true)
        let message = selectedModel[0].text
        message = this.checkMessage(message, lead)
        const phoneNumber = lead.phone.replace(/[^a-zA-Z0-9]/g, '')
        // const encodedMessage = window.encodeURIComponent(message)
        tempObj.modelTitle = selectedModel[0].title
        await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`whatsMessage/${Date.now()}`).update(tempObj)
        window.open(`https://wa.me//55${phoneNumber}?text=${message}`, '_blank')
      }
    },
    async sendEmail (lead) {
      this.sended = true
      const selectedModel = this.modelsList.filter(model => model.selected && model.selected === true)
      if (selectedModel.length > 0) {
        try {
          this.senderEmailStatus = 'loading'
          this.model = selectedModel[0]
          this.mailTitle = selectedModel[0].title
          this.mailBody = selectedModel[0].text
          if (this.model.type === 'Apresentação') {
            const tempObj = {
              leadName: lead.name,
              leadMail: lead.email,
              mailBody: selectedModel[0].text,
              template: this.model.templateTitle,
              templateTitle: this.model.type,
              date: Date.now(),
              origin: 'lead'
            }
            const result = await sendSalesBusiness(this.affiliate, lead.name, lead.email, this.mailTitle, this.mailBody)
            if (result === 200) {
              const date = new Date()
              await this.$firebase.database().ref(`hotLeads/${lead.key}`).update({ lastSendDate: date })
              await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`mailMessage/${tempObj.date}`).update(tempObj)
            } else {
              console.log('Essa lead não deu certo:' + lead)
              this.senderEmailStatus = 'error'
            }
          } else {
            const tempObj = {
              leadName: lead.name,
              leadMail: lead.email,
              mailBody: selectedModel[0].text,
              template: this.model.templateTitle,
              templateTitle: this.model.type,
              date: Date.now(),
              origin: 'lead'
            }
            const result = await sendSalesMessage(this.affiliate, lead.name, lead.email, this.mailTitle, this.mailBody)
            if (result === 200) {
              const date = new Date()
              await this.$firebase.database().ref(`hotLeads/${lead.key}`).update({ lastSendDate: date })
              await this.$firebase.database().ref(`support/messageHistoric/${window.uid}`).child(`mailMessage/${tempObj.date}`).update(tempObj)
              this.senderEmailStatus = 'concluded'
            } else {
              console.log('Essa lead não deu certo:' + lead)
            }
          }
          this.senderEmailStatus = 'concluded'
          setTimeout(() => {
            this.showModal = false
          }, 500)
        } catch (error) {
          console.log(error)
          this.errorOff = false
        }
      } else {
        this.warning = true
      }
    },
    // Funções de manipulação de dados
    checkMessage (message, lead) {
      // Formatar Título do e-mail
      const regex = /\[([^\]]+)\]/g
      const matchesTitle = [...message.matchAll(regex)]
      const wordsInTitle = matchesTitle.map(match => match[1])
      for (const word of wordsInTitle) {
        if (word.toLowerCase() === 'nome') {
          const regexName = /\[([^\]]*nome[^\]]*)\]/g
          const letter = lead.name[0].toUpperCase()
          const name = lead.name.toLowerCase().slice(1)
          const sum = letter + name
          const firstName = sum.split(' ')[0]
          message = message.replace(regexName, firstName)
        }
        if (word.toLowerCase() === 'telefone') {
          const regexPhone = /\[([^\]]*telefone[^\]]*)\]/g
          message = message.replace(regexPhone, lead.phone)
        }
        if (word.toLowerCase() === 'email' || word.toLowerCase() === 'e-mail') {
          const regexmail1 = /\[([^\]]*email[^\]]*)\]/g
          const regexmail2 = /\[([^\]]*e-mail[^\]]*)\]/g
          message = message.replace(regexmail1, lead.email)
          message = message.replace(regexmail2, lead.email)
        }
        if (word.toLowerCase() === 'origem' && lead.originData && lead.originData.origin) {
          const regexOrigin = /\[([^\]]*origem[^\]]*)\]/g
          message = message.replace(regexOrigin, lead.originData.origin)
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
        this.$firebase.database().ref(`textsModel/${window.uid}`).child(`whatsMessage/${model.id}`).update({ favorite: false })
      } else {
        model.favorite = true
        this.$firebase.database().ref(`textsModel/${window.uid}`).child(`whatsMessage/${model.id}`).update({ favorite: true })
      }
    },
    selectModel (model) {
      for (let i = 0; i < this.modelsList.length; i++) {
        if (this.modelsList[i].selected === true) {
          this.modelsList[i].selected = false
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
    getBack () {
      this.edit = false
    },
    closeModal () {
      this.showModal = false
      this.concluded = false
      this.removeConfirmation = false
    },
    formatEmail () {
      return this.lead.email.replace(/[^a-zA-Z0-9]/g, '')
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
  height: 85vh;
  margin-left: 50%;
  outline: 2px solid #2FB490;
  border-radius: 8px !important;

  .body-container {
    display: flex;
    height: 100%;
    .body-content {
      display: flex;
      width: 100%;
      .form-container {
        width: 100%;
        height: 100%;
        .creation-container {
          .body-container {
            display: flex;
            height: 100%;
            .body-content {
              display: flex;
              width: 100%;
              .form-container {
                width: 100%;
                .modal-body {
                  color: #404252;
                  padding: 10px;
                  padding-left: 15px;
                  padding-right: 15px;
                  border: #E9F4F2;
                  display: flex;
                  flex-direction: column;
                  border-radius: 5px;
                  width: 100%;
                  .selection-container {
                    display: flex;
                    flex-direction: column;
                    padding: 0px !important;

                    .inner-first-container {
                      display: flex;
                      justify-content: space-between;
                      p {
                          color: #5b5d6b;
                          font-weight: 600;
                          font-size: 15px;
                          margin-bottom: 0px;
                        }
                      .help-container {
                        height: fit-content;
                        margin-right: 5px !important;
                        margin-top: 5px;
                        cursor: pointer !important;

                        .btn-use {
                          color: #F2C335;
                          background: none;
                          border: none;

                          small {
                            font-size: 13px;
                          }
                          &:hover {
                            color: var(--warning);
                            svg {
                              stroke: var(--warning);
                            }
                          }
                        }
                      }
                    }
                    .container-title {
                      display: flex;
                      align-items: start;
                      margin-top: 0px;

                      p {
                        color: #5b5d6b;
                        font-weight: 500;
                        font-size: 16px;
                        strong {
                          font-size: 18px;
                        }
                      }

                    }
                    .inner-container-button {
                      display: flex;
                      align-self: flex-start;
                      gap: 6px;
                      padding-left: 7px;
                      .btn-send {
                        margin-right: -8px;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        background-color: #E6FBF5;
                        color: #2FB490;
                        padding: 5px 10px !important;
                        transition: all .3s !important;
                        border-radius: 5px 5px 0px 0px !important;
                      }
                      .checked-send {
                        margin-right: -8px;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        background-color: rgb(103, 222, 190, 0.9);
                        color: #068373;
                        padding: 5px 10px !important;
                        transition: all .3s !important;
                        border-radius: 5px 5px 0px 0px !important;

                      }
                      .btn-edit {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        color: #777986;
                        background-color: rgb(229, 229, 229, 0.6);
                        padding: 5px 10px !important;
                        transition: all .3s !important;
                        border-radius: 5px 5px 0px 0px !important;
                      }
                      .checked-edit {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        color: #777986;
                        background-color: rgb(210, 212, 218, 0.8);
                        padding: 5px 10px !important;
                        transition: all .3s !important;
                        border-radius: 5px 5px 0px 0px !important;
                      }
                    }
                  }
                  .report-container {
                    display: flex;
                    flex-direction: column;
                    border-radius: 7px;
                    height: 550px;

                    .inner-container-report {
                      padding: 10px;
                      padding-bottom: 0px !important;
                      border-radius: 5px;
                      border: 1px solid rgb(179, 181, 189, 0.6);

                      textarea {
                        color: #5b5d6b;
                        font-weight: 500;
                        border: none !important;
                        box-shadow: none !important;
                        width: 100% !important;
                        height: 530px !important;
                        resize: none;
                        overflow: auto;

                        &:disabled {
                          background-color: #ffffff !important;
                        }
                      }
                      .container-affiliate-info {
                        margin-top: 10px;
                        border-radius: 24px;
                        border: 2px solid #e2e8f0;
                        padding: 16px;

                        .inner-container {
                          display: flex;
                          align-items: center;
                        }
                      }
                    }
                  }
                }
                .modal-footer {
                  display: flex;
                  justify-content: space-between;
                  align-items: start;
                  height: 70px;
                  border-top: 0px;
                  .btn-conclude {
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
                    margin-top: -10px;
                    &:hover{
                        transform: translate(0, -3px);
                    }
                  }
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
                    margin-top: -0px;
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
      .container-list {
        width: 100%;
        padding: 0px;
        .inner-container {
          display: flex;
          justify-content: space-between;
          margin: 8px 10px;
          .title-container {
            display: flex;
            align-items: center;
            gap: 5px;
            p {
              margin-bottom: 1px;
              font-size: 22px;
              font-weight: 600;
              color: #404252;
            }
          }
          .warning {
            width: 300px;
            font-size: 11px;
            margin-left: 370px;
          }
          .btn-add {
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
          padding-left: 10px;
          p {
            font-size: 15px;
            font-weight: 500;
          }
          h6 {
            color: #404252;
          }
        }
        .models-container{
          display: flex;
          flex-direction: column;
          align-items: center;
          width: auto;
          gap: 10px;
          height: 630px;
          background-color: #E9F4F2;
          padding: 10px;
          overflow-y: scroll;
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
          justify-content: flex-end;
          background-color: #E9F4F2;
          padding-right: 10px;
          height: 60px;
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
        }
      }
      .container-list-email {
        width: 100%;
        height: 100%;
        padding: 0px;
        .inner-container {
          display: flex;
          justify-content: space-between !important;
          margin: 8px 10px;
          .title-container {
              display: flex;
              align-items: center;
              gap: 5px;
              p {
                font-size: 18px;
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
            &:hover {
              transform: translate(0, -3px);
              border: 3px solid #2fb490 !important;
              background-color: #2fb490 !important;
            }
          }
        }
        .lead-info-container {
          padding-left: 10px;
          .tip-container {
            margin: 0;
            margin-bottom: 5px;
            span {
              font-size: 13px;
              font-weight: 500;
              color: #5b5d6b;
            }
          }
          h6 {
            font-size: 15px;
            font-weight: 600;
            color: #5b5d6b;
          }
        }
        .models-container{
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: auto;
          height: 630px;
          background-color: #E9F4F2;
          padding: 10px;
          overflow-y: scroll;
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
          justify-content: flex-end;
          background-color: #E9F4F2;
          padding-right: 10px;
          height: 60px;
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
        }
      }
    }
  }
}
</style>
