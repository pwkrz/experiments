import React, { Component } from 'react';
import axios from 'axios'
import axiosMlab from '../../axiosMlab'

import './NewPost.css';

class NewPost extends Component {
    state = {
        author: '',
        text: '',
        mongoErr: false
    }

    mongoErrHandler = err => { if (err) this.setState({ mongoErr: true }); }

    submitPost = () => {

        const POST_DATA = {
            author: this.state.author,
            text: this.state.text,
            timestamp: Date.now()
        }

        axios.get('http://ip-api.com/json')
            .then( resp => {

                const IPDATA = resp.data;

                POST_DATA.author += ` ${IPDATA.query} (${IPDATA.city || 'unknown city'}, ${IPDATA.country || 'unknown country'})`;

                POST_DATA.author = POST_DATA.author.trim();
            })
            .catch( () => {

                POST_DATA.author = 'unabled to get ip info, so...';
                
            })
            .finally( () => {

                axiosMlab.post('/posts', POST_DATA)
                    .then( () => {

                        console.log('Post posted')

                        this.props.postSuccess()

                        this.setState({
                            author: '',
                            text: '',
                            mongoErr: false
                        })
                    })
                    .catch( err => {

                        this.setState({ mongoErr: true })
                    })
            })
    }

    setAuthor = (event) => {

        const AUTHOR = `${event.target.value}`

        this.setState({author: AUTHOR})  
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Post text (max. 140 chars)</label>
                <textarea rows="4" value={this.state.text} onChange={(event) => this.setState({text: event.target.value})} />
                <label>Author</label>
                <input type="text" value={this.state.author} onChange={(event) => this.setState({author: event.target.value})} />
                <button onClick={ this.submitPost } >Add Post</button>
            </div>
        );
    }
}

export default NewPost;