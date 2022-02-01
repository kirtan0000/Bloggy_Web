class Server {
  static dev = 'http://localhost:7090'
  static prod = 'https://bloggy.raakeshpatel.com/api'

  static get url () {
    return process.env.NODE_ENV == 'development' ? this.dev : this.prod
  }
}

const Post = async (endpoint: string, body: string) => {
  const post_data = await fetch(`${Server.url}/${endpoint}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body,
    redirect: 'follow'
  })
  return await post_data.json()
}

const FormPost = async (
  endpoint: string,
  file_type_name: string,
  file: any
) => {
  const new_form = new FormData()
  new_form.append(file_type_name, file) // Append the type of file and the file itself
  const post_data = await fetch(`${Server.url}/${endpoint}`, {
    method: 'POST',
    mode: 'cors',
    body: new_form,
    redirect: 'follow'
  })
  return await post_data.json()
}

export { Server, Post, FormPost }
