import React, { useState, useRef } from 'react';
import {
    Container, Row, FormGroup, FormLabel, FormControl, Col, Form, Button,
} from 'react-bootstrap';
import * as openpgp from 'openpgp';

export default function Signing() {
    const [signedText, setSignedText] = useState('');

    const result = useRef(null);

    const signText = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);

            // private key
            const privateArmoredKey = formData.get('privateArmoredKey');
            const privateKey = await openpgp.decryptKey({
                privateKey: await openpgp.readPrivateKey({ armoredKey: privateArmoredKey }),
                passphrase: formData.get('passphrase'),
            });

            const unsignedMessage = await openpgp.createCleartextMessage({ text: formData.get('text') });
            const cleartextMessage = await openpgp.sign({
                message: unsignedMessage, // CleartextMessage or Message object
                signingKeys: privateKey,
            });

            setSignedText(cleartextMessage);
            result.current.scrollIntoView();
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    return (
        <Container>
            <Form onSubmit={signText}>
                <Row>
                    <Col>
                        <p>Used to sign clear text with a private key to prove identity of a clear message</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Text to sign</FormLabel>
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
                    <Button type="submit">
                        Sign
                    </Button>
                </Row>
                <br />
                <Row hidden={!signedText}>
                    <Col>
                        <FormGroup>
                            <FormLabel>
                                Signed text
                            </FormLabel>
                            <FormControl ref={result} as="textarea" name="encryptedText" rows={15} value={signedText} readOnly />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
