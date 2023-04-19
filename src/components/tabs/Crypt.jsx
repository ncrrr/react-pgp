import React, { useState, useRef } from 'react';
import {
    Container, Row, FormGroup, FormLabel, FormControl, Col, Form, Button,
} from 'react-bootstrap';
import * as openpgp from 'openpgp';

export default function Crypt() {
    const [showSigningOptions, setShowSigningOptions] = useState(false);
    const [encryptedText, setEncryptedText] = useState('');

    const result = useRef(null);

    const cryptText = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);

            // public key
            const publicArmoredKey = formData.get('publicArmoredKey');
            const publicKey = await openpgp.readKey({ armoredKey: publicArmoredKey });

            const text = formData.get('text');

            const cryptOptions = {
                message: await openpgp.createMessage({ text }),
                encryptionKeys: publicKey,
            };

            // if signing options are enabled
            if (showSigningOptions) {
                const privateArmoredKey = formData.get('privateArmoredKey');
                const privateKey = await openpgp.decryptKey({
                    privateKey: await openpgp.readPrivateKey({ armoredKey: privateArmoredKey }),
                    passphrase: formData.get('passphrase'),
                });

                cryptOptions.signingKeys = privateKey;
            }

            setEncryptedText(await openpgp.encrypt(cryptOptions));
            result.current.scrollIntoView();
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    return (
        <Container>
            <Form onSubmit={cryptText}>
                <Row>
                    <Col>
                        <p>Used to crypt clear text to PGP message block</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Text to crypt</FormLabel>
                            <FormControl as="textarea" name="text" rows={15} required />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FormLabel>Public Key</FormLabel>
                            <FormControl as="textarea" name="publicArmoredKey" rows={15} required />
                        </FormGroup>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={2}>
                        <Form.Check
                            reverse
                            type="switch"
                            id="custom-switch"
                            name="signingOptions"
                            label="Signing options"
                            checked={showSigningOptions}
                            onChange={(e) => setShowSigningOptions(e.target.checked)}
                        />
                    </Col>
                </Row>
                <Row hidden={!showSigningOptions}>
                    <Col>
                        <FormGroup>
                            <FormLabel>Private Key</FormLabel>
                            <FormControl as="textarea" name="privateArmoredKey" rows={15} required={showSigningOptions} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row hidden={!showSigningOptions}>
                    <Col>
                        <FormGroup>
                            <FormLabel>Passphrase</FormLabel>
                            <FormControl type="password" name="passphrase" required={showSigningOptions} />
                        </FormGroup>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Button type="submit">
                        Crypt
                    </Button>
                </Row>
                <br />
                <Row hidden={!encryptedText}>
                    <Col>
                        <FormGroup>
                            <FormLabel>Encrypted text</FormLabel>
                            <FormControl ref={result} as="textarea" name="encryptedText" rows={15} value={encryptedText} readOnly />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
