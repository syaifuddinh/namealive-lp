"use client"

import { FullscreenIcon } from "@/components/atoms/icon/fullscreen";
import { PlayIcon } from "@/components/atoms/icon/play";
import { LiveHook } from "@/hooks/match/LiveHook"
import { playerElementId, playerContainerElementId } from "@/repositories/LiveRepo";
import Image from "next/image";

export const LiveMatch = ({
    matchSlug,
    matchName,
    image,
    channel
}: {
    matchSlug: string;
    matchName: string;
    image: string;
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
            
            <div id={playerContainerElementId} className="relative left-0 top-0 z-[9] w-full h-full">
                <div className="top-[0px] fixed w-full h-[72px] relative z-30 flex items-center px-4 sm:px-12">
                    <div
                        className="absolute left-0 -top-[1rem]  w-full h-[125%] opacity-10 blur-md" 
                        style={{"background": "linear-gradient(180deg, rgb(0, 0, 0) 32%, rgb(0, 0, 0) 100%)"}}
                    >
                    </div>
                    <h1 className="text-sm sm:text-xl relative z-20 font-medium">
                        { matchName }
                    </h1>

                    <img
                        src={image}
                        width={200}
                        height={150}
                        className="w-[100px] sm:w-[200px] h-auto absolute top-[1rem] right-[1rem] z-[100]"
                        loading="eager"
                    />
                </div>
                
                <div className="fixed top-0 left-0  h-full w-full flex items-center">
                    <div id={playerElementId} className="fixed left-0 z-10 w-full h-auto aspect-[1024/768]">
                        
                    </div>
                </div>

                {
                    ctrl.status === "ongoing" && (
                        <div className="fixed left-0 bottom-0 z-20 h-[5rem] w-full flex justify-end items-center px-4">
                            <div
                                className="fixed left-0 bottom-0 w-full h-[5rem] opacity-10 blur-md" 
                                style={{"background": "linear-gradient(0deg, rgb(0, 0, 0) 32%, rgb(0, 0, 0) 100%)"}}
                            >
                            </div>
                        
                            <div className="relative z-20 cursor-pointer" onClick={ctrl.onFullscreen}>
                                <FullscreenIcon />
                            </div>
                        </div>       
                    )
                }
            </div>
        </div>
    )
}