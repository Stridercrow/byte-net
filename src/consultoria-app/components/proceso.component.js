export const ProcesoComponent = {
    bindings: {
        muestraElemento: '&'
    },
    template: require('../../public/proceso.html'),
    controller: 'ProcesoController'
}

export class ProcesoController {
    constructor () {        
    }

    $onInit () {
        this.muestraElemento( {elemento: 'muestraFooter', valor: false } );
    }
}