"use client";
import Image from "next/image";
import projects from "@/data/projects.json";
import { TbSchool } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ProjectItem from "@/components/projectItem";
import TechStack from "@/components/techStack";
import SocialButton from "@/components/socialButton";
export default function Home() {
  const socialButtons = [
    { src: "/github.svg", alt: "GitHub", uri: "https://github.com/kyhchn" },
    {
      src: "/linkedin.svg",
      alt: "LinkedIn",
      uri: "https://www.linkedin.com/in/alvinkn/",
    },
    {
      src: "/instagram.svg",
      alt: "Instagram",
      uri: "https://www.instagram.com/vvinalvinn/",
    },
    { src: "/gmail.svg", alt: "Gmail", uri: "mailto:alvinkn.dev@gmail.com" },
  ];
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <section id="about-me">
        <div className="flex h-[75vh] md:h-screen flex-col gap-3 md:flex-row bg-white items-center p-5 md:p-20">
          <div
            className="md:flex-1 text-2xl md:text-5xl font-bold text-blue-900"
            data-aos="fade-right"
          >
            <h1>
              {" "}
              Hi There, <br />
              Im <span className="text-purple-400">Alvin Kamal Nasich</span>
            </h1>
            <p className="text-base text-black mt-3" data-aos="zoom-in">
              I am into{" "}
              <span className="text-red-700 md:text-2xl">
                Front End Development
              </span>
            </p>
            <div
              className="flex flex-col text-black text-start"
              data-aos="zoom-in"
            >
              <div className="flex flex-row justify-start md:text-base text-sm gap-4 items-center">
                <TbSchool size={30} />
                <p>Information System student at Brawijaya University</p>
              </div>
              <div className="flex flex-row md:text-base justify-start text-sm gap-4 items-center">
                <FaLocationDot size={30} />
                <p>Indonesia</p>
              </div>
            </div>
            <div
              className="flex mt-5 gap-3 justify-center md:justify-start"
              data-aos="fade-up"
            >
              {socialButtons.map((button, index) => (
                <SocialButton
                  key={index}
                  src={button.src}
                  alt={button.alt}
                  uri={button.uri}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 px-2 md:h-screen w-full" data-aos="fade-left">
            <div className="h-full w-full md:w-5/6 relative justify-center">
              <Image src="/alvin.png" alt="hero" fill objectFit="contain" />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="overflow-x-hidden">
        <div className="flex flex-col justify-start bg-slate-800 px-5 py-10">
          <div
            className="text-white text-4xl mb-5 text-center"
            data-aos="zoom-out"
          >
            <h1>My Projects</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <ProjectItem
                key={index}
                mockup={project.mockup}
                img={project.img}
                title={project.title}
                desc={project.desc}
                alt={project.alt}
                repo={project.repo}
                aosData={index % 2 == 0 ? "fade-right" : "fade-left"}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="tech-stack" className="overflow-x-hidden">
        <div className="flex flex-col justify-center bg-white px-5 py-10">
          <div
            className="text-black text-4xl mb-5 text-center"
            data-aos="zoom-out"
          >
            <h1>Tech Stack</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5" data-aos="flip-up">
            <TechStack
              image="https://storage.googleapis.com/cms-storage-bucket/4fd5520fe28ebf839174.svg"
              stack="Flutter"
            />
            <TechStack
              image="https://firebase.google.com/downloads/brand-guidelines/SVG/logo-logomark.svg"
              stack="Firebase"
            />
            <TechStack
              image="https://laravel.com/img/logomark.min.svg"
              stack="Laravel"
            />
            <TechStack image="/next.svg" stack="Next JS" />
            <TechStack image="/tailwind.svg" stack="Tailwind" />
            <TechStack
              image="https://railway.app/brand/logo-dark.svg"
              stack="Railway"
            />
            <TechStack image="/github.svg" stack="Github" />
            <TechStack
              image="https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg"
              stack="PostgreSQL"
            />
            <TechStack image="/hardhat.svg" stack="Hardhat" />
            <TechStack
              image="https://upload.wikimedia.org/wikipedia/commons/9/98/Solidity_logo.svg"
              stack="Solidity"
            />
            <TechStack
              image="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              stack="React JS"
            />
            <TechStack
              image="https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg"
              stack="Vercel"
            />
            <TechStack
              image="https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg"
              stack="Docker"
            />
            <TechStack
              image="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg"
              stack="Linux"
            />
          </div>
        </div>
      </section>
    </>
  );
}
