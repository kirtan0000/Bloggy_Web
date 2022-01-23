class Server {
  static dev = "http://localhost:7090";
  static prod = "https://bloggy.raakeshpatel.com/api";

  static get url() {
    return process.env.NODE_ENV == "development" ? this.dev : this.prod;
  }
}

const Post = async (endpoint: string, body: string) => {
  const post_data = await fetch(`${Server.url}/${endpoint}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  return await post_data.json();
};

export { Server, Post };
