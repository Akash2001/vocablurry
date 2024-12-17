import { Context, Devvit, useForm, useState } from "@devvit/public-api";
import { StyledButton } from "../../components/styledButton.js";
import { LeaderboardPage } from "../../components/leaderBoardPage.js";
import { Service } from "../../service/service.js";
import { Loading } from "../../components/loading.js";

interface PinnedPostProps {
  postData: any;
  userData: any;
  username: any;
  gameSettings: any;
  dictionaries: any;
}

export const PinnedPost = (
  props: PinnedPostProps,
  context: Context
): JSX.Element => {
  const service = new Service(context);
  const [page, setPage] = useState("menu");
  const buttonWidth = "256px";
  const buttonHeight = "48px";

  const createQuestionForm = useForm(
    {
      title: "Create a guess",
      description: "Create a guess for other players to guess.",
      acceptLabel: "Submit",
      fields: [
        {
          type: "string",
          name: "question",
          label: "Question",
          required: true,
        },
        {
          type: "string",
          name: "option1",
          label: "Option 1",
          required: true,
        },
        {
          type: "string",
          name: "option2",
          label: "Option 2",
          required: true,
        },
        {
          type: "string",
          name: "option3",
          label: "Option 3",
          required: true,
        },
        {
          type: "number",
          name: "answer",
          label: "Answer (correct option)",
          required: true,
        },
      ],
    },
    async (values) => {
      const question = values.question.trim().toLowerCase();
      const answer = values.answer;
      const option1 = values.option1.trim().toLowerCase();
      const option2 = values.option2.trim().toLowerCase();
      const option3 = values.option3.trim().toLowerCase();
      const user = await context.reddit.getUserById(context.userId || "");
      const { reddit, ui } = context;
      const subreddit = await reddit.getCurrentSubreddit();
      const post = await context.reddit?.submitPost({
        title: "Guess the word!",
        subredditName: subreddit.name,
        preview: <Loading />,
      });
      service.submitPost({
        post: {
          question: question,
          options: [option1, option2, option3],
          answer: answer,
        },
        redditPost: post,
        authorUserName: user?.username || "",
      });
    }
  );

  const Menu = (
    <vstack width="100%" height="100%" alignment="center middle">
      <spacer grow />
      <spacer height="16px" />

      <spacer grow />

      {/* Menu */}
      <vstack alignment="center middle" gap="small">
        <StyledButton
          width={buttonWidth}
          appearance="primary"
          height={buttonHeight}
          onPress={() => context.ui.showForm(createQuestionForm)}
          leadingIcon="+"
          label="Question"
        />
        {/* <StyledButton
          width={buttonWidth}
          appearance="secondary"
          height={buttonHeight}
          onPress={() => setPage("my-drawings")}
          label="My guesses"
        /> */}
        <StyledButton
          width={buttonWidth}
          appearance="secondary"
          height={buttonHeight}
          onPress={() => setPage("leaderboard")}
          label="LEADERBOARD"
        />
      </vstack>
      <spacer grow />

      <spacer grow />
    </vstack>
  );

  const onClose = (): void => {
    setPage("menu");
  };

  const pages: Record<string, JSX.Element> = {
    menu: Menu,
    leaderboard: <LeaderboardPage {...props} onClose={onClose} />,
    "how-to-play": <text>Level</text>,
    level: <text>Level</text>,
  };

  return pages[page] || Menu;
};
