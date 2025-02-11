import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { ILocalVideoTrack } from "agora-rtc-sdk-ng";

export type LiveRoleOpt =  "host";
interface RTCInterface {
  client: IAgoraRTCClient |null;
};

export class LiveRepo {
    readonly appId: string = String(process.env.AGORA_APP_ID);
    readonly role: LiveRoleOpt = "host"
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
      await this.joinAsHost()
      await this.publish()
      this.registerEvent()
    }
  
    init() {
      this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role: this.role });
    }

    async joinAsHost(): Promise<void> {
      if(!this.rtc.client) return;
      await this.rtc.client.join(this.appId, this.channel, this.token, this.uid);
      this.rtc.client.setClientRole(this.role);
      
      console.log("Host joined and published tracks.");
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