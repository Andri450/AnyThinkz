<template>
  <div>
    <div class="tulis_status">
      <vue-editor
        v-model="status.isi"
        class="mention-input__input-item-container relative"
        :editor-options="d_editorOptions"
      />
      <button @click="kirim">
        Kirim
      </button>

      <p>{{ status.penulis }}</p>

      <button @click="pindah">
        pindah
      </button>
    </div>
  </div>
</template>

<script>
import app from '@/assets/js/sub_js/TulisStatus.js'
export default app
</script>
