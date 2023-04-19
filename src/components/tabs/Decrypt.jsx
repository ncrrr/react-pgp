import React, { useState, useRef } from 'react';
import {
    Container, Row, FormGroup, FormLabel, FormControl, Col, Form, Button, Badge,
} from 'react-bootstrap';
import * as openpgp from 'openpgp';

export default function Decrypt() {
    const [showVerificationOptions, setShowVerificationOptions] = useState(false);
    const [decryptedText, setDecryptedText] = useState('');
    const [signatureValid, setSignatureValid] = useState(null);

    const result = useRef(null);

    const decryptText = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);

            // private key
            const privateArmoredKey = formData.get('privateArmoredKey');
            const privateKey = await openpgp.decryptKey({
                privateKey: await openpgp.readPrivateKey({ armoredKey: privateArmoredKey }),
                passphrase: formData.get('passphrase'),
            });

            const decryptOptions = {
                message: await openpgp.readMessage({
                    armoredMessage: formData.get('text'), // parse armored message
                }),
                decryptionKeys: privateKey,
            };

            // if verification is enabled (strange result btw ...)
            if (showVerificationOptions) {
                // public key
                const publicArmoredKey = formData.get('publicArmoredKey');
                const publicKey = await openpgp.readKey({ armoredKey: publicArmoredKey });

                decryptOptions.verificationKeys = publicKey;
            }

            const { data: decrypted, signatures } = await openpgp.decrypt(decryptOptions);

            setDecryptedText(decrypted);
            result.current.scrollIntoView();
            if (showVerificationOptions) {
                try {
                    // test signature
                    console.log(await signatures[0].valid);
                    setSignatureValid(true);
                } catch (err) {
                    console.log(err);
                    setSignatureValid(false);
                }
            } else {
                setSignatureValid(null);
            }
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    const renderBadge = () => {
        switch (signatureValid) {
        case true:
            return (<Badge bg="success">Signature valid</Badge>);
        case false:
            return (<Badge bg="danger">Signature invalid</Badge>);
        default:
            return null;
        }
    };

    return (
        <Container>
            <Form onSubmit={decryptText}>
                <br />
                <Row>
                    <Col>
                        <p>Used to decrypt a GPG message block into clear text using a private key</p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Text to decrypt</FormLabel>
                            <FormControl as="textarea" name="text" rows={15} required />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FormLabel>Private Key</FormLabel>
                            <FormControl as="textarea" name="privateArmoredKey" rows={15} required />
                        </FormGroup>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Passphrase</FormLabel>
                            <FormControl type="password" name="passphrase" required />
                        </FormGroup>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={3}>
                        <Form.Check
                            reverse
                            type="switch"
                            id="custom-switch"
                            name="signingOptions"
                            label="Verification options"
                            checked={showVerificationOptions}
                            onChange={(e) => setShowVerificationOptions(e.target.checked)}
                        />
                    </Col>
                </Row>
                <Row hidden={!showVerificationOptions}>
                    <Col>
                        <FormGroup>
                            <FormLabel>Public Key</FormLabel>
                            <FormControl as="textarea" name="publicArmoredKey" rows={15} required={showVerificationOptions} />
                        </FormGroup>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Button type="submit">
                        Derypt
                    </Button>
                </Row>
                <br />
                <Row hidden={!decryptedText}>
                    <Col>
                        <FormGroup>
                            <FormLabel>
                                Decrypted text
                                {' '}
                                {renderBadge()}
                            </FormLabel>
                            <FormControl ref={result} as="textarea" name="encryptedText" rows={15} value={decryptedText} readOnly />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
