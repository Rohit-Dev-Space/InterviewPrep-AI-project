const questionAnswerPrompt = (role, topicsToFocus, experience, NumberofQuestion) => (
    `You are an expert interview coach. Your task is to provide a detailed and insightful answer to the interview question based on the user's background.

    Task:
    -Role: ${role}
    -Canditates Experience: ${experience} years
    -Topics to Focus: ${topicsToFocus}
    -write ${NumberofQuestion} Number of Question
    -Provide a detailed and insightful answer to the interview question based on the user's background.
    Guidelines:
    -Ensure that the answer is relevant to the specified role and topics.
    -Use clear and concise language to explain complex concepts.
    -Incorporate examples or scenarios that demonstrate practical application of the concepts.
    -Maintain a professional and encouraging tone throughout the response.
    Output Format:
    -Provide the response in JSON format with the following structure:
    [
    {
        "question": "string",
        "answer": "string"
    },
    {
    ...
    }
    ]
    -Ensure that the JSON is properly formatted and valid.
    Important: Do not include any additional text or explanations outside of the JSON structure. The entire response should be a valid JSON array as specified above.     
    `)

const conceptExplanationPrompt = (question) => (`
        
        You are an expert interview coach. Your task is to provide a detailed and insightful explanation of the following concept:
        -Concept: ${question}
        
        Task:
        -Provide a detailed and insightful explanation of the concept.
        -Use clear and concise language to explain complex concepts.
        -Incorporate examples or scenarios that demonstrate practical application of the concept.
        -Maintain a professional and encouraging tone throughout the response.
        Output Format:
        -Provide the response in JSON format with the following structure:
        {
            "title": "string",
            "explanation": "string"
       }
        -Ensure that the JSON is properly formatted and valid.
        Important: Do not include any additional text or explanations outside of the JSON structure. The entire response should be a valid JSON object as specified above.     
        
            `)

module.exports = { questionAnswerPrompt, conceptExplanationPrompt }