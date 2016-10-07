import React, { Component } from 'react'
import { TextField, Card, CardHeader, CircularProgress, Subheader } from 'material-ui'
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
        comments: []
    }

    componentDidMount() {
        interval = setInterval(this.updateComments.bind(this), config.interval)
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
        if (this.state.comments && this.state.comments.length === 0) {
            return (
                <div style={{textAlign: 'center'}}>
                    <CircularProgress size={60} thickness={7} />
                </div>
            )
        }
        return (
            <div>
                <Subheader style={{paddingLeft: 0, lineHeight: '24px'}}>Комментарий</Subheader>
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

