const express = require('express');
const resourceController = require('../controllers/resource');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resource
 *   description: Example resource CRUD operations.
 */

/**
 * @swagger
 * /resource:
 *   get:
 *     summary: List all resources
 *     tags: [Resource]
 *     responses:
 *       200:
 *         description: List of resources
 */
router.get('/', resourceController.list);

/**
 * @swagger
 * /resource:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resource]
 *     responses:
 *       201:
 *         description: Resource created
 */
router.post('/', resourceController.create);

/**
 * @swagger
 * /resource/{id}:
 *   get:
 *     summary: Get a resource by ID
 *     tags: [Resource]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: Resource details
 *       404:
 *         description: Resource not found
 */
router.get('/:id', resourceController.read);

/**
 * @swagger
 * /resource/{id}:
 *   put:
 *     summary: Update a resource
 *     tags: [Resource]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: Resource updated
 *       404:
 *         description: Resource not found
 */
router.put('/:id', resourceController.update);

/**
 * @swagger
 * /resource/{id}:
 *   delete:
 *     summary: Delete a resource
 *     tags: [Resource]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resource ID
 *     responses:
 *       204:
 *         description: Resource deleted
 *       404:
 *         description: Resource not found
 */
router.delete('/:id', resourceController.remove);

module.exports = router;
