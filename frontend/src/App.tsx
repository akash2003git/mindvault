import { Card } from "./components/Card"


function App() {

  return (
    <div className="bg-white min-h-screen p-5">
      <Card
        title="How to Focus Better"
        description="A great video on improving focus and productivity."
        link="https://www.youtube.com/watch?v=MF8RFD7tk48"
        type="video"
        tags={["productivity", "focus"]}
        date="2026-01-01"
        handleShare={() => console.log("share video")}
        handleDelete={() => console.log("delete video")}
      />

      <Card
        title="Elon’s Latest Tweet"
        description="This tweet has some interesting insights."
        link="https://twitter.com/username/status/2006330639960694808"
        type="tweet"
        tags={["tech", "twitter"]}
        date="2026-01-01"
        handleShare={() => console.log("share tweet")}
        handleDelete={() => console.log("delete tweet")}
      />

      <Card
        title="Beautiful Travel Reel"
        description="A stunning travel reel from Instagram."
        link="https://www.instagram.com/reel/DS7hBgDEg4T/"
        type="post"
        tags={["travel", "inspiration"]}
        date="2026-01-01"
        handleShare={() => console.log("share insta")}
        handleDelete={() => console.log("delete insta")}
      />

      <Card
        title="Weird Cricket Bat"
        description="Reddit discussion about unusual cricket bat."
        link="https://www.reddit.com/r/Cricket/comments/1q081bl/weird_looking_bat/"
        type="post"
        tags={["cricket", "sports"]}
        date="2026-01-01"
        handleShare={() => console.log("share reddit")}
        handleDelete={() => console.log("delete reddit")}
      />

      <Card
        title="Deep Work Notes"
        description={`# Deep Work 🧠  
Cal Newport's book on how to get more meaningful work done.

- Avoid distractions  
- Focus your energy  
- Build rituals  
- Prioritize high-value activities  

**A must read!**`}
        type="article"
        tags={["reading", "notes", "deep-work"]}
        date="2026-01-02"
        handleShare={() => console.log("share article")}
        handleDelete={() => console.log("delete article")}
      />
    </div >
  )
}

export default App
