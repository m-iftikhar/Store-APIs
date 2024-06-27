const Product=require('../models/product')
const getAllProducts = async (req, res) => {
    const {featured,company,name,sort,fields, numericfilters }=req.query;
    const queryObject={};
    if(featured){
        queryObject.featured= featured ==='true' ? "true" : "false";
    }
    if (company) {
        queryObject.company = company;
    }
    if(name){
        queryObject.name= {$regex:name,$options:'i'};
    }
    if(numericfilters){
      const operatorMap={
        '>' : '$gt',
        '>=' : '$gte',
        '<' : '$lt',
        '<=' : '$lte',
        '=' : '$e',
        
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericfilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );
      const options = ['price', 'rating'];
      filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
    }
    console.log(queryObject)
    let result= Product.find(queryObject);
    // //sort 
    if(sort){
        const sortlist=sort.split(',').join(' ');
        result=result.sort(sortlist);
    }
    else{
        result=result.sort('createdAt');
    }
    // fields
    if(fields){
        const fieldlist=fields.split(',').join(' ');
        result=result.select(fieldlist);
    }
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 10
    const skip=(page -1) * limit;

    result=result.skip(skip).limit(limit);

    //  23 items we have 
    let products=await result;
    res.status(200).json({ products, nbHits: products.length });
};

const getAllProductsStatic = async (req, res) => {
    
    const products=await Product.find({price:{$gt : 30}})
    .sort('name price').select('name price') .limit(10).skip(4) ;
   
    res.status(200).json({ products, nbHits: products.length});
};

module.exports = {
    getAllProducts,
    getAllProductsStatic
};
