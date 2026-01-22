import { useEffect } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

export const TwitterEmbed = ({ id }: { id: string }) => {
  useEffect(() => {
    if (window.twttr?.widgets?.load) {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <a href={`https://twitter.com/user/status/${id}`} />
    </blockquote>
  );
};
