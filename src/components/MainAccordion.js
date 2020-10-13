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
            currentTab: -1,
            copied: false
        }
    }

    openTab = (tab) => {
        this.setState({currentTab: tab})
    }

    render() {
        const {currentTab} = this.state;
        return (
            <div className="accordion" id="accordion">
                <div className="card">
                    <div className="card-header" id="crypt" style={{backgroundColor: currentTab === 0 ? 'lightgray': 'white'}}>
                        <h2 className="mb-0">
                        <button className="btn btn-link" type="button" onClick={() => this.openTab(0)}>
                            Crypt
                        </button>
                        </h2>
                    </div>
                    { currentTab === 0 && 
                        <Crypt />
                    }
                </div>
                <div className='card'>
                    <div className="card-header" id="decrypt" style={{backgroundColor: currentTab === 1 ? 'lightgray': 'white'}}>
                        <h2 className="mb-0">
                        <button className="btn btn-link" type="button" onClick={() => this.openTab(1)}>
                            Decrypt
                        </button>
                        </h2>
                    </div>
                    { currentTab === 1 && 
                        <Decrypt />
                    }
                </div>
                <div className='card'>
                    <div className="card-header" id="signing" style={{backgroundColor: currentTab === 2 ? 'lightgray': 'white'}}>
                        <h2 className="mb-0">
                        <button className="btn btn-link" type="button" onClick={() => this.openTab(2)}>
                            Signing
                        </button>
                        </h2>
                    </div>
                    { currentTab === 2 && 
                        <Signing />
                    }
                </div>
                <div className='card'>
                    <div className="card-header" id="verify" style={{backgroundColor: currentTab === 3 ? 'lightgray': 'white'}}>
                        <h2 className="mb-0">
                        <button className="btn btn-link" type="button" onClick={() => this.openTab(3)}>
                            Verify
                        </button>
                        </h2>
                    </div>
                    { currentTab === 3 && 
                        <Verify />
                    }
                </div>
            </div>
        );
    }
}

export default MainAccordion;
