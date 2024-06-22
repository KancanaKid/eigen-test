import express from 'express';
import { create , getMembers} from '../domain/controllers/memberController.js';

const router = express.Router();

/** Access the members api implementations on controllers */

 /** POST Methods */
    /**
     * @openapi
     * '/api/members/create':
     *  post:
     *     tags:
     *     - Member Controller
     *     summary: Create a member
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - code
     *              - name
     *              - isPenalized
     *            properties:
     *              code:
     *                type: string
     *                default: johndoe 
     *              name:
     *                type: string
     *                default: ESQ
     *              isPenalized:
     *                type: boolean
     *                default: false    
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post("/create", create);

/** GET Methods */
    /**
     * @openapi
     * '/api/members/getMembers':
     *  get:
     *     tags:
     *     - Member Controller
     *     summary: Get all member
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.get('/getMembers', getMembers);

export default router;