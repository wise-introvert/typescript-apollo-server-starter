import { RESTDataSource } from "@apollo/datasource-rest";

export interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export class PostsAPI extends RESTDataSource {
  override baseURL = "https://jsonplaceholder.typicode.com/";

  async getPosts(): Promise<Post[]> {
    return this.get<Post[]>(`posts`);
  }

  async getMostViewedPosts(limit = "10"): Promise<Post[]> {
    const data = await this.get("posts", {
      params: {
        per_page: limit,
        order_by: "most_viewed",
      },
    });

    return data.results;
  }
}
