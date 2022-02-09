// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  serverBaseURL : 'http://164.92.219.27/api',
  apiKey : 'qG4bROXcHy',
  apiSecret : '90wORSp91QJfThiKM8hQrDUnLTFg7dsd',
  corruptLabel: 'Corrupt',
  notCorruptLabel: 'Not Corrupt',
  afterVoteMessage: function(decision:string){return `You voted " ${decision} Corrupt, Please enter your email address to see what 
                                                      other thoughts`;},
  mapColorScheme : {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  },
  mapLegendPosition: "below",
  deleteMessage: function(attr:string){return `Are you sure you want to delete  ${attr}. This cannot be undone.`},
  adminExistMsg : 'Admin exists!',
  loginFailMsg : 'username or password is incorrect',
  corruptThreshold : 40,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
