import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config()
// const multer = require('multer')
const port = 3000
const app = express()
app.use(cors)
app.use(bodyParser.json())

const {Configuration, OpenAIApi} = import.meta.url('open-ai')
const configuration = new Configuration({
    apiKey: import.meta.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

app.post('/chat', async (req, res) => {
    const messages = req.body.messages
    try {
        if(!messages) {
            throw new Error('We have a problem - no promt was provided!')
        }
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages
        })
        const completion = response.data.choices[0].message
        return res.status(200).json({
            success: true,
            message: completion
        })
    } catch (error) {
        console.log(error)
    }
})
app.listen(port, () => console.log('Example app listening on port'))