import * as React from "react"
 
import { MainPage } from "@/components/mainpage"
import AllEvents from "@/components/AllEvents"


export default async function Home({
  searchParams
  }: {
    searchParams: {[key: string]: string}
  }) {
  
  const {pickedDate} = await searchParams
  return (
    <div>
      <MainPage>
        <AllEvents pickedDate={pickedDate}></AllEvents>
      </MainPage>
      
    </div>

  )
}
