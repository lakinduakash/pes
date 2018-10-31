// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyCmovsqRyc1JWkCh7K8e_SGm7KdFpTIdJY",
    authDomain: "my-first-firebase-1319e.firebaseapp.com",
    databaseURL: "https://my-first-firebase-1319e.firebaseio.com",
    projectId: "my-first-firebase-1319e",
    storageBucket: "",
    messagingSenderId: "310316367899"
  },

  evalStoreConfig: {
    apiKey: "AIzaSyA3IEmXc922u6k1E9Qp3URx56pa55BuFZs",
    authDomain: "pes-eval.firebaseapp.com",
    databaseURL: "https://pes-eval.firebaseio.com",
    projectId: "pes-eval",
    storageBucket: "pes-eval.appspot.com",
    messagingSenderId: "721843620769"
  }
};
