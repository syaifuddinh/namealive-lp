"use client"

import { LiveRepo } from "@/repositories/LiveRepo"
import { useState } from "react"
import { MatchRepo } from "@/repositories/MatchRepo"

export type BroadcastStatus = "idle" | "pending" | "ongoing"

const match = new MatchRepo();
const broadcaster = new LiveRepo()


export const LiveHook = (matchSlug: string, channel: string) => {
    const [status, setStatus] = useState<BroadcastStatus>("idle")
    const [isLiveLoading, setIsLiveLoading] = useState<boolean>(false)

    const onAfterPlay = () => {
        document.addEventListener("dblclick", broadcaster.switchFullscreen);
    }
    const onAfterStop = () => {
        document.removeEventListener("dblclick", broadcaster.switchFullscreen);
    }

    const start = async () => {
        setIsLiveLoading(true)

        
        try {
            const liveTicket = await match.getLiveToken(matchSlug)
            const token = liveTicket.data.token;
            const uid = liveTicket.data.uid;
            broadcaster.setProfile(channel, token, uid)
            broadcaster.onTrackStopped(() => {
                toIdle()
            })
            broadcaster.onTrackStarted(() => {
                setStatus("ongoing")
                setIsLiveLoading(false)
                onAfterPlay()
            })
            broadcaster.onTrackStartedFail(() => {
                toIdle()
            })
            await broadcaster.start()
        } catch(e) {
            console.log(e)
            setIsLiveLoading(false)
        }
        
    } 
    
    const toIdle = async () => {
        await broadcaster.stop();
        setStatus("idle")
        setIsLiveLoading(false)
        onAfterStop()
    }
    
    const stop = async () => {
        setIsLiveLoading(true)
        
        await broadcaster.unpublish()
        toIdle()
        try {
        } catch {}
        setIsLiveLoading(false)
    } 

    const onFullscreen = () => {
        broadcaster.switchFullscreen();
    }
    
    return { 
        status, 
        isLiveLoading,
        start,
        stop,
        onFullscreen
    }
}