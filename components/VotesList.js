import React from 'react'
import VotesItem from './VotesItem.js'
import config from '../config'

class VotesList extends React.Component {
    state = {
        data: [
            {
                id: 1,
                person: {
                    name: 'Михаил Трошев',
                    position: 'Руководитель службы поисковых интерфейсов',
                    avatarUrl: "https://avatars.yandex.net/get-yaevents/1488780d5280b517a74341b323325d83/365x365"
                },
                title: 'Особенности работы распределенной команды',
                description: 'Хорошие разработчики есть не только в Москве, и не все стремятся переехать в столицу. Я поделюсь собственным опытом построения большой слаженной команды разработчиков, распределенных по нескольким городам.',
                votes: 12
            }
        ]
    }

    compodonentDidMount() {
        // fetch(`${config.api}/list`)
        //     .then(data => this.setState({ data }))
    }

    voteBtnClick(id) {
        fetch(`${config.api}/vote`, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `id=${id}`
        }).then(data => this.setState({ data }))
    }

    render() {
        return (
            <div className="test">
                {
                    this.state.data.map(item => (
                        <VotesItem key={item.id} {...item} />
                    ))
                }

            </div>
        )
    }

};

module.exports = VotesList;
