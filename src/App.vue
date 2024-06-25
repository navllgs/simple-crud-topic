<template>
  <div class="p-4">
    <div class="flex py-2 items-center">
      <textarea rows="3" v-model="topicText" placeholder="Topic"
        class="mr-2 px-1 shadow border rounded w-full text-gray-700  focus:outline-none focus:shadow-outline"
        type="text"></textarea>
      <button :disabled="!topicText" @click="createTopic" class="h-10 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded
         disabled:bg-gray-400 disabled:hover:bg-gray-400">Create</button>
    </div>
    <div>
      <table>
        <div class="bg-gray-500 text-white flex">
          <div class="font-bold text-left p-2 flex-none w-full">Topics</div>
        </div>
        <div v-for="(item, i) in dataPagination" class="flex flex-wrap mb-4"
          :class="[i % 2 ? 'bg-gray-500/20' : 'bg-gray-300']" :key="item.guid">
          <TopicsContainer :topic="item" @onUpdateTopic="onUpdateTopic" @onDeleteTopic="deleteTopic" />
          <div class="flex-1 border border-gray-500/20 p-1">
            <div class="flex justify-between items-center pl-1">
              <span>
                Comments:
              </span>
            </div>
            <div class="text-center py-2" v-if="!item.comments.length">
              No Comments Available
            </div>
            <div v-for="commenData, j in item.comments" :key="j" class="pl-4">
              <CommentItem :commenData="commenData" :author="fetchUserName(commenData.by)"
                @onDeleteComment="onDeleteComment(i, j)"
                @onUpdateComment="(data) => onUpdateComment(i, j, data, commenData.by)" />
            </div>
            <div class="p-4">
              <CommentContainer :topicIndex="i" @createComment="createComment" />
            </div>
          </div>
        </div>
      </table>
      <div v-if="isLoadMoreVisible" class="flex justify-center w-full">
        <button @click="loadMore" class="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded
        disabled:bg-gray-400 disabled:hover:bg-gray-400">Load More</button>
      </div>
      <div class="flex justify-center my-2">
        <small>{{ paginationText }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dataJson from "@/json/data.json";
import { ref, computed } from "vue"
import type { PersonInterface } from "./interfaces/Person";
import type { TopicInterface } from "./interfaces/Topic";
import type { EditCommentInterface } from "./interfaces/Comment";
import CommentContainer from "@/components/CommentContainer.vue"
import TopicsContainer from "./components/TopicsContainer.vue";
import CommentItem from "./components/CommentItem.vue";

const fullTopics = ref<TopicInterface[]>(dataJson.topics)
const fullPersons = ref<PersonInterface[]>(dataJson.persons)
const editComment = ref<EditCommentInterface>({ comment: "" })
const topicText = ref("")

const page = ref(1)
const perPage = ref(20)
const loadMore = () => {
  page.value++
}
const isLoadMoreVisible = computed(() => {
  return page.value * perPage.value < fullTopics.value.length
})
const dataPagination = computed({
  get() {
    return fullTopics.value.slice(0, page.value * perPage.value)
  },
  set(val) {
    dataJson.topics = val
  }
})
const paginationText = computed(() => {
  const displayValue = Math.min(page.value * perPage.value, fullTopics.value.length);
  return `Displaying ${displayValue} out of ${fullTopics.value.length} topics`
})

const editData = ref<TopicInterface>({
  guid: "",
  name: "",
  comments: []
})

const onItemEdit = (item: TopicInterface) => {
  editData.value = item
}

const createTopic = () => {
  let item = { guid: new Date().getTime() + "", name: topicText.value, comments: [] }
  fullTopics.value.unshift(item)
  topicText.value = ""
}

const onUpdateTopic = (topic: TopicInterface) => {
  const index = fullTopics.value.findIndex(item => item.guid == topic.guid);
  fullTopics.value.splice(index, 1, topic)
  editData.value = {
    guid: "",
    name: "",
    comments: []
  }
}

const deleteTopic = (id: string) => {
  const index = fullTopics.value.findIndex(item => item.guid == id);
  fullTopics.value.splice(index, 1)
}

const createComment = (index: number, comment: string) => {
  let commentObj = {
    by: "jm",
    comment,
    date: new Date().toDateString()
  }
  fullTopics.value[index].comments.push(commentObj)
}

const onEditComment = (topicIndex: number, commentIndex: number, comment: string) => {
  editComment.value.topicIndex = topicIndex
  editComment.value.commentIndex = commentIndex
  editComment.value.comment = comment
}

const onUpdateComment = (topicIndex: number, commentIndex: number, comment: string, commentBy: string) => {
  let commentObj = {
    by: commentBy,
    comment,
    date: new Date().toDateString()
  }
  fullTopics.value[topicIndex].comments.splice(commentIndex, 1, commentObj)
  editComment.value = {
    comment: ""
  }
}

const onDeleteComment = (topicIndex: number, commentIndex: number) => {
  fullTopics.value[topicIndex].comments.splice(commentIndex, 1)
}

const formatDate = (date: string) => {
  return new Date(date).toDateString()
}

const fetchUserName = (guid: string) => {
  const person = fullPersons.value.find(person => person.guid === guid);
  if (!person) return guid;

  return `${person.first} ${person.last}`;
}
</script>

<style scoped></style>
