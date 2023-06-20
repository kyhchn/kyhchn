import { Item } from "@/models/Tracks";
import Image from "next/image";
type TrackItemProps = {
    track: Item
}
function formatDuration(durationMs: number) {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
export default function TrackItem({ track }: TrackItemProps) {
    const formattedDuration = formatDuration(track.duration_ms);
    const openLinkInNewWindow = () => {
        window.open(track.external_urls.spotify, "_blank");
    };
    return (
        <div className="flex flex-row my-3 p-5 rounded-2xl bg-white/30 backdrop-blur-xl shadow-xl">
            <div className="flex flex-1 flex-row gap-x-5">
                <div className="w-20 h-20 md:w-32 md:h-32 relative rounded-3xl overflow-hidden shadow-xl">
                    <Image src={track.album.images[0].url} alt={track.album.name} fill objectFit="cover" />
                </div>
                <div className="flex flex-col justify-between text-base">
                    <span className="bg-clip-text font-bold md:text-xl text-transparent bg-gradient-to-r from-pink-500 to-violet-500">{track.name}</span>
                    <h2>{track.artists.map((e) => e.name).join(" - ")}</h2>

                </div>
            </div>


            <div className="flex flex-col justify-center gap-6 items-center">
                <div className="w-8 h-8 md:w-16 md:h-16 relative">
                    <button onClick={openLinkInNewWindow}>
                        <Image src={'/play.png'} alt="play-button" fill objectFit="cover" className="hover:scale-125 transition-all duration-300" />
                    </button>
                </div>

                <p>{formattedDuration}</p>
            </div>

        </div>
    )
}