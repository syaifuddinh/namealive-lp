"use client"

import { LiveRepo } from "@/repositories/LiveRepo"
import { useState } from "react"
import { MatchRepo } from "@/repositories/MatchRepo"

export type BroadcastStatus = "idle" | "pending" | "ongoing"

const match = new MatchRepo();
const broadcaster = new LiveRepo()

export const MatchDetailHook = (matchId: string, channel: string) => {
    const [status, setStatus] = useState<BroadcastStatus>("idle")
    const [isLiveLoading, setIsLiveLoading] = useState<boolean>(false)

    const start = async () => {
        setIsLiveLoading(true)

        const liveTicket = await match.getLiveToken(matchId)
        const token = liveTicket.data.token;
        const uid = liveTicket.data.uid;
        broadcaster.setProfile(channel, token, uid)
        broadcaster.onTrackStopped(() => {
            toIdle()
        })
        await broadcaster.start()
        setStatus("ongoing")
        try {
        } catch(e) {
            console.log(e)
        }
        setIsLiveLoading(false)
    } 
    
    const toIdle = async () => {
        await broadcaster.stop();
        setStatus("idle")
        setIsLiveLoading(false)
    }
    
    const stop = async () => {
        setIsLiveLoading(true)
        
        await broadcaster.unpublish()
        toIdle()
        try {
        } catch {}
        setIsLiveLoading(false)
    } 

    return { 
        status, 
        isLiveLoading,
        start,
        stop
    }
}