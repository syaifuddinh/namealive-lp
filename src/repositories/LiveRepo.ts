import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { ILocalVideoTrack } from "agora-rtc-sdk-ng";

export type LiveRoleOpt =  "audience";
export type MediaTypeEnum =  "video" | "audio";
interface RTCInterface {
  client: IAgoraRTCClient |null;
};

export const playerElementId = "player-container"

export class LiveRepo {
    readonly appId: string = String(process.env.AGORA_APP_ID);
    readonly role: LiveRoleOpt = "audience";
    private channel: string = "";
    private token: string = "";
    private uid: number = 0;
    private rtc: RTCInterface = {
      client: null
    };
    private track?: ILocalVideoTrack;
    private handleTrackStopped?: () => void;
    

    setProfile(channel: string, token: string, uid: number) {
      this.channel = channel;
      this.token = token;
      this.uid = uid;
    }

    onTrackStopped(event: () => void) {
      this.handleTrackStopped = event;
    }
    
    async start(): Promise<void> {

      this.init()
      await this.joinAsAudience()
      this.registerEvent()
      this.subscribeTrack()
    }
  
    init() {
      this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role: this.role });
    }

    async joinAsAudience(): Promise<void> {
      if(!this.rtc.client) return;
      await this.rtc.client.join(this.appId, this.channel, this.token, this.uid);
      this.rtc.client.setClientRole(this.role);
      
      console.log("Audience joined.");
    }

    // Screensharing your computer
    async publish(): Promise<void> {
      if(!this.rtc.client) return
      try {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          
          this.track = AgoraRTC.createCustomVideoTrack({
              mediaStreamTrack: screenStream.getVideoTracks()[0]
          });

          // Publish screen-sharing stream
          await this.rtc.client.publish(this.track);

          console.log("Screen sharing started");
      } catch (error) {
          console.error("Failed to start screen sharing:", error);
      }
    }

    registerEvent() {
        if(!this.track) return
        this.track.getMediaStreamTrack().addEventListener("ended", () => {
            console.log("Screen sharing has been stopped");
            if(this.handleTrackStopped) this.handleTrackStopped()
        });
    }

    subscribeTrack() {
      if(!this.rtc.client) return;
      this.rtc.client?.on("user-published", async (user: IAgoraRTCRemoteUser, mediaType: MediaTypeEnum ) => {
        if(!this.rtc.client) return;
        await this.rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");
        
        if (mediaType === "video") {
            this.watch(user);
        }

        if (mediaType === "audio" && user.audioTrack) {
            user.audioTrack.play();
        }
      })
    }

    watch(user: IAgoraRTCRemoteUser) {
      if(!user.videoTrack) return;
      const el: HTMLDivElement = document.getElementById(playerElementId) as HTMLDivElement
      if(!el) throw new Error("Player element is not found");
      user.videoTrack.play(el)
    }

    async unpublish(): Promise<void> {
      if(!this.track) return;
      console.log("Unpublish track")
      console.log({ rtcclientend: this.rtc.client })
      // this.rtc.client.unpublish()
      this.track.stop()
      this.track.close()
      console.log("Screen-sharing stopped")
    }

    async stop(): Promise<void> {
      if(!this.rtc.client) return
      await this.rtc.client.leave()
    }
  }