import supabaseClient from "../utils/superbase";

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