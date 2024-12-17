import type { Context } from "@devvit/public-api";
import { Devvit, useState } from "@devvit/public-api";
import { PinnedPost } from "./PinnedPost/pinnedPost.js";
import { Service } from "../service/service.js";
import { PostComponent } from "../components/post.js";

/*
 * Page Router
 *
 * This is the post type router and the main entry point for the custom post.
 * It handles the initial data loading and routing to the correct page based on the post type.
 */

export const Router: Devvit.CustomPostComponent = (context: Context) => {
  const postId = context.postId;
  const service = new Service(context);
  const [post] = useState<any>(async () => {
    return await service.getPost(postId);
  });

  const postTypes: Record<string, JSX.Element> = {
    questions: <text></text>,
    pinned: (
      <PinnedPost
        postData={{}}
        userData={{}}
        username={{}}
        gameSettings={{}}
        dictionaries={{}}
      />
    ),
  };

  return (
    <zstack width="100%" height="100%" alignment="top start">
      <image
        imageHeight={1024}
        imageWidth={2048}
        height="100%"
        width="100%"
        url="background.png"
        description="Striped blue background"
        resizeMode="cover"
      />
      {post?.question ? (
        <PostComponent {...post} />
      ) : postTypes["pinned"]}
    </zstack>
  );
};
