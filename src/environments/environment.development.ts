// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200',
  api: 'http://localhost:8000/api/',
  appoinmentsEndpoints: 'citas/',
  patientsEndpoints: 'pacientes/',
  medicalRecordEndpoint: 'expedientes/',
  authLoginEndpoint: 'auth/login',
  authRenewEndpoint: 'auth/renew',
  adminEndpoint: 'admin/',
  cliqProceduresEndpoint: 'procedimientos',
  medicosEndpoint: 'medicos/',
  horariosEndpoint: 'horarios/',
  motivoConsultaEndpoint: 'motivoConsulta/',
  quirofanosEndpoint: 'quirofanos/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
