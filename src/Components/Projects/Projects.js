/*global chrome*/
import React, {useEffect, useState, useCallback} from 'react';
import {Page, Card, Button, Heading, Icon, Stack, TextStyle, Collapsible} from '@shopify/polaris';
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
import * as helpers from '../../helpers.js';


    const getProjects = () => {
      var user;
      var currentProjects;
      var allProjects;
      var currentProjectsArray = [];
      var allProjectsArray = [];

    chrome.identity.getProfileUserInfo(function(userinfo){
        chrome.runtime.sendMessage({type: 'queryCollectionWithWhere', opts: {collection: 'users', where: ['email', '==', userinfo.email]}}, function(response) {
          if(response !== null) {
            user = JSON.parse(response);
          }

          currentProjects = user.current_projects;
          allProjects = user.all_projects;
          currentProjects.forEach(function(entry) {
            console.log(entry);
            chrome.runtime.sendMessage({ type: 'queryCollectionWithID', opts: { collection: 'project', id: entry } }, function (response) {
              if(response !== null) {
                var responseWithID = JSON.parse(response);
                responseWithID.id = entry;
                currentProjectsArray.push(responseWithID);
              }
            });
          });

          allProjects.forEach(function(entry) {
            console.log(entry);
            chrome.runtime.sendMessage({ type: 'queryCollectionWithID', opts: { collection: 'project', id: entry } }, function (response) {
              if(response !== null) {
                var responseWithID = JSON.parse(response);
                responseWithID.id = entry;
                currentProjectsArray.push(responseWithID);
              }
            });
          });
        });
      });
      return [currentProjectsArray, allProjectsArray];
    }

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

        const closeExtension = () => {}

        const id2List = {
            current: 'current',
            all: 'all'
        };

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

        useEffect( () => {
            var projects = getProjects();
            console.log(projects);
            setAllProjects({
                current: projects[1],
                all: projects[0]
            })
        }, [])


        console.log("rendering")
        const [allProjects, setAllProjects ] = useState({
            current: [],
            all: [],
        });

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
                                            key={project.id}
                                            draggableId={project.id}
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
                                                       <ProjectBrief name={project.project_name} description={project.description} id={project.id} members={project.user_ids.length} />
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
                            <div className="polaris-icon" style={all ? {} : {transform: 'rotate(-180deg)'}}>
                                <Icon source={DropdownMinor}/>
                            </div>
                            <TextStyle variation="strong">{`All (${allProjects.all.length})`}</TextStyle >
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
                                                key={project.id}
                                                draggableId={project.id}
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
                                                       <ProjectBrief name={project.project_name} description={project.description} teamId={project.id} members={project.members} />
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
                </div>
            </DragDropContext>
        );
}

export default Projects;
