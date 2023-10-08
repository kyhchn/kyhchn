import Image from "next/image";
type TechStackProps = {
  image: string;
  stack: string;
};
export default function TechStack(props: TechStackProps) {
  return (
    <div className="text-slate-600 tech-stack flex gap-2 flex-col gap items-center justify-center h-40 rounded-xl px-6 cursor-pointer hover:bg-slate-200 hover:text-slate-800 transition-colors duration-300">
      <div className="h-1/2 relative w-8/12">
        <Image src={props.image} alt="hero" fill objectFit="fit" />
      </div>
      <h2>{props.stack}</h2>
    </div>
  );
}
