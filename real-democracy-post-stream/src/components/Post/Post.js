import React from 'react';

import './Post.css';

const post = (props) => {

    let post;

    if (props.author) {

        post = (
            <div className="FullPost" onClick={props.clicked} >
                <p>{ props.text }</p>
                <div className="Info">
                    <div className="Author">{ props.author }</div>
                </div>
            </div>
        );
    }

    return post;
}


export default post;