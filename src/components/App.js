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
      // console.log(res.data)
      this.setState({
        posts: res.data
      });
    })
  }

  updatePost(id, text) {
    axios.put(`${baseUrl}/posts?id=${id}`, { text }).then(res => {
      this.setState({ posts: res.data })
    })
  }

  deletePost() {

  }

  createPost() {

  }

  render() {
    const { posts } = this.state;


    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {posts.map(post => (
            // console.log(post)
            < Post key={post.id}
              text={post.text}
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost} />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
