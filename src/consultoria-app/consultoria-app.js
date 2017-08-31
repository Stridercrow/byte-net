import angular from 'angular';
import './global.js';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import '../public/css/estilos.css';

export const ConsultoriaComponent = {
    template: require('./consultoria-app.html')
}

const MODULE_NAME = 'consultoriaApp';

angular.module(MODULE_NAME, ['pascalprecht.translate'])
.config(['$translateProvider', function($translateProvider){
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('es-mx');

    $translateProvider.useSanitizeValueStrategy('escape');
}])
.component('consultoriaComponent', ConsultoriaComponent)