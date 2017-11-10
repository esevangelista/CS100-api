import mongoose from 'mongoose';

const DB = 'mongodb://localhost/App100';

mongoose.Promise = global.Promise;

mongoose.connect(DB, function(err){
  if (err) console.log(`Error in connecting to database\n ${err}`);
  else console.log(`Success in connecting to database ${DB}`);
});


export default DB;