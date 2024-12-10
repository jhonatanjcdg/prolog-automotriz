export const programa = `
  :- dynamic(paso/1).
  :- dynamic(estado/1).
  :- dynamic(problema/1).

  % Regla inicial
  regla(Respuesta) :-
      (paso(_) ->
          fail
      ;
          !, 
          ListaPasos = ['PREGUNTA', '¿Qué problema presenta el vehículo?', 
                        'Quema de aceite', 'Recalentamiento', 'Consumo excesivo de combustible', 
                        'Fallo en el embrague', 'Banda de distribución dañada', 
                        'Fallo en el sistema de lubricación'],
          Respuesta = ListaPasos,
          retractall(paso(_)),
          assertz(paso('RegistrarProblema'))
      ).

  % Registrar el problema reportado por el usuario
  regla(Respuesta) :-
      (paso('RegistrarProblema') ->
          !, retractall(paso(_)),
          assertz(paso('Diagnosticar')),
          assertz(problema(Respuesta))
      ).

  % --- Reglas de diagnóstico ---

  % Quema de aceite
  regla(Respuesta) :-
      (paso('Diagnosticar'), problema('Quema de aceite') ->
          !, Respuesta = ['PREGUNTA', '¿El vehículo presenta alguno de estos síntomas?',
                         'Disminuye rápidamente la varilla del aceite', 
                         'Bota aceite por el desfogue del motor', 
                         'Gotea aceite por el desfogue del motor'],
          retractall(paso(_)),
          assertz(paso('VerificarQuemaAceite'))
      ).

  regla(Respuesta) :-
      (paso('VerificarQuemaAceite') ->
          !, retractall(paso(_)),
          assertz(paso('DiagnosticarQuemaAceite')),
          assertz(estado(Respuesta))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarQuemaAceite'), estado('Disminuye rápidamente la varilla del aceite') ->
          !, Respuesta = ['RESPUESTA',
          'Posible diagnóstico: Quema de aceite. Revisar estado de los anillos del pistón, desgaste en el pistón, desgaste en la camisa o cilindro.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarQuemaAceite'), estado('Bota aceite por el desfogue del motor') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Quema de aceite. Revisar estado de las válvulas, guías o sellos de válvulas.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarQuemaAceite'), estado('Gotea aceite por el desfogue del motor') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Quema de aceite. Revisar estado de las válvulas, guías o sellos de válvulas.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  % Recalentamiento
  regla(Respuesta) :-
      (paso('Diagnosticar'), problema('Recalentamiento') ->
          !, Respuesta = ['PREGUNTA', '¿El vehículo presenta alguno de estos síntomas?',
                         'Se regresa el agua al radiador',
                         'Se regresa el agua al tarro de la reserva',
                         'El vehículo no enciende',
                         'El vehículo enciende, pero golpea por dentro',
                         'El motor tiene olor a quemado',
                         'Exceso de humo por el desfogue'],
          retractall(paso(_)),
          assertz(paso('VerificarRecalentamiento'))
      ).

  regla(Respuesta) :-
      (paso('VerificarRecalentamiento') ->
          !, retractall(paso(_)),
          assertz(paso('DiagnosticarRecalentamiento')),
          assertz(estado(Respuesta))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarRecalentamiento'), estado('Se regresa el agua al radiador') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Recalentamiento. Revisar estado del empaque de la culata, cabezote en el bloque, o si el empaque está fogueado.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarRecalentamiento'), estado('Se regresa el agua al tarro de la reserva') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Recalentamiento. Revisar estado del empaque de la culata, cabezote en el bloque, o si el empaque está fogueado.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarRecalentamiento'), estado('El vehículo no enciende') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Recalentamiento. Revisar si hay caída del puente en la culata o en el bloque.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarRecalentamiento'), estado('El vehículo enciende, pero golpea por dentro') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Recalentamiento. Revisar si el termostato está pegado o si el motor está falto de agua.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarRecalentamiento'), estado('El motor tiene olor a quemado') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Recalentamiento. Revisar si hay daño en la culata, si la culata está pandeada, o si hay torcedura en la culata o en el bloque.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarRecalentamiento'), estado('Exceso de humo por el desfogue') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Recalentamiento. Revisar estado de los cilindros, anillos, pistones, aros, o si hay un anillo o aro partido.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  % Consumo excesivo de combustible
  regla(Respuesta) :-
      (paso('Diagnosticar'), problema('Consumo excesivo de combustible') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Consumo excesivo de combustible. Revisar la bomba de inyección, inyectores (goteo, pulverización, quema), termostato, compresión del motor, asientos de válvulas, filtro de aire, juntas de los inyectores.'],
          retractall(paso(_)),
          retractall(problema(_)),
          assertz(paso('Finalizado'))
      ).

  % Fallo en el embrague
  regla(Respuesta) :-
      (paso('Diagnosticar'), problema('Fallo en el embrague') ->
          !, Respuesta = ['PREGUNTA', '¿El vehículo presenta alguno de estos síntomas?',
                         'Pérdida de fuerza del vehículo',
                         'El vehículo está lento',
                         'Las revoluciones suben sin avanzar',
                         'Olor a quemado al acelerar',
                         'El vehículo no avanza'],
          retractall(paso(_)),
          assertz(paso('VerificarEmbrague'))
      ).

  regla(Respuesta) :-
      (paso('VerificarEmbrague') ->
          !, retractall(paso(_)),
          assertz(paso('DiagnosticarEmbrague')),
          assertz(estado(Respuesta))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarEmbrague'), estado('Pérdida de fuerza del vehículo') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Fallo en el embrague. Revisar estado del asbesto en el disco de embrague, prensa de embrague, abanico.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarEmbrague'), estado('El vehículo está lento') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Fallo en el embrague. Revisar estado del asbesto en el disco de embrague, prensa de embrague, abanico.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarEmbrague'), estado('Las revoluciones suben sin avanzar') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Fallo en el embrague. Revisar estado del asbesto en el disco de embrague, prensa de embrague, abanico.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarEmbrague'), estado('Olor a quemado al acelerar') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Fallo en el embrague. Revisar si el disco de embrague está deforme, desintegrado o desarmado.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarEmbrague'), estado('El vehículo no avanza') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Fallo en el embrague. Revisar si los resortes están zafados en el centro de la manzana o estriado.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  % Banda de distribución dañada
  regla(Respuesta) :-
      (paso('Diagnosticar'), problema('Banda de distribución dañada') ->
          !, Respuesta = ['PREGUNTA', '¿El vehículo presenta alguno de estos síntomas?',
                         'El vehículo no enciende',
                         'El vehículo enciende, pero fallando'],
          retractall(paso(_)),
          assertz(paso('VerificarBandaDistribucion'))
      ).

  regla(Respuesta) :-
      (paso('VerificarBandaDistribucion') ->
          !, retractall(paso(_)),
          assertz(paso('DiagnosticarBandaDistribucion')),
          assertz(estado(Respuesta))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarBandaDistribucion'), estado('El vehículo no enciende') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Banda de distribución dañada. Revisar si la banda de distribución está arrancada o si los dientes están desgastados.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarBandaDistribucion'), estado('El vehículo enciende, pero fallando') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Banda de distribución dañada. Revisar si hay torcedura de válvulas dentro del cilindro de la culata, o si las válvulas o pistones están dañados.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  % Fallo en el sistema de lubricación
  regla(Respuesta) :-
      (paso('Diagnosticar'), problema('Fallo en el sistema de lubricación') ->
          !, Respuesta = ['PREGUNTA', '¿El vehículo presenta alguno de estos síntomas?',
                         'Golpe de motor',
                         'Testigo de bombillo de aceite encendido',
                         'Aguja baja en el testigo de reloj de aceite',
                         'Frenamiento en el motor'],
          retractall(paso(_)),
          assertz(paso('VerificarLubricacion'))
      ).

  regla(Respuesta) :-
      (paso('VerificarLubricacion') ->
          !, retractall(paso(_)),
          assertz(paso('DiagnosticarLubricacion')),
          assertz(estado(Respuesta))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarLubricacion'), estado('Golpe de motor') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Fallo en el sistema de lubricación. Revisar estado de la casquetería, falta de casquetería, o falla en la bomba de aceite.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarLubricacion'), estado('Testigo de bombillo de aceite encendido') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Fallo en el sistema de lubricación. Revisar si hay obstrucción en la bomba de aceite o si se está utilizando un lubricante inadecuado.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarLubricacion'), estado('Aguja baja en el testigo de reloj de aceite') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Fallo en el sistema de lubricación. Revisar si se han girado los casquetes de biela y bancada, casquetes de ejes, bujes de eje de levas.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  regla(Respuesta) :-
      (paso('DiagnosticarLubricacion'), estado('Frenamiento en el motor') ->
          !, Respuesta = ['RESPUESTA', 'Posible diagnóstico: Fallo en el sistema de lubricación. Revisar si los pistones están pegados, si los casquetes han girado, o si el motor está desvielado.'],
          retractall(paso(_)),
          retractall(estado(_)),
          assertz(paso('Finalizado'))
      ).

  % --- Regla para limpiar el estado del chatbot ---
  limpiar :-
      retractall(paso(_)),
      retractall(estado(_)),
      retractall(problema(_)). 
`;