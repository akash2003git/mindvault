import { NotepadText, Share2, Trash2 } from "lucide-react"
import { Button } from "./Button"

export const Card = () => {

  function buttonfn(text: string) {
    console.log(text)
  }

  return (
    <div className="flex-col items-center p-5 rounded-xl font-inter shadow-lg bg-white">
      <div className="flex justify-between mb-5">
        <div className="flex">
          <div className="text-gray-500 mr-2"><NotepadText /></div>
          <div className="text-center font-bold text-xl">Today's tasks</div>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" size="sm" startIcon={Share2} onClick={() => buttonfn("share")} />
          <Button variant="primary" size="sm" startIcon={Trash2} onClick={() => buttonfn("delete")} />
        </div>
      </div>

      <div className="text-gray-800 font-semibold text-lg mb-5">
        {/* <span>Some text</span> */}

        <iframe
          className="w-full max-w-75"
          src="https://www.youtube.com/embed/MF8RFD7tk48?si=bTUq5a6QJ2aUqUs_"
          title="YouTube video player"
        ></iframe>

        <div className="max-w-75 w-full flex items-center justify-center">
          <blockquote className="twitter-tweet">
            <a href="https://twitter.com/username/status/2006330639960694808"></a>
          </blockquote>
        </div>

        <div className="max-w-75 w-full">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/reel/DS7hBgDEg4T/"
          ></blockquote>
        </div>

        <div className="max-w-75 flex items-center justify-center">
          <blockquote className="reddit-embed-bq">
            <a href="https://www.reddit.com/r/Cricket/comments/1q081bl/weird_looking_bat/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button"></a>
          </blockquote>
        </div>
      </div>



      <div className="flex gap-2 mb-5 font-semibold flex-wrap">
        <div className="bg-gray-300 rounded-3xl flex items-center p-2 py-1">
          < span className="text-sm text-center" > #productivity</span>
        </div>
        <div className="bg-gray-300 rounded-3xl flex items-center p-2 py-1">
          <span className="text-sm text-center">#productivity</span>
        </div>
        <div className="bg-gray-300 rounded-3xl flex items-center p-2 py-1">
          <span className="text-sm text-center">#productivity</span>
        </div>
      </div>

      <div className="flex items-center text-gray-400 text-sm font-semibold">
        <span>Added on 31/12/2025</span>
      </div>
    </div >
  )
}

