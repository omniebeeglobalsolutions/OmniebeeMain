import assetsdata from '../assetsdata.json';

type AssetEntry = {
  name: string;
  url: string;
};

export const assetsDataMap: Record<string, string> = (assetsdata as AssetEntry[]).reduce(
  (acc, item) => {
    acc[item.name] = item.url;
    return acc;
  },
  {} as Record<string, string>
);
