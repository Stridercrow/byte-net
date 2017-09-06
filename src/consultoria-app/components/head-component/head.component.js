export const HeadComponent = {
    bindings: {
        estilo: '='
    },
    template: require('./head-component.html'),
    controller: 'HeadController'
}

export class HeadController {
    constructor(){}

    $onInit () {
    }
}