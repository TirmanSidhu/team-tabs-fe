import React, {useState, useCallback} from 'react';
import {Page, Card, ActionList, Button, Popover, Link, Icon, Stack, TextStyle, Collapsible} from '@shopify/polaris';
import {
    MobileVerticalDotsMajorMonotone,
    DeleteMinor,
    EditMinor,
    MobileCancelMajorMonotone
  } from "@shopify/polaris-icons";
import './ProjectContainer.css';


export default function Folder(props) {

    const [popoverActive, setPopoverActive] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
      );

    const activator = (
        <Button
            accessibilityLabel="Cancel"
            icon={MobileVerticalDotsMajorMonotone}
            plain
            onClick={togglePopoverActive}
        />
    );

    return (
        <div className="file" style={deleted ? {display: 'none'} : {}}>
            <div className="popover">
                <Popover
                    active={popoverActive}
                    activator={activator}
                    onClose={togglePopoverActive}
                >
                   <ActionList
                        items= {[
                            {content: 'Title', icon: EditMinor},
                            {content: 'URL', icon: EditMinor},
                            {
                            destructive: true,
                            content: 'Delete',
                            icon: DeleteMinor,
                            onAction: () => {setDeleted(true); togglePopoverActive()}
                            },
                        ]}
                    />
                </Popover>
            </div>
            <div className="file-link">
                <Link url={props.link}>{props.title}</Link>
            </div>
        </div>
    )

} 