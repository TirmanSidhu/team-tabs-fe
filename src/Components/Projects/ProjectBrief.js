import React, {useState, useCallback} from 'react';
import {Icon, TextStyle} from '@shopify/polaris';
import {
    CustomerPlusMajorMonotone,
  } from "@shopify/polaris-icons";
import { Link } from "react-router-dom";

function ProjectBrief(props) {

    return (
        <>
            <div className="project-title-bar">
                <Link to={{pathname: "/project-container", id: props.id, name: props.name}} style={{ textDecoration: 'none', color: 'black' }}>
                    <TextStyle variation="strong">{props.name}</TextStyle >
                </Link>
                <Link to={{pathname: "/teams", teamId: props.id}} style={{ textDecoration: 'none' }}>
                    <div className="add-contributors" onClick={() => {}}>
                        {`${props.members}`}
                        <div style={{width: '16px'}}>
                            <Icon source={CustomerPlusMajorMonotone} color="indigo"/>
                        </div>
                    </div>
                </Link>
            </div>
            <p className="project-description">
                {props.description}
            </p>
        </>
    );
}

export default ProjectBrief;
