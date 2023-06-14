'use client'
import Image from "next/image"
import projects from "@/data/projects.json"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react"
import ProjectItem from "@/components/projectItem"
import TechStack from "@/components/techStack"
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000
    })
  }, [])
  return (
    <>
      <section id="about-me">
        <div className="flex h-screen bg-white items-center p-20 pr-0 bg-red-700">
          <div className="flex-1 text-5xl font-bold text-blue-900" data-aos='fade-right'>
            <h1> Hi There, <br />
              I'm <span className="text-purple-400">Alvin Kamal Nasich</span></h1>
            <p className="text-base text-black mt-3" data-aos='zoom-in' >
              I am into  <span className="text-red-700 text-2xl">Front End Development</span>
            </p>
            <div className="flex mt-5" data-aos='fade-up'>
              <button className="social-button hover:bg-slate-500 text-white font-bold rounded-full p-2 h-12 w-12 relative">
                <img className="w-full h-full" src="/github.svg" alt="GitHub" />
              </button>
              <button className="social-button hover:bg-slate-500 text-white font-bold rounded-full p-2 h-12 w-12 relative">
                <img className="w-full h-full" src="/linkedin.svg" alt="GitHub" />
              </button>
              <button className="social-button hover:bg-slate-500 text-white font-bold rounded-full p-2 h-12 w-12 relative">
                <img className="w-full h-full" src="/instagram.svg" alt="GitHub" />
              </button>
              <button className="social-button hover:bg-slate-500 text-white font-bold rounded-full p-2 h-12 w-12 relative">
                <img className="w-full h-full" src="/gmail.svg" alt="GitHub" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex h-screen px-2 items-center" data-aos='fade-left'>
            <div className="h-3/4 w-9/12 relative">
              <Image src="/alvin.png" alt="hero" fill objectFit="cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="overflow-x-hidden">
        <div className="flex flex-col justify-start bg-slate-800 px-5 py-10">
          <div className="text-white text-4xl mb-5 text-center" data-aos="zoom-out">
            <h1>My Projects</h1>
          </div>
          <div className="grid grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <ProjectItem
                key={index}
                href={project.href}
                img={project.img}
                title={project.title}
                desc={project.desc}
                alt={project.alt}
                aosData={index % 2 == 0 ? 'fade-right' : 'fade-left'}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="tech-stack" className="overflow-x-hidden">
        <div className="flex flex-col justify-center bg-white px-5 py-10">
          <div className="text-black text-4xl mb-5 text-center" data-aos="zoom-out">
            <h1>Tech Stack</h1>
          </div>
          <div className="grid grid-cols-5" data-aos="flip-up">
            <TechStack image="https://storage.googleapis.com/cms-storage-bucket/4fd5520fe28ebf839174.svg" stack="Flutter" />
            <TechStack image="https://firebase.google.com/downloads/brand-guidelines/SVG/logo-logomark.svg" stack="Firebase" />
            <TechStack image="https://laravel.com/img/logomark.min.svg" stack="Laravel" />
            <TechStack image="/next.svg" stack="Next JS" />
            <TechStack image="/tailwind.svg" stack="Tailwind" />
            <div></div>
            <TechStack image="https://railway.app/brand/logo-dark.svg" stack="Railway" />
            <TechStack image="/github.svg" stack="Github" />
            <TechStack image="https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg" stack="PostgreSQL" />
            <div></div>
          </div>
        </div>
      </section>
    </>

  )
}