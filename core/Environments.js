// Return current environment
export default function getEnvironment() {
  return currentEnvironment();
}

 // Define current environment
 function currentEnvironment() {
   switch (process.env.environment) {
     case 'dev':
       return "dev url";
     case 'prod':
           return "prod url";
     default:
       return "default url(works if 'dev' or 'prod' not specified)";
   }
 }