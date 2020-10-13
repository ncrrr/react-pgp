import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as openpgp from 'openpgp';

class Signing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            key: "",
            passphrase: "",
            result: "",
            copied: false
        }
    }

    sign = async (e) => {
        e.preventDefault();
        const {text, key, passphrase} = this.state;

        try {
            // start worker
            await openpgp.initWorker({ path: 'lib/openpgp.worker.js' });
    
            const {keys: [privateKeys]} = await openpgp.key.readArmored(key);
            await privateKeys.decrypt(passphrase);
    
            // decryption params
            const params = {
                message: await openpgp.cleartext.fromText(text),  
                privateKeys: [privateKeys],
            }
            const { data: cleartext } = await openpgp.sign(params);
            this.setState({result: cleartext});
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        const {text, key, passphrase, result, copied} = this.state
        return (
            <div id="crypt">
                <div className="card-body">
                    <form onSubmit={this.sign}>
                        <div className="row form-group">
                            <label className="form-label col-sm-12 col-md-2" htmlFor="textVerify">Text to sign</label>
                            <textarea name="textVerify" id="textVerify" rows="10" className="form-control col-sm-12 col-md-10" value={text} onChange={(e) => this.setState({text: e.target.value})}></textarea>
                        </div>
                        <div className="row form-group">
                            <label className="form-label col-sm-12 col-md-2" htmlFor="keyVerify">Private key</label>
                            <textarea name="keyVerify" id="keyVerify" rows="10" className="form-control col-sm-12 col-md-10" value={key} onChange={(e) => this.setState({key: e.target.value})}></textarea>
                        </div>
                        <div className="row form-group">
                            <label className="form-label col-sm-12 col-md-2" htmlFor="passphrase">Passphrase</label>
                            <input type="password" name="passphrase" id="passphrase" className="form-control col-sm-12 col-md-10" value={passphrase} onChange={(e) => this.setState({passphrase: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success right">Sign</button>
                        </div>
                        {result && <React.Fragment>
                            <div className="row form-group">
                                <label className="form-label col-sm-12 col-md-2" htmlFor="result">Result</label>
                                <textarea name="result" id="result" rows="10" className="form-control col-sm-12 col-md-10" value={result} onChange={(e) => console.log('Message signed')}></textarea>
                            </div>
                            <div className="form-group">
                                <CopyToClipboard 
                                    text={result}
                                    onCopy={() => this.setState({copied: true})}>

                                    <button type="button" className="btn btn-success">Copy to clipboard</button>

                                </CopyToClipboard>
                                {copied && <svg className="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd"/>
                                </svg>}
                            </div>
                        </React.Fragment>}
                    </form>
                </div>
            </div>
        );
    }
}

export default Signing;
