import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { openSharedLink } from "../../api/shareApi";
import { SharedCardGrid } from "../../components/shared/SharedCardGrid";
import SharedCardDetails from "./ShareCardDetails";
import { type SharedLinkResponse } from "../../api/shareApi";

const SharedVaultPage = () => {
  const { hash } = useParams();
  const [data, setData] = useState<SharedLinkResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hash) return;

    const load = async () => {
      try {
        const res = await openSharedLink(hash);
        setData(res);
      } catch (err) {
        if (err instanceof Error)
          console.error("Invalid or expired link");
        else
          console.error("Something went wrong!")
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [hash]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!data) return <div className="p-10 text-center">Link invalid</div>;

  if (data.type === "collection") {
    return <SharedCardGrid items={data.items} />;
  }

  if (data.type === "single") {
    return <SharedCardDetails item={data.item} />;
  }

  return null;
};

export default SharedVaultPage;
