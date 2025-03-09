<template>
  <div class="main">
    <div class="login-box">
      <v-card flat>
        <v-card-title color="#2a3f47">
          <v-toolbar>
            <v-toolbar-title>
              <span class="text-h4">塔里木河流域河流湖泊信息系统</span>
            </v-toolbar-title>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-text-field variant="outlined" compact v-model="user.name">
            <template #prepend>
              <span>用户：</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" compact v-model="pwd.pwd" type="password">
            <template #prepend>
              <span>密码：</span>
            </template>
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <a href="">忘记密码？</a>
          <v-spacer></v-spacer>
          <v-btn color="indigo-darken-3" variant="flat" @click="login"
            >登录</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const user = reactive({ name: "" });
const pwd = reactive({ pwd: "" });
const login = () => {
  if (user.name === "root") {
    if (pwd.pwd === "123456") {
      localStorage.setItem("token", "token");
      router.push('/home')
    }
  }
};
</script>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  position: relative;
  background-image: url("../../assets/images/user-bg.jpg");
  background-size: cover;
}
.login-box {
  width: 30vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
