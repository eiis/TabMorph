<script setup lang="ts">

import { Ref, ref } from 'vue';

import {tabs} from './type'

const bookMarks: Ref<tabs[]> = ref([])

chrome.tabs.query({
  currentWindow: true
}).then((tabs) => {
    console.log(tabs,'tabs');
    bookMarks.value = tabs as tabs[];
})

function bookMark(e: tabs){
  // 更新标签页的活动状态
  chrome.tabs.update(e.id, {active: true})
}

function onRemoved() {
  console.log(`Removed`);
}

function onError(error:Error) {
  console.log(`Error: ${error}`);
}

function deleteTab(e: tabs,event:MouseEvent){
  console.log(e.id,'e');
  event.stopPropagation();
  let removing = chrome.tabs.remove(e.id);
  removing.then(onRemoved, onError);
  bookMarks.value = bookMarks.value.filter(item => item.id !== e.id);
  console.log(bookMarks.value, 'bookMarks');
}

</script>

<template>
  <div class="w-[480px] px-4 grid grid-cols-3 gap-2 bg-slate-200">
    <div v-for="item in bookMarks" @click="bookMark(item)" :key="item.id" :class="{'bg-orange-500': item.active}" class="group/item relative h-[42px] my-2 rounded-lg flex items-center justify-center bg-[#F1F1F1] p-[6px] text-center">
      <img class="w-[18px] h-[18px] mr-1" :src="item.favIconUrl">
      <span class="truncate w-[80px]">{{ item.title }}</span>
      <span class="group/edit invisible hover:bg-slate-200 group-hover/item:visible" @click="deleteTab(item,$event)">
        <span class="absolute top-0 right-0 group-hover/edit:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </span>
      </span>
    </div>
  </div>
</template>
