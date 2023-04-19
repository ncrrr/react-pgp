import React, { useState } from 'react';
import {
    Container, Row, FormGroup, FormLabel, FormControl, Col, Form, Button, Alert,
} from 'react-bootstrap';
import * as openpgp from 'openpgp';

export default function Verify() {
    const [verificationResult, setVerificationResult] = useState(null);
    const [verificationMessage, setVerificationMessage] = useState(null);

    const verifyText = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);

            const publicKey = await openpgp.readKey({ armoredKey: formData.get('publicArmoredKey') });

            const signedMessage = await openpgp.readCleartextMessage({
                cleartextMessage: formData.get('text'), // parse armored message
            });

            const res = await openpgp.verify({
                message: signedMessage,
                verificationKeys: publicKey,
            });
            const { verified, keyID } = res.signatures[0];
            try {
                await verified; // throws on invalid signature
                console.log(`Successfully signed by key id ${keyID.toHex()}`);
                setVerificationResult(true);
                setVerificationMessage(`Successfully signed by key id ${keyID.toHex()}`);
            } catch (err) {
                console.error(`Signature could not be verified: ${err.message}`);
                setVerificationResult(false);
                setVerificationMessage(`Signature could not be verified: ${err.message}`);
            }
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    const renderResult = () => {
        switch (verificationResult) {
        case true:
            return (
                <Row>
                    <Alert key="success" variant="success">
                        {verificationMessage}
                    </Alert>
                </Row>
            );
        case false:
            return (
                <Row>
                    <Alert key="danger" variant="danger">
                        {verificationMessage}
                    </Alert>
                </Row>
            );
        default:
            return null;
        }
    };

    return (
        <Container>
            <Form onSubmit={verifyText}>
                {renderResult()}
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Text to verify</FormLabel>
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
                    <Button type="submit">
                        Verify
                    </Button>
                </Row>
            </Form>
        </Container>
    );
}
