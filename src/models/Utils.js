class Utils {
  // Convert an object to JSON string
  static toJson(obj) {
    return JSON.stringify(obj);
  }

  // Convert a JSON string to an object
  static fromJson(jsonStr, Model) {
    const obj = JSON.parse(jsonStr);
    return new Model(obj);
  }

  // Convert a list of objects to a JSON string
  static toJsonList(objList) {
    return JSON.stringify(objList);
  }

  // Convert a JSON string to a list of objects
  static fromJsonList(jsonStr, Model) {
    const objList = JSON.parse(jsonStr);
    return objList.map((obj) => new Model(obj));
  }

  // Save an object to the local database
  static saveToDatabase(local_path, obj) {
    if (obj === null) {
      return;
    }
    if (obj === undefined) {
      return;
    }
    if (obj === "undefined") {
      return;
    }
    try {
      localStorage.setItem(local_path, JSON.stringify(obj));
    } catch (error) {
      return;
    }
  }

  // Load an object from the local database by id
  static loadFromDatabase(DB_PATH) {
    // load from local db
    var data = localStorage.getItem(DB_PATH);
    if (data === null) {
      return null;
    }
    if (data === undefined) {
      return null;
    }
    if (data === "undefined") {
      return null;
    }
    if (data === "") {
      return null;
    }
    var results = null;
    try {
      results = JSON.parse(data);
    } catch (error) {
      return null;
    }
    return results;
  }

  // Delete an object from the local database by id
  static deleteFromDatabase(id, db) {
    db.delete(id);
  }

  // Update an object in the local database
  static updateInDatabase(obj, db) {
    db.update(obj);
  }

  // Validate if an object is of a certain model type
  static isValidModel(obj, Model) {
    return obj instanceof Model;
  }

  // Validate if a list of objects are of a certain model type
  static isValidModelList(objList, Model) {
    return objList.every((obj) => obj instanceof Model);
  }
  // Generate a unique identifier
  static generateUniqueId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  // Deep clone an object
  static deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // Merge two objects
  static mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
  }

  // Check if an object is empty
  static isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  // Format a date to a readable string
  static formatDate(date) {
    return date.toISOString().split("T")[0];
  }
}

module.exports = Utils;
