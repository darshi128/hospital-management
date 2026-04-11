import React from 'react'
import Hero from '../components/Hero.jsx'
import Biography from '../components/Biography.jsx'
import Departments from '../components/Departments.jsx'
import MessageForm from '../components/MessageForm.jsx'

function Home() {
  return (
    <>
    <Hero title={"Welcome to Zee Care Medical Institute | Your Trusted HealthCare Provider"} imageUrl={"/hero.png"} />
    <Biography imageUrl={"/about.png"}/>
    <Departments/>
    <MessageForm/>
    </>
  )
}

export default Home