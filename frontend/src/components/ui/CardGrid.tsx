import { Card } from "./Card"
import { ContentTypes } from "../../types/ContentTypes"


const dummyData = [
  {
    "id": "1",
    "title": "How to Focus Better",
    "description": "A great video on improving focus and productivity.",
    "link": "https://www.youtube.com/watch?v=MF8RFD7tk48",
    "type": "video",
    "tags": ["productivity", "focus"],
    "date": "2026-01-01"
  },
  {
    "id": "2",
    "title": "Elon’s Latest Tweet",
    "description": "This tweet has some interesting insights.",
    "link": "https://twitter.com/username/status/2006330639960694808",
    "type": "tweet",
    "tags": ["tech", "twitter"],
    "date": "2026-01-01"
  },
  {
    "id": "3",
    "title": "Beautiful Travel Reel",
    "description": "A stunning travel reel from Instagram.",
    "link": "https://www.instagram.com/reel/DS7hBgDEg4T/",
    "type": "post",
    "tags": ["travel", "inspiration"],
    "date": "2026-01-01"
  },
  {
    "id": "4",
    "title": "Weird Cricket Bat",
    "description": "Reddit discussion about an unusual cricket bat.",
    "link": "https://www.reddit.com/r/Cricket/comments/1q081bl/comment/nww8cdc/",
    "type": "post",
    "tags": ["cricket", "sports"],
    "date": "2026-01-01"
  },
  {
    "id": "5",
    "title": "Deep Work Notes",
    "description": "# Deep Work 🧠\nCal Newport's book on meaningful work.\n- Avoid distractions\n- Focus deeply\n- Build rituals\n- Prioritize value\n\n**A must read!**",
    "type": "article",
    "tags": ["reading", "notes", "deep-work"],
    "date": "2026-01-02"
  },
  {
    "id": "6",
    "title": "System Design Basics",
    "description": "Notes on scalable system design concepts and tradeoffs.",
    "link": "https://example.com/system-design",
    "type": "article",
    "tags": ["backend", "architecture", "notes"],
    "date": "2026-01-03"
  },
  {
    "id": "7",
    "title": "Tailwind v4 Overview",
    "description": "Quick overview of what's new in Tailwind CSS v4.",
    "link": "https://example.com/tailwind-v4",
    "type": "article",
    "tags": ["css", "tailwind", "frontend"],
    "date": "2026-01-03"
  },
  {
    "id": "8",
    "title": "Useful Git Commands",
    "description": "A handy list of Git commands I always forget.",
    "type": "note",
    "tags": ["git", "dev-tools", "notes"],
    "date": "2026-01-04"
  },
  {
    "id": "9",
    "title": "AI Tools for Developers",
    "description": "Collection of AI tools that improve developer productivity.",
    "link": "https://example.com/ai-tools",
    "type": "tool",
    "tags": ["ai", "tools", "productivity"],
    "date": "2026-01-04"
  },
  {
    "id": "10",
    "title": "Motivational Productivity Quote",
    "description": "“You do not rise to the level of your goals, you fall to the level of your systems.”",
    "type": "note",
    "tags": ["motivation", "productivity"],
    "date": "2026-01-05"
  }
]

const CardGrid = () => {
  return (
    <div className="p-5 columns-[300px] gap-6">
      {dummyData.map((card) => (
        <div key={card.id} className="break-inside-avoid mb-6">
          <Card
            title={card.title}
            description={card.description}
            link={card.link}
            type={card.type as ContentTypes}
            tags={card.tags}
            date={card.date}
            handleShare={() => console.log("share", card.id)}
            handleDelete={() => console.log("delete", card.id)}
          />
        </div>
      ))}
    </div>
  )
}

export default CardGrid
