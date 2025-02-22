import { GoogleGenerativeAI } from "@google/generative-ai";

export default  function getModel(){
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_GEMINI_API_KEY)
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
}