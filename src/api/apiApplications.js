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


export async function updateApplications(token,{job_id},status){
    const supbase = await supabaseClient(token)
    
     const {data,error} = await supbase.from('applications')
     .update(status)
     .eq("job_id",job_id)
     .select()
     if(error || data.length===0){
         console.log("Error Updating application status",error);
         return null
}
return data
}