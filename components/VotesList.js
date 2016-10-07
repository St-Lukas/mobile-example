import React from 'react'
import VotesItem from './VotesItem.js'
import config from '../config'
import { CircularProgress } from 'material-ui'

let interval;

class VotesList extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.updateList();
        interval = setInterval(() => this.updateList(), config.interval)
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    updateList() {
        fetch(`${config.api}/list`, { credentials: 'include' })
            .then(res => {
                return res.json();
            })
            .then(data => this.setState({ data }))
    }

    voteBtnClick(id) {
        fetch(`${config.api}/vote`, {
            credentials: 'include',
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `id=${id}`
        }).then(res => {
            return res.json();
        })
        .then(data => this.setState({ data }))
    }

    render() {
        if (this.state.data && this.state.data.length === 0) {
            return (
                <div style={{textAlign: 'center'}}>
                    <CircularProgress size={60} thickness={7} />
                </div>
            )
        }
        return (
            <div className="test">
                {
                    this.state.data.map(item => (
                        <VotesItem key={item.id} onVote={(id) => this.voteBtnClick(id)} {...item} />
                    ))
                }

            </div>
        )
    }

};

module.exports = VotesList;
