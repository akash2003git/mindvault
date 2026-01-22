import { useEffect } from "react";

export const RedditEmbed = ({ url }: { url: string }) => {
  useEffect(() => {
    // force Reddit embeds to re-render
    const script = document.querySelector(
      'script[src="https://embed.reddit.com/widgets.js"]'
    ) as HTMLScriptElement | null;

    if (script) {
      script.remove();
    }

    const newScript = document.createElement("script");
    newScript.src = "https://embed.reddit.com/widgets.js";
    newScript.async = true;
    document.body.appendChild(newScript);
  }, []);

  return (
    <blockquote className="reddit-embed-bq">
      <a href={url} />
    </blockquote>
  );
};
