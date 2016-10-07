import React from 'react';
import { TextField, FlatButton, Dialog } from 'material-ui'
import config from '../config'

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class EnterName extends React.Component {
    state = {
        open: !config.name
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Отмена"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="ОК"
                primary={true}
                disabled={!this.state.name}
                onTouchTap={()=> {
                    if (this.state.name) {
                        window.localStorage.setItem('name', this.state.name);
                        config.name = this.state.name;
                        this.handleClose()
                    }
                }}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Введите ваше имя"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <TextField
                        onChange={(e) => this.setState({ name: e.target.value })}
                        fullWidth={true}
                        hintText="Ваше имя" />
                </Dialog>
            </div>
        );
    }
}
