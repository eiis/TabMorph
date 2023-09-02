<script setup lang="ts">
import { Ref, ref, onMounted } from 'vue';

// import { tabType } from './type'

const bookMarks: Ref<chrome.tabs.Tab[]> = ref([])

// const container = ref<HTMLElement | null>(null);

const tabInnerText = ref('')

let icons = 'icons/fugui.png'

onMounted(async () => {
  const res = await chrome.tabs.query({
    currentWindow: true
  })
  bookMarks.value = res;

  // await nextTick()
  // container.value = document.getElementById('tab');
})

function bookMark(e: chrome.tabs.Tab) {
  // 更新标签页的活动状态
  //@ts-ignore
  chrome.tabs.update(e.id, { active: true })
}

function onRemoved() {
  console.log(`Removed`);
}

function onError(error: Error) {
  console.log(`Error: ${error}`);
}

function deleteTab(e: chrome.tabs.Tab, event: MouseEvent) {
  event.stopPropagation();
  //@ts-ignore
  let removing = chrome.tabs.remove(e.id);
  removing.then(onRemoved, onError);
  bookMarks.value = bookMarks.value.filter(item => item.id !== e.id);
}

function addTab() {
  chrome.tabs.create({ active: true })
}

//进入元素
function mouseenter(e:MouseEvent) {
  const hiddenText = document.getElementById('hidden-tab') as HTMLElement;
  const targetElement = e.target as HTMLElement;
  tabInnerText.value = targetElement.innerText;
  if (hiddenText) {
    hiddenText.classList.remove('invisible');
  }
}
//离开元素
function mouseleave() {
  const hiddenText = document.getElementById('hidden-tab') as HTMLElement;
  if (hiddenText) {
    hiddenText.classList.add('invisible');
  }
}

</script>

<template>
  <div class="w-[480px] relative p-4 grid col-auto grid-cols-3 gap-2">
    <span id="hidden-tab" class="w-full truncate absolute top-[-4px] left-0 text-base text-orange-500 font-medium invisible text-center">{{ tabInnerText }}</span>
    <div v-for="item in bookMarks" 
        @click="bookMark(item)" 
        :key="item.id" 
        id="tab" 
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
        class="group/item relative h-[42px] my-2 rounded-lg flex items-center justify-center bg-[#F1F1F1] p-[6px] text-center"
        :class="{ 'bg-orange-500': item.active }"
      >
      <img class="w-[18px] h-[18px] mr-1" :src="item.favIconUrl ? item.favIconUrl : icons">
      <span class="truncate w-[80px]">{{ item.title }}</span>
      <span class="group/edit invisible group-hover/item:visible" @click="deleteTab(item, $event)">
        <span class="absolute top-0 right-0 group-hover/edit:text-gray-700">
          <svg class="w-6 h-6 group-hover/edit:text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </span>
      </span>
    </div>
  </div>
  <div class="flex items-center justify-center hover:text-sky-400" @click="addTab">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  </div>
</template>

<style scoped>
</style>
