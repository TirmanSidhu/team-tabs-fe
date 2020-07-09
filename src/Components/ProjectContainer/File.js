import React, {useState, useCallback} from 'react';
import {Page, Card, Button, Link, Icon, Stack, TextStyle, Collapsible} from '@shopify/polaris';
import {
    MobileVerticalDotsMajorMonotone,
    ChevronDownMinor,
    CustomerPlusMajorMonotone,
    MobileCancelMajorMonotone
  } from "@shopify/polaris-icons";
import './ProjectContainer.css';


export default function Folder(props) {

    return (
        <div className="file">
            <div className="polaris-icon">
                <Icon source={MobileVerticalDotsMajorMonotone} />
            </div>
            <div >
                <Link url={props.link}>{props.title}</Link>
            </div>
        </div>
    )

} 