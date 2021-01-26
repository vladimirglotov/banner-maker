<template>
	<section class="configurator-size">
		<h2>Выберите размер</h2>
	    <div class="configurator-size__buttons">
	        <button type="button" class="configurator-size__width-minus"  @click="widthMinus">Ширина -</button>
	        <button type="button" class="configurator-size__width-plus" @click="widthPlus">Ширина +</button>
	        <button type="button" class="configurator-size__height-minus" @click="heightMinus">Высота -</button>
	        <button type="button" class="configurator-size__height-plus" @click="heightPlus">Высота +</button>
	    </div>
	</section>
</template>

<script>
export default {

	data: () => ({
		
	}),
	methods: {
		widthMinus() {
       		this.$emit('setWidth', 'minus')
      	},
    	widthPlus() {
       		this.$emit('setWidth', 'plus')
      	},
      	heightMinus() {
       		this.$emit('setHeight', 'minus')
      	},
     	heightPlus() {
       		this.$emit('setHeight', 'plus')
      	}
	}
}


</script>