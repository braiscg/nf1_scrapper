import React, {Component} from 'react';

class Tweet extends Component {
    constructor() {
        super();
        this.state = {
            tweetsWithSentiment: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/documents')
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
            let tweets = results.map((tweet) => {
                return (
                    <div>{tweet.user} - {tweet.body} </div>
                )

            });

            this.setState({tweets: tweets});

        })
    }

    render() {
        return (<div>
                {this.state.tweets}
            </div>
        )
    }
}

export default Tweet;
