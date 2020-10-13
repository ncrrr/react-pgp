import React, { Component } from 'react';
import * as openpgp from 'openpgp';

class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            key: ""
        }
    }

    verify = async (e) => {
        e.preventDefault();
        const {text, key} = this.state;

        try {
            // start worker
            await openpgp.initWorker({ path: 'lib/openpgp.worker.js' });

            const publicKeys = (await openpgp.key.readArmored(key)).keys

            // decryption params
            const params = {
                message: await openpgp.cleartext.readArmored(text),  
                publicKeys,
            }
            console.log(params)
            const { signatures } = await openpgp.verify(params);
            const { valid } = signatures[0];
            if (valid) {
                alert(`Signed by ${publicKeys[0].users[0].userId.userid}, key id ${signatures[0].keyid.toHex()}`);
            } else {
                alert('Signature could not be verified');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        const {text, key} = this.state
        return (
            <div id="crypt">
                <div className="card-body">
                    <form onSubmit={this.verify}>
                        <div className="row form-group">
                            <label className="form-label col-sm-12 col-md-2" htmlFor="textVerify">Text to verify</label>
                            <textarea name="textVerify" id="textVerify" rows="10" className="form-control col-sm-12 col-md-10" value={text} onChange={(e) => this.setState({text: e.target.value})}></textarea>
                        </div>
                        <div className="row form-group">
                            <label className="form-label col-sm-12 col-md-2" htmlFor="keyVerify">Public key</label>
                            <textarea name="keyVerify" id="keyVerify" rows="10" className="form-control col-sm-12 col-md-10" value={key} onChange={(e) => this.setState({key: e.target.value})}></textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success right">Verify</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Verify;
