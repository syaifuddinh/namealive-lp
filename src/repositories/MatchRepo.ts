import { APIResp } from "@/types/api";
import { MatchDetailResp, MatchListResp, MatchTokenDetailResp } from "@/types/match";
import { protectedapi } from "@/utils/api";
import { clientapi } from "@/utils/clientapi";

export class MatchRepo {
    private baseUrl: string = String(process.env.BACKEND_MATCH_URL);
  
    async fetch(): Promise<APIResp<MatchListResp[]>> {
      const url = this.baseUrl + "/match" 
      const data = await protectedapi(url, "GET") as APIResp<MatchListResp[]>
      return data
    }
  
    async get(): Promise<APIResp<MatchListResp[]>> {
      const resp = await this.fetch()
      resp.data = resp.data.map((item: MatchListResp) => ({
        ...item,
        public_url: this.getPublicURL(item.slug)
      }))

      return resp
    }
  
    async show(uid: string): Promise<APIResp<MatchDetailResp>> {
      const url = this.baseUrl + "/match/" + uid 
      const resp = await protectedapi<null>(url, "GET")
      resp.data = {...resp.data, "public_url": this.getPublicURL(resp.data.slug)}
      
      return resp
    }
  
    async getLiveToken(uid: string): Promise<APIResp<MatchTokenDetailResp>> {
      const url = "/api/match/" + uid + "/token" 
      const resp = await clientapi<null>(url, "POST")
      
      return resp
    }

    getPublicURL(slug: string): string {
      return process.env.PUBLIC_BASE_URL + "/" + slug;
    }
  }