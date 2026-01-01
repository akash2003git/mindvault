//import { useEffect } from "react";

export const RedditEmbed = ({ url }: { url: string }) => {
  // useEffect(() => {
  //   // Load or refresh the Reddit embed script
  //   const script = document.createElement("script");
  //   script.src = "https://embed.reddit.com/widgets.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //
  //   return () => { };
  // }, []);

  return (
    <div className="max-w-75 flex items-center justify-center">
      <blockquote className="reddit-embed-bq">
        <a href={url}></a>
      </blockquote>
    </div>
  );
};
