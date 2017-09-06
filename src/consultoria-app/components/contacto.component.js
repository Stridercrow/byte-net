export const ContactoComponent = {
    bindings: {
        muestraElemento: '&'
    },
    template: require('../../public/idea.html'),
    controller: 'ContactoController'
}

export class ContactoController {
    constructor () {

    }

    $onInit () {
        this.muestraElemento( {elemento: 'muestraFooter', valor: true } );
    }
}