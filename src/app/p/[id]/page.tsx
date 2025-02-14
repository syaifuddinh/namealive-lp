import { MatchRepo } from "@/repositories/MatchRepo"
import { LiveMatch } from "@/components/molecules/livematch"
import { notFound } from "next/navigation"

const match = new MatchRepo()

export default async function LivePage({ params }: { params: Promise<{ id: string }> }) {
  const matchSlug = (await params).id
  let matchName: string = ""
  let channel: string = ""

  try {
    const resp = await match.show(matchSlug) 
    matchName = resp.data.name
    channel = resp.data.channel_id;

  } catch(e: any) {
    notFound()
  }

  return (
    <div>
      <div className="h-[72px] relative z-30 flex items-center px-12">
          <div
            className="absolute left-0 -top-[1rem]  w-full h-[125%] opacity-10 blur-md" 
            style={{"background": "linear-gradient(180deg, rgb(0, 0, 0) 32%, rgb(0, 0, 0) 100%)"}}
          >
          </div>
          <h1 className="text-xl relative z-20 font-medium">
            { matchName }
          </h1>
      </div>

      <LiveMatch
        channel={channel}
        matchSlug={matchSlug}
      />

      <img
        src="https://opentrolley.co.id/Images/otlogo2.png"
        width={200}
        height={150}
        className="w-[200px] h-auto absolute right-[1rem] top-[1rem] z-[100]"
      />
    </div>
  )
}