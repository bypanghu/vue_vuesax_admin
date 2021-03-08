<template>
  <div class="login-container">
    <div class="login_form">
      <div class="title webfont">欢迎登陆后台管理系统</div>
      <div class="title_detail">
        使用
        <span
          class="title_detail_type"
          :class="[loginType == 0 ? 'active' : '']"
          @click="changeIcon(0)"
          >验证码登录</span
        >
        |
        <span
          class="title_detail_type"
          :class="[loginType == 1 ? 'active' : '']"
          @click="changeIcon(1)"
          >APP扫码登录</span
        >
      </div>

      <div class="login_form_item" v-if="loginType == 0">
        <vs-input
          v-validate="'required|mobile'"
          name="mobile"
          data-vv-validate-on="blur"
          icon="icon icon-phone"
          icon-pack="feather"
          label-placeholder="手机号"
          v-model="phone"
          class="w-full no-icon-border"
        >
        </vs-input>
         <span class="text-danger text-sm">{{ errors.first("mobile")}}</span> 

        <div class="login__type_item">
          <div class="login__type_input">
            <vs-input
              data-vv-validate-on="blur"
              v-validate="'required|length:4'"
              name="message"
              icon="icon icon-message-circle"
              icon-pack="feather"
              label-placeholder="验证码"
              v-model="message"
              class="w-full mt-6 no-icon-border"
              style="width: 60%"
            />

            <span class="text-danger text-sm">{{ errors.first("message")}}</span>
          </div>
          <div class="login__type_time">
            <vs-button flat> 获取验证码 </vs-button>
          </div>
        </div>
        <vs-button
          flat
          class="login__form_submit"
          :disabled="!validateForm"
          @click="login"
        >
          登录
        </vs-button>
      </div>

      <div class="login_scan" v-if="loginType == 1">
        <vue-qr
          :text="qrdata"
          :margin="0"
          :size="200"
        ></vue-qr>
        <div class="qrstatus" v-if="qrType == 0">
             <feather-icon icon="CheckIcon" class="p-3 inline-flex rounded-full  checkScan" >
             </feather-icon>
             
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueQr from "vue-qr";
import {getQRData , qrLogin} from '@/api/user'
import {Validator} from 'vee-validate';
Validator.extend('mobile', {
    messages: {
      zh_CN:  '必须是11位手机号码',
    },
    validate: value => {
      return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});
export default {
  data() {
    return {
      phone: "18221111111",
      message: "1234",
      loginType: 0,
      qrdata: '',
      redirect :'',
      qrType : 1
    };
  },
  components: {
    vueQr,
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.message != "" && this.phone != "";
    },
  },
  created(){
      this.getQRcode()
       window.setInterval(() => {
         if(this.qrcode != '' && this.loginType == 1){
            this.hasLogin()
         }
        
      }, 3000)
  },
  
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
    },
  },
  methods: {
    //轮询接口判断是否扫描
    hasLogin(){
      let code = JSON.parse(this.qrdata).params.code
       qrLogin({
          code  
        }).then(res=>{
          if(res.code == 510){ //代表二维码已过期，需要重新获取
            this.getQRcode()
          }
        })
    },
    getQRcode(){
      getQRData().then(res=>{
        console.log(res.data)
          this.qrdata =JSON.stringify(res.data)
        })
    },
    isRequired(value) {
      return value ? true : '这个是必填项';
    },
    changeIcon(item) {
      this.loginType = item;
    },
    login() {
      const userInfo={
        phone : this.phone,
        message : this.message
      }
       this.$store.dispatch("user/login", userInfo)
       .then(res=>{
         if(res.code == 1200){
            this.$vs.notify({
              color:'success',
              title: '提示',
              text: res.message
            })
           this.$router.push({ path: this.redirect || "/" });
         }else{
           this.$vs.notify({
              color:'danger',
              title: '错误',
              text: res.message
            })
         }
        
       })
    }
  },
};
</script>

<style lang="scss">
$dark_gray: #ccc;
$light_gray: #333;
$login_theme: #00aaee;
.login-container {
  width: 100vw;
  height: 100vh;
  background-image: url("../../../assets/login/login_bg.png");
  background-size: cover;

  .login_form {
    width: 400px;
    height: 400px;
    z-index: 999;
    position: absolute;
    top: 220px;
    right: 300px;
    padding: 20px;

    .title {
      margin: 0;
      font-size: 32px;
      font-weight: 600;
      color: #27386f;
      line-height: 24px;
      margin-bottom: 10px;
    }
    .title_detail {
      margin: 20px 0;
      border-left: 4px solid rgb(115, 103, 240);
      padding-left: 10px;
      color: #000;
      .title_detail_type {
        height: 30px;
        padding: 10px 0;
        &.active {
          color: rgb(115, 103, 240);
          border-bottom: 3px solid rgb(115, 103, 240);
        }
      }
    }
    .login__type_name {
      padding: 17px 0 !important;
      line-height: 24px;
      font-size: 16px;
    }
    .login__type_change {
      width: 400px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .login__type {
        width: 200px;
        display: flex;
        align-items: center;

        .login__type_title {
          width: 80px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background-color: #ccc;
        }
      }
      .login_icon {
        font-size: 40px;
      }
    }
    .login_form_item {
      margin: 40px 0;
    }
    .submit-btn {
      width: 160px;
      height: 50px;
      background: #4f7afd;
      border-radius: 38px;
      margin-top: 7px;
      font-size: 20px;
      color: #fff;
    }
    .login_scan {
      margin: 20px;
      padding: 20px;
    }

    .login__type_item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .login__type_input {
        width: 60%;
      }
      .login__type_time {
        width: 40%;
        height: 15px;
        margin: 0 20px;
      }
    }
  }
}
.sub_num {
  color: rgb(37, 36, 36);
  font-weight: 450;
  padding: 20px;
  margin: 15px;
  background-color: #00aaee;
}
.login__form_submit {
  width: 120px;
  margin: 20px 0;
}
.qrstatus{
  width: 210px;
  height: 210px;
  background-color: rgba(229, 226, 226, 0.205);
   backdrop-filter:blur(20px) ;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -210px;
  left: -5px;
  .checkScan{
    width: 60px;
    height: 60px;
    background-color: rgb(61, 209, 31);
    color: #fff;
    display: flex;
    justify-content: center;
  }
}
</style>
