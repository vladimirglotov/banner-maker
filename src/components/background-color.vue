<template>
	<div class="configurator-background__color">
		<input type="color" @input="submit" v-model="color">
	</div>
</template>

<script>
	
	export default {

		data: () => ({
			color:''
		}),
		  methods: {
		  	submit() {
    		  this.$emit('submit', this.color)
  		  	}
 		}
	}

</script>