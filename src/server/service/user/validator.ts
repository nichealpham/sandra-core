import { NextFunction, Response } from "express";
import * as multer from 'multer';

export function validateUserAuthen(req: any, res: Response, next: NextFunction) {
    req.isAuthenticated = false;
    req.userAuthen = {
        _id: "",
        accessToken: "",
        email: "",
    };
    if (!req.headers['_uuid'] && !req.query['_uuid']) {
        let error: any = new Error('UNAUTHENTICATED');
        error.statusCode = 500;
        next(error);
    }
    if (!req.headers['authorization'] && !req.query['authorization']) {
        let error: any = new Error('UNAUTHENTICATED');
        error.statusCode = 500;
        next(error);
    }
    req.isAuthenticated = true;
    req.userAuthen = {
        _id: req.headers['_uuid'] || req.query['_uuid'],
        accessToken: req.headers['authorization'] || req.query['authorization'],
        email: req.headers['email'] || req.query['email'],
    };
    next();
}

export function allowSingleUploadMemory(keyName: string) {
    return multer({ storage: multer.memoryStorage() }).single(keyName);
}