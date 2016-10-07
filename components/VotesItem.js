import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const VotesItem = (props) => (
    <Card>
        <CardHeader
            title={ props.person.name }
            subtitle={ props.person.position }
            avatar={ props.person.avatarUrl }
            actAsExpander={true}
        />
        <CardTitle title={ props.title } />
        <CardText>
            { props.description }
        </CardText>
        <CardActions>
            <FlatButton onClick={() => props.onVote(props.id) } label={`Голосов: ${props.votes || '0'}`} />
        </CardActions>
    </Card>
);

export default VotesItem;
