import * as React from "react"
 
import { MainPage } from "@/components/mainpage"
import AllEvents from "@/components/AllEvents"

export default async function Home() {

  return (
    <div>
      <MainPage></MainPage>
      <AllEvents></AllEvents>
    </div>

  )
}
