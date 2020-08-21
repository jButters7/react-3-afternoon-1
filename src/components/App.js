import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

const baseUrl = 'https://practiceapi.devmountain.com/api'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get(`${baseUrl}/posts`).then(res => {
      console.log('mount is working')
      this.setState({
        posts: res.data
      });
    })
  }

  updatePost(id, text) {
    console.log('update is working')
    axios.put(`${baseUrl}/posts?id=${id}`, { text }).then(res => {
      this.setState({ posts: res.data })
    })
  }

  deletePost(id) {
    console.log('delete is working')
    axios.delete(`${baseUrl}/posts?id=${id}`).then(results => {
      this.setState({ posts: results.data });
    });
  }

  createPost(text) {
    console.log('create is working')
    axios.post(`${baseUrl}/posts`, { text }).then(results => {
      this.setState({ posts: results.data });
    });
  }

  render() {
    const { posts } = this.state;


    return (
      <div className="App__parent" >
        <Header data={this.state.post} />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {
            posts.map(post => (
              // console.log(post)
              < Post key={post.id}
                text={post.text}
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost} />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
