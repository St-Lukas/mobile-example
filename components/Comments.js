import React, { Component } from 'react'
import { TextField, Divider, Card, CardHeader } from 'material-ui'
import config from '../config'

let paperStyle = {
    width: '100%',
    minHeight: 50
};

let interval;

export default class Comments extends Component {
    state = {
        comments: [{
                id: 1,
                name: '@ssav',
                text: 'Вот такие дела!'
            },
            {
                id: 2,
                name: '@log1n',
                text: 'Напиши гермиону!'
            }]
    }

    componentDidMount() {
        // interval = setInterval(this.updateComments.bind(this), 5000)
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    updateComments() {
        fetch(`${config.api}/comments`)
            .then(comments => this.setState({ comments }))
    }

    addComment(name, text) {
        return fetch(`${config.api}/add-comment`, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `name=${name}&text=${text}`
        }).then(comments => this.setState({ comments }))
    }

    render() {
        return (
            <div>
                <TextField
                    fullWidth={true}
                    hintText="Текст комментария"
                    onKeyDown={(e) => {
                        console.log(e.keyCode, e.which);
                        if (e.keyCode === 13) {
                            this.addComment(config.name, e.target.value)
                                .then(() => e.target.value = '')
                        }

                    }}
                />
                {
                    this.state.comments.map(comment => (
                        <Card key={ comment.id }>
                            <CardHeader
                                title={ comment.name }
                                subtitle={ comment.text }
                            />
                        </Card>
                    ))
                }

            </div>
        )
    }
}

