"use client"

import { PlayIcon } from "@/components/atoms/icon/play";
import { LiveHook } from "@/hooks/match/LiveHook"
import { playerElementId } from "@/repositories/LiveRepo";
import Image from "next/image";

export const LiveMatch = ({
    matchSlug,
    channel
}: {
    matchSlug: string;
    channel: string;
}) => {
    const ctrl = LiveHook(matchSlug, channel)
    
    return (
        <div>
            <div className="absolute top-0 w-full flex justify-center items-center h-full">
                { (ctrl.status === "idle" && !ctrl.isLiveLoading) && (
                    <button
                        type="button" 
                        onClick={ctrl.start} 
                        className="underline relative z-20"
                    >
                        <PlayIcon />
                    </button>
                ) }

                { ctrl.isLiveLoading && (
                    <Image 
                        src="/images/loading.png" 
                        width={72} 
                        height={72} 
                        alt="loading icon" 
                        className="rotating-image"
                    />
                ) }
            </div>
            
            <div id={playerElementId} className="fixed left-0 top-0 z-10 h-full w-full"></div>
        </div>
    )
}