import React, { useState,useEffect } from 'react';
// import FaceDetect from "./components/FaceDetect/FaceDetect";
import Clarifai from "clarifai";

import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'


export default function Face(){


    const app = new Clarifai.App({
        apiKey: '1a01fe73929d4562bf1d52d6233ba4bc'
       });


    return (
        <>
            <div className="ma5 to">
                <div className="center">
                    <div className="form center pa4 br3 shadow-5">
                    <InputGroup className="mb-3">
                        <Form.Control className="f4 pa2 w-70 center" id="basic-url" aria-describedby="basic-addon3" />
                    </InputGroup>
                    <Button variant="secondary"> Detect </Button>
                    </div>
                </div>
            </div>
        </>
    )
}