import React, { createElement } from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';


const Menu = ({ resources, onMenuClick, logout }) => (
    <div>
        {resources.map(resource => (
            <MenuItemLink 
                to={`/${resource.name}`}
                primaryText={resource.name}
                leftIcon={createElement(resource.icon)}
                onClick={onMenuClick}
            />
        ))}
        <MenuItemLink 
            to="/support"
            primaryText="Support"
            leftIcon={<LabelIcon />}
            onClick={onMenuClick} />
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));