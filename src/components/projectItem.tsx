import Link from "next/link";
import SocialButton from "./socialButton";

type ProjectItemProps = {
  img: string;
  title: string;
  desc: string;
  alt: string;
  aosData: string;
  repo: string;
  mockup: string;
};

export default function ProjectItem({
  img,
  title,
  desc,
  alt,
  aosData,
  repo,
  mockup,
}: ProjectItemProps) {
  return (
    <div
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 px-3"
      data-aos={aosData}
    >
      <img
        className="object-contain w-full rounded-t-lg h-48 md:w-48 md:rounded-none md:rounded-l-lg"
        src={img}
        alt={alt}
      />
      <div className="flex flex-col justify-between p-4 leading-normal text-center md:text-start">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {desc}
        </p>
        <div className="flex flex-row justify-center md:justify-start items-center">
          <SocialButton alt="github" src="/github.svg" uri={repo} />
          <SocialButton alt="github" src="/web.png" uri={mockup} />
        </div>
      </div>
    </div>
  );
}
