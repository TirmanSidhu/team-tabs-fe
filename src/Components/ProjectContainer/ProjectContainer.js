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
import {
    createProject,
    updateProject,
    createGroupInProject,
    createGroupInGroup,
    createFileInGroup,
    deleteUserFromProject,
    createUserInProject,
    deleteGroupFromGroup,
    deleteGroupFromProject,
    deleteFileFromGroup,
} from '../../helpers.js'

import logo from '../64.png';



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
                        title: "Google's research link",
                        parentTitle: 'Inventory Research'
                    },
                    {
                        type: 'heading',
                        title: 'Rough research',
                        children: [ 
                            {
                                type: 'file',
                                title: "UXR research"
                            }
                        ] 
                    },
                    {
                        type: 'file',
                        title: "Data on inventory",
                        parentTitle: 'Inventory Research'
                    },
                    {
                        type: 'file',
                        title: "Previous Inventory Project",
                        parentTitle: 'Inventory Research'
                    }
                ]
            },
            {
                type: 'heading',
                title: 'Front-end links',
                children: [
                    {
                        type: 'heading',
                        title: 'Ux dev research',
                        children: [ 
                            {
                                type: 'file',
                                title: "Prototyping sandbox"
                            }
                        ] 
                    },
                    {
                        type: 'file',
                        title: "Css tricks"
                    },
                    {
                        type: 'file',
                        title: "Doc of components used"
                    },
                    {
                        type: 'file',
                        title: "New polaris link"
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
        
        // const deleteFile = (title) => {
        //     setProjectStructure(projectStructure.map(folder => {
        //         folder.children.filter(child => child.title !== title)
        //     }))
        // }

        const addTopLevelLink = (title, folderTitle) => {
            setProjectStructure(prevState => {
                const newState = prevState.map( folder => {
                    if(folderTitle == folder.title) {
                        folder.children.push({
                            type: 'file',
                            title: title
                        })
                        return folder;
                    } else {
                        return folder;
                    }
                })
                console.log(newState);
                return newState;
            })
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
                            <Folder title={folder.title} deleteTopLevelHeading={deleteTopLevelHeading} addTopLevelLink={addTopLevelLink}>
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
                <img className="logo" src={logo}/>    
            </div>
        </div>
    );
}

export default ProjectContainer;
