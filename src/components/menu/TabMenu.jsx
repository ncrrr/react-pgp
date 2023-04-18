import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Crypt from '../tabs/Crypt';

export default function TabMenu() {
    const [currentTab, setCurrentTab] = useState(1);

    return (
        <Tabs
            defaultActiveKey="1" id="uncontrolled-tab-example" className="mb-3"
            activeKey={currentTab}
            onSelect={(k) => setCurrentTab(k)}
        >
            <Tab eventKey="1" title="Crypt">
                <Crypt />
            </Tab>
            <Tab eventKey="2" title="Decrypt">
                <p>profile</p>
            </Tab>
            <Tab eventKey="3" title="Signing">
                <p>contact</p>
            </Tab>
            <Tab eventKey="4" title="Verify">
                <p>contact</p>
            </Tab>
        </Tabs>
    );
}
