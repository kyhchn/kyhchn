import Link from 'next/link';

export default function Nav() {
    return (
        <nav className="sticky top-0 z-10 flex justify-between bg-white p-6 shadow-sm md:shadow-lg">
            <Link href="/" scroll={false} className="inline-block mr-4 md:mr-10 hover:text-purple-600 transition-colors duration-300">
                <div className="items-center flex-shrink-0 text-slate-950 mr-6 cursor-pointer hover:text-blue-500 transition-colors duration-500">
                    <span className="font-semibold text-xl tracking-tight">Kyhchn</span>
                </div>
            </Link>

            <div className="text-sm md:text-lg text-slate-900">
                <Link href="/#about-me" scroll={false} className="inline-block mr-4 md:mr-10 hover:text-purple-600 transition-colors duration-300">
                    About Me
                </Link>
                <Link href="/#projects" scroll={false} className="inline-block mr-4 md:mr-10 hover:text-purple-600 transition-colors duration-300">
                    Projects
                </Link>
                <Link href="/#tech-stack" scroll={false} className="inline-block hover:text-purple-600 transition-colors duration-300">
                    Tech Stack
                </Link>
            </div>
        </nav>
    )
}
