import type { Context } from "@devvit/public-api";
import { Devvit, useState } from "@devvit/public-api";
import { PixelText } from "./pixelText.js";
import { Layout } from "./layout.js";
import { Service } from "../service/service.js";

interface LeaderboardPageProps {
  username: string | null;
  onClose: () => void;
}

export const LeaderboardPage = (
  props: LeaderboardPageProps,
  context: Context
): JSX.Element => {
  const service = new Service(context);

  const [leaderboard] = useState<any>(async () => {
    return await service.getLeaderboard();
  });

  return (
    <Layout onClose={props.onClose} title="Leaderboard">
      {leaderboard.map((entry: any, index: number) => (
        <vstack padding="small">
          <hstack>
            <spacer width="12px" />
            <PixelText>{`${index + 1}. ${entry.username}`}</PixelText>
            <spacer grow />
            <PixelText>{String(entry.score)}</PixelText>
            <spacer width="12px" />
          </hstack>
          <spacer height="4px" />
        </vstack>
      ))}
    </Layout>
  );
};
