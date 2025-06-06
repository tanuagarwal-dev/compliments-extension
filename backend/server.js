import express from 'express'
import { CohereClient } from 'cohere-ai';
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());



const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// app.post('/compliment', async(req,res)=>{
//     try{
//         const prompt = `give me a sweet, light, fun compliment in one sentence for a user.`
//         const response = await cohere.generate({
//             model: 'command-r-plus',
//             prompt,
//             max_tokens: 30,
//             temperature: 0.7,
//         })

//         const compliment = response.generations[0].text.trim();
//         console.log(compliment)
//         res.json({
//             compliment
//         })
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({
//             error: "failed to generate compliment"
//         })
//     }
// })


function buildPrompt(mood) {
  switch (mood) {
    case 'flirty':
      return "Generate a creative, flirty, one-line compliment from an AI to a human user. It should include programming or tech references (like coding, extensions, console logs, etc.) and feel sweet, clever, and lighthearted. Add an emoji if it fits.";
    case 'compliment':
      return "Give me a sweet, light, and fun one-sentence compliment for a user. Add an emoji if it fits.";
    case 'jokes':
      return "Tell me a clean, light-hearted one-sentence joke. Add an emoji if it fits.";
    case 'gratitude':
      return "Give me a warm, one-sentence message of gratitude for life that will make user feel positive. Add an emoji if it fits.";
    case 'prayer':
      return "Give me a comforting and positive one-sentence prayer or blessing. Add an emoji if it fits.";
    case 'motivation':
      return "Give me a comforting and motivating one-sentence message for the user. Add an emoji if it fits.";
    default:
      return "Give me a sweet, light, and fun one-sentence compliment for a user. Add an emoji if it fits.";
  }
}
app.post('/compliment-mood', async(req, res)=>{
    
    try{
        // console.log("yoyo", req.body)
        const {mood} = req.body;
        const prompt = buildPrompt(mood);

        const response = await cohere.generate({
            model: 'command-r-plus',
            prompt,
            max_tokens: 100,
            temperature: 0.7,
        })

        const compliment = response.generations[0].text.trim();
        console.log(compliment)
        res.json({
            compliment
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            error: "failed to generate compliment"
        })
    }
})

app.post('/alarm', async(req, res)=>{
     try{
        const prompt = `Generate a creative, flirty, one-line compliment from an AI to a human user. It should include programming or tech references (like coding, extensions, console logs, etc.) and feel sweet, clever, and lighthearted. Add an emoji if it fits.`;

        const response = await cohere.generate({
            model: 'command-r-plus',
            prompt,
            max_tokens: 100,
            temperature: 0.7,
        })

        const compliment = response.generations[0].text.trim();
        console.log(compliment)
        res.json({
            compliment
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            error: "failed to generate compliment"
        })
    }
})

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})