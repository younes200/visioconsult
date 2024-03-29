import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import {observer, inject} from 'mobx-react';

@withSnackbar
@inject('session')
@observer
class Notifier extends Component {
    state = {
        displayed: [],
    };

    storeDisplayed = (key) => {
        this.setState(({ displayed }) => ({
            displayed: [...displayed, key],
        }));
    };

    render() {
        const {  enqueueSnackbar, removeSnackbar } = this.props
        const { notifications } = this.props.session
        const { displayed } = this.state;

        notifications.forEach((notification) => {
            setTimeout(() => {
                // If notification already displayed, abort
                if (displayed.indexOf(notification.key) > -1) return;
                // Display notification using notistack
                enqueueSnackbar(notification.message, notification.options);
                // Add notification's key to the local state
                this.storeDisplayed(notification.key);
                // Dispatch action to remove the notification from the redux store
                this.props.session.removeSnackbar(notification.key);
            }, 1);
        });

        return null;
    }
}

export default Notifier