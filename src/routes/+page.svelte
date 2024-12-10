<script>
    import { onMount } from 'svelte';
    import { Prolog } from '$lib';
    import { Autocomplete, popup } from '@skeletonlabs/skeleton';
    import { Trash } from 'lucide-svelte';
    import Message from './(components)/Message.svelte';

    const prologo = new Prolog();

    let registroChat = [];

    let respuesta = '';

    let ocupado = false;

    let respuestas = [];

    const mostrarPregunta = (pregunta) => {
        registroChat = [
            ...registroChat,
            {
                modo: 'sistema_pregunta',
                mensaje: pregunta
            }
        ];
    };

    const mostrarRespuesta = (respuesta) => {
        respuestas = respuesta.map((r) => ({
            modo: 'sistema_respuesta',
            mensaje: r
        }));
        registroChat = [...registroChat, ...respuestas];
    };

    const scrollBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    const componerRespuestas = (respuestasArr) => {
        respuesta = '';
        respuestas = respuestasArr.map((r) => ({
            label: r,
            value: r
        }));
    };

    const parseInput = async (entrada) => {
        // Ajustamos la lógica para manejar las respuestas de Prolog
        // en el formato ['PREGUNTA', ...] o ['RESPUESTA', ...]
        
        // Si la respuesta es un array, se extrae el primer elemento 
        const tipoRespuesta = Array.isArray(entrada) ? entrada[0] : entrada; 

        switch (tipoRespuesta) {
            case 'PREGUNTA':
                mostrarPregunta(entrada[1]);
                componerRespuestas(entrada.slice(2));
                break;
            case 'RESPUESTA':
                mostrarRespuesta(Array.isArray(entrada) ? entrada.slice(1) : [entrada]);
                await new Promise((r) => setTimeout(r, 50));
                scrollBottom();
                const resultado = await prologo.esperarRespuesta();
                await parseInput(resultado);
                break;
            default:
                // Manejar cualquier otro tipo de respuesta si es necesario
                console.log("Respuesta no reconocida:", entrada); 
                break;
        }
    };

    const nuevaSesion = async () => {
        ocupado = true;
        registroChat = [];
        prologo.nuevaSesion();
        const resultado = await prologo.esperarRespuesta();
        await parseInput(resultado);
        ocupado = false;
        window.scrollTo(0, 0);
    };

    const enviarRespuesta = async () => {
        ocupado = true;
        registroChat = [
            ...registroChat,
            {
                modo: 'usuario',
                mensaje: respuesta
            }
        ];
        await new Promise((r) => setTimeout(r, 50));
        scrollBottom();
        const resultado = await prologo.enviarRespuesta(respuesta);
        await parseInput(resultado);
        scrollBottom();
        ocupado = false;
    };

    onMount(nuevaSesion);

    let popupSettings = {
        event: 'focus-click',
        target: 'popupAutocomplete',
        placement: 'top'
    };

    function onPopupDemoSelect(event) {
        respuesta = event.detail.label;
    }
</script>

<div class="pt-4"></div>
<div class="flex flex-col max-w-3xl mx-auto gap-4 px-4">
    {#each registroChat as registro}
        <Message modo={registro.modo}>
            {registro.mensaje}
        </Message>
    {/each}
    {#if ocupado}
        <div class="relative flex py-5 items-center">
            <div class="flex-grow border-t border-gray-400"></div>
            <!-- <span class="flex-shrink mx-4 text-gray-400"> Espere por favor... </span> -->
            <div class="flex-grow border-t border-gray-400"></div>
        </div>
    {/if}
</div>
<div class="pt-24" id="division"></div>

<div class="fixed left-0 bottom-0 w-full md:pb-4 bg-surface-50-900-token mx-2">
    <div class="bg-surface-100-800-token p-4 max-w-3xl rounded-lg mx-auto flex gap-2 items-center">
        <input
            class="input autocomplete"
            type="search"
            name="autocomplete-search"
            placeholder="Click para ver opciones..."
            disabled={ocupado}
            bind:value={respuesta}
            use:popup={popupSettings}
        />
        <button class="btn variant-ghost-error" on:click={nuevaSesion}>
            <Trash></Trash>
        </button>
    </div>
</div>

<div data-popup="popupAutocomplete" class="w-full">
    <div class="max-w-3xl mx-auto">
        <div class="card p-2 mr-4 space-y-2">
            <Autocomplete
                bind:input={respuesta}
                options={respuestas}
                emptyState="No se encontraron resultados"
                on:selection={onPopupDemoSelect}
                on:click={enviarRespuesta}
            />
        </div>
    </div>
</div>