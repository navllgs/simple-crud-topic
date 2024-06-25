<template>
  <div class="p-2 flex justify-between w-full">
    <div class="flex justify-between w-full items-center" v-if="showEdit">
      <input v-model="editTopic"
        class="h-10 px-1 shadow border rounded w-full text-gray-700  focus:outline-none focus:shadow-outline"
        type="text">
      <button @click="onUpdateTopic(editTopic)" class=" text-green-500 font-bold py-1 px-1 rounded">Update</button>
      <button @click="showEdit = false" class=" text-gray-500 font-bold py-1 px-1 rounded">Cancel</button>
    </div>
    <div class="flex justify-between w-full items-center" v-else>
      <div class="font-bold text-lg capitalize">
        {{ topic.name }}
      </div>
      <div>
        <button @click="onItemEdit()" class=" text-blue-500 font-bold py-1 px-1 rounded">Edit</button>
        <button @click="deleteTopic(topic.guid)" class=" text-red-500 font-bold py-1 px-1 rounded">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { TopicInterface } from "@/interfaces/Topic";
import { ref, type PropType } from "vue"

const showEdit = ref(false)
const editTopic = ref("")

const props = defineProps({
  topic: {
    type: Object as PropType<TopicInterface>,
    required: true
  },
})

const emit = defineEmits(['onUpdateTopic', 'onDeleteTopic'])

const onItemEdit = () => {
  editTopic.value = props.topic.name;
  showEdit.value = true
}

const onUpdateTopic = (topic: string) => {
  const data = { ...props.topic, name: topic };
  emit('onUpdateTopic', data)
  showEdit.value = false
}

const deleteTopic = (guid: string) => {
  emit('onDeleteTopic', guid)
}

</script>

<style></style>