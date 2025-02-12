import { APIResp } from "@/types/api";
import { MatchDetailResp, MatchTokenDetailResp } from "@/types/match";
import { api } from "@/utils/api";

export class MatchRepo {
    private baseUrl: string = String(process.env.BACKEND_MATCH_URL);
  
  
    async show(uid: string): Promise<APIResp<MatchDetailResp>> {
      const url = this.baseUrl + "/public/match/" + uid 
      console.log({ matchUrl: url })
      const resp = await api<null>(url, "GET")
      
      return resp
    }
  
    async getLiveToken(uid: string): Promise<APIResp<MatchTokenDetailResp>> {
      const url = "/api/match/" + uid + "/token" 
      const resp = await api<null>(url, "POST")
      
      return resp
    }
  }