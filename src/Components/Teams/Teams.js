import React, {useState, useCallback} from 'react';
import {Page, Card, Button, Heading, Icon, Stack, TextStyle, ResourceItem, Avatar, ResourceList} from '@shopify/polaris';
import {
    DropdownMinor,
    ChevronLeftMinor,
    CustomerPlusMajorMonotone,
    LinkMinor,
    MobileCancelMajorMonotone
  } from "@shopify/polaris-icons";
import { Link } from "react-router-dom";
import './Teams.css';
import logo from '../64.png';

function Teams(props) {

    //use this to fetch team data
    console.log(props.location.teamId)


    const people = [
        {
            id: 341,
            name: 'Mae Jemison',
        },
        {
            id: 256,
            name: 'Ellen Ochoa',
        },
        {
            id: 236,
            name: 'Another Name',
        },
        {
            id: 156,
            name: 'Test Name',
        },
        {
            id: 156,
            name: 'Test Name',
        },
    ];

    return (
        <div className="teams">
            <div className="teams-heading">
                <Heading>Share with contributors</Heading>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button
                        accessibilityLabel="Cancel"
                        icon={MobileCancelMajorMonotone}
                        plain
                    />
                </Link>
            </div>
            <div className="team-space">
                <Card>
                    <div className="share-link">
                        <div className="polaris-icon" style={{width: '18px'}}>
                            <Icon source={LinkMinor}/>
                        </div>
                        <TextStyle variation="strong"><span style={{color: '#5c6ac4'}}>Inventory States</span> link</TextStyle>
                    </div>
                    <div className="link-container">
                        <div className="link">
                            https://tabify.com/834638
                        </div>
                        <div>
                            <Button size="slim" primary>Copy</Button> 
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="contributors">
                        <TextStyle variation="strong">Contributors</TextStyle>
                    </div>
                    <ResourceList
                        resourceName={{singular: 'customer', plural: 'customers'}}
                        items={people}
                        renderItem={(item) => {
                            const {id, name} = item
                            const media = (<Avatar customer size="medium" name={name} />)
                            return (
                                <ResourceItem
                                    id={id}
                                    accessibilityLabel={`View details for ${name}`}
                                >
                                    <div className="items">  
                                        <Avatar customer size="medium" name={name} />
                                        <h3>
                                            <TextStyle variation="strong">{name}</TextStyle>
                                        </h3>
                                    </div>
                                </ResourceItem>
                            );
                        }}
                    />
                </Card>
            </div>
            <div className="bottom-bar">
                <Button primary size="slim">Leave Project</Button> 
                <img className="logo" src={logo}/>              
            </div>
        </div>
    );
}

export default Teams;
