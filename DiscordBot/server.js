const express = require('express');
const { openBrowser, goto, write, click, closeBrowser } = require('taiko');

const app = express();
const port = 80;

let isBrowserOpen = false;
const requestQueue = [];

async function processRequest(req, res) {
    try {
        if (!isBrowserOpen) {
            isBrowserOpen = true;
            await openBrowser();
        }
        await goto('https://login.live.com/');
        await write(req.query.email);
        await click('next');
        setTimeout(async () => {
            await click('Email code').catch(async () => {
                return await res.sendStatus(204);
            });
        }, 1000);
        await res.sendStatus(200);
        setTimeout(async () => {
            isBrowserOpen = false;
            await closeBrowser();
            const nextRequest = requestQueue.shift();
            if (nextRequest) {
                processRequest(nextRequest.req, nextRequest.res);
            }
        }, 4000);
    } catch (error) {
        console.log(error);
    }
}

app.get('/code', async (req, res) => {
    if (!req.query.email) return await res.sendStatus(400);
    if (isBrowserOpen) {
        requestQueue.push({ req, res });
        console.log(`Request queued: ${req.query.email}`);
    } else {
        console.log(`Processing request: ${req.query.email}`);
        processRequest(req, res);
    }
});

app.get('*', async (req, res) => {
    return await res.send('online');
});

app.listen(port, () => {
    console.log('Example app listening on port', port);
});
