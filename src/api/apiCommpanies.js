import supabaseClient, { supabaseUrl } from "../utils/superbase";

export async function getCompanies(token){
    const supbase = await supabaseClient(token)
    
     const {data,error} = await supbase.from('companies')
     .select("*")
     if(error){
         console.log("Error fetching companies",error);
         return null
}
return data
}



export async function addNewCompany(token,_,companyData){
    const supbase = await supabaseClient(token)
       const random = Math.floor(Math.random() * 90000);
        const fileName = `resume- ${random} - ${companyData.name}`
       const {error:storageError} = await supbase.storage.from('company-logo').upload(fileName,companyData.logo);
        if(storageError){
            console.log("Error uploading resume",error);
            return null
        }
        const logo_url =  `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`
     const {data,error} = await supbase.from('companies')
     .insert({
        name:companyData.name,
        logo_url
     })
     .select()
     if(error){
         console.log("Error submitting companies",error);
         return null
}
return data
}
