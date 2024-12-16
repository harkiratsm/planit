import { redirect } from "next/navigation"

export default async function Settings(){
    redirect("/account/settings/profile")   
    return <div /> 
}