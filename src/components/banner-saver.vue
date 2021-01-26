<template>
	<section class="banner-result__saver">
	    <span>Не забудьте сохранить свои труды в нужном формате!</span>
	    <div class="banner-result__buttons">
	    	<button v-on:click="savePNG">Сохранить в формате PNG</button>
	     	<button v-on:click="saveHTML">Скопировать как HTML разметку</button>
	    	<button v-on:click="saveJSON">Скопировать как строку JSON</button>
	    </div>
	</section>
</template>

<script>
	export default {

		methods: {
			savePNG() {
    		  this.$emit('saveBanner','png')
  		  	},
  		  	saveHTML() {
    		  this.$emit('saveBanner','html')
  		  	},
  		  	saveJSON() {
    		  this.$emit('saveBanner','json')
  		  	}
 		}
	}


</script>