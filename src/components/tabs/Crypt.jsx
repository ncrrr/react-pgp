import React, { useState } from 'react';
import {
    Container, Row, FormGroup, FormLabel, FormControl, Col, Form, Button,
} from 'react-bootstrap';

export default function Crypt() {
    const [showSigningOptions, setShowSigningOptions] = useState(false);

    const cryptText = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData.get('text'));
        console.log(formData.get('publicKey'));
        if (showSigningOptions) {
            console.log(formData.get('privateKey'));
        }
    };

    return (
        <Container>
            <Form onSubmit={cryptText}>
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Text to crypt</FormLabel>
                            <FormControl as="textarea" name="text" rows={10} required />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FormLabel>Public Key</FormLabel>
                            <FormControl as="textarea" name="publicKey" rows={10} required />
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
                            <FormControl as="textarea" name="privateKey" rows={10} required={showSigningOptions} />
                        </FormGroup>
                    </Col>
                </Row>
                <br />
                <Button type="submit">
                    Crypt
                </Button>
            </Form>
        </Container>
    );
}
