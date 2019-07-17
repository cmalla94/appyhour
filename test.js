module.exports = (req, res, next) => {

  var userdevice = req.query.userdevice;
           
      userdevice.map((userid)=>{
        dynamaws.queryIndex(
        req.config.ACTIVITIES_TABLE_NAME,
      model.ACTIVITY_BY_USERDEVICE_NAME,
      model.ACTIVITY_BY_USERDEVICE_KEY,
      userid,
      req.config.QUERY_INDEX_LIMIT,
      req.config.QUERY_INDEX_DELAY
    )
      .then(results=>{
         results.push(results[0]);
		 return results;
        })
      .then(results=>{
           res.json(results);
           next();

      });
