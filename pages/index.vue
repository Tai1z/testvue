<template>
  <div class="qwe">
    <v-container>
      <v-card
        class="pa-4 card"
        outlined
        max-width="400px"
      >
        <h2>Форма авторизации:</h2>
        <p>(по умолчанию стоит тестовый логин и пароль)</p>
        <br>
        <v-form v-if="!submitted" v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="fields.login"
            label="Логин"
            :rules="[rules.required, rules.login]"

          ></v-text-field>
          <v-text-field
            v-model="fields.password"
            label="Пароль"
            type="password"
            :rules="[rules.required, rules.password]"

          ></v-text-field>
          <v-btn class="mr-4" color="#3654d6" :disabled="!valid" type="submit">Войти</v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        valid: false,
        submitted: false,
        fields: {
          login: 'user3',
          password: 'pass12345',
        },
        rules: {
          required: v => v !== '' || 'required',
          login: (value) => {
            const pattern = /^([A-Za-zА-Яа-я0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g;
            return pattern.test(value) || 'error login';
          },
          password: (value) => {
            const pattern = /^([A-Za-z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g;
            return pattern.test(value) || 'error password';
          },
        },
      };
    },
    methods: {
      submit () {
        const logged = {
          username: this.fields.login,
          password: this.fields.password,
        }

        this.$axios.post('https://evaluation.omd.ru/test/user/token/', { username: this.fields.login, password: this.fields.password })
        .then(response => {
            document.cookie = `access_token=${response.data.token}`;
            this.$router.push({ path: '/tables' });
        })
        .catch(error => {
            console.log(error);
            console.log('error 3 ' + error);
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
.qwe{
  & h1{
    color: #000000;
  }
  .card{
    margin: auto;
    padding: 10px;
  }
  ::v-deep{
    .v-btn{
      & .v-btn__content{
        color: #ffffff;
      }
    }
  }
}
</style>
