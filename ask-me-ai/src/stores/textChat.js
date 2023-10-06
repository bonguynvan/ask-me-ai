import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTextChatStore = defineStore('textChat', () => {
  // state properties
  const text = ref('') // text we want openai to analyze
  const question = ref('') // question we want to ask openai about the text
  const prompt = ref([]) // prompt built as messages array
  const gptResponse = ref('') // response from openai
  //actions
  function createPrompt() {}
  function sendPrompt() {}
  function clearChat() {}

  return { text, question, prompt, gptResponse, createPrompt, sendPrompt, clearChat }
})
