import * as React from 'react';
import { useState } from 'react';
import { remNotiMessage } from "../errorMessage.ts";
import axios from "axios";
 
function Message () {

    return (
        <>
            <div className="message-none" id="messageConsole">
                <div className="message-co">
                    <div className="message-close" onClick={() => {remNotiMessage();}}></div>
                    <p className="message-p" id="messageConsoleP"></p>
                </div>
            </div>
        </>
    )
}
 
export default Message;