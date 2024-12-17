import type {
  RedditAPIClient,
  RedisClient,
  Scheduler,
} from "@devvit/public-api";

export class Service {
  readonly redis: RedisClient;
  readonly reddit?: RedditAPIClient;
  readonly scheduler?: Scheduler;

  constructor(context: {
    redis: RedisClient;
    reddit?: RedditAPIClient;
    scheduler?: Scheduler;
  }) {
    this.redis = context.redis;
    this.reddit = context.reddit;
    this.scheduler = context.scheduler;
  }

  async submitPost(data: {
    post: { question: string; options: string[]; answer: number };
    authorUserName: string;
    redditPost: any;
  }): Promise<void> {
    const postsRecord = await this.redis.hGetAll(`posts`);
    const posts = JSON.parse(postsRecord?.posts || "[]");
    posts.push({
      post: data.redditPost,
      data: data.post,
    });
    this.redis.hSet(`posts`, {
      posts: JSON.stringify(posts),
    });
  }

  async getPost(id?: any): Promise<any> {
    const postsRecord = await this.redis.hGetAll(`posts`);
    const posts = JSON.parse(postsRecord?.posts || "[]");
    return posts.filter((post: any) => post.post.id === id)[0]?.data || {};
  }

  async getLeaderboard(): Promise<Array<any>> {
    const record = await this.redis.hGetAll(`leaderboard`);
    const users = JSON.parse(record?.users || "[]");
    return users.sort((a: any, b: any) => a.score - b.score).slice(0, 10) || [];
  }

  async updateScore(username: string): Promise<void> {
    const record = await this.redis.hGetAll(`leaderboard`);
    let users = JSON.parse(record?.users || "[]");
    const exists = users.filter((user: any) => user.username === username)[0];
    if (exists) {
      users = JSON.parse(record?.users || "[]").map((user: any) => {
        if (user.username === username) {
          user.score += 1;
        }
        return user;
      });
    } else {
      users.push({
        username: username,
        score: 1,
      });
    }
    this.redis.hSet(`leaderboard`, {
      users: JSON.stringify(users),
    });
  }
}
