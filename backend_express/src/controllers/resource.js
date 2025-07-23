const resourceService = require('../services/resource');

// PUBLIC_INTERFACE
exports.list = (req, res, next) => {
  /** List all resources (placeholder). */
  try {
    res.json(resourceService.list());
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.create = (req, res, next) => {
  /** Create a new resource (placeholder). */
  try {
    const newResource = resourceService.create(req.body);
    res.status(201).json(newResource);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.read = (req, res, next) => {
  /** Get a single resource by ID (placeholder). */
  try {
    const resource = resourceService.read(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.update = (req, res, next) => {
  /** Update a resource by ID (placeholder). */
  try {
    const updated = resourceService.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.remove = (req, res, next) => {
  /** Delete a resource by ID (placeholder). */
  try {
    const removed = resourceService.remove(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
