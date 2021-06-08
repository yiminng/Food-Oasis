const router = require("express").Router();
const categoryController = require("../controllers/category-controller");

const jwtSession = require("../../middleware/jwt-session");

// eslint-disable-next-line no-unused-vars
const categoryJoiMiddleware = require("../../middleware/joi/category-controller-validation");

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  categoryController.post
);
router.put(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  categoryController.put
);

router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  categoryController.remove
);

module.exports = router;
