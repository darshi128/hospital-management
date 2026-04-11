import epxress from "express";
import {registerPateint,
    login,
    addNewAdmin, 
    getAllDoctors,
    getUsersDetails,
    logoutAdmin, 
    logoutPatient,
    addNewDoctor
} from "../controller/userController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../midleware/auth.js";

const router = epxress.Router();

router.post("/patient/register",registerPateint);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/patient/me",isPatientAuthenticated, getUsersDetails);
router.get("/admin/me",isAdminAuthenticated, getUsersDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);

export default router;