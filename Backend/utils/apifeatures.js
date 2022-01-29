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

    pagination(resultPerPage) {
        // type conversion to number
        const page = Number(this.queryStr.page) || 1;
        const limit = this.queryStr.limit * 1 || resultPerPage;
        // skip is the number of documents to skip
        const skip = (page - 1) * limit;
        // pagination is done by the mongoose library so we don't need to do it here 
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = ApiFeatures;
