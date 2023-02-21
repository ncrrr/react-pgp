import React, { Component } from 'react';
import Crypt from './Crypt';
import Decrypt from './Decrypt';
import Signing from './Signing';
import Verify from './Verify';

class MainAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decryptText: "",
            decryptKey: "",
            currentTab: 0,
            copied: false
        }
    }

    openTab = (tab) => {
        this.setState({currentTab: tab})
    }

    render() {
        const {currentTab} = this.state;
        return (
            <>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={"nav-link" + (currentTab === 0 ? ' active' : '')} id="home-tab" data-bs-toggle="tab" data-bs-target="#crypt" type="button" role="tab" aria-controls="home" aria-selected={currentTab === 0 ? 'true' : 'false'} onClick={() => this.openTab(0)}>Crypt</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={"nav-link" + (currentTab === 1 ? ' active' : '')} id="profile-tab" data-bs-toggle="tab" data-bs-target="#decrypt" type="button" role="tab" aria-controls="profile" aria-selected={currentTab === 1 ? 'true' : 'false'} onClick={() => this.openTab(1)}>Decrypt</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={"nav-link" + (currentTab === 2 ? ' active' : '')} id="contact-tab" data-bs-toggle="tab" data-bs-target="#signing" type="button" role="tab" aria-controls="contact" aria-selected={currentTab === 2 ? 'true' : 'false'} onClick={() => this.openTab(2)}>Signing</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={"nav-link" + (currentTab === 3 ? ' active' : '')} id="contact-tab" data-bs-toggle="tab" data-bs-target="#verify" type="button" role="tab" aria-controls="contact" aria-selected={currentTab === 3 ? 'true' : 'false'} onClick={() => this.openTab(3)}>Verify</button>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    <div className={"tab-pane fade" + (currentTab === 0 ? ' show active' : '')} id="crypt" role="tabpanel" aria-labelledby="crypt-tab">
                        <Crypt />
                    </div>
                    <div className={"tab-pane fade" + (currentTab === 1 ? ' show active' : '')} id="decrypt" role="tabpanel" aria-labelledby="decrypt-tab">
                        <Decrypt />
                    </div>
                    <div className={"tab-pane fade" + (currentTab === 2 ? ' show active' : '')} id="signing" role="tabpanel" aria-labelledby="signing-tab">
                        <Signing />
                    </div>
                    <div className={"tab-pane fade" + (currentTab === 3 ? ' show active' : '')} id="verify" role="tabpanel" aria-labelledby="verify-tab">
                        <Verify />
                    </div>
                </div>
            </>
        );
    }
}

export default MainAccordion;
