import React, { Component } from 'react';

import axiosMlab from '../../axiosMlab';

import Post from '../../components/Post/Post';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {

        this.getPosts()
    }
    componentDidUpdate() {


    }
    postFaved(id) {
        console.log(id)
        this.setState({
            selectedPostId: id
        });
    }
    getPosts() {

        axiosMlab.get('/posts')
            .then( resp => {
                this.setState({
                    posts: resp.data
                });
            });
    }
    render () {
        let posts;

        if (this.state.error) {
            posts = <p style={{ textAlign: 'center', color: 'red' }} >Unable to retrieve posts...</p>
        }

        if ( !this.state.posts.length ) {
            posts = <p style={{ textAlign: 'center' }} >No posts found...</p>
        }

        if ( this.state.posts.length ) {

            posts = this.state.posts.map( post => (
                <Post key={ post._id['$oid'] }
                    text={ post.text }
                    author={ post.author }
                    clicked={ () => this.postFaved(post._id['$oid']) } />
            ))
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <NewPost postSuccess={() => this.getPosts()} />
                </section>
            </div>
        );
    }
}

export default Blog;