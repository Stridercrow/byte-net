import $ from "jquery";

$(document).ready(function(){        
        $("video").css({"width" : screen.width, "height" : screen.height });
        $("#js-home-hero").css("height", window.innerHeight);
        $(".proceso-container").css({"width" : window.innerWidth, "height" : window.innerHeight });
        var titulo = $(document).find("title").text();
        if(titulo == 'Proceso')
        {
            if(screen.width < 500){
                $(".proceso").replaceWith(remplazaHtmlMovil);
            }
        }

        if(screen.width > 500){
            $(".idea-container").css({"width" : window.innerWidth, "height" : window.innerHeight });
        }

        //estado inicial, se va a ir actualizando conforme se haga el resize
        var alturaScreenActual = screen.height;

        $(window).resize(function(){
            var h = Math.min(2000, window.innerHeight);
            //var alturaScreenNueva;
            //console.log("Tamaño de la pantalla: ancho-" + window.innerWidth + " alto-" + window.innerHeight);
            $("#js-home-hero").css("height", h+"px");
            $(".proceso-img").css({"width" : window.innerWidth,"height" : h+"px"});
            $(".idea-container").css({"width" : window.innerWidth, "height" : window.innerHeight });
            /*console.log("alturaScreenActual = " + alturaScreenActual);
            console.log("screen.height al scrollear = " + $(this).height());
            alturaScreenNueva =  alturaScreenActual - $(this).height();
            console.log("alturaScreenNueva = " + alturaScreenNueva)
            console.log("");
            alturaScreenActual = alturaScreenNueva;
            alturaScreenNueva = -585;
            $("video").css("transform", "translate(0px," + alturaScreenNueva + "px)");*/
        });

        //Al scrollear cambiar el fondo del menu
        var scrollPos = 0;
        $(document).scroll(function(){
            scrollPos = $(this).scrollTop();
            //console.log("Posicion scroll main-header: " + scrollPos);
            if(scrollPos > 88){
                //console.log("Si lo tendria q cambiar");
                $(".main-header-bg").css("opacity", "0.9");
                //$(".main-header").animate({backgroundColor: "#000"});
            }else{
                //console.log("Regresaria a transparente");
                $(".main-header-bg").css("opacity", "0");
                //$(".main-header").animate({backgroundColor: "transparent"});
            }
        });

        //El efecto del boton con puntitos
        setInterval(function(){efecto($(".circle:first"))}, 100);
        setInterval(function(){efecto($("#second"))}, 200);
        setInterval(function(){efecto($("#third"))}, 300);

        $(".scroll").click(function(){
            $('html,body').animate({
                scrollTop: $(".info-section").offset().top}, 'slow');
        });

        $("#btnQuieroApp").click(function(){
            $('html,body').animate({
                scrollTop: $(".info-section").offset().top}, 'slow');
        });

        //Menu vertical movil
        $(".menu-movil").click(function(){
            var estadoDisplay = $(".menu-vertical").css("height");
            console.log(estadoDisplay);

            if(estadoDisplay == "0px"){
                $(".menu-vertical").animate({height: window.innerHeight}, 200);
            }else{
                $(".menu-vertical").animate({height: "0"}, 200);
            }
        });

        //Cambia de el texto del proceso
        var procesos = ['consultoria', 'diseno', 'desarrollo'];
        var procesoActivo = 0;
        var imagenes = ['proces_cons', 'proces_dez', 'proces_dev'];


        //Cambia la imagen de fondo al cambiar de proceso
        $(".derecha").click(function (){
            console.log("otro clic, proceso a leer: " + procesoActivo);
            switch(procesoActivo){
                case 0:
                    procesoActivo = cambiaProceso(procesos, procesoActivo, imagenes);
                    $(".izquierda").toggleClass("display-none", false);
                    console.log("Proceso Activo: " + procesoActivo);
                    break;
                case 1:
                    procesoActivo = cambiaProceso(procesos, procesoActivo, imagenes);
                    console.log("Proceso Activo: " + procesoActivo);
                    $(".derecha").toggleClass("display-none", true);
                    break;
                case 2:
                    //Desaparece la flecha derecha
                    console.log("Proceso Activo: " + procesoActivo);
                    break;
            }
        });

        $(".izquierda").click(function (){
            console.log("otro clic, proceso a leer: " + procesoActivo);
            switch(procesoActivo){
                case 0:
                    console.log("Proceso Activo: " + procesoActivo);
                    break;
                case 1:
                    $(".izquierda").toggleClass("display-none", true);
                    procesoActivo = cambiaProcesoIzq(procesos, procesoActivo, imagenes);
                    console.log("Proceso Activo: " + procesoActivo);
                    break;
                case 2:
                    procesoActivo = cambiaProcesoIzq(procesos, procesoActivo, imagenes);
                    $(".derecha").toggleClass("display-none", false);
                    console.log("Proceso Activo: " + procesoActivo);
                    break;
            }
        });

        //Al hacer click sobre cualquier proceso se agranda para que aparezca el texto
        $("#consultoria").click(function(){
            abreInfoProceso(this);
            cierraInfoProceso($("#diseno"));
            cierraInfoProceso($("#desarrollo"));
        });

        $("#diseno").click(function(){
            abreInfoProceso(this);
            cierraInfoProceso($("#consultoria"));
            cierraInfoProceso($("#desarrollo"));
        });

        $("#desarrollo").click(function(){
            abreInfoProceso(this);
            cierraInfoProceso($("#consultoria"));
            cierraInfoProceso($("#diseno"));
        });
    });

    function efecto($elemento){
        $elemento.fadeIn(800, function(){
            $elemento.fadeOut(800);
        });
    }

    function abreInfoProceso(elemento){
        $(elemento).animate({height: "1200px"});
        $(elemento).children("p").css("visibility", "visible");
        $(elemento).children("h3").css("visibility", "visible");
        $(elemento).children("div.diagrama").css("visibility", "visible");
        $(elemento).children("div.diagrama").find("p").css("visibility", "visible");
    }

    function cierraInfoProceso(elemento){
        $(elemento).animate({height: "500px"});
        $(elemento).children("p").css("visibility", "hidden");
        $(elemento).children("h3").css("visibility", "hidden");
        $(elemento).children("div.diagrama").css("visibility", "hidden");
        $(elemento).children("div.diagrama").find("p").css("visibility", "hidden");
    }

    function cambiaProceso(procesos, procesoActivo, imagenes){
        var nombreProceso =	procesos[procesoActivo];
        var nombreProcesoSig = procesos[procesoActivo+1];
        console.log("Proceso siguiente: " + nombreProcesoSig);

        $("." + nombreProceso + "-img").fadeOut(1500);
        $("." + nombreProcesoSig + "-img").fadeIn(1500);

        $("." + nombreProcesoSig).toggleClass("parte-hide", false).toggleClass("parte-transicion");
        $("." + nombreProceso).toggleClass("parte-centra", false).toggleClass("parte-activa-efecto parte-mueve-izquierda");
        setTimeout(function(){
            $("." + nombreProcesoSig).toggleClass("parte-activa-efecto parte-centra");
            $("." + nombreProceso).toggleClass("parte-hide", true);
        }, 350);

        setTimeout(function(){
            $("." + nombreProceso).toggleClass("parte-activa-efecto", false);
            $("." + nombreProcesoSig).toggleClass("parte-activa-efecto", false);
        }, 500);
        return procesoActivo = procesoActivo+1;
    }

    function cambiaProcesoIzq(procesos, procesoActivo, imagenes){
        var nombreProceso =	procesos[procesoActivo];
        var nombreProcesoSig = procesos[procesoActivo-1];

        $("." + nombreProceso + "-img").fadeOut(1500);
        $("." + nombreProcesoSig + "-img").fadeIn(1500);

        $("." + nombreProceso).toggleClass("parte-activa-efecto");
        $("." + nombreProcesoSig).toggleClass("parte-activa-efecto");

        $("." + nombreProceso).toggleClass("parte-mueve-derecha").toggleClass("parte-centra", false);
        setTimeout(function(){
            $("." + nombreProcesoSig).toggleClass("parte-hide", false);
        }, 250);
        setTimeout(function(){
            $("." + nombreProcesoSig).toggleClass("parte-mueve-izquierda", false).toggleClass("parte-centra");
        }, 350);
        setTimeout(function(){
            $("." + nombreProceso).toggleClass("parte-transicion parte-activa-efecto parte-mueve-derecha", false).toggleClass("parte-hide");
            $("." + nombreProcesoSig).toggleClass("parte-activa-efecto", false);
        }, 500);
        return procesoActivo = procesoActivo-1;
    }

    function remplazaHtmlMovil(){
        var string = "<section class=\"proceso\"> \
                        <div id=\"consultoria\"> \
                            <h3>El proceso:</h3> \
                            <h2>CONSULTOR&Iacute;A</h2> \
                            <p> \
                                Basado en los principios de la filosof&iacute;a del apoyo, nuestros asesores se encargan de pulir el concepto de su proyecto y guiarlo en cada \
                                paso desde la concepci&oacute;n de la idea hasta la liberaci&oacute;n final de su producto. Lo ayudamos a construir un modelo de negocio eficiente \
                                para que pueda visualizar su concepto y tenerlo listo para el siguiente nivel. Nuestro objetivo es ofrecerle un producto de calidad hecho en tiempo \
                                y forma. \
                            </p> \
                            <div class=\"diagrama\"> \
                                <ul> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Idea</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>An&aacute;lisis</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Investigaci&oacute;n de usuarios</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Reporte de consultor&iacute;a</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Prototipo de modelo de negocio</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Desarrollo de wireframes(UX)</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Desarrollo de especificaciones</p> \
                                        </div> \
                                    </li> \
                                </ul> \
                            </div> \
                        </div> \
                    </section> \
                    <section class=\"proceso\"> \
                        <div id=\"diseno\"> \
                            <h3>El proceso:</h3> \
                            <h2>DISE&Ntilde;O</h2> \
                            <p> \
                                En esta fase es donde creamos conceptos de interfaces &uacute;nicos, llamativos y amigables para su uso, enfocado a los conceptos de su proyecto. A diferencia de otras \
                                compa&ntilde;&iacute;as, tenemos establecido un proceso que cubre todas las bases. No solo \"hacemos alg&uacute;n\" dise&ntilde;o. Creamos verdaderas obras de arte. Para cada \
                                concepto, nuestro dise&ntilde;ador ofrece diferentes alternativas de dise&ntilde;o para que usted pueda elegir. Le ayudamos a realizar la mejor elecci&oacute;n. \
                            </p> \
                            <div class=\"diagrama\"> \
                                <ul> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Desarrollo de mockups</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Desarrollo del dise&ntilde;o<br>(UI)</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Grupo de enfoque</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Aprobaci&oacute;n del concepto</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Dise&ntilde;o final</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Directrices del dise&ntilde;o</p> \
                                        </div> \
                                    </li> \ </ul> </div> </div> </section> \
                    <section class=\"proceso\"> \
                        <div id=\"desarrollo\"> \
                            <h3>El proceso:</h3> \
                            <h2>DESARROLLO</h2> \
                            <p> \
                                Durante esta etapa, utilizamos metodolog&iacute;as &aacute;giles y dividimos el proceso de desarrollo en peque&ntilde;os ciclos. Esto nos permite responder de manera r&aacute;pida y eficiente \
                                a los peque&ntilde;os cambios que pudiera haber en sus requerimientos haciendo nuestra cooperaci&oacute;n transparente y productiva. Lo m&aacute;s importante es que obtiene exactamente lo que \
                                necesita en tiempo y dinero. \
                            </p> \
                            <div class=\"diagrama\"> \
                                <ul> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Planeando el sprint</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>C&oacute;digo y pruebas</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Juntas diar&iacute;as</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Demo</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Retroalimentaci&oacute;n</p> \
                                        </div> \
                                    </li> \
                                    <li class=\"fase\"> \
                                        <div class=\"texto-interno\"> \
                                            <p>Entrega del producto</p> \
                                        </div> \
                                    </li> \ </ul> </div> </div> </section> \
                                    ";
    return string;
    };

    function remplazaHtml(){
        var string = "<section class=\"proceso\"> \
            <div class=\"proceso-img\"></div> \
            <h3>El proceso:</h3> \
            <div class=\"parte-container\"> \
                <div class=\"parte consultoria\"> \
                    <div class=\"texto-container\"> \
                        <h2>CONSULTORIA</h2> \
                        <div class=\"texto\"> \
                            <p> \
                                Basado en los principios de la filosof&iacute;a del apoyo, nuestros asesores se encargan de pulir el concepto de su proyecto y guiarlo en cada \
                                paso desde la concepci&oacute;n de la idea hasta la liberaci&oacute;n final de su producto. Lo ayudamos a construir un modelo de negocio eficiente \
                                para que pueda visualizar su concepto y tenerlo listo para el siguiente nivel. Nuestro objetivo es ofrecerle un producto de calidad hecho en tiempo \
                                y forma. \
                            </p> \
                        </div> \
                    </div> \
                    <div class=\"diagrama-container\"> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Idea</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">An&aacute;lisis</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Investigaci&oacute;n de usuarios</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Reporte de consultor&iacute;a</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Prototipo de modelo de negocio</div> \
                        </div> \
                        <div class=\"circulo\">\
                            <div class=\"texto-circulo\">Desarrollo de wireframes(UX)</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Desarrollo de especificaciones</div> \
                        </div> \
                    </div> \
                </div> \
                <!-- -----------------------------------------------------------> \
                <div class=\"parte diseno parte-hide\"> \
                    <div class=\"texto-container\"> \
                        <h2>DISE&Ntilde;O</h2> \
                        <div class=\"texto\"> \
                            <p> \
                                En esta fase es donde creamos conceptos de interfaces &uacute;nicos, llamativos y amigables para su uso, enfocado a los conceptos de su proyecto. A diferencia de otras \
                                compa&ntilde;&iacute;as, tenemos establecido un proceso que cubre todas las bases. No solo \"hacemos alg&uacute;n\" dise&ntilde;o. Creamos verdaderas obras de arte. Para cada \
                                concepto, nuestro dise&ntilde;ador ofrece diferentes alternativas de dise&ntilde;o para que usted pueda elegir. Le ayudamos a realizar la mejor elecci&oacute;n. \
                            </p> \
                        </div> \
                    </div> \
                    <div class=\"diagrama-container\"> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Desarrollo de mockups</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Desarrollo del dise&ntilde;o<br>(UI)</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Grupo de enfoque</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Aprobaci&oacute;n del concepto</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Dise&ntilde;o final</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Directrices del dise&ntilde;o</div> \
                        </div> \
                    </div> \
                </div> \
                <!-- -------------------------------------------------------- --> \
                <div class=\"parte desarrollo parte-hide\">\
                    <div class=\"texto-container\"> \
                        <h2>DESARROLLO</h2> \
                        <div class=\"texto\"> \
                            <p> \
                                Durante esta etapa, utilizamos metodolog&iacute;as &aacute;giles y dividimos el proceso de desarrollo en peque&ntilde;os ciclos. Esto nos permite responder de manera r&aacute;pida y eficiente \
                                a los peque&ntilde;os cambios que pudiera haber en sus requerimientos haciendo nuestra cooperaci&oacute;n transparente y productiva. Lo m&aacute;s importante es que obtiene exactamente lo que \
                                necesita en tiempo y dinero. \
                            </p> \
                        </div> \
                    </div> \
                    <div class=\"diagrama-container\"> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Planeando el sprint</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">C&oacute;digo y pruebas</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Juntas diar&iacute;as</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Demo</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Retroalimentaci&oacute;n</div> \
                        </div> \
                        <div class=\"circulo\"> \
                            <div class=\"texto-circulo\">Finalizaci&oacute;n y entrega de su producto</div> \
                        </div> \
                    </div> \
                </div> \
            </div> \
            <div class=\"izquierda\"> \
                <div class=\"flecha\"> </div> \
            </div> \
            <div class=\"derecha\"> \
                <div class=\"flecha\"></div> </div> </section> \
    ";
        return string;
    }