<template>
  <div class="flex">
    <input v-model="editComment" @keyup.enter="createComment"
      class="mr-2 h-10 px-1 shadow border rounded w-full text-gray-700  focus:outline-none focus:shadow-outline"
      type="text">
    <button :disabled="!editComment" @click="createComment" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded
                disabled:bg-gray-400 disabled:hover:bg-gray-400">Comment</button>
  </div>
</template>

<script setup lang='ts'>
import { ref, defineEmits } from "vue"
const editComment = ref("")

const props = defineProps({
  topicIndex: Number
})

const emit = defineEmits(["createComment"])

const createComment = () => {
  emit('createComment', props.topicIndex, editComment.value)
  editComment.value = ""
}

</script>

<style></style>