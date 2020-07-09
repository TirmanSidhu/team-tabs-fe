import React, {useState, useCallback} from 'react';
import {Page, Card, Button, Heading, Icon, Stack, TextStyle, ResourceItem, Avatar, TextField} from '@shopify/polaris';
import {
    DropdownMinor,
    ChevronLeftMinor,
    CustomerPlusMajorMonotone,
    LinkMinor,
    MobileCancelMajorMonotone
  } from "@shopify/polaris-icons";
import { Link } from "react-router-dom";
import './AddProject.css';

function AddProject() {

    const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

    const handleTextFieldChange = useCallback(
      (value) => setTextFieldValue(value),
      [],
    );

    return (
        <div className="add-project">
            <div className="teams-heading">
                <Heading>Add a project</Heading>
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
                    <div className="text-field-container">
                        <h3>
                            <TextStyle variation="strong">Name</TextStyle>
                        </h3>
                        <TextField
                            value={textFieldValue}
                            onChange={handleTextFieldChange}
                            maxLength={20}
                            showCharacterCount
                        />
                    </div>
                    <div className="text-field-container">
                        <h3>
                            <TextStyle variation="strong">Description</TextStyle>
                        </h3>
                        <TextField
                            value={textFieldValue}
                            onChange={handleTextFieldChange}
                            maxLength={120}
                            showCharacterCount
                            multiline={3}
                        />
                    </div>
                </Card>
                <Card>
                    <div className="share-link">
                        <div className="polaris-icon" style={{width: '18px'}}>
                            <Icon source={LinkMinor}/>
                        </div>
                        <TextStyle variation="strong">Shareable Link to Join</TextStyle>
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
            </div>
            <div className="bottom-bar">
                <Button primary size="slim">Make Project</Button>            
            </div>
        </div>
    );
}

export default AddProject;
