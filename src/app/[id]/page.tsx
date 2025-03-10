import { MatchRepo } from "@/repositories/MatchRepo"
import { LiveMatch } from "@/components/molecules/livematch"
import { notFound } from "next/navigation"

const match = new MatchRepo()

export default async function LivePage({ params }: { params: Promise<{ id: string }> }) {
  const matchSlug = (await params).id
  let matchName: string = ""
  let image: string = ""
  // let channel: string = ""

  // dummy
  const channel: string = "channeldummy"
  // ===

  try {
    const resp = await match.show(matchSlug) 
    matchName = resp.data.name
    // image = resp.data.image
    // channel = resp.data.channel_id;

  } catch {
    notFound()
  }

  return (
    <div>
      

      <LiveMatch
        channel={channel}
        matchSlug={matchSlug}
        matchName={matchName}
        image={image}
      />
    </div>
  )
}