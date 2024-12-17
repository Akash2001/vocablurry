import { Devvit } from "@devvit/public-api";
import Settings from '../settings.json' assert { type: 'json' };
import { PixelText } from './pixelText.js';
import { StyledButton } from './styledButton.js';

export const Layout = (props: { children: JSX.Element; title: string; onClose: () => void }): JSX.Element => (
  <vstack width="100%" height="100%">
    <spacer height="24px" />
    <hstack width="100%" alignment="middle">
      <spacer width="24px" />
      <PixelText scale={2.5} color={Settings.theme.primary}>
        {props.title}
      </PixelText>
      <spacer grow />
      <StyledButton
        appearance="primary"
        label="x"
        width="32px"
        height="32px"
        onPress={props.onClose}
      />
      <spacer width="20px" />
    </hstack>
    <spacer height="24px" />

    <hstack grow>
      <spacer width="24px" />
      <zstack alignment="start top" grow>
        {/* Shadow */}
        <vstack width="100%" height="100%">
          <spacer height="4px" />
          <hstack grow>
            <spacer width="4px" />
            <hstack grow backgroundColor={Settings.theme.shadow} />
          </hstack>
        </vstack>

        {/* Card */}
        <vstack width="100%" height="100%">
          <hstack grow>
            <vstack grow backgroundColor="white">
              <spacer height="4px" />
              {props.children}
              <spacer height="4px" />
            </vstack>
            <spacer width="4px" />
          </hstack>
          <spacer height="4px" />
        </vstack>
      </zstack>
      <spacer width="20px" />
    </hstack>
    <spacer height="20px" />
  </vstack>
);