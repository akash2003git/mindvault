export const TwitterEmbed = ({ id }: { id: string }) => {
  return (
    <blockquote className="twitter-tweet">
      <a href={`https://twitter.com/user/status/${id}`}></a>
    </blockquote>
  );
};
