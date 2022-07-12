import accountService from "../services/account-service";
import loginsService from "../services/logins-service";
import { RequestHandler } from "express";
import {
  Account,
  RegisterFields,
  AccountResponse,
} from "../types/account-types";

const getAll: RequestHandler<
  // route params
  never,
  // response
  Account[],
  // req body
  never,
  // query params
  { tenantId: string }
> = async (req, res) => {
  try {
    const { tenantId } = req.query;
    const response = await accountService.selectAll(tenantId);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const getById: RequestHandler<
  { id: string },
  Account,
  never,
  { tenantId: string }
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.query;
    const response = await accountService.selectById(id, tenantId);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getByEmail: RequestHandler<
  { email: string },
  Account,
  never,
  { tenantId: string }
> = async (req, res) => {
  try {
    const { email } = req.params;
    const { tenantId } = req.query;
    const response = await accountService.selectByEmail(email, tenantId);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const register: RequestHandler<
  never,
  AccountResponse,
  RegisterFields,
  never
> = async (req, res) => {
  try {
    const response = await accountService.register(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const resendConfirmationEmail: RequestHandler<
  never,
  AccountResponse,
  { email: string; clientUrl: string },
  never
> = async (req, res) => {
  try {
    const { email, clientUrl } = req.body;
    const response = await accountService.resendConfirmationEmail(
      email,
      clientUrl
    );
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const forgotPassword: RequestHandler = async (req, res) => {
  try {
    const response = await accountService.forgotPassword(req.body);
    res.send(response);
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  }
};

const resetPassword: RequestHandler = async (req, res) => {
  try {
    const response = await accountService.resetPassword(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const setTenantPermissions: RequestHandler = async (req, res) => {
  const { userId, permissionName, value, tenantId } = req.body;
  try {
    const response = await accountService.setTenantPermissions(
      userId,
      permissionName,
      value,
      tenantId
    );
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const setGlobalPermissions: RequestHandler = async (req, res) => {
  const { userId, permissionName, value, tenantId } = req.body;
  try {
    const response = await accountService.setGlobalPermissions(
      userId,
      permissionName,
      value,
      tenantId
    );
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const confirmRegister: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== req.body.id) {
      res
        .status(400)
        .json({ error: "id in url does not match id in request body." });
    }
    const response = await accountService.confirmRegistration(req.body.token);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const login: RequestHandler = async (req, res, next) => {
  const { email, password, tenantId } = req.body;
  try {
    const resp = await accountService.authenticate(email, password, tenantId);
    if (resp.isSuccess) {
      req.user = resp.user;
      loginsService.insert(req.user.id, tenantId);
      next();
    } else {
      res.json(resp);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const put: RequestHandler = async (req, res) => {
  try {
    await accountService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const remove: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await accountService.remove(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default {
  confirmRegister,
  forgotPassword,
  getAll,
  getByEmail,
  getById,
  login,
  put,
  register,
  remove,
  resendConfirmationEmail,
  resetPassword,
  setGlobalPermissions,
  setTenantPermissions,
};
