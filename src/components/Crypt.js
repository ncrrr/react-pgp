import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as openpgp from 'openpgp';

class Crypt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            key: "",
            signingOption: false,
            signingKey: "",
            passphrase: "",
            result: "",
            copied: false
        }
    }

    crypt = async (e) => {
        e.preventDefault();
        const {text, key, signingOption, signingKey, passphrase} = this.state;

        try {
            try {
                // start worker
                await openpgp.initWorker({ path: 'lib/openpgp.worker.js' });
            } catch (error) {
                alert(error.message)
                return;
            }

            // encryption params
            const params = {
                message: openpgp.message.fromText(text),                 // input as Message object
                publicKeys: (await openpgp.key.readArmored(key)).keys, // for encryption
            }
    
            // if signing params are ok, we sign the message with it
            if(signingOption && signingKey && passphrase) {
    
                const {keys: [privateKey]} = await openpgp.key.readArmored(signingKey);
                await privateKey.decrypt(passphrase);
                params.privateKeys = [privateKey];
            }
    
            console.log(params)
            const { data: encrypted } = await openpgp.encrypt(params);
            this.setState({result: encrypted})
        } catch (error) {
            alert(error.message)
        }
    }

    render() {
        const {text, key, signingOption, signingKey, passphrase, result, copied} = this.state
        return (
            <div id="crypt">
                <div className="card-body">
                    <form onSubmit={this.crypt}>
                        <div className="row form-group">
                            <label className="form-label col-sm-12 col-md-2" htmlFor="textCrypt">Text to crypt</label>
                            <textarea name="textCrypt" id="textCrypt" rows="10" className="form-control col-sm-12 col-md-10" value={text} onChange={(e) => this.setState({text: e.target.value})} required></textarea>
                        </div>
                        <div className="row form-group">
                            <label className="form-label col-sm-12 col-md-2" htmlFor="keyCrypt">Public key</label>
                            <textarea name="keyCrypt" id="keyCrypt" rows="10" className="form-control col-sm-12 col-md-10" value={key} onChange={(e) => this.setState({key: e.target.value})} required></textarea>
                        </div>
                        <div className="row form-group">
                            <label className="form-label col-sm-12 col-md-2" htmlFor="signingOption">Signing options</label>
                            <input type="checkbox" name="signingOption" id="signingOption" className="form-control col-sm-12 col-md-1" value={signingOption} onChange={(e) => this.setState({signingOption: e.target.checked})} />
                        </div>
                        {signingOption && <React.Fragment>
                            <div className="row form-group">
                                <label className="form-label col-sm-12 col-md-2" htmlFor="signingKey">Signing key</label>
                                <textarea name="signingKey" id="signingKey" rows="10" className="form-control col-sm-12 col-md-10" value={signingKey} onChange={(e) => this.setState({signingKey: e.target.value})} required/>
                            </div>
                            <div className="row form-group">
                                <label className="form-label col-sm-12 col-md-2" htmlFor="passphrase">Passphrase</label>
                                <input type="password" name="passphrase" id="passphrase" className="form-control col-sm-12 col-md-10" value={passphrase} onChange={(e) => this.setState({passphrase: e.target.value})} required/>
                            </div>
                        </React.Fragment>}
                        <div className="form-group">
                            <button type="submit" className="btn btn-success">Crypt</button>
                        </div>
                        {result && <React.Fragment>
                            <div className="row form-group">
                                <label className="form-label col-sm-12 col-md-2" htmlFor="resultCrypt">Result: </label>
                                <textarea name="resultCrypt" id="resultCrypt" rows="10" className="form-control col-sm-12 col-md-10" onChange={() => console.log('Message encrypted')} value={result} />
                            </div>
                            <div className="form-group">
                                <CopyToClipboard 
                                    text={result}
                                    onCopy={() => this.setState({copied: true})}>

                                    <button type="button" className="btn btn-success">Copy to clipboard</button>

                                </CopyToClipboard>
                                {copied && <svg className="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                                </svg>}
                            </div>
                        </React.Fragment>}
                    </form>
                </div>
            </div>
        );
    }
}

export default Crypt;
