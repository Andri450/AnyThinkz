<template>
  <div>
    <p>Hallo</p>
    <client-only>
      <vue-editor
        v-model="status.isi"
        :editor-toolbar="customToolbar"
      />
    </client-only>
    <button @click="kirim()">
      Kirim
    </button>
    <div v-for="data in dats" :key="data.key" class="p-10">
      <p v-html="data.isi" />
    </div>
    <!-- <textarea v-model="isi" rows="4" cols="100%" /> -->
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  data () {
    return {
      status: {
        isi: ''
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
      dats: []
    }
  },
  created () {
    const status = this.$fireModule.database().ref('tb_status')
    console.log(status)
    status.on('value', this.resultdata, this.err)
  },
  beforeMount () {
    // const status = this.$fireModule.database.ref('tb_status')

    // status.on('value', this.dats)
  },
  methods: {
    resultdata (items) {
      this.user = []
      // console.log(items);
      this.dats = items.val()
      // items.forEach((item) => {
      //   this.dats = item.val()
      // })
    },
    kirim () {
      const status = this.$fireModule.database().ref('tb_status')
      status.push(this.status)
    }
  }
}

</script>
