import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as openpgp from 'openpgp';

class Decrypt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            key: "",
            result: "",
            copied: false
        }
    }

    decrypt = async (e) => {
        e.preventDefault();
        const {text, key, passphrase} = this.state;

        try {
            try {
                // start worker
                await openpgp.initWorker({ path: 'lib/openpgp.worker.js' });
            } catch (error) {
                alert(error.message)
                return;
            }
    
            // decrypt key
            const {keys: [privateKey]} = await openpgp.key.readArmored(key);
            await privateKey.decrypt(passphrase);
    
            // decryption params
            const params = {
                message: await openpgp.message.readArmored(text),  
                privateKeys: [privateKey],
            }
            const { data: decrypted } = await openpgp.decrypt(params)
            this.setState({result: decrypted});
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        const {text, key, passphrase, result, copied} = this.state
        return (
            <div id="crypt">
                <div className="card-body">
                    <br/>
                    <form onSubmit={this.decrypt}>
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="textDecrypt">Text to decrypt</label>
                                    <textarea name="textDecrypt" id="textDecrypt" rows="10" className="form-control" value={text} onChange={(e) => this.setState({text: e.target.value})}></textarea>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="keyDecrypt">Private key</label>
                                    <textarea name="keyDecrypt" id="keyDecrypt" rows="10" className="form-control" value={key} onChange={(e) => this.setState({key: e.target.value})}></textarea>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="passphrase">Passphrase</label>
                                    <input type="password" name="passphrase" id="passphrase" className="form-control" value={passphrase} onChange={(e) => this.setState({passphrase: e.target.value})} />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success right">Decrypt</button>
                                </div>
                            </div>
                        </div>
                        {result && <React.Fragment>
                            <div className="row form-group">
                                <label className="form-label col-sm-12 col-md-2" htmlFor="result">Result</label>
                                <textarea name="resultDecrypt" id="resultDecrypt" rows="10" className="form-control col-sm-12 col-md-10" onChange={() => console.log('Message encrypted')} value={result} />
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

export default Decrypt;
