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
    </client-only>
    <div>
      <div v-for="data in ShowDats" :id="data.key" :key="data.key" class="s p-10 mb-20">
        <div class="a">
          <!-- eslint-disable vue/no-v-html -->
          <p v-html="data.isi" />
          <!--eslint-enable-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  data () {
    return {
      refresh: false,
      isi_refresh: '',
      status: {
        isi: ''
      },
      atValues: [
        { id: 1, value: 'Fredrik Sundqvist' },
        { id: 2, value: 'Patrik Sjölin' }
      ],
      hashValues: [
        { id: 3, value: 'Fredrik Sundqvist 2' },
        { id: 4, value: 'Patrik Sjölin 2' }
      ],
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
      filter_kata: []
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
      return [
        { id: 1, value: 'SMKN 8 Bandar Lampung' },
        { id: 2, value: 'ITERA' },
        { id: 3, value: 'Polinela' },
        { id: 4, value: 'SMA 9 Bandar Lampung' }
      ]
    }
  },
  watch: {
    // 'status.isi': {
    //   handler (baru, lama) {
    //     console.log(baru)
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

    status.on('value', this.fetch_status, this.err)
    FilterKata.on('value', this.fetch_filter_kata, this.err)
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
        this.status.isi = this.status.isi.replace(regEx, banned[i][0] + '*'.repeat(banned[i].length - 1))
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
  background-color: tomato;
  padding: 10px;
}
.ql-mention-list-item{
  background-color: turquoise;
  list-style: none;
}
.ql-mention-list-item > .selected{
  background-color: violet;
}
</style>
