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

  } catch {
    notFound()
  }

  return (
    <div>
      <div className="h-[136px] relative z-30 flex items-center px-12">
          <div
            className="absolute left-0  w-full h-full opacity-10 blur-md" 
            style={{"background": "linear-gradient(180deg, rgba(179,166,166,0.14002097420999648) 32%, rgba(91,93,88,1) 100%)"}}
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
    </div>
  )
}