<script>
	import '../app.postcss';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div class="card rounded-none px-4 py-2 flex justify-between fixed w-full top-0">
	<div>Automotor</div>
	<LightSwitch />
</div>
<div class="mb-12"></div>

<slot />
