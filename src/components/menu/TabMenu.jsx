import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Crypt from '../tabs/Crypt';
import Decrypt from '../tabs/Decrypt';
import Signing from '../tabs/Signing';
import Verify from '../tabs/Verify';
import Help from '../tabs/Help';

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
                <Decrypt />
            </Tab>
            <Tab eventKey="3" title="Signing">
                <Signing />
            </Tab>
            <Tab eventKey="4" title="Verify">
                <Verify />
            </Tab>
            <Tab eventKey="5" title="Help">
                <Help />
            </Tab>
        </Tabs>
    );
}
