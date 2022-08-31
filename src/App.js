import React, { Component } from "react";
import axios from "axios";
const endPointApi = 'https://jsonplaceholder.typicode.com/posts'
class App extends Component {
  state = {
    posts: [{title:'abdo' , body : 'fjfng'}  ],
  };
  async componentDidMount(){
    const {data : posts} = await axios.get(endPointApi)
    this.setState({posts})

  }
  handelAdd = async() => {
    const newpost = {title :' new post' , body : 'this is new post'};
    const {data : post} = await axios.post(endPointApi , newpost);
    const posts = [post , ...this.state.posts];
    this.setState({posts})
  };
  handelDelete = async(post) => {
    const originPost = this.state.posts ;
    const posts = this.state.posts.filter(p=>p.id !== post.id);
    this.setState({posts})
    try{
      await axios.delete(`${endPointApi}/${post.id}`);
      throw new Error ('this is error')
    }
    catch(ex){
      if(ex.response && ex.response.status === 404)
      alert('something went wrong whit deleting')
        else{
          console.log('logging the error');
          alert('unexpected error')
        }
        this.setState({posts : originPost})
    }
  

 
  };
  handelUpdate = async(post) => {
    post.title = 'this is post update';
    await axios.put(`${endPointApi}/${post.id}`);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index]={...post};
    this.setState({posts})
  };
  render() {
    return (
      <>
        <button
          style={{ display: "block", margin: "20px auto 0px" }}
          className="btn btn-success"
          onClick={this.handelAdd}
        >
          Add new
        </button>
        <div
          style={{ margin: " 30px auto 0px" }}
          className="bg-secondary w-75 "
        >
          <table className="table text-white">
            <thead>
              <tr>
                <th>title</th>
                <th> update</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handelUpdate(post)}
                    >
                      {" "}
                      update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handelDelete(post)}
                    >
                      {" "}
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default App;
