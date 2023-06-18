import { Item } from "@/models/Artists";
import Image from "next/image";
type TrackItemProps = {
    artist: Item
}
export default function TrackItem({ artist }: TrackItemProps) {
    return (
        <div className="flex flex-row my-3 p-5 rounded-2xl bg-white/30 backdrop-blur-xl shadow-xl">
            <div className="flex flex-1 flex-row gap-x-5">
                <div className="w-32 h-32 relative rounded-3xl overflow-hidden shadow-xl">
                    <Image src={artist.images[0].url} alt={artist.name} fill objectFit="cover" />
                </div>
                <div className="flex flex-col justify-between">
                    <span className="bg-clip-text font-bold text-xl text-transparent bg-gradient-to-r from-pink-500 to-violet-500">{artist.name}</span>

                </div>
            </div>

        </div>
    )
}