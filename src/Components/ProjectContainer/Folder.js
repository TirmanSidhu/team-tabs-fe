import React, {useState, useCallback} from 'react';
import {Page, Card, Button, Heading, Icon, Popover, TextField, FormLayout, TextStyle, Collapsible} from '@shopify/polaris';
import {
    DropdownMinor,
    FolderPlusMajorMonotone,
    PagePlusMajorMonotone,
    DeleteMajorMonotone
  } from "@shopify/polaris-icons";
import './ProjectContainer.css';


export default function Folder(props) {
        const [folder, setFolder] = useState(props.lastLevel ? false : true);
        const handleFolderToggle = useCallback(() => setFolder((folder) => !folder), []);


        const [filePop, setFilePop] = useState(false);
        const [folderPop, setFolderPop] = useState(false);

        const toggleFilePop = useCallback(
            () => setFilePop((filePop) => !filePop),
            [],
          );

        const toggleFolderPop = useCallback(
        () => setFolderPop((folderPop) => !folderPop),
        [],
        );

        const handleHeadingChange = useCallback((value) => setheadingValue(value), []);
        const handleTitleChange = useCallback((value) => setTitle(value), []);
        const handleURLChange = useCallback((value) => setURL(value), []);

        const [headingValue, setheadingValue] = useState('');
        const [title, setTitle] = useState('');
        const [url, setURL] = useState('');


        const addFile = (event) => {
            event.stopPropagation();
            if(folderPop) {
                toggleFolderPop();
            }
            toggleFilePop();
        }

        const addFolder = (event) => {
            event.stopPropagation();
            if(filePop) {
                toggleFilePop();
            }
            toggleFolderPop();
        }
        const addLink = () => {
            console.log(title, props.title)
            props.addTopLevelLink(title, props.title);
            toggleFilePop(); 
        }
        const fileButton = (
            <Button
                accessibilityLabel="file"
                icon={PagePlusMajorMonotone}
                plain
                onClick={addFile}
            />
        );

        const folderButton = (
            <Button
                accessibilityLabel="folder"
                icon={FolderPlusMajorMonotone}
                plain
                onClick={addFolder}
            />
        )

        const deleteHeading = (event) => {
            event.stopPropagation();
            if(props.lastLevel) {

            } else {
                props.deleteTopLevelHeading(props.title)
            }
        }

    return (
        <div>
            <div onClick={handleFolderToggle} className="folder" style={folder ? {backgroundColor: "rgba(89, 103, 195, 0.05)", borderLeft: "2px solid rgb(89, 103, 195)"} : {}}>
                <TextStyle variation="strong">{props.title}</TextStyle >
                <div className="polaris-icon" style={folder ? {} : {transform: 'rotate(-180deg)'}}>
                    <Icon source={DropdownMinor}/>
                </div>
                <div className="folder-buttons">
                    <div onClick={e => e.stopPropagation()}>
                        <Popover
                            active={filePop}
                            activator={fileButton}
                            onClose={toggleFilePop}
                            ariaHaspopup={false}
                            sectioned
                        >
                            <FormLayout>
                                <TextField
                                    label="Title"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                                <TextField
                                    label="URL"
                                    value={url}
                                    onChange={handleURLChange}
                                />
                                <Button size="slim" onClick={addLink}>Add Link</Button>
                            </FormLayout>
                        </Popover>
                    </div>
                    <div style={props.lastLevel ? {display: 'none'} : {}}>
                        <Popover
                            active={folderPop}
                            activator={folderButton}
                            onClose={toggleFolderPop}
                            ariaHaspopup={false}
                            sectioned
                        >
                            <FormLayout>
                            <TextField
                                label="Heading"
                                value={headingValue}
                                onChange={handleHeadingChange}
                            />
                            <Button size="slim" onClick={addFile}>Add Heading</Button>
                            </FormLayout>
                        </Popover>  
                    </div>
                    <div style={{marginLeft: '8px'}}>
                        <Button
                            accessibilityLabel="delete"
                            icon={DeleteMajorMonotone}
                            plain
                            onClick={deleteHeading}
                        />
                    </div>
                </div>
            </div>
            <Collapsible
                open={folder}
                id="basic-collapsible"
                transition={{duration: '150ms', timingFunction: 'ease'}}
            >
                <div className="folder-container">
                    {props.children}
                </div> 
            </Collapsible>
        </div>
    )

}