import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTextChatStore = defineStore('textChat', () => {
  // state properties
  const text = ref('') // text we want openai to analyze
  const question = ref('') // question we want to ask openai about the text
  const prompt = ref([]) // prompt built as messages array
  const gptResponse = ref('') // response from openai
  //actions
  function createPrompt() {
    // prompt items
    const instructions = {
      role: 'system',
      content: 'You will answer the question about the following text.'
    }
    const textToAnalyze = {
      role: 'user',
      content: text.value
    }
    const chatQuestion = {
      role: 'user',
      content: question.value
    }
    prompt.value.push(instructions)
    prompt.value.push(textToAnalyze)
    prompt.value.push(chatQuestion)
  }
  function sendPrompt() {
    if(text.value.length === 0) {
      alert('You have not added any text to analyze.')
    } else {
      fetch('http://localhost:3000/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: prompt.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( res => res.json()).then(data => gptResponse.value = data.message.content)
    }
  }
  function clearChat() {
    text.value = ''
    question.value = ''
    prompt.value = ''
    gptResponse.value = ''
  }

  return { text, question, prompt, gptResponse, createPrompt, sendPrompt, clearChat }
})
