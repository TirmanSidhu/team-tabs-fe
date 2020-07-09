import React, { useState, useCallback } from 'react';
import { Page, Card, Button, Heading, Icon, Stack, TextStyle, ResourceItem, Avatar, TextField } from '@shopify/polaris';
import {
    DropdownMinor,
    ChevronLeftMinor,
    CustomerPlusMajorMonotone,
    LinkMinor,
    MobileCancelMajorMonotone
} from "@shopify/polaris-icons";
import { Link } from "react-router-dom";
import './AddProject.css';
/*global chrome*/

function AddProject() {

    const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

    const handleTextFieldChange = useCallback(
        (value) => setTextFieldValue(value),
        [],
    );

    const currentUserId = 'aoA2AfS5key5e4skHS9Z';
    function createProject(project_name, description, emoji_name, user_ids, vault_url) {
        var projectData = {
            current: false,
            project_name: project_name,
            description: description,
            emoji_name: emoji_name,
            group_ids: [],
            user_ids: user_ids,
            vault_url: vault_url
        }
        console.log('calling create function')
        chrome.runtime.sendMessage({ type: 'addWithRandomID', opts: { collection: 'project', data: projectData } }, function (response) {
            if (response.status == 'success') {
                console.log('project added: ', response.docRefId)
                alert('project added successfully');
            }
        });
    }

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
                        <div className="polaris-icon" style={{ width: '18px' }}>
                            <Icon source={LinkMinor} />
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
                <Button primary size="slim" onClick={
                    createProject(
                        'CREATING PROJECT ON REACT',
                        'Testing add project function',
                        'open_file_folder',
                        [currentUserId],
                        'https://vault.shopify.io/projects/10600')
                }>
                    Make Project
                </Button>
            </div>
        </div>
    );
}

export default AddProject;
