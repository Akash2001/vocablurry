// Learn more at developers.reddit.com/docs
import { Devvit, useState } from "@devvit/public-api";
import { Router } from "./posts/router.js";

Devvit.configure({
  redditAPI: true,
  redis: true
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: "Add my post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    await reddit.submitPost({
      title: "Vocablurry",
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: "Created post!" });
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'GrowVocab',
  description: 'Ask, guess & have fun!',
  height: 'tall',
  render: Router,
});

export default Devvit;
