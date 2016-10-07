import React, { Component } from 'react'
import { TextField, Divider, Card, CardHeader } from 'material-ui'
import config from '../config'
import moment from 'moment'
import 'moment/locale/ru'

// moment.locale('ru');

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
        interval = setInterval(this.updateComments.bind(this), 5000)
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    updateComments() {
        fetch(`${config.api}/comments`, { credentials: 'include' })
            .then(res => res.json())
            .then(comments => this.setState({ comments }))
    }

    addComment(name, text) {
        return fetch(`${config.api}/add-comment`, {
            credentials: 'include',
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `name=${name}&text=${text}`
        })
        .then(res => res.json())
        .then(comments => this.setState({ comments }))
    }

    render() {
        return (
            <div>
                <TextField
                    fullWidth={true}
                    hintText="Текст комментария"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            this.addComment(config.name, e.target.value);
                            e.target.value = ''
                        }

                    }}
                />
                {
                    this.state.comments
                        .map(comment => (
                            <Card key={ comment.id }>
                                <CardHeader
                                    title={ comment.text }
                                    subtitle={ `${comment.name} - ${moment(comment.date).fromNow()}` }
                                    style={{paddingRight: 0}}
                                    subtitleStyle={{fontSize: '12px', marginTop: '5px'}}
                                />
                            </Card>
                        ))
                }

            </div>
        )
    }
}

