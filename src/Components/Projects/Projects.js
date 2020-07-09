import React, {useState, useCallback} from 'react';
import {Page, Card, Button, Heading, Icon, Stack, TextStyle, Collapsible, Popover, TextField, FormLayout} from '@shopify/polaris';
import {
    DropdownMinor,
    ChevronDownMinor,
    CustomerPlusMajorMonotone,
    MobileCancelMajorMonotone
  } from "@shopify/polaris-icons";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from "react-router-dom";
import './Projects.css';
import ProjectBrief from './ProjectBrief';

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",

        // change background colour if dragging
        boxShadow: isDragging ? "0px 0px 4px 4px rgba(89,103,195,0.38)" : "",
        background: isDragging ? '#F4F6F8' : "",
        padding: 10,

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "rgba(89, 103, 195, 0.1)" : "",
    });

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

function Projects(props) {
        const [all, setAll] = useState(true);
        const handleAllToggle = useCallback(() => setAll((all) => !all), []);

        const [popoverActive, setPopoverActive] = useState(false);
        const [linkValue, setLinkValue] = useState('');
        const handleLinkChange = useCallback((value) => setLinkValue(value), []);

        const togglePopoverActive = useCallback(
            () => setPopoverActive((popoverActive) => !popoverActive),
            [],
          );

        const id2List = {
            current: 'current',
            all: 'all'
        };

        let currentUserId = 'aoA2AfS5key5e4skHS9Z';

        const getList = id => allProjects[id2List[id]];

        const onDragEnd = result => {
            const { source, destination } = result;

            // dropped outside the list
            if (!destination) {
                return;
            }

            if (source.droppableId === destination.droppableId) {
                const items = reorder(
                    getList(source.droppableId),
                    source.index,
                    destination.index
                );

                if (source.droppableId === 'current') {
                    setAllProjects(prevState => {
                        return {...prevState, current: items}
                    })
                } else {
                    setAllProjects(prevState => {
                        return {...prevState, all: items}
                    })
                }

            } else {
                const result = move(
                    getList(source.droppableId),
                    getList(destination.droppableId),
                    source,
                    destination
                );
                setAllProjects(result);
            }
        };

    const [allProjects, setAllProjects ] = useState({
            all: [
            {
                project_id: 'project_1',
                project_name: 'Store Performance',
                members: 12,
                project_description: `Making Shopify a reliable, up-to-date source of truth about the state of a business's inventory.`,
            },
            {
                project_id: 'project_2',
                project_name: 'Shop Lab',
                members: 11,
                project_description: `Making Shopify a reliable, up-to-date source of truth about the state of a business's inventory.`,
            }
        ],
        current: [
            {
                project_id: 'project_0',
                project_name: 'Inventory States',
                project_description: `Making Shopify a reliable, up-to-date source of truth about the state of a business's inventory.`,
                members: 13,
            }
        ]
    })

    const addCurrentProject = () => {
        setAllProjects(prevState => {
            return ({...prevState,
                current: [...prevState.current,
                    {
                        project_id: 'project_4',
                        project_name: 'Store Data',
                        members: 5,
                        project_description: `Making Shopify a reliable, up-to-date source of truth about the state of a business's inventory.`,
                    }
                ]
            })
        })
        setLinkValue('');
        togglePopoverActive();
    }

    const joinProject = (<Button size="slim" onClick={setPopoverActive} primary>Join a project</Button>);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="projects-heading">
                <Heading>Projects</Heading>
            </div>
            <div className="project-space">
                <Card>
                    <div className="project-category">
                        <TextStyle variation="strong">Current</TextStyle >
                    </div>
                    <Droppable droppableId="current">
                        {(provided, snapshot) => (
                            <div className="project-container" ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                {allProjects.current.map((project, i) => (
                                    <Draggable
                                        key={project.project_id}
                                        draggableId={project.project_id}
                                        index={i}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                   <ProjectBrief name={project.project_name} description={project.project_description} id={project.project_id} members={project.members} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Card>
                <Card>
                    <div onClick={handleAllToggle} className="project-dropdown">
                        <TextStyle variation="strong">{`All (${allProjects.all.length})`}</TextStyle >
                        <div className="polaris-icon" style={all ? {} : {transform: 'rotate(-180deg)'}}>
                            <Icon source={DropdownMinor}/>
                        </div>
                    </div>
                    <Collapsible
                        open={all}
                        id="basic-collapsible"
                        transition={{duration: '150ms', timingFunction: 'ease'}}
                    >
                        <Droppable droppableId="all">
                            {(provided, snapshot) => (
                                <div className="project-container" ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                    {allProjects.all.map((project, i) => (
                                        <Draggable
                                            key={project.project_id}
                                            draggableId={project.project_id}
                                            index={i}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                   <ProjectBrief name={project.project_name} description={project.project_description} teamId={project.project_id} members={project.members} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Collapsible>
                </Card>
            </div>
            <div className="bottom-bar">
                <Link to="/add-project" style={{ textDecoration: 'none' }}>
                    <Button size="slim" primary>Make a project</Button>
                </Link>
                <Popover
                    active={popoverActive}
                    activator={joinProject}
                    onClose={togglePopoverActive}
                    ariaHaspopup={false}
                    sectioned
                >
                    <FormLayout>
                    <TextField
                        label="Project Link"
                        value={linkValue}
                        onChange={handleLinkChange}
                    />
                    <Button size="slim" onClick={addCurrentProject} >Add Heading</Button>
                    </FormLayout>
                </Popover>
            </div>
        </DragDropContext>
    );
}

export default Projects;
