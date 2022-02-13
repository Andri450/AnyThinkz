export default {
  name: 'TulisStatus',
  data () {
    return {
      nama: '',
      status: {
        isi: '',
        penulis: '',
        CreatedAt: ''
      },
      customToolbar: [
        ['bold', 'italic', 'underline', 'color', 'link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [
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
  created () {
    const FilterKata = this.$fireModule.database().ref('filter_kata')
    const AtMention = this.$fireModule.database().ref('at_mention')
    FilterKata.on('value', this.fetch_filter_kata, this.err)
    AtMention.on('value', this.fetch_At_Mention, this.err)
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
      return this.at_mention
    }
  },
  mounted () {
    if (window) {
      if (localStorage.id) {
        this.status.penulis = localStorage.id
      }
    }
  },
  updated () {
    // console.log('update tulis')
  },
  methods: {
    pindah () {
      this.$store.commit('updateKomponenAtas', 'SearchStatus')
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
        this.status.isi = this.status.isi.replace(regEx, banned[i][0] + '*'.repeat(banned[i].length - 1))
      }
      if (this.status.isi.search('<p>') >= 0 && this.status.isi.search('</p>') >= 0) {
        this.status.CreatedAt = 0 - new Date().getTime()
        const status = this.$fireModule.database().ref('tb_status')
        status.push(this.status)
        this.status.isi = ''
        // this.refresh_halaman()
      } else {
        this.status.isi = ''
        alert('XSS???')
      }
    }
  }
}
