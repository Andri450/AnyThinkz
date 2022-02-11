<template>
  <div>
    <div class="komponen-tulis-sts">
      <b-row>
        <b-col cols="12">
          <vue-editor
            v-model="status.isi"
            class="mention-input__input-item-container relative quill"
            :editor-options="d_editorOptions"
            placeholder="ceritakan semuanya disini tanpa perlu takut identitasmu diketahui oleh publik..."
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-button class="w-100 btn-tulis-sts" @click="kirim">
            Posting
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import app from '@/assets/js/sub_js/TulisStatus.js'
export default app
</script>
