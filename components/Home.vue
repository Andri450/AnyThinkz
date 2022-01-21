<template>
  <div>
    <p>Hallo</p>
    <client-only>
      <vue-editor
        v-model="status.isi"
        class="mention-input__input-item-container relative"
        :editor-toolbar="customToolbar"
        :editor-options="d_editorOptions"
      />
      <button @click="kirim()">
        Kirim
      </button>
      <button v-if="refresh" @click="refresh_halaman()">
        {{ isi_refresh }}
      </button>
      <p>{{ status.penulis }}</p>
    </client-only>
    <div>
      <table>
        <thead>
          <tr>
            <td>Status: </td>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="data in ShowDats" :id="data.key" :key="data.key" class="s p-10 mb-20">
            <td>
              <!-- eslint-disable vue/no-v-html -->
              <p v-html="data.isi" />
              <!--eslint-enable-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  data () {
    return {
      refresh: false,
      isi_refresh: '',
      status: {
        isi: '',
        penulis: ''
      },
      customToolbar: [
        ['bold', 'italic', 'underline', 'color', 'link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' }
        ],
        [{ color: [] }]
      ],
      ShowDats: [],
      NewDats: [],
      filter_kata: [],
      at_mention: []
    }
  },
  computed: {
    d_editorOptions () {
      const { DatValues } = this
      return {
        theme: 'snow',
        modules: {
          toolbar: this.customToolbar,
          mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ['@'],
            // onSelect (item, insertItem) {
            //   const a = "<a href='#'>"
            //   const b = '</a>'

            //   item.value = a + item.value + b
            //   console.log(item)
            //   insertItem(item)
            // },
            source (searchTerm, renderList) {
              const values = DatValues

              if (searchTerm.length === 0) {
                renderList(values, searchTerm)
              } else {
                const matches = []
                for (let i = 0; i < values.length; i++) {
                  if (
                    ~values[i].value
                      .toLowerCase()
                      .indexOf(searchTerm.toLowerCase())
                  ) { matches.push(values[i]) }
                }
                renderList(matches, searchTerm)
              }
            }
          }
        }
      }
    },
    DatValues () {
      return this.at_mention
    }
  },
  watch: {
    // 'status.isi': {
    //   handler (baru, lama) {
    //     alert()
    //   }
    // },
    NewDats: {
      handler (baru, lama) {
        const jumlah = baru.length - this.ShowDats.length
        this.isi_refresh = jumlah + ' status baru'
        if (jumlah > 0) {
          this.refresh = true
        } else {
          this.refresh = false
        }
      }
    }
  },
  created () {
    const status = this.$fireModule.database().ref('tb_status')
    const FilterKata = this.$fireModule.database().ref('filter_kata')
    const AtMention = this.$fireModule.database().ref('at_mention')

    status.on('value', this.fetch_status, this.err)
    FilterKata.on('value', this.fetch_filter_kata, this.err)
    AtMention.on('value', this.fetch_At_Mention, this.err)
  },
  mounted () {
    if (window) {
      if (localStorage.id) {
        this.status.penulis = localStorage.id
      }
    }
  },
  methods: {
    refresh_halaman () {
      this.ShowDats = this.NewDats
      this.refresh = false
    },
    fetch_status (items) {
      this.NewDats = []
      items.forEach((item) => {
        if (item.val().isi.search('<p>') >= 0 && item.val().isi.search('</p>') >= 0) {
          this.NewDats.push(
            {
              key: item.key,
              isi: item.val().isi
            }
          )
        }
      })
      if (this.ShowDats.length === 0) {
        this.refresh_halaman()
      }
    },
    fetch_filter_kata (hsl) {
      hsl.forEach((item) => {
        this.filter_kata.push(item.val().isi)
      })
    },
    fetch_At_Mention (hsl) {
      hsl.forEach((item, id) => {
        this.at_mention.push({
          id,
          value: item.val().isi
        })
      })
    },
    kirim () {
      const awal = '<p> '
      const akhir = ' </p>'
      this.status.isi = awal + this.status.isi + akhir
      const banned = []
      this.filter_kata.forEach((item) => {
        banned.push(item)
      })
      for (let i = 0; i < banned.length; i++) {
        const regEx = new RegExp(banned[i], 'ig')
        this.status.isi = this.status.isi.replace(regEx, banned[i][0] + '🗿'.repeat(banned[i].length - 1))
      }
      if (this.status.isi.search('<p>') >= 0 && this.status.isi.search('</p>') >= 0) {
        const status = this.$fireModule.database().ref('tb_status')
        status.push(this.status)
        this.status.isi = ''
        this.refresh_halaman()
      } else {
        this.status.isi = ''
        alert('XSS???')
      }
    }
  }
}

</script>

<style>
.ql-mention-list{
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.ql-mention-list-container {
  width: 270px;
  height: 200px;
  overflow-y: auto;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(30, 30, 30, 0.08);
  z-index: 9001;
}
.ql-mention-list-item{
  cursor: pointer;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  padding: 0 20px;
  vertical-align: middle;
}
.ql-mention-list-item.selected{
  background-color: #96b3c7;
  color: whitesmoke;
  text-decoration: none;
}
.mention {
  background-color: #96b3c7;
  color: whitesmoke;
  padding: 5px;
  border-radius: 4px;
}
.mention > a{
  color: whitesmoke;
}
</style>
