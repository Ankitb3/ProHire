import supabaseClient, { supabaseUrl } from "../utils/superbase";

export async function applyToJob(token,_,jobData){
    const supbase = await supabaseClient(token);
    const random = Math.floor(Math.random() * 90000);
    const fileName = `resume- ${random} - ${jobData.candidate_id}`
   const {error:storageError} = await supbase.storage.from('resumes').upload(fileName,jobData.resume);
    if(storageError){
        console.log("Error uploading resume",error);
        return null
    }
    const resume =  `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`

     const {data,error} = await supbase.from('applications')
     .insert([{
        ...jobData,resume
     }]).select()
     if(error){
         console.log("Error submitting application",error);
         return null
}
return data
}