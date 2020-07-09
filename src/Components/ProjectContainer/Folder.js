import React, {useState, useCallback} from 'react';
import {Page, Card, Button, Heading, Icon, Stack, TextStyle, Collapsible} from '@shopify/polaris';
import {
    DropdownMinor,
    ChevronDownMinor,
    CustomerPlusMajorMonotone,
    MobileCancelMajorMonotone
  } from "@shopify/polaris-icons";
import './ProjectContainer.css';


export default function Folder(props) {
        const [folder, setFolder] = useState(props.lastlevel ? false : true);
        const handleFolderToggle = useCallback(() => setFolder((folder) => !folder), []);

    return (
        <div>
            <div onClick={handleFolderToggle} className="folder">
                <div className="polaris-icon" style={folder ? {} : {transform: 'rotate(-180deg)'}}>
                    <Icon source={DropdownMinor}/>
                </div>
                <TextStyle variation="strong">{props.title}</TextStyle >
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