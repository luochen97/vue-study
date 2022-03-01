<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
     <p @click="$store.commit('add')">{{$store.state.counter}}</p>
     <p @click="$store.dispatch('add')">async: {{$store.state.counter}}</p>
     <p>getters: {{$store.getters.doubleCounter}}</p>
     <button @click="jumpPage">跳转页面</button>
     <nForm ref="form" :model="formData" :rules="rules">
      <nFormItem label="用户名：" prop="userName">
        <n-input v-model="formData.userName" title="sfdsdf" placeholder="阿瑟费说的过房东说" @blur="blurEvent"/> {{input}}
      </nFormItem>
      <nFormItem>
        <button @click="validate">校验</button>
      </nFormItem>
     </nForm>
     
    <!-- <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">async:{{ $store.state.counter }}</p> -->
    <!-- <p>{{ $store.getters.doubleCounter }}</p> -->
    <router-view />
  </div>
</template>
<script>
import nInput from './components/nform/nInput/nInput.vue'
export default {
  components: { nInput },
  name: 'App',
  data() {
    return {
      num: 1,
      input: '',
      formData: {
        userName: ''
      },
      rules: {
        userName: [
          {
            required: true, message: '用户名为必填项！'
          },{
            validator: this.validateUser
          }
        ]
      }
    }
  },
  computed: {
    doubleNum() {
      return this.num * 2
    }
  },
  methods: {
    validateUser(rule,value,callBack) {
      if(!/^\d*$/.test(value)) {
        callBack('用户名必须为数字')
        return
      }
      callBack()
    },
    validate() {
      this.$refs.form.validate(isValidate => {
        if(isValidate) {
          console.log('sumbit success')
        } else {
          console.log('sumbit error')
        }
      })
    },
    jumpPage() {
      this.$router.push({
        path: '/about/info'
      })
    },
    blurEvent() {
      console.log(this.input)
    }
  },
  mounted() {
    this.$message({
      dangerouslyUseHTMLString: true,
      showClose: true,
      message: '<p style="color:#f00;">提示框可以显示么</p>'
    })
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
