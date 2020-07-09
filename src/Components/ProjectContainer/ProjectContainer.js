import React, {useState, useCallback} from 'react';
import {Page, Card, Button, Heading, Icon, Stack, TextStyle, Collapsible} from '@shopify/polaris';
import {
    DropdownMinor,
    ChevronDownMinor,
    CustomerPlusMajorMonotone,
    MobileCancelMajorMonotone
  } from "@shopify/polaris-icons";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from "react-router-dom";
import Folder from './Folder';
import File from './File';
import './ProjectContainer.css';


function ProjectContainer(props) {

        //fetch from props.location.id

        const [projectStructure, setProjectStructure ] = useState([
            {
                type: 'heading',
                title: 'Inventory Research',
                children: [
                    {
                        type: 'heading',
                        title: 'Inventory Research',
                        children: [ 
                            {
                                type: 'file',
                                title: "This is a link title"
                            }
                        ] 
                    },
                    {
                        type: 'file',
                        title: "This is a link title1"
                    },
                    {
                        type: 'file',
                        title: "This is a link title2"
                    },
                    {
                        type: 'file',
                        title: "This is a link title3"
                    }
                ]
            },
            {
                type: 'heading',
                title: 'Inventory Research',
                children: [
                    {
                        type: 'heading',
                        title: 'Inventory Research',
                        children: [ 
                            {
                                type: 'file',
                                title: "This is a link title"
                            }
                        ] 
                    },
                    {
                        type: 'file',
                        title: "This is a link title1"
                    },
                    {
                        type: 'file',
                        title: "This is a link title2"
                    },
                    {
                        type: 'file',
                        title: "This is a link title3"
                    }
                ]
            },
        ])

    return (
        <div>
            <div className="projects-heading">
                <Heading>{props.location.name}</Heading>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button
                        accessibilityLabel="Cancel"
                        icon={MobileCancelMajorMonotone}
                        plain
                    />
                </Link>
            </div>
            <div className="project-space">
                <Card>
                    {projectStructure.map(folder => {
                        return (
                            <Folder title={folder.title}>
                                {
                                    folder.children.map(item => {
                                        if(item.type === 'heading') {
                                            return (
                                                <Folder title={folder.title} lastLevel>
                                                    {
                                                        item.children.map(file => <File title={file.title} link="shopify.com"/>)
                                                    }
                                                </Folder>
                                            )
                                        } else {
                                            return (<File title={item.title} link="shopify.com"/>)
                                        }
                                    })
                                }
                            </Folder>
                        )
                    })}
                </Card>
            </div>
            <div className="bottom-bar">
                <Link to="/add-project" style={{ textDecoration: 'none' }}>
                    <Button size="slim" primary>Add a heading</Button>            
                </Link>
            </div>
        </div>
    );
}

export default ProjectContainer;
