let data = {};
let counter = 1;

// PUBLIC_INTERFACE
exports.reset = () => {
  /** Resets the in-memory resource store and counter (for use in tests). */
  data = {};
  counter = 1;
};

// PUBLIC_INTERFACE
exports.list = () => {
  /** Returns all resource objects in-memory. */
  return Object.values(data);
};

// PUBLIC_INTERFACE
exports.create = (resource) => {
  /** Adds a new resource object in-memory. */
  const id = `${counter++}`;
  const newObj = { ...resource, id };
  data[id] = newObj;
  return newObj;
};

// PUBLIC_INTERFACE
exports.read = (id) => {
  /** Retrieves a resource object by ID in-memory. */
  return data[id] || null;
};

// PUBLIC_INTERFACE
exports.update = (id, resource) => {
  /** Updates a resource object by ID in-memory. */
  if (!data[id]) {
    return null;
  }
  data[id] = { ...data[id], ...resource, id };
  return data[id];
};

// PUBLIC_INTERFACE
exports.remove = (id) => {
  /** Removes a resource object by ID in-memory. */
  if (!data[id]) {
    return false;
  }
  delete data[id];
  return true;
};
