<template>
  <div class="my-2">
    <div class="flex">
      <span class="flex justify-center items-center mr-2 mt-2 rounded-full bg-white min-w-10 w-10 h-10 uppercase">
        {{ props.commenData.by }}
      </span>
      <div class="w-full">
        <textarea rows="3" v-if="showEdit" v-model="editComment"
          class="flex min-h-10 px-1 shadow border border-black rounded w-full text-gray-700" type="text"></textarea>
        <div v-else class="flex flex-col p-2 rounded-lg bg-white/50">
          <small class="font-bold">
            {{ author }}
          </small>
          <span>
            {{ props.commenData.comment }}
          </span>
        </div>
        <div class="flex items-center">
          <small class="px-2">
            {{ formatDate(props.commenData.date) }}
          </small>
          <div v-if="showEdit">
            <button @click="onUpdateComment(editComment)" class="underline font-bold py-1 px-1 rounded">Update</button>
            <button @click="showEdit = false" class="underline font-bold py-1 px-1 rounded">Cancel</button>
          </div>
          <template v-else>
            <button @click="onEditComment()" class="underline font-bold py-1 px-1 rounded">Edit</button>
            <button @click="onDeleteComment()" class="underline font-bold py-1 px-1 rounded">Delete</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { CommentInterface } from "@/interfaces/Comment";
import { ref, type PropType } from "vue"

const showEdit = ref(false)
const editComment = ref("")

const emit = defineEmits(['onUpdateComment', 'onDeleteComment'])
const props = defineProps({
  commenData: {
    type: Object as PropType<CommentInterface>,
    required: true
  },
  author: {
    type: String,
    required: true
  }
})

const onEditComment = () => {
  editComment.value = props.commenData.comment;
  showEdit.value = true
}

const formatDate = (date: string) => {
  return new Date(date).toDateString()
}

const onDeleteComment = () => {
  emit('onDeleteComment')
}

const onUpdateComment = (comment: string) => {
  emit('onUpdateComment', comment)
  showEdit.value = false
}
</script>

<style></style>