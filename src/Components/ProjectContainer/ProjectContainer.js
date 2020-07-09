import React, {useState, useCallback} from 'react';
import {Page, Card, Button, Heading, Icon, Popover, TextField, FormLayout} from '@shopify/polaris';
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

        const [popoverActive, setPopoverActive] = useState(false);
        const [headingValue, setheadingValue] = useState('');

        const togglePopoverActive = useCallback(
            () => setPopoverActive((popoverActive) => !popoverActive),
            [],
          );

          const handleHeadingChange = useCallback((value) => setheadingValue(value), []);


        function searchTree(element, matchingTitle){
            if(element.title == matchingTitle){
                 return element;
            }else if (element.children != null){
                 var i;
                 var result = null;
                 for(i=0; result == null && i < element.children.length; i++){
                      result = searchTree(element.children[i], matchingTitle);
                 }
                 return result;
            }
            return null;
       }

        const activator = (
            <Button size="slim" onClick={togglePopoverActive} primary>Add heading</Button>    
        );

        const [projectStructure, setProjectStructure ] = useState([
            {
                type: 'heading',
                title: 'Inventory Research',
                children: [
                    {
                        type: 'file',
                        title: "This is a link title1"
                    },
                    {
                        type: 'heading',
                        title: 'rough Research',
                        children: [ 
                            {
                                type: 'file',
                                title: "This is a link title"
                            }
                        ] 
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
                title: 'second heading',
                children: [
                    {
                        type: 'heading',
                        title: 'secondary Research',
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
        ]);

        const addTopLevelHeading = () => {
            setProjectStructure(prevState => {
                return ([...prevState, 
                    {
                        type: 'heading',
                        title: headingValue,
                        children: [ 
                        ] 
                    }
                ])
            })
            setheadingValue('');
            togglePopoverActive();
        }

        const deleteTopLevelHeading = (title) => {
            setProjectStructure(projectStructure.filter(folder => folder.title !== title))
        }

        const deleteLastLevelHeading = (title) => {
            setProjectStructure(projectStructure.filter(folder => folder.title !== title))
        }


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
                            <Folder title={folder.title} deleteTopLevelHeading={deleteTopLevelHeading}>
                                {
                                    folder.children.map(item => {
                                        if(item.type === 'heading') {
                                            return (
                                                <Folder title={item.title} lastLevel>
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
                <Popover
                    active={popoverActive}
                    activator={activator}
                    onClose={togglePopoverActive}
                    ariaHaspopup={false}
                    sectioned
                >
                    <FormLayout>
                    <TextField
                        label="Heading"
                        value={headingValue}
                        onChange={handleHeadingChange}
                    />
                    <Button size="slim" onClick={addTopLevelHeading} >Add Heading</Button>
                    </FormLayout>
                </Popover>       
            </div>
        </div>
    );
}

export default ProjectContainer;
