import angular from 'angular';
import '@uirouter/angularjs'
import './global.js';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import { HeadComponent, HeadController } from './components/head-component/head.component';
import { ProcesoComponent, ProcesoController } from './components/proceso.component';
import { ContactoComponent, ContactoController } from './components/contacto.component';

const ConsultoriaComponent = {
    bindings: {
        muestraElemento: '&'
    },
    template: require('./consultoria-app.html'),
    controller: 'ConsultoriaController'
}

class BaseController {
    constructor($scope) {
        this.$scope = $scope;
    }

    $onInit() {
        this.$scope.estilo = 'estilos.css';
        this.$scope.muestraFooter = true;
        this.$scope.cambiaEstilo = (nombre) => {
            this.$scope.estilo = nombre;
        }

        this.$scope.muestraElemento = (elemento, valor) => {
            this.$scope.muestraFooter = valor;
        }
    }
}

class ConsultoriaController {
    constructor() {        
    }

    $onInit () {
        this.muestraElemento( {elemento: 'muestraFooter', valor: true} );
    }
}

const MODULE_NAME = 'consultoriaApp';

angular.module(MODULE_NAME, ['pascalprecht.translate', 'ui.router'])
    .config(['$translateProvider', '$stateProvider', '$urlRouterProvider', function ($translateProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        let estados = [
            {
                name: 'home',
                url: '/home',
                component: 'homeComponent',
            },
            {
                name: 'proceso',
                url: '/proceso',
                component: 'procesoComponent'
            },
            {
                name: 'contacto',
                url: '/contacto',
                component: 'contactoComponent'
            }
        ]

        estados.forEach((estado) => {
            $stateProvider.state(estado);
        });


        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('es-mx');

        $translateProvider.useSanitizeValueStrategy('escape');
    }])
    .controller('BaseController', BaseController)
    .controller('HeadController', HeadController)
    .controller('ConsultoriaController', ConsultoriaController)
    .controller('ProcesoController', ProcesoController)
    .controller('ContactoController', ContactoController)
    .component('headComponent', HeadComponent)
    .component('homeComponent', ConsultoriaComponent)
    .component('procesoComponent', ProcesoComponent)
    .component('contactoComponent', ContactoComponent)