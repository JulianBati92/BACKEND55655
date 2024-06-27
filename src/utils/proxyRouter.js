import express from 'express';
import httpProxy from 'http-proxy';

const proxyRouter = express.Router();
const apiProxy = httpProxy.createProxyServer();

proxyRouter.all('*', (req, res) => {
    apiProxy.web(req, res, { target: 'https://backend55655.up.railway.app/' });
});

export default proxyRouter;
