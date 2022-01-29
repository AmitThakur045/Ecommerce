class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword ? {
        name: {
            $regex: this.queryStr.keyword,
            $options: "i",      
        },
    } : {}

    this.query = this.query.find({...keyword});
    return this;
  }

  filter() {
    // pass by value
    const queryCopy = {...this.queryStr}; 
    // remove the fields for category
    const removeFields = ["keyword","page","limit"];
    removeFields.forEach(key => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);
    // adding $ sign to the beginning of the string to make it a valid regex
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

module.exports = ApiFeatures;
