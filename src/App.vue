<template>
  <div>
  <main class="container">
    <h1>Создайте баннер вашей мечты!</h1>
    <article class="configurator">
      <section class="configurator-background">
        <h2>Начнем с выбора фона</h2>
        <div class="configurator-wrapper-first">
          <div class="link-wrapper" v-bind:class="{ active: this.$route.name === 'ImgBackground' }" v-on:click="activateImg"><router-link to="/" exact>Ссылка на картинку</router-link></div>
          <div class="link-wrapper" v-bind:class="{ active: this.$route.name === 'ColorBackground' }" v-on:click="activateColor"><router-link to="/1">Выбор цвета для заливки</router-link></div>
        </div>
        <component @submit='chooseBackground' :is="layout">
          <router-view />
        </component>                      
      </section>
      <div class="configurator-wrapper-second">
        <ConfiguratorSize @setWidth='setWidth' @setHeight='setHeight'/>
        <ConfiguratorWords @setColorText='setColorText' @setText='setText'/>
      </div>
    </article>
    <article class="banner-result">
      <h2>Превью баннера</h2>
      <section class="banner-result__view">
        <div class="banner-result__final" ref="html" style="border-radius: 20px; position: relative; background-position: 0% 0%; background-repeat: no-repeat; background-size: cover !important;" v-bind:style="{background: color, width: width+'px', height: height+'px'}">
          <a v-bind:href="link" style="display: block; position: absolute; width: 100%; height: 100%; z-index: 99999;"></a>
          <img class="banner-result__background" style=" border-radius: 20px; width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%;">
          <div class="banner-result__text" style="font-family: Arial; width: 80%; text-align: left; display: block; word-break: normal; word-wrap: break-word; position: absolute; bottom: 10%; font-size: 33px; margin-left: 38px; margin-right: 38px; line-height: 42px;" v-bind:style="{color: colorText}">
            <h3 class="banner-result__title">{{header}}</h3>
            <h4 class="banner-result__subtitle" style="margin-top: 4%; text-decoration: none; font-size: 23px; line-height: 29px; font-weight: 300;">{{text}}</h4>
          </div>
        </div>
      </section>
      <input type="text" v-model.trim="link" class="banner-result__link" placeholder="Добавтье ссылку для перехода при клике на баннер">
      <BannerSaver @saveBanner="saveBanner"/>
    </article>  
    <div id="tableBanner">  </div>
    <div class="avito-magic-button" @click="makeGood">
      <span>Форматировать по стандартам</span>
      <img src="@/assets/img/logo.png">
    </div>
    <Popup v-show="showModal"
        :popupTitle="popupTitle"
        @closePopup="closeModal"
    />
  </main>
  </div>
</template>

<script>

  import BackgroundImage from '@/components/background-image';
  import BackgroundColor from '@/components/background-color';
  import ConfiguratorSize from '@/components/configurator-size';
  import ConfiguratorWords from '@/components/configurator-words';
  import BannerSaver from '@/components/banner-saver'
  import Popup from '@/components/popup'
  import domtoimage from 'dom-to-image';
  import { saveAs } from 'file-saver';

  export default {
    data: () => ({
      paramsJSON:'',
      isActive: true,
      copyData: '',
      header:'',
      text:'',
      width: 282,
      height: 376,
      color:'white',
      colorText:'',
      link:'',
      backgroundLink:'',
      showModal: false,
      popupTitle:''
    }),
    computed: {
      layout() {
        return 'Background' + (this.$route.meta.layout || "Image")
      },
    },
    mounted() {
      this.$router.push('/')
    },
    components: {
        BackgroundImage, BackgroundColor, ConfiguratorSize, ConfiguratorWords, BannerSaver, Popup
      },
    methods: {
      saveBanner(data) {
        if(data === 'png') {
          domtoimage.toBlob(document.querySelector('.banner-result__final'))
          .then(function (blob) {
            window.saveAs(blob, 'my-banner.png');
          });
        } else if (data === 'html') {
          document.querySelector('.banner-result__background').src = this.backgroundLink;
          this.copyData = this.$refs.html.cloneNode(true).outerHTML;
          navigator.clipboard.writeText(this.copyData);
          console.log(this.copyData);
        } else {
          this.copyData = {
          "header": this.header,
          "text": this.text,
          "width": this.width,
          "height": this.height,
          "color": this.color,
          "colorText": this.colorText,
          "link:": this.link
          }
          this.copyData = JSON.stringify(this.copyData);
          navigator.clipboard.writeText(this.copyData);
          console.log(this.copyData)
        }
      },
      makeGood() {
        this.height = 828;
        this.width = 552;
        this.header ='Возьмите меня на стажировку';
        this.text    = 'И вы не пожалеете :)';
        let img = document.querySelector('.banner-result__background');
        img.style.display = 'none';
        this.chooseBackground(require('./assets/img/page.jpg'));
        this.colorText = 'black';
        },
      activateImg() {
        this.isActive = true;
        if (this.$route.meta.layout == 'Color') {
      this.$router.push('/')
        }
      },
      activateColor() {
        this.isActive = false;
        if (this.$route.meta.layout == 'Img') {
          this.$router.push('/1')
        }
      },
      setText(data) {
        this.header = data[0];
        this.text = data[1];
      },
      setColorText(data) {
        this.colorText = data
      },
      chooseBackground(data) {
        if (this.$route.meta.layout == 'Color' && data.length <= 9) {
          let tagImg = document.querySelector('.banner-result__background');
          tagImg.style.display = 'none';
          this.color = data;
        } else {
          let backgroundColor = document.querySelector('.banner-result__final');
          backgroundColor.style.background = 'white';

          this.backgroundLink = data;

          this.color = data;
          let canvas = document.createElement('CANVAS');
          let img = document.createElement('img');
          let context = canvas.getContext('2d');
          img.src = this.color;

          img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            img.setAttribute('crossorigin', 'anonymous');
            context.drawImage(img, 0, 0);

            let base64 = canvas.toDataURL('image/png');

            localStorage.setItem('imageIdCached', base64);
            let dataImage = localStorage.getItem('imageIdCached');
            let bannerImg = document.getElementById('tableBanner');
            bannerImg.src = dataImage;

            this.color = bannerImg.src;
            document.querySelector('.banner-result__background').style.display = 'block';
            document.querySelector('.banner-result__background').src = this.color;
            // this.color = 'url(' + data + ')'
          }
          img.onerror = (e) => {
            console.log(e.path[0].crossOrigin)
            if (e.path[0].crossOrigin) {
              this.openModal('Выбранное изображение защищено протоколом CORS и не может быть использовано в качестве фона')
            } else {
              this.openModal('Ссылка недействительна')
            }
          }
        }
      },
      openModal(content) {
        this.popupTitle = content
        this.showModal = true
      },
      closeModal() {
        this.showModal = false
      },
      setWidth(data) {
        if(data === 'minus') {
          this.width = this.width - 10
        } else {
          this.width = this.width + 10
        }
      },
      setHeight(data) {
        if (data ==='minus') {
          this.height = this.height - 10
        } else {
          this.height = this.height + 10
        }
      }
    }   
  }

</script>

<style lang="scss">
</style>


