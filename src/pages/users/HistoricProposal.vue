<template>
  <div>
    <div class="button-container" >
      <span>Ver histórico de Envio</span>
      <button class="btn-action"  @click="openModal()">
        <svg style="padding-bottom: 0px;" width="23" height="21" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.94019 9.38998V5.30078" stroke="#068373" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.4462 11.379L8.94019 9.39062" stroke="#068373" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 2.24707C5.27053 2.24707 2.24719 5.27041 2.24719 8.99988C2.24719 12.7294 5.27053 15.7527 9 15.7527C12.7295 15.7527 15.7528 12.7294 15.7528 8.99988" stroke="#068373" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.2522 0.746094C15.9097 0.746094 17.2534 2.0898 17.2534 3.74734C17.2534 5.40489 15.9097 6.74859 14.2522 6.74859C12.5947 6.74859 11.2509 5.40489 11.2509 3.74734C11.2509 2.0898 12.5947 0.746094 14.2522 0.746094" stroke="#068373" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.1036 3.7482C15.1036 3.76892 15.0868 3.78572 15.0661 3.78572C15.0454 3.78572 15.0286 3.76892 15.0286 3.7482C15.0286 3.72748 15.0454 3.71069 15.0661 3.71069" stroke="#068373" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.0661 3.70991C15.0761 3.70991 15.0856 3.71387 15.0926 3.7209C15.0997 3.72794 15.1036 3.73748 15.1036 3.74743" stroke="#068373" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.4758 3.7482C13.4758 3.76892 13.459 3.78572 13.4382 3.78572C13.4175 3.78572 13.4007 3.76892 13.4007 3.7482C13.4007 3.72748 13.4175 3.71069 13.4382 3.71069" stroke="#068373" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.4382 3.70991C13.459 3.70991 13.4758 3.72671 13.4758 3.74743" stroke="#068373" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <transition name="fade" mode="in-out">
      <div v-if="showModal" class="modal fade" :class="{ show: showModal }" :style="{ display: showModal ? 'block' : 'none' }">
        <div class="modal-dialog" role="dialog">
          <div class="modal-content">
            <div class="modal-header" style="border-bottom: none; height: 20px;">
              <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close" style="margin-top: -40px; margin-right: -40px;">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div v-if="historic.length > 0" class="timeline">
                <div class="box">
                  <div class="container">
                    <div class="lines-proposal">
                      <!-- <div class="dot"></div>
                      <div class="line"></div> -->
                      <div v-for="(i) in historic" :key="i">
                        <div class="dot"></div>
                        <div class="line"></div>
                      </div>
                    </div>
                    <div class="cards-proposal">
                      <div v-for="(proposal, index) in historic" :key="index" class="card-proposal">
                        <h4>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.001 7H18.646C19.946 7 21 8.054 21 9.355V9.355C21 10.136 20.613 10.866 19.967 11.304C18.628 12.212 16.229 13.838 14.243 15.184C12.888 16.103 11.111 16.102 9.756 15.184C7.83 13.879 5.388 12.223 4.03 11.303C3.384 10.864 3 10.136 3 9.355V9.355C3 8.054 4.054 7 5.355 7H7" stroke="#13CF9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3 9.355V18C3 19.657 4.343 21 6 21H18C19.657 21 21 19.657 21 18V9.355" stroke="#13CF9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.555 6.222L11.61 8.167L10.443 7" stroke="#13CF9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.274 7.813L7.938 8.682L8.082 9.763C8.162 10.363 8.633 10.835 9.233 10.915L10.317 11.06L11.185 11.724C11.665 12.091 12.332 12.091 12.812 11.724L13.681 11.06H13.68L14.762 10.916C15.362 10.836 15.834 10.365 15.914 9.765L16.059 8.681C16.059 8.682 16.395 8.242 16.723 7.813C17.09 7.333 17.09 6.666 16.723 6.186L16.059 5.317L15.915 4.236C15.835 3.636 15.364 3.164 14.764 3.084L13.68 2.939L12.812 2.275C12.332 1.908 11.665 1.908 11.185 2.275L10.316 2.939H10.317L9.234 3.083C8.634 3.163 8.162 3.634 8.082 4.234L7.938 5.318C7.938 5.317 7.602 5.757 7.274 6.186C6.907 6.667 6.907 7.333 7.274 7.813Z" stroke="#13CF9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>Plano {{ proposal.plan}}</span>
                        </h4>
                        <p><strong>Cliente: </strong>{{ proposal.client }}</p>
                        <p><strong>Preço mensal:</strong> R$  {{ proposal.monthlyPrice }}</p>
                        <p><strong>Preço por cliente:</strong> R$  {{ proposal.priceClient }}</p>
                        <p><strong>Economia de tempo estimada</strong> {{ proposal.hoursSaved }} horas</p>
                        <p class="time">{{moment(proposal.date).format('DD/MM/YYYY HH:mm:ss')}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else >
                <div class="not-found-container">
                  <div class="not-found-text">
                    <h5>Nenhuma proposta comercial foi enviada para este cliente até o momento.</h5>
                  </div>
                  <svg width="473" height="462" viewBox="0 0 473 462" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.15" clip-path="url(#clip0_795_1351)">
                    <path d="M300.28 103.902H172.827C169.922 103.906 167.138 105.062 165.084 107.117C163.03 109.172 161.875 111.958 161.871 114.864V398.31L160.411 398.756L129.145 408.337C127.663 408.789 126.062 408.634 124.694 407.906C123.326 407.179 122.303 405.938 121.849 404.456L28.8458 100.475C28.3932 98.992 28.5474 97.3901 29.2746 96.0211C30.0019 94.6521 31.2425 93.628 32.724 93.174L80.9052 78.4116L220.584 35.6298L268.765 20.8674C269.498 20.6416 270.269 20.5627 271.033 20.6352C271.796 20.7077 272.538 20.9303 273.216 21.29C273.894 21.6498 274.494 22.1397 274.982 22.7319C275.47 23.324 275.837 24.0066 276.062 24.7407L299.834 102.441L300.28 103.902Z" fill="#F2F2F2"/>
                    <path d="M328.092 102.441L299.44 8.79462C298.963 7.2343 298.184 5.78326 297.147 4.52442C296.109 3.26558 294.834 2.22361 293.395 1.45805C291.955 0.692498 290.378 0.218351 288.755 0.0627254C287.132 -0.0929 285.494 0.0730458 283.935 0.551063L216.195 21.2988L76.5235 64.0878L8.78364 84.8429C5.63681 85.8098 3.00192 87.9865 1.45734 90.8954C-0.087247 93.8042 -0.415338 97.2074 0.545093 100.358L98.4702 420.402C99.2505 422.946 100.825 425.172 102.962 426.754C105.099 428.336 107.687 429.191 110.346 429.194C111.576 429.195 112.8 429.01 113.976 428.646L160.411 414.424L161.872 413.971V412.444L160.411 412.89L113.545 427.25C110.767 428.097 107.767 427.808 105.203 426.444C102.638 425.081 100.719 422.756 99.8653 419.979L1.94766 99.9269C1.52486 98.5507 1.3775 97.1045 1.51402 95.6713C1.65054 94.2381 2.06825 92.8458 2.74325 91.5743C3.41825 90.3029 4.33729 89.1771 5.44771 88.2616C6.55813 87.346 7.83812 86.6586 9.21441 86.2387L76.9542 65.4837L216.626 22.702L284.366 1.94693C285.41 1.62815 286.495 1.46561 287.587 1.46459C289.929 1.46985 292.208 2.22548 294.09 3.62079C295.972 5.01611 297.358 6.97779 298.045 9.2185L326.565 102.441L327.018 103.902H328.537L328.092 102.441Z" fill="#3F3D56"/>
                    <path d="M89.5998 93.4129C88.1921 93.4119 86.8218 92.9595 85.6899 92.1221C84.558 91.2848 83.7241 90.1064 83.3105 88.76L73.9034 58.0135C73.6506 57.1876 73.5629 56.32 73.6452 55.4601C73.7276 54.6003 73.9784 53.7651 74.3834 53.0023C74.7884 52.2395 75.3396 51.564 76.0055 51.0144C76.6714 50.4647 77.439 50.0518 78.2644 49.799L206.761 10.4347C208.428 9.92575 210.229 10.0993 211.768 10.9174C213.307 11.7355 214.459 13.1312 214.971 14.7982L224.378 45.5451C224.886 47.2131 224.713 49.0147 223.895 50.5548C223.078 52.0948 221.683 53.2475 220.017 53.7599L91.5202 93.1242C90.8979 93.3153 90.2507 93.4126 89.5998 93.4129Z" fill="#1BA38E"/>
                    <path d="M138.878 32.8534C146.946 32.8534 153.485 26.3095 153.485 18.2371C153.485 10.1648 146.946 3.62091 138.878 3.62091C130.811 3.62091 124.271 10.1648 124.271 18.2371C124.271 26.3095 130.811 32.8534 138.878 32.8534Z" fill="#1BA38E"/>
                    <path d="M138.878 27.4926C143.987 27.4926 148.128 23.3488 148.128 18.2371C148.128 13.1255 143.987 8.98169 138.878 8.98169C133.77 8.98169 129.629 13.1255 129.629 18.2371C129.629 23.3488 133.77 27.4926 138.878 27.4926Z" fill="white"/>
                    <path d="M440.135 425.459H193.277C191.631 425.458 190.053 424.802 188.889 423.638C187.725 422.473 187.071 420.894 187.069 419.247V123.269C187.071 121.622 187.725 120.043 188.889 118.878C190.053 117.714 191.631 117.059 193.277 117.057H440.135C441.78 117.059 443.358 117.714 444.522 118.878C445.686 120.043 446.341 121.622 446.342 123.269V419.247C446.341 420.894 445.686 422.473 444.522 423.638C443.358 424.802 441.78 425.457 440.135 425.459Z" fill="#E6E6E6"/>
                    <path d="M326.565 102.441H172.827C169.536 102.445 166.38 103.756 164.053 106.085C161.725 108.414 160.416 111.571 160.411 114.864V412.889L161.872 412.444V114.864C161.875 111.958 163.031 109.172 165.084 107.117C167.138 105.062 169.923 103.906 172.827 103.902H327.018L326.565 102.441ZM460.584 102.441H172.827C169.536 102.445 166.38 103.756 164.053 106.085C161.725 108.414 160.416 111.571 160.411 114.864V449.576C160.416 452.87 161.725 456.027 164.053 458.356C166.38 460.685 169.536 461.995 172.827 462H460.584C463.876 461.995 467.031 460.685 469.359 458.356C471.686 456.027 472.996 452.87 473 449.576V114.864C472.996 111.571 471.686 108.414 469.359 106.085C467.031 103.756 463.876 102.445 460.584 102.441ZM471.539 449.576C471.536 452.482 470.381 455.269 468.327 457.324C466.273 459.379 463.489 460.535 460.584 460.538H172.827C169.923 460.535 167.138 459.379 165.084 457.324C163.031 455.269 161.875 452.482 161.872 449.576V114.864C161.875 111.958 163.031 109.172 165.084 107.117C167.138 105.062 169.923 103.906 172.827 103.902H460.584C463.489 103.906 466.273 105.062 468.327 107.117C470.381 109.172 471.536 111.958 471.539 114.864V449.576Z" fill="#3F3D56"/>
                    <path d="M383.898 134.596H249.514C247.771 134.594 246.1 133.901 244.868 132.668C243.636 131.435 242.942 129.763 242.94 128.019V95.8634C242.942 94.1196 243.636 92.4477 244.868 91.2147C246.1 89.9816 247.771 89.288 249.514 89.2861H383.898C385.64 89.288 387.311 89.9816 388.543 91.2147C389.776 92.4477 390.469 94.1196 390.471 95.8634V128.019C390.469 129.763 389.776 131.435 388.543 132.668C387.311 133.901 385.64 134.594 383.898 134.596Z" fill="#1BA38E"/>
                    <path d="M316.706 91.4785C324.773 91.4785 331.313 84.9346 331.313 76.8623C331.313 68.7899 324.773 62.246 316.706 62.246C308.638 62.246 302.099 68.7899 302.099 76.8623C302.099 84.9346 308.638 91.4785 316.706 91.4785Z" fill="#1BA38E"/>
                    <path d="M316.706 85.7649C321.619 85.7649 325.603 81.779 325.603 76.8622C325.603 71.9454 321.619 67.9596 316.706 67.9596C311.792 67.9596 307.809 71.9454 307.809 76.8622C307.809 81.779 311.792 85.7649 316.706 85.7649Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_795_1351">
                    <rect width="473" height="462" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </div>
                <!-- <div class="svg-container">
                  <svg width="473" height="462" viewBox="0 0 473 462" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.15" clip-path="url(#clip0_795_1351)">
                    <path d="M300.28 103.902H172.827C169.922 103.906 167.138 105.062 165.084 107.117C163.03 109.172 161.875 111.958 161.871 114.864V398.31L160.411 398.756L129.145 408.337C127.663 408.789 126.062 408.634 124.694 407.906C123.326 407.179 122.303 405.938 121.849 404.456L28.8458 100.475C28.3932 98.992 28.5474 97.3901 29.2746 96.0211C30.0019 94.6521 31.2425 93.628 32.724 93.174L80.9052 78.4116L220.584 35.6298L268.765 20.8674C269.498 20.6416 270.269 20.5627 271.033 20.6352C271.796 20.7077 272.538 20.9303 273.216 21.29C273.894 21.6498 274.494 22.1397 274.982 22.7319C275.47 23.324 275.837 24.0066 276.062 24.7407L299.834 102.441L300.28 103.902Z" fill="#F2F2F2"/>
                    <path d="M328.092 102.441L299.44 8.79462C298.963 7.2343 298.184 5.78326 297.147 4.52442C296.109 3.26558 294.834 2.22361 293.395 1.45805C291.955 0.692498 290.378 0.218351 288.755 0.0627254C287.132 -0.0929 285.494 0.0730458 283.935 0.551063L216.195 21.2988L76.5235 64.0878L8.78364 84.8429C5.63681 85.8098 3.00192 87.9865 1.45734 90.8954C-0.087247 93.8042 -0.415338 97.2074 0.545093 100.358L98.4702 420.402C99.2505 422.946 100.825 425.172 102.962 426.754C105.099 428.336 107.687 429.191 110.346 429.194C111.576 429.195 112.8 429.01 113.976 428.646L160.411 414.424L161.872 413.971V412.444L160.411 412.89L113.545 427.25C110.767 428.097 107.767 427.808 105.203 426.444C102.638 425.081 100.719 422.756 99.8653 419.979L1.94766 99.9269C1.52486 98.5507 1.3775 97.1045 1.51402 95.6713C1.65054 94.2381 2.06825 92.8458 2.74325 91.5743C3.41825 90.3029 4.33729 89.1771 5.44771 88.2616C6.55813 87.346 7.83812 86.6586 9.21441 86.2387L76.9542 65.4837L216.626 22.702L284.366 1.94693C285.41 1.62815 286.495 1.46561 287.587 1.46459C289.929 1.46985 292.208 2.22548 294.09 3.62079C295.972 5.01611 297.358 6.97779 298.045 9.2185L326.565 102.441L327.018 103.902H328.537L328.092 102.441Z" fill="#3F3D56"/>
                    <path d="M89.5998 93.4129C88.1921 93.4119 86.8218 92.9595 85.6899 92.1221C84.558 91.2848 83.7241 90.1064 83.3105 88.76L73.9034 58.0135C73.6506 57.1876 73.5629 56.32 73.6452 55.4601C73.7276 54.6003 73.9784 53.7651 74.3834 53.0023C74.7884 52.2395 75.3396 51.564 76.0055 51.0144C76.6714 50.4647 77.439 50.0518 78.2644 49.799L206.761 10.4347C208.428 9.92575 210.229 10.0993 211.768 10.9174C213.307 11.7355 214.459 13.1312 214.971 14.7982L224.378 45.5451C224.886 47.2131 224.713 49.0147 223.895 50.5548C223.078 52.0948 221.683 53.2475 220.017 53.7599L91.5202 93.1242C90.8979 93.3153 90.2507 93.4126 89.5998 93.4129Z" fill="#1BA38E"/>
                    <path d="M138.878 32.8534C146.946 32.8534 153.485 26.3095 153.485 18.2371C153.485 10.1648 146.946 3.62091 138.878 3.62091C130.811 3.62091 124.271 10.1648 124.271 18.2371C124.271 26.3095 130.811 32.8534 138.878 32.8534Z" fill="#1BA38E"/>
                    <path d="M138.878 27.4926C143.987 27.4926 148.128 23.3488 148.128 18.2371C148.128 13.1255 143.987 8.98169 138.878 8.98169C133.77 8.98169 129.629 13.1255 129.629 18.2371C129.629 23.3488 133.77 27.4926 138.878 27.4926Z" fill="white"/>
                    <path d="M440.135 425.459H193.277C191.631 425.458 190.053 424.802 188.889 423.638C187.725 422.473 187.071 420.894 187.069 419.247V123.269C187.071 121.622 187.725 120.043 188.889 118.878C190.053 117.714 191.631 117.059 193.277 117.057H440.135C441.78 117.059 443.358 117.714 444.522 118.878C445.686 120.043 446.341 121.622 446.342 123.269V419.247C446.341 420.894 445.686 422.473 444.522 423.638C443.358 424.802 441.78 425.457 440.135 425.459Z" fill="#E6E6E6"/>
                    <path d="M326.565 102.441H172.827C169.536 102.445 166.38 103.756 164.053 106.085C161.725 108.414 160.416 111.571 160.411 114.864V412.889L161.872 412.444V114.864C161.875 111.958 163.031 109.172 165.084 107.117C167.138 105.062 169.923 103.906 172.827 103.902H327.018L326.565 102.441ZM460.584 102.441H172.827C169.536 102.445 166.38 103.756 164.053 106.085C161.725 108.414 160.416 111.571 160.411 114.864V449.576C160.416 452.87 161.725 456.027 164.053 458.356C166.38 460.685 169.536 461.995 172.827 462H460.584C463.876 461.995 467.031 460.685 469.359 458.356C471.686 456.027 472.996 452.87 473 449.576V114.864C472.996 111.571 471.686 108.414 469.359 106.085C467.031 103.756 463.876 102.445 460.584 102.441ZM471.539 449.576C471.536 452.482 470.381 455.269 468.327 457.324C466.273 459.379 463.489 460.535 460.584 460.538H172.827C169.923 460.535 167.138 459.379 165.084 457.324C163.031 455.269 161.875 452.482 161.872 449.576V114.864C161.875 111.958 163.031 109.172 165.084 107.117C167.138 105.062 169.923 103.906 172.827 103.902H460.584C463.489 103.906 466.273 105.062 468.327 107.117C470.381 109.172 471.536 111.958 471.539 114.864V449.576Z" fill="#3F3D56"/>
                    <path d="M383.898 134.596H249.514C247.771 134.594 246.1 133.901 244.868 132.668C243.636 131.435 242.942 129.763 242.94 128.019V95.8634C242.942 94.1196 243.636 92.4477 244.868 91.2147C246.1 89.9816 247.771 89.288 249.514 89.2861H383.898C385.64 89.288 387.311 89.9816 388.543 91.2147C389.776 92.4477 390.469 94.1196 390.471 95.8634V128.019C390.469 129.763 389.776 131.435 388.543 132.668C387.311 133.901 385.64 134.594 383.898 134.596Z" fill="#1BA38E"/>
                    <path d="M316.706 91.4785C324.773 91.4785 331.313 84.9346 331.313 76.8623C331.313 68.7899 324.773 62.246 316.706 62.246C308.638 62.246 302.099 68.7899 302.099 76.8623C302.099 84.9346 308.638 91.4785 316.706 91.4785Z" fill="#1BA38E"/>
                    <path d="M316.706 85.7649C321.619 85.7649 325.603 81.779 325.603 76.8622C325.603 71.9454 321.619 67.9596 316.706 67.9596C311.792 67.9596 307.809 71.9454 307.809 76.8622C307.809 81.779 311.792 85.7649 316.706 85.7649Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_795_1351">
                    <rect width="473" height="462" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade" style="opacity: 0.1;" :class="{show: showModal}" @click="closeModal()" :style="{ display: showModal ? 'block' : 'none' }"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['updated'],
  data: () => ({
    historic: [],
    selectedCustomer: {},
    inbox: {},
    showModal: false,
    loading: false,
    status: {
      info: '',
      color: ''
    }
  }),
  methods: {
    openModal () {
      this.showModal = true
      if (this.updated.length > 0) {
        this.historic = this.updated
      } else {
        this.$firebase.database().ref(`support/messageHistoric/${window.uid}/comercialPropose`).once('value', snapshot => {
          let values = snapshot.val()
          if (values) {
            values = Object.keys(values).map(i => values[i])
            this.historic = values
            this.$emit('checkSend', this.historic)
            console.log(this.historic)
          }
        })
      }
    },
    closeModal () {
      this.showModal = false
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
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #d1d1d1;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #c1c1c1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 15px;
      font-weight: 500;
      // color: rgb(6, 131, 115, 0.8);
      color: #5b5d6b;
    }
    .btn-action {
      color: var(--featured);
      background: rgba(6, 131, 115, 0.1);
      border: 2px solid rgb(6, 131, 115, 0.5);
      border-radius: 9px !important;
      padding: 0px 20px;

      &:disabled{
        color: var(--gray) !important;
        background: rgba(52, 58, 64, .075) !important;
        border: 2px solid rgba(52, 58, 64, .075);
      }
      &.loading {
        padding: 0px 22px;

        svg {
          margin-bottom: 1px;
        }
      }
    }
}
.modal-content {
    width: 605px;
    height: 900px;
    margin-top: -10px;
    padding: 20px 30px 20px 30px !important;
    background-color: #E9F4F2;
    outline: 2px solid #0dce9a;
    border-radius: 8px !important;
    .modal-body {
      height: 100%;
      padding: 0px !important;
      overflow-y: scroll;

      .timeline{
        min-height:570px;
        border-radius: 10px;
        h5{
          font-size: 14px;
        }
        h4{
          font-weight: 700;
          font-size: 19px;
        }
        h3{
          font-family: Open Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 22px;
          line-height: 30px;
          color: #FFFFFF;
          margin-left:66px;
          margin-top:40px;
        }
        label{
          font-size: 16px;
          line-height: 22px;
          /* identical to box height */
          margin-left:66px;
          margin-top:10px;
          color: #FFFFFF;
        }
        .box{
          margin-top:60px;
          .container{
            height:357px;
            display:flex;

            .lines-proposal {
              margin-left: 5px;
              margin-right: 15px;
              margin-top: 0px;
              .dot{
                width:14px;
                height:14px;
                background: rgba(19, 207, 154, .7);
                border-radius:7px;
              }
              .line{
                height: 160px !important;
                width:2px;
                background: rgba(19, 207, 154, .18);
                margin-left:6px;
              }
            }
            .cards-proposal {
              margin-left:12px;
              transform:translateY(-50px);
              .card-proposal {
                width:450px;
                height:165px;
                padding-top: 15px;
                padding-bottom: 15px;
                background: #FFFFFF;
                box-shadow:0 2px 2px 0  #eeeeee40;
                border-radius: 10px;
                box-shadow: 5px 5px 5px 1px #DDF1EE;
                margin-bottom:10px;
                h4{
                  font-style: normal;
                  font-weight: bold;
                  font-size: 14px;
                  line-height: 19px;
                  margin-left:25px;
                  margin-bottom:5px;
                  color: #2B2862;
                  span{
                    font-size: 13px;
                    background: rgba(19, 207, 154, .7);
                    border-radius: 4px;
                    color: white;
                    padding: 3px 9px;
                    margin-bottom: 5px;
                  }
                  i{
                    font-size: 22px;
                    color: rgba(19, 207, 154, .7);
                    border-radius: 4px;
                    margin-right: 6px;
                    transform: translate(0, 3px);
                  }
                  svg{
                    font-size: 22px;
                    border-radius: 4px;
                    margin-right: 6px;
                    // transform: translate(0, 3px);
                  }
                }
                p{
                  font-weight: 300;
                  font-size: 12.8px;
                  line-height: 22px;
                  color: rgb(64, 66, 82, 0.9);
                  font-weight: 500;
                  margin-left:25px;
                  margin-bottom: 0;
                }
                .time{
                  font-weight: 400;
                  color: #9496a1;
                  font-size: 12px;
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
      .not-found-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;
        justify-content: flex-end;
        margin-top: 150px;

        .not-found-text {
          text-align: center;
          display: flex;
          flex-direction: column !important;
          padding: 0;
          gap: 5px;
          .links {
            display: flex;
            flex-direction: column;

            span {
              color: #5B5D6B;
              font-weight: 500;
            }
            a {
              color: #1BA38E;
              font-weight: 500;
              text-decoration: underline;
            }

          }
        }
      }
    }
  }
</style>
