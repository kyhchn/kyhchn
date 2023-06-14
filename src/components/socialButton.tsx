import Image from 'next/image'

type SocialButtonProps = {
    src: string,
    alt: string,
    uri: string
}

function btnOnclick(uri: string) {
    window.open(uri)
}

export default function SocialButton({ src, alt, uri }: SocialButtonProps) {
    return (
        <button className="social-button hover:bg-slate-500 text-white font-bold rounded-full p-2 h-12 w-12 relative" onClick={() => btnOnclick(uri)}>
            <Image
                src={src}
                alt={alt}
                width={24}
                height={24}
                className="w-full h-full"
            />
        </button>
    )
}