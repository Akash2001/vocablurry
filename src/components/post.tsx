import { Context, Devvit } from "@devvit/public-api";
import { StyledButton } from "./styledButton.js";
import { Service } from "../service/service.js";
import { PixelText } from "./pixelText.js";

export interface PostProps {
  question: string;
  options: Array<string>;
  answer: number;
}

export const PostComponent = (
  props: PostProps,
  context: Context
): JSX.Element => {
  const service = new Service(context);

  async function onPress(index: number) {
    const { reddit } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const user = await context.reddit.getUserById(context.userId || "");
    if (props.answer !== index + 1) {
      context.ui.showToast({ text: "Incorrect answer!" });
    } else {
      context.ui.showToast({ text: "Correct answer!" });
      await service.updateScore(user?.username || "");
    }
  }

  return (
    <vstack width="100%" height="100%" alignment="center middle">
      <PixelText scale={2}>{props.question.toLocaleUpperCase()}</PixelText>
      <spacer height="30px" />
      <hstack gap="large">
        {props.options.map((option, index) => (
          <StyledButton label={option.toLocaleUpperCase()} onPress={() => onPress(index)} />
        ))}
      </hstack>
    </vstack>
  );
};
