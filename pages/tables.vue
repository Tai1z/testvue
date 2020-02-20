<template>
  <div data-app>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
    @click:row="rowClick"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Таблица</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Создать</v-btn>
          </template>
          <v-card>
            <v-form v-model="valid">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.unit" label="Unit" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reach1" label="reach%1" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reach2" label="reach%2" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reach3" label="reach%3" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reach4" label="reach%4" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reach5" label="reach%5" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reach6" label="reach%6" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reach7" label="reach%7" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reach8" label="reach%8" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reach9" label="reach%9" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.reach10" label="reach%10" :rules="[rules.required, rules.int]"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" :disabled="!valid" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <h1>
        Данных нет
      </h1>
    </template>
  </v-data-table>
  <v-container>
    <v-row>
      <h3>График:</h3>
    </v-row>
    <v-row v-if="!value[0]">
      <p>для отображения графика кликните на строку в таблице.</p>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-sparkline
          :value="value"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
          class="grap"
          auto-draw
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
  export default {
    data() {
      return {

        width: 1,
        radius: 10,
        padding: 8,
        lineCap: 'round',
        gradient: gradients[5],
        value: [],
        gradientDirection: 'top',
        gradients,
        fill: true,
        type: 'trend',
        autoLineWidth: false,


        dialog: false,
        valid: false,
        headers: [
          {
            text: 'Unit',
            align: 'left',
            sortable: false,
            value: 'unit',
          },
          { text: 'reach%1', value: 'reach1' },
          { text: 'reach%2', value: 'reach2' },
          { text: 'reach%3', value: 'reach3' },
          { text: 'reach%4', value: 'reach4', sortable: false },
          { text: 'reach%5', value: 'reach5', sortable: false },
          { text: 'reach%6', value: 'reach6', sortable: false },
          { text: 'reach%7', value: 'reach7', sortable: false },
          { text: 'reach%8', value: 'reach8', sortable: false },
          { text: 'reach%9', value: 'reach9', sortable: false },
          { text: 'reach%10', value: 'reach10', sortable: false },
          { text: 'Actions', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          unit: '',
          reach1: 0,
          reach2: 0,
          reach3: 0,
          reach4: 0,
          reach5: 0,
          reach6: 0,
          reach7: 0,
          reach8: 0,
          reach9: 0,
          reach10: 0,
        },
        defaultItem: {
          unit: '',
          reach1: 0,
          reach2: 0,
          reach3: 0,
          reach4: 0,
          reach5: 0,
          reach6: 0,
          reach7: 0,
          reach8: 0,
          reach9: 0,
          reach10: 0,
        },
        json: [],
        jsend: [],
        rules: {
          required: v => v !== '' || 'required',
          int: (value) => {
            const pattern = /^([0-9.\s]*)$/g;
            return pattern.test(value) || 'Только цифры';
          },
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      randomColor() {
        return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.desserts = []
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Вы уверены что хотите удалить строку?') && this.desserts.splice(index, 1)
        this.sendData();
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (
          parseFloat(this.editedItem.reach1) > parseFloat(this.editedItem.reach2) && parseFloat(this.editedItem.reach2) > parseFloat(this.editedItem.reach3) &&
          parseFloat(this.editedItem.reach3) > parseFloat(this.editedItem.reach4) && parseFloat(this.editedItem.reach4) > parseFloat(this.editedItem.reach5) &&
          parseFloat(this.editedItem.reach5) > parseFloat(this.editedItem.reach6) && parseFloat(this.editedItem.reach6) > parseFloat(this.editedItem.reach7) &&
          parseFloat(this.editedItem.reach7) > parseFloat(this.editedItem.reach8) && parseFloat(this.editedItem.reach8) > parseFloat(this.editedItem.reach9) &&
          parseFloat(this.editedItem.reach9) > parseFloat(this.editedItem.reach10)
        ) {
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
          } else {
            this.desserts.push(this.editedItem)
          }
          this.close();
          this.sendData();
        }else{
          alert("Данные в столбцах reach должны идти в порядке убывания!!");
        }
      },

      getData() {
        const name = 'access_token';
        const matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        this.$axios.get('https://evaluation.omd.ru/test/data/', { 'headers': { 'Authorization': 'JWT ' + matches[1] } })
        .then(response => {
            this.json = response.data;
            for (var item in this.json) {
              if (this.json.hasOwnProperty(item)) { // если есть данные
                const unit = this.json[item].unit;
                const reach = this.json[item].reach;
                var arr = {
                  'unit': unit
                };
                for (var i = 0; i < reach.length; i++) {
                  arr[`reach${i+1}`] = `${reach[i]}`;
                }
                this.desserts.push(arr);
              }
            }

        })
        .catch(error => {
            console.log(error);
            for (var item in this.json) {
              if (this.json.hasOwnProperty(item)) { // если есть данные
                const unit = this.json[item].unit;
                const reach = this.json[item].reach;
                var arr = {
                  'unit': unit
                };
                for (var i = 0; i < reach.length; i++) {
                  arr[`reach${i+1}`] = `${reach[i]}`;
                }
                this.desserts.push(arr);
              }
            }
        })
      },

      sendData() {
        const name = 'access_token';
        const matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        const desserts = this.desserts;
        let jsend = [];
        for (let i in desserts) {
          var arr = {
            'unit': desserts[i].unit,
            'reach': [ desserts[i].reach1, desserts[i].reach2, desserts[i].reach3, desserts[i].reach4, desserts[i].reach5, desserts[i].reach6, desserts[i].reach7, desserts[i].reach8, desserts[i].reach9, desserts[i].reach10 ],
          };
          jsend.push(arr);
        }
        this.$axios.post('https://evaluation.omd.ru/test/data/', jsend, { 'headers': { 'Authorization': 'JWT ' + matches[1] } })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
      },

      rowClick(value) {
        const val = [ parseFloat(value.reach1), parseFloat(value.reach2), parseFloat(value.reach3), parseFloat(value.reach4), parseFloat(value.reach5), parseFloat(value.reach6), parseFloat(value.reach7), parseFloat(value.reach8), parseFloat(value.reach9), parseFloat(value.reach10) ]
        this.value = val;
      },

    },
    mounted() {
     this.getData();
     // this.sendData();
   },
  }
</script>




<style lang="scss" scoped>
.grap{
  // position: absolute;
  // left: 0;
  // top: 0;
}
</style>
